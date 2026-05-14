import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.resolve(__dirname, "../data.json");

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
