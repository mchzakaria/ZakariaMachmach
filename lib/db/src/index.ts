import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Robust path resolution for data.json
function resolveDataFile() {
  const candidates = new Set<string>();
  const searchRoots = [process.cwd(), __dirname];

  for (const root of searchRoots) {
    let current = path.resolve(root);

    for (let i = 0; i < 8; i++) {
      candidates.add(path.resolve(current, "lib/db/data.json"));
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }

  candidates.add(path.resolve(__dirname, "../data.json")); // Source package fallback

  for (const p of candidates) {
    if (existsSync(p)) {
      return p;
    }
  }
  return Array.from(candidates)[0]; // Fallback to default
}

const DATA_FILE = resolveDataFile();

// Ensure data file exists
async function init() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ posts: [] }, null, 2));
  }
}

init();

export const db = {
  query: async () => {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  },
  write: async (data: any) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }
};

export * from "./schema";
