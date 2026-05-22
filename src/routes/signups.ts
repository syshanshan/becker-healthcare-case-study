import { Router } from "express";
import * as assetController from "../controllers/assetController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// GET /signups — list all signups
router.get("/", asyncHandler(assetController.listSignups));

export default router;
