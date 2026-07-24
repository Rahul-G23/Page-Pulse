import express from "express";
import { auditPage } from "../controllers/auditController.js";

const router = express.Router();

router.post("/audit", auditPage);

export default router;