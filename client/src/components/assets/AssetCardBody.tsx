import { Link } from "react-router-dom";
import type { LeadGenAsset } from "../../types";
import { assetTypeKickerClass, formatEventDate } from "../../utils/assetDisplay";
import { AssetTypeCategoryIcon } from "./AssetTypeCategoryIcon";

interface AssetCardBodyProps {
  asset: LeadGenAsset;
  headlineLevel: "h2" | "h3";
  signupPath: string;
  linkState: { from: string };
}

export function AssetCardBody({
  asset,
  headlineLevel,
  signupPath,
  linkState,
}: AssetCardBodyProps) {
  const eventDate = formatEventDate(asset.executionDate);
  const HeadlineTag = headlineLevel;

  return (
    <div className="bh-article__body">
      <div className="asset-card__meta-row">
        <span className="asset-card__type-label">
          <AssetTypeCategoryIcon assetType={asset.assetType} />
          <span className={`bh-kicker ${assetTypeKickerClass(asset.assetType)}`}>
            {asset.assetType}
          </span>
        </span>
        {eventDate && (
          <>
            <span className="asset-card__meta-sep" aria-hidden="true">
              {" "}
              -{" "}
            </span>
            <span className="asset-card__live-date">Live {eventDate}</span>
          </>
        )}
      </div>
      <HeadlineTag className="bh-article__headline">
        <Link to={signupPath} state={linkState} className="asset-card__title-link">
          {asset.name}
        </Link>
      </HeadlineTag>
      <p className="asset-card__desc">{asset.description}</p>
      <p className="asset-card__sponsor">Sponsored by {asset.sponsorName}</p>
      <Link
        to={signupPath}
        state={linkState}
        className="bh-btn bh-btn--primary bh-btn--sm asset-card__cta"
      >
        GET ACCESS
      </Link>
    </div>
  );
}
