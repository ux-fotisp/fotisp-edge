import fs from 'node:fs';
import path from 'node:path';

const wranglerPath = path.resolve('dist/server/wrangler.json');

if (fs.existsSync(wranglerPath)) {
  try {
    const raw = fs.readFileSync(wranglerPath, 'utf-8');
    const config = JSON.parse(raw);
    if (config.assets && config.assets.binding) {
      delete config.assets.binding;
      fs.writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
      console.log('✅ [POSTBUILD FIX] Successfully removed conflicting "binding": "ASSETS" from dist/server/wrangler.json');
    }
  } catch (err) {
    console.error('⚠️ [POSTBUILD FIX] Error cleaning dist/server/wrangler.json:', err);
  }
}
