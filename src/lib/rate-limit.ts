/**
 * Lightweight abuse-prevention helpers for serverless API routes.
 *
 * These are deterrent-level, NOT fortress-level — they prevent casual abuse
 * and scraping without needing Vercel KV or an external Redis.
 */

/* ── Types ── */

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

interface TokenBudgetEntry {
  usedTokens: number;
  resetAt: number; // epoch ms (end of the day)
}

/* ── In-memory stores ── */

const ipRateMap = new Map<string, RateLimitEntry>();
const tokenBudget = { usedTokens: 0, resetAt: 0 };
let concurrentRequests = 0;

/* ── Configuration ── */

const CONFIG = {
  /** Max requests per IP per window */
  maxRequestsPerWindow: 20,
  /** Window length in ms (default 1 minute) */
  windowMs: 60_000,
  /** Max tokens (input + output) per rolling day */
  maxDailyTokens: 200_000,
  /** Max concurrent LLM calls */
  maxConcurrent: 4,
  /** Max messages in a single request */
  maxMessagesPerRequest: 15,
  /** Max characters per message */
  maxMessageLength: 2000,
} as const;

/* ── Helpers ── */

function getClientIp(request: Request): string {
  // Vercel sets x-forwarded-for; fall back to a synthetic ID
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Check and increment the per-IP rate limit. Returns seconds until reset if blocked (0 = allowed). */
function checkIpRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = ipRateMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    // Fresh window
    ipRateMap.set(ip, { count: 1, resetAt: now + CONFIG.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > CONFIG.maxRequestsPerWindow) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds: retryAfter };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Check and increment the daily token budget. Returns allowed + reset info. */
function checkTokenBudget(estimatedTokens: number): {
  allowed: boolean;
  usedToday: number;
  maxDaily: number;
  resetsInSeconds: number;
} {
  const now = Date.now();
  // Reset at next midnight local-time-ish (UTC for simplicity)
  const tomorrow = new Date();
  tomorrow.setUTCHours(24, 0, 0, 0);
  const targetReset = tomorrow.getTime();

  if (now >= tokenBudget.resetAt) {
    tokenBudget.usedTokens = 0;
    tokenBudget.resetAt = targetReset;
  }

  tokenBudget.usedTokens += estimatedTokens;
  const allowed = tokenBudget.usedTokens <= CONFIG.maxDailyTokens;
  const resetsInSeconds = Math.ceil((tokenBudget.resetAt - now) / 1000);

  return {
    allowed,
    usedToday: tokenBudget.usedTokens,
    maxDaily: CONFIG.maxDailyTokens,
    resetsInSeconds,
  };
}

/** Estimate token count from text (rough: ~4 chars per token). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/* ── Public API ── */

export interface AbuseCheckResult {
  /** Overall pass/fail */
  passed: boolean;
  /** HTTP status code to return if blocked */
  status?: number;
  /** JSON body for the blocked response */
  body?: Record<string, unknown>;
  /** Extra headers to attach on success (like rate-limit info) */
  headers?: Record<string, string>;
}

/**
 * Validate the origin/referer header to block direct API calls from
 * non-application origins.
 */
export function checkOrigin(request: Request): AbuseCheckResult {
  const allowedDomains = [
    "quantum-research-archive.vercel.app",
    "localhost",
    "127.0.0.1",
    "quantum-research-archive.vercel.pub",
  ];

  const origin = request.headers.get("origin") || "";
  const referer = request.headers.get("referer") || "";
  const source = origin || referer;

  // Allow requests with no origin/referer only for local dev (or curl testing)
  if (!source) {
    // In production, block requests with no origin
    const host = request.headers.get("host") || "";
    if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
      return {
        passed: false,
        status: 403,
        body: { error: "Direct API access denied. Use the web application." },
      };
    }
    return { passed: true };
  }

  const allowed = allowedDomains.some((d) => source.includes(d));
  if (!allowed) {
    return {
      passed: false,
      status: 403,
      body: { error: "Origin not allowed." },
    };
  }

  return { passed: true };
}

/**
 * Validate the request payload for size / structure abuse.
 */
export function checkPayload(messages: unknown[]): AbuseCheckResult {
  if (!Array.isArray(messages)) {
    return {
      passed: false,
      status: 400,
      body: { error: "Invalid payload: 'messages' must be an array." },
    };
  }

  if (messages.length === 0) {
    return {
      passed: false,
      status: 400,
      body: { error: "No messages provided." },
    };
  }

  if (messages.length > CONFIG.maxMessagesPerRequest) {
    return {
      passed: false,
      status: 400,
      body: {
        error: `Too many messages. Maximum is ${CONFIG.maxMessagesPerRequest}.`,
      },
    };
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== "object") {
      return {
        passed: false,
        status: 400,
        body: { error: "Each message must be an object." },
      };
    }
    const m = msg as Record<string, unknown>;
    if (typeof m.content !== "string") {
      return {
        passed: false,
        status: 400,
        body: { error: "Each message must have a 'content' string." },
      };
    }
    if (m.content.length > CONFIG.maxMessageLength) {
      return {
        passed: false,
        status: 400,
        body: {
          error: `Message too long. Maximum is ${CONFIG.maxMessageLength} characters.`,
        },
      };
    }
  }

  return { passed: true };
}

/**
 * Check rate limits (per-IP + token budget).
 * Call this *before* making the LLM call.
 */
export function checkRateLimits(
  request: Request,
  estimatedInputTokens: number
): AbuseCheckResult {
  const ip = getClientIp(request);

  // Per-IP rate limit
  const ipCheck = checkIpRateLimit(ip);
  if (!ipCheck.allowed) {
    return {
      passed: false,
      status: 429,
      body: {
        error: "Too many requests. Please slow down.",
        retryAfterSeconds: ipCheck.retryAfterSeconds,
      },
    };
  }

  // Daily token budget
  const budgetCheck = checkTokenBudget(estimatedInputTokens);
  if (!budgetCheck.allowed) {
    return {
      passed: false,
      status: 429,
      body: {
        error: `Daily API budget reached (${budgetCheck.usedToday}/${budgetCheck.maxDaily} tokens used). Resets in ~${Math.ceil(budgetCheck.resetsInSeconds / 3600)}h.`,
      },
    };
  }

  return {
    passed: true,
    headers: {
      "X-RateLimit-Limit": String(CONFIG.maxRequestsPerWindow),
      "X-RateLimit-Used": String(
        ipRateMap.get(ip)?.count ?? 0
      ),
      "X-TokenBudget-Used": String(budgetCheck.usedToday),
      "X-TokenBudget-Max": String(budgetCheck.maxDaily),
    },
  };
}

/**
 * Check concurrent request throttle.
 * Call this *before* making the LLM call, and releaseConcurrent() after.
 */
export function tryAcquireConcurrent(): AbuseCheckResult {
  if (concurrentRequests >= CONFIG.maxConcurrent) {
    return {
      passed: false,
      status: 503,
      body: {
        error: "Server busy. Please try again shortly.",
        retryAfterSeconds: 5,
      },
    };
  }
  concurrentRequests += 1;
  return { passed: true };
}

/** Release a concurrent slot. Call in finally{} after the LLM call. */
export function releaseConcurrent(): void {
  concurrentRequests = Math.max(0, concurrentRequests - 1);
}

/**
 * Reset all in-memory state (useful in tests).
 */
export function _resetForTest(): void {
  ipRateMap.clear();
  tokenBudget.usedTokens = 0;
  tokenBudget.resetAt = 0;
  concurrentRequests = 0;
}
