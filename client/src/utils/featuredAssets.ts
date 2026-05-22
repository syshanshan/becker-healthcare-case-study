import type { LeadGenAsset } from "../types";

/** Pick the most recently updated assets for the homepage teaser. */
export function selectFeaturedAssets(
  assets: LeadGenAsset[],
  count = 3
): LeadGenAsset[] {
  return [...assets]
    .sort(
      (a, b) =>
        new Date(b.lastModifiedDate).getTime() -
        new Date(a.lastModifiedDate).getTime()
    )
    .slice(0, count);
}
