import { Request, Response } from "express";
import * as assetService from "../services/assetService";
import {
  ApiError,
  ApiResponse,
  LeadGenAsset,
  Person,
  SignUpPayload,
} from "../types";

export async function listAssets(
  req: Request,
  res: Response<ApiResponse<LeadGenAsset[]> | ApiError>
): Promise<void> {
  const assets = await assetService.listAssets();
  res.json({ data: assets });
}

export async function listSignups(
  _req: Request,
  res: Response<ApiResponse<SignUpPayload[]> | ApiError>
): Promise<void> {
  const signupList = await assetService.listSignups();
  res.json({ data: signupList });
}

export async function getAsset(
  req: Request,
  res: Response<ApiResponse<LeadGenAsset> | ApiError>
): Promise<void> {
  const asset = await assetService.getAssetById(
    decodeURIComponent(req.params.id as string)
  );
  if (!asset) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }
  res.json({ data: asset });
}

export async function signUp(
  req: Request,
  res: Response<ApiResponse<SignUpPayload> | ApiError>
): Promise<void> {
  const body = req.body as { person?: Person } | undefined;
  const person = body?.person;
  if (!person) {
    res.status(400).json({ error: "person is required" });
    return;
  }
  const signup = await assetService.signUpForAsset(
    decodeURIComponent(req.params.id as string),
    person
  );
  res.status(201).json({ data: signup });
}
