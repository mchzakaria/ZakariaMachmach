import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { rm, mkdir, writeFile } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const apiServerDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(apiServerDir, "../..");

async function buildVercelFunction() {
  const funcDir = path.resolve(rootDir, ".vercel/output/functions/api.func");
  
  // Clean and create directory
  await rm(funcDir, { recursive: true, force: true });
  await mkdir(funcDir, { recursive: true });

  // 1. Bundle the code
  await esbuild({
    entryPoints: [path.resolve(apiServerDir, "api/index.ts")],
    platform: "node",
    bundle: true,
    format: "esm",
    outdir: funcDir,
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
    external: [
      "*.node",
      "sharp",
      "better-sqlite3",
      "sqlite3",
      "canvas",
      "bcrypt",
      "argon2",
      "fsevents",
    ],
    sourcemap: "linked",
    plugins: [
      esbuildPluginPino({ transports: ["pino-pretty"] })
    ],
    banner: {
      js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    `,
    },
  });

  // 2. Write the .vc-config.json configuration
  const vcConfig = {
    runtime: "nodejs20.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    shouldAddHelpers: true
  };
  await writeFile(
    path.resolve(funcDir, ".vc-config.json"),
    JSON.stringify(vcConfig, null, 2)
  );

  console.log("Vercel Serverless Function built successfully at .vercel/output/functions/api.func");
}

buildVercelFunction().catch((err) => {
  console.error(err);
  process.exit(1);
});
