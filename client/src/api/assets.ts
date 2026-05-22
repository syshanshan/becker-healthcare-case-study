import { getJson } from "./client";
import type { LeadGenAsset } from "../types";

export function fetchAssets(): Promise<LeadGenAsset[]> {
  return getJson<LeadGenAsset[]>("/assets");
}

export function fetchAsset(id: string): Promise<LeadGenAsset> {
  return getJson<LeadGenAsset>(`/assets/${id}`);
}
