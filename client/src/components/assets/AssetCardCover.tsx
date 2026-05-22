import type { AssetType } from "../../types";
import { assetTypeIcon } from "../../utils/assetDisplay";

interface AssetCardCoverProps {
  assetType: AssetType;
  coverImageSrc?: string;
}

export function AssetCardCover({ assetType, coverImageSrc }: AssetCardCoverProps) {
  return (
    <div
      className={`bh-article__cover asset-card__cover${
        coverImageSrc ? " asset-card__cover--photo" : ""
      }`}
    >
      {coverImageSrc ? (
        <img className="asset-card__cover-photo" src={coverImageSrc} alt="" />
      ) : (
        <div className="asset-card__cover-inner">
          <img
            className="asset-card__cover-icon"
            src={assetTypeIcon(assetType)}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
