import { Link } from "react-router-dom";
import { AssetTeaser } from "../assets/AssetTeaser";
import type { LeadGenAsset } from "../../types";
import { assetCoverImage } from "../../utils/assetCoverImage";

interface FeaturedAssetsProps {
  assets: LeadGenAsset[];
}

export function FeaturedAssets({ assets }: FeaturedAssetsProps) {
  return (
    <section className="home-featured" aria-labelledby="home-featured-title">
      <div className="home-featured__header">
        <h2 id="home-featured-title" className="bh-sect-title bh-sect-title--sm">
          Recently updated
        </h2>
        <Link to="/assets" className="bh-view-all-link">
          View all assets
        </Link>
      </div>
      <div className="home-featured__grid">
        {assets.map((asset) => (
          <AssetTeaser
            key={asset.id}
            asset={asset}
            coverImageSrc={assetCoverImage(asset)}
          />
        ))}
      </div>
    </section>
  );
}
