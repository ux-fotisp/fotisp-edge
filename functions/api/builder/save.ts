// functions/api/builder/save.ts
// POST { slug, layout_json } → upserts page layout in D1

interface Env { DB: D1Database; }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const h = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  try {
    const { slug, layout_json, meta_json } = await request.json<any>();
    if (!slug || !layout_json) return Response.json({ error: 'Missing fields.' }, { status: 400, headers: h });
    await env.DB.prepare(
      `INSERT INTO pages (id, slug, title, layout_json, meta_json, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, unixepoch())
       ON CONFLICT(slug) DO UPDATE SET layout_json=excluded.layout_json, meta_json=excluded.meta_json, updated_at=unixepoch()`
    ).bind(crypto.randomUUID(), slug, slug, layout_json, meta_json || '{}').run();
    return Response.json({ success: true }, { headers: h });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500, headers: h });
  }
};
export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
