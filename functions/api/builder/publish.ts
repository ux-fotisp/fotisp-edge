// functions/api/builder/publish.ts
// POST { slug } → triggers a Cloudflare Pages deploy hook to rebuild static output

interface Env {
  PAGES_DEPLOY_HOOK?: string; // Set via Pages env var
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const h = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  const { slug } = await request.json<{ slug: string }>();

  if (!env.PAGES_DEPLOY_HOOK) {
    console.log('[DEV] Would trigger deploy for:', slug);
    return Response.json({ success: true, mode: 'dev', message: 'Deploy hook not configured — set PAGES_DEPLOY_HOOK env var.' }, { headers: h });
  }

  try {
    const res = await fetch(env.PAGES_DEPLOY_HOOK, { method: 'POST' });
    if (!res.ok) throw new Error(`Deploy hook returned ${res.status}`);
    return Response.json({ success: true, slug }, { headers: h });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500, headers: h });
  }
};
export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
