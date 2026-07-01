import { NextResponse } from "next/server";
import {
  checkOrigin,
  checkPayload,
  checkRateLimits,
  tryAcquireConcurrent,
  releaseConcurrent,
  estimateTokens,
} from "@/lib/rate-limit";
import { answerFromPaper } from "@/lib/paperAnswer";
import { glossaryTerms } from "@/data/glossary";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/** OpenRouter model (only used when OPENROUTER_API_KEY is configured). */
const MODEL = process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4-flash";
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || null;

const SITE_URL = process.env.SITE_URL || "https://quantum-research-archive.vercel.app";
const SITE_TITLE = "Quantum Research Archive";

/** Make an OpenRouter chat-completion call. Returns the reply text or null. */
async function callOpenRouter(
  model: string,
  messages: ChatMessage[],
  apiKey: string | null,
  signal: AbortSignal
): Promise<string | null> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "HTTP-Referer": SITE_URL,
    "X-Title": SITE_TITLE,
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  } else {
    // Free tier models may need no key or a specific header
    headers["Authorization"] = "Bearer ";
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
    signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[copilot] OpenRouter ${model} returned ${res.status}: ${body.slice(0, 200)}`);
    return null;
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) {
    console.warn(`[copilot] OpenRouter ${model} returned empty reply`);
  }
  return reply || null;
}

export async function POST(request: Request) {
  try {
    // ── Layer 1: Origin validation ──
    const originCheck = checkOrigin(request);
    if (!originCheck.passed) {
      return NextResponse.json(originCheck.body, {
        status: originCheck.status ?? 403,
      });
    }

    const body = await request.json();
    const { messages, paperTitle, paperAuthors, paperAbstract } = body;

    // ── Layer 2: Payload validation ──
    const payloadCheck = checkPayload(messages);
    if (!payloadCheck.passed) {
      return NextResponse.json(payloadCheck.body, {
        status: payloadCheck.status ?? 400,
      });
    }

    // ── Layer 3: Rate limit + token budget ──
    const estimatedTokens = estimateTokens(JSON.stringify(body));
    const rateCheck = checkRateLimits(request, estimatedTokens);
    if (!rateCheck.passed) {
      return NextResponse.json(rateCheck.body, {
        status: rateCheck.status ?? 429,
      });
    }

    // ── Layer 4: Concurrent request throttle ──
    const conCheck = tryAcquireConcurrent();
    if (!conCheck.passed) {
      return NextResponse.json(conCheck.body, {
        status: conCheck.status ?? 503,
      });
    }

    try {
      // Build system prompt with paper context
      const systemPrompt = `You are a Research Copilot — an AI assistant that helps people understand quantum computing research papers. You explain concepts clearly and simply, assuming the user is a student or researcher who wants to understand the paper.

CURRENT PAPER CONTEXT:
Title: ${paperTitle || "Unknown"}
Authors: ${paperAuthors || "Unknown"}
Abstract: ${paperAbstract || "Not provided"}

Guidelines:
- Explain quantum concepts in plain English with analogies where helpful
- If asked about a specific term, provide a definition and its relevance to the paper
- If asked to summarize, give a 2-3 sentence plain-English summary
- Be concise but thorough — aim for 3-5 sentences per response
- Do NOT say you're an AI or mention your training — just answer directly`;

      const apiMessages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...messages.slice(-10),
      ];

      // ── Attempt 1: hosted model (only when a key is configured) ──
      if (OPENROUTER_KEY) {
        try {
          const reply = await callOpenRouter(MODEL, apiMessages, OPENROUTER_KEY, AbortSignal.timeout(18000));
          if (reply) return NextResponse.json({ reply }, { headers: rateCheck.headers });
        } catch (err) {
          console.error(`[copilot] ${MODEL} error:`, err);
        }
      }

      // ── Attempt 2: local, paper-grounded answerer (glossary + retrieval) ──
      const lastQuestion = messages.length > 0 ? messages[messages.length - 1].content : "";
      const reply = answerFromPaper(
        lastQuestion,
        { title: paperTitle || "this paper", authors: paperAuthors, abstract: paperAbstract || "" },
        glossaryTerms
      );
      return NextResponse.json({ reply }, { headers: rateCheck.headers });
    } finally {
      releaseConcurrent();
    }
  } catch (error) {
    console.error("[copilot] Unhandled error:", error);
    return NextResponse.json({ reply: "I can help explain concepts from this paper. What would you like to know?" });
  }
}
