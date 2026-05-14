import { Router, type IRouter } from "express";
import { db } from "@workspace/db";

const router: IRouter = Router();

router.get("/data", async (_req, res) => {
  try {
    const data = await db.query();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post("/data", async (req, res) => {
  try {
    await db.write(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to write data" });
  }
});

export default router;
