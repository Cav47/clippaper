import { build } from "/home/paperclip/.paperclip/cli/current/node_modules/@paperclipai/server/node_modules/esbuild/lib/main.js";
const root = new URL(".", import.meta.url).pathname;
const base = { bundle: true, format: "esm", platform: "node", target: "node22", sourcemap: false, packages: "external" };
await build({ ...base, entryPoints: [root + "src/manifest.js"], outfile: root + "dist/manifest.js" });
await build({ ...base, entryPoints: [root + "src/worker.js"], outfile: root + "dist/worker.js" });
await build({ bundle: true, format: "esm", platform: "browser", target: "es2022", external: ["react", "@paperclipai/plugin-sdk/ui", "@paperclipai/shared"], entryPoints: [root + "src/ui.js"], outfile: root + "dist/ui/index.js" });
