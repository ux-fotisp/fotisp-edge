// functions/api/search.ts
// Static-first search via Pagefind WASM (built into /pagefind/ at build time)
// Falls back to D1 FTS for dynamic search

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim() || '';

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=60',
  };

  if (!q || q.length < 2) {
    return Response.json({ results: [], query: q }, { headers });
  }

  try {
    // D1 FTS query across posts table
    const stmt = env.DB.prepare(
      `SELECT p.id, p.slug, p.title, p.excerpt, p.published_at
       FROM posts_fts
       JOIN posts p ON posts_fts.rowid = p.rowid
       WHERE posts_fts MATCH ?
       ORDER BY rank
       LIMIT 10`
    );

    const { results } = await stmt.bind(q).all();

    return Response.json({
      results: results ?? [],
      query: q,
    }, { headers });
  } catch (err) {
    // If D1 isn't bound (dev), return empty
    return Response.json({ results: [], query: q, error: 'Search unavailable in dev mode.' }, { headers });
  }
};
