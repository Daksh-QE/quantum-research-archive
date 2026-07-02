import { NextResponse } from "next/server";

// arXiv metadata proxy (browser can't hit arXiv directly — no CORS).
// export.arxiv.org is flaky from cloud IPs, so race 3 sources and take the
// first complete answer: Semantic Scholar JSON, arxiv.org HTML meta tags,
// export.arxiv.org Atom. short per-source timeouts to stay under the fn limit.
export const runtime = "nodejs";
export const maxDuration = 20;

interface Paper { id: string; title: string; abstract: string; authors: string; year: string; url: string; }

const clean = (s: string) =>
  s.replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

// "Last, First" -> "First Last"
const flipName = (n: string) => {
  const parts = n.split(",").map((p) => p.trim());
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : n.trim();
};

async function fromSemanticScholar(id: string): Promise<Paper> {
  const res = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/arXiv:${encodeURIComponent(id)}?fields=title,abstract,authors,year`,
    { headers: { "User-Agent": "QuantumResearchArchive/1.0 (educational)" }, signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error(`S2 ${res.status}`);
  const d = await res.json();
  if (!d.title || !d.abstract) throw new Error("S2 incomplete");
  return {
    id,
    title: clean(d.title),
    abstract: clean(d.abstract),
    authors: (d.authors || []).map((a: { name: string }) => a.name).join(", ") || "Unknown",
    year: d.year ? String(d.year) : "",
    url: `https://arxiv.org/abs/${id}`,
  };
}

async function fromArxivHtml(id: string): Promise<Paper> {
  const res = await fetch(`https://arxiv.org/abs/${encodeURIComponent(id)}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; QuantumResearchArchive/1.0)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`html ${res.status}`);
  const html = await res.text();
  const title = clean(html.match(/<meta name="citation_title" content="([^"]+)"/)?.[1] || "");
  const authors = [...html.matchAll(/<meta name="citation_author" content="([^"]+)"/g)].map((m) => flipName(clean(m[1])));
  const year = html.match(/<meta name="citation_(?:online_)?date" content="(\d{4})/)?.[1] || "";
  let abstract = html.match(/<blockquote class="abstract[^"]*">([\s\S]*?)<\/blockquote>/)?.[1] || "";
  abstract = clean(abstract).replace(/^Abstract:?\s*/i, "");
  if (!abstract) abstract = clean(html.match(/<meta property="og:description" content="([^"]*)"/)?.[1] || "");
  if (!title || !abstract) throw new Error("html incomplete");
  return { id, title, abstract, authors: authors.join(", ") || "Unknown", year, url: `https://arxiv.org/abs/${id}` };
}

async function fromExportApi(id: string): Promise<Paper> {
  const res = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}&max_results=1`, {
    headers: { "User-Agent": "QuantumResearchArchive/1.0 (educational)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`export ${res.status}`);
  const xml = await res.text();
  const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
  if (!entry) throw new Error("export no entry");
  const title = clean(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
  const abstract = clean(entry.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] || "");
  const authors = [...entry.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((m) => clean(m[1])).filter(Boolean);
  const year = entry.match(/<published>(\d{4})/)?.[1] || "";
  if (!title || !abstract) throw new Error("export incomplete");
  return { id, title, abstract, authors: authors.join(", ") || "Unknown", year, url: `https://arxiv.org/abs/${id}` };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") || "").trim();
  if (!id || !/^(\d{4}\.\d{4,5}|[a-z-]+(?:\.[a-z-]+)*\/\d{7})$/i.test(id)) {
    return NextResponse.json({ error: "Invalid arXiv id." }, { status: 400 });
  }
  try {
    // first source to answer completely wins
    const paper = await Promise.any([fromSemanticScholar(id), fromArxivHtml(id), fromExportApi(id)]);
    return NextResponse.json(paper, { headers: { "Cache-Control": "public, max-age=86400" } });
  } catch {
    return NextResponse.json(
      { error: "Couldn't fetch that paper from arXiv right now. Double-check the id, or try again in a moment." },
      { status: 502 }
    );
  }
}
