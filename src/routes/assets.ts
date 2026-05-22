import { Router } from "express";
import * as assetController from "../controllers/assetController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// GET /assets — list all lead gen assets
router.get("/", asyncHandler(assetController.listAssets));

// POST /assets/:id/signup — sign up a person for a lead gen asset
router.post("/:id/signup", asyncHandler(assetController.signUp));

// GET /assets/:id — fetch all data for a specific lead gen asset
router.get("/:id", asyncHandler(assetController.getAsset));

export default router;
