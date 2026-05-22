import type { LeadGenAsset } from "../../types";
import { assetTypeKickerClass, formatEventDate } from "../../utils/assetDisplay";
import { AssetTypeCategoryIcon } from "./AssetTypeCategoryIcon";

interface AssetSummaryProps {
  asset: LeadGenAsset;
}

function formatExpirationDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AssetSummary({ asset }: AssetSummaryProps) {
  const executionDate = formatEventDate(asset.executionDate);
  const expirationDate = formatExpirationDate(asset.expirationDate);

  return (
    <aside className="asset-summary" aria-labelledby="asset-summary-title">
      <div className="asset-summary__icon-wrap">
        <AssetTypeCategoryIcon
          assetType={asset.assetType}
          className="asset-summary__type-icon"
        />
      </div>
      <span
        className={`bh-kicker asset-summary__type ${assetTypeKickerClass(asset.assetType)}`}
      >
        {asset.assetType}
      </span>
      <h2 id="asset-summary-title" className="asset-summary__title">
        {asset.name}
      </h2>
      <p className="asset-summary__desc bh-small">{asset.description}</p>

      <dl className="asset-summary__details">
        <div className="asset-summary__row">
          <dt>Sponsor</dt>
          <dd>{asset.sponsorName}</dd>
        </div>
        {executionDate && (
          <div className="asset-summary__row">
            <dt>Live date</dt>
            <dd>{executionDate}</dd>
          </div>
        )}
        {expirationDate && (
          <div className="asset-summary__row">
            <dt>Available through</dt>
            <dd>{expirationDate}</dd>
          </div>
        )}
      </dl>

      {asset.speakers && asset.speakers.length > 0 && (
        <div className="asset-summary__speakers">
          <h3 className="asset-summary__speakers-title">Speakers</h3>
          <ul className="asset-summary__speaker-list">
            {asset.speakers.map((speaker) => (
              <li key={speaker.id} className="asset-summary__speaker">
                <span className="asset-summary__speaker-name">
                  {speaker.firstName} {speaker.lastName}
                </span>
                <span className="asset-summary__speaker-role">
                  {speaker.jobTitle}, {speaker.companyName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
