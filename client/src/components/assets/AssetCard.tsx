import { Link, useLocation } from "react-router-dom";
import type { LeadGenAsset } from "../../types";
import { AssetCardBody } from "./AssetCardBody";
import { AssetCardCover } from "./AssetCardCover";

interface AssetCardProps {
  asset: LeadGenAsset;
  coverImageSrc?: string;
}

export function AssetCard({ asset, coverImageSrc }: AssetCardProps) {
  const location = useLocation();
  const signupPath = `/assets/${asset.id}/signup`;
  const linkState = { from: `${location.pathname}${location.search}` };

  return (
    <article className="bh-article asset-card">
      <Link
        to={signupPath}
        state={linkState}
        className="asset-card__cover-link"
        aria-hidden
        tabIndex={-1}
      >
        <AssetCardCover assetType={asset.assetType} coverImageSrc={coverImageSrc} />
      </Link>
      <AssetCardBody
        asset={asset}
        headlineLevel="h2"
        signupPath={signupPath}
        linkState={linkState}
      />
    </article>
  );
}
