import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dataRouter from "./data";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dataRouter);
router.use(contactRouter);

export default router;
