import { Link, useLocation } from "react-router-dom";
import type { LeadGenAsset } from "../../types";
import { AssetCardBody } from "./AssetCardBody";
import { AssetCardCover } from "./AssetCardCover";

interface AssetTeaserProps {
  asset: LeadGenAsset;
  coverImageSrc?: string;
}

export function AssetTeaser({ asset, coverImageSrc }: AssetTeaserProps) {
  const location = useLocation();
  const signupPath = `/assets/${asset.id}/signup`;
  const linkState = { from: `${location.pathname}${location.search}` };

  return (
    <article className="bh-article home-teaser">
      <Link
        to={signupPath}
        state={linkState}
        className="home-teaser__cover-link"
        aria-hidden
        tabIndex={-1}
      >
        <AssetCardCover assetType={asset.assetType} coverImageSrc={coverImageSrc} />
      </Link>
      <AssetCardBody
        asset={asset}
        headlineLevel="h3"
        signupPath={signupPath}
        linkState={linkState}
      />
    </article>
  );
}
