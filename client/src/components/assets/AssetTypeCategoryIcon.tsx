import type { AssetType } from "../../types";
import { assetTypeCategoryIcon } from "../../utils/assetDisplay";

interface AssetTypeCategoryIconProps {
  assetType: AssetType;
  className?: string;
}

export function AssetTypeCategoryIcon({
  assetType,
  className,
}: AssetTypeCategoryIconProps) {
  const icon = assetTypeCategoryIcon(assetType);

  return (
    <span
      className={["asset-card__type-icon", className].filter(Boolean).join(" ")}
      aria-hidden
      style={{
        WebkitMaskImage: `url("${icon}")`,
        maskImage: `url("${icon}")`,
      }}
    />
  );
}
