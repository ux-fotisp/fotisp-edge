// functions/api/builder/load.ts
// GET ?slug=homepage → returns page layout JSON

interface Env { DB: D1Database; }

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const h = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };
  const slug = new URL(request.url).searchParams.get('slug');
  if (!slug) return Response.json({ error: 'Missing slug.' }, { status: 400, headers: h });
  try {
    const row = await env.DB.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first<any>();
    if (!row) return Response.json({ layout_json: null }, { headers: h });
    return Response.json({ layout_json: row.layout_json, meta_json: row.meta_json }, { headers: h });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500, headers: h });
  }
};
