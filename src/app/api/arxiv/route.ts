import { NextResponse } from "next/server";

/*
 * Server-side arXiv proxy. The browser can't call export.arxiv.org directly
 * (no CORS headers), so we fetch it here and parse the Atom feed robustly:
 * we read the <entry> block (not the feed header) and use [\s\S] so the
 * multi-line <summary> is captured in full.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") || "").trim();
  if (!id || !/^(\d{4}\.\d{4,5}|[a-z-]+(?:\.[a-z-]+)*\/\d{7})$/i.test(id)) {
    return NextResponse.json({ error: "Invalid arXiv id." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}&max_results=1`, {
      headers: { "User-Agent": "QuantumResearchArchive/1.0 (educational)" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return NextResponse.json({ error: `arXiv returned ${res.status}.` }, { status: 502 });
    const xml = await res.text();

    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    if (!entry) return NextResponse.json({ error: "No paper found for that id." }, { status: 404 });

    const clean = (s: string) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const title = clean(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "Untitled");
    const abstract = clean(entry.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] || "");
    const authors = [...entry.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((m) => clean(m[1])).filter(Boolean);
    const year = (entry.match(/<published>(\d{4})/)?.[1]) || "";

    if (!title || !abstract) return NextResponse.json({ error: "Could not parse the paper." }, { status: 502 });

    return NextResponse.json({
      id,
      title,
      abstract,
      authors: authors.join(", ") || "Unknown",
      year,
      url: `https://arxiv.org/abs/${id}`,
    });
  } catch {
    return NextResponse.json({ error: "Could not reach arXiv. Try again." }, { status: 504 });
  }
}
