import fs from 'node:fs';
import path from 'node:path';

const wranglerPath = path.resolve('dist/server/wrangler.json');

if (fs.existsSync(wranglerPath)) {
  try {
    const raw = fs.readFileSync(wranglerPath, 'utf-8');
    const config = JSON.parse(raw);
    let modified = false;

    // 1. Remove reserved ASSETS binding for Cloudflare Pages compatibility
    if (config.assets && config.assets.binding) {
      delete config.assets.binding;
      modified = true;
    }

    // 2. Filter out placeholder KV namespaces
    if (Array.isArray(config.kv_namespaces)) {
      const initialLen = config.kv_namespaces.length;
      config.kv_namespaces = config.kv_namespaces.filter(
        (kv) => !kv.id || !kv.id.startsWith('REPLACE_WITH_')
      );
      if (config.kv_namespaces.length !== initialLen) modified = true;
    }

    // 3. Filter out placeholder D1 databases
    if (Array.isArray(config.d1_databases)) {
      const initialLen = config.d1_databases.length;
      config.d1_databases = config.d1_databases.filter(
        (db) => !db.database_id || !db.database_id.startsWith('REPLACE_WITH_')
      );
      if (config.d1_databases.length !== initialLen) modified = true;
    }

    // 4. Remove unprovisioned R2 buckets if R2 is not activated on account
    if (Array.isArray(config.r2_buckets) && config.r2_buckets.length > 0) {
      // Clear unprovisioned R2 bucket reference to prevent API 10042 error
      delete config.r2_buckets;
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
      console.log('✅ [POSTBUILD FIX] Cleaned up wrangler.json bindings (ASSETS binding, placeholder KV/D1, unprovisioned R2)');
    }
  } catch (err) {
    console.error('⚠️ [POSTBUILD FIX] Error cleaning dist/server/wrangler.json:', err);
  }
}
