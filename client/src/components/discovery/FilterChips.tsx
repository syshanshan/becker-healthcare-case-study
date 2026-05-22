import { ASSET_TYPE_FILTERS, type AssetType } from "../../types";

interface FilterChipsProps {
  active: AssetType | "all";
  onChange: (value: AssetType | "all") => void;
}

export function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div className="filter-chips" role="group" aria-label="Filter by asset type">
      <span className="filter-chips__label">Type</span>
      {ASSET_TYPE_FILTERS.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          className={`filter-chip${active === value ? " is-active" : ""}`}
          aria-pressed={active === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
