import { readFileSync } from "fs";
import path from "path";

export default function handler(req: any, res: any) {
  try {
    const raw = readFileSync(
      path.join(process.cwd(), "lib", "db", "data.json"),
      "utf-8"
    );
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(raw);
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to load data" }));
  }
}
