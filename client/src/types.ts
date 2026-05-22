/** Mirrors backend `src/types/index.ts`; dates are ISO strings from JSON. */

export type AssetType =
  | "Live Webinar"
  | "On-Demand Webinar"
  | "Whitepaper"
  | "on-demand podcast";

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  email: string;
}

export interface LeadGenAsset {
  id: string;
  name: string;
  description: string;
  executionDate?: string;
  expirationDate?: string;
  sponsorName: string;
  assetType: AssetType;
  speakers?: Person[];
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
}

export interface SignUpPayload {
  id: string;
  person: Person;
  signupDate: string;
  assetId: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorBody {
  error: string;
}

export const ASSET_TYPE_FILTERS: {
  label: string;
  value: AssetType | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Live webinar", value: "Live Webinar" },
  { label: "On-demand webinar", value: "On-Demand Webinar" },
  { label: "Whitepaper", value: "Whitepaper" },
  { label: "Podcast", value: "on-demand podcast" },
];
