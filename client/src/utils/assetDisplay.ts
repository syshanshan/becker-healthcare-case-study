import type { AssetType, LeadGenAsset } from "../types";

import eventsIcon from "@design/assets/icons/events.svg";
import podcastsIcon from "@design/assets/icons/podcasts.svg";
import webinarsIcon from "@design/assets/icons/webinars.svg";
import whitepapersIcon from "@design/assets/icons/whitepapers.svg";

const ICON_BY_TYPE: Record<AssetType, string> = {
  "Live Webinar": eventsIcon,
  "On-Demand Webinar": webinarsIcon,
  Whitepaper: whitepapersIcon,
  "on-demand podcast": podcastsIcon,
};

const CATEGORY_ICON_BY_TYPE: Record<AssetType, string> = {
  "Live Webinar": webinarsIcon,
  "On-Demand Webinar": webinarsIcon,
  Whitepaper: whitepapersIcon,
  "on-demand podcast": podcastsIcon,
};

export function assetTypeIcon(type: AssetType): string {
  return ICON_BY_TYPE[type] ?? webinarsIcon;
}

export function assetTypeCategoryIcon(type: AssetType): string {
  return CATEGORY_ICON_BY_TYPE[type] ?? eventsIcon;
}

const KICKER_CLASS_BY_TYPE: Record<AssetType, string> = {
  "Live Webinar": "asset-kicker--live-webinar",
  "On-Demand Webinar": "asset-kicker--on-demand-webinar",
  Whitepaper: "asset-kicker--whitepaper",
  "on-demand podcast": "asset-kicker--podcast",
};

export function assetTypeKickerClass(type: AssetType): string {
  return KICKER_CLASS_BY_TYPE[type] ?? "asset-kicker--on-demand-webinar";
}

export function formatEventDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function speakerByline(asset: LeadGenAsset): string | null {
  const speakers = asset.speakers;
  if (!speakers?.length) return null;
  const first = speakers[0];
  const name = `${first.firstName} ${first.lastName}`;
  if (speakers.length === 1) return name;
  return `${name} +${speakers.length - 1} more`;
}

export function matchesSearch(asset: LeadGenAsset, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    asset.name,
    asset.description,
    asset.sponsorName,
    asset.assetType,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}
