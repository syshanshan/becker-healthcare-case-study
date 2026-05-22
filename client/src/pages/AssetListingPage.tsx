import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAssets } from "../api/assets";
import { AssetCard } from "../components/assets/AssetCard";
import { EmptyState } from "../components/discovery/EmptyState";
import { FilterChips } from "../components/discovery/FilterChips";
import { LoadingGrid } from "../components/discovery/LoadingGrid";
import { SearchBar } from "../components/discovery/SearchBar";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { ASSET_TYPE_FILTERS, type AssetType, type LeadGenAsset } from "../types";
import { matchesSearch } from "../utils/assetDisplay";
import { assetCoverImage } from "../utils/assetCoverImage";

export function AssetListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [assets, setAssets] = useState<LeadGenAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get("q") ?? "";
  const rawType = searchParams.get("type");
  const typeFilter: AssetType | "all" =
    rawType &&
    ASSET_TYPE_FILTERS.some((f) => f.value !== "all" && f.value === rawType)
      ? (rawType as AssetType)
      : "all";
  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAssets();
        if (!cancelled) setAssets(data);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : "Could not load assets. Is the API running on port 3000?"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return assets.filter((asset) => {
      if (typeFilter !== "all" && asset.assetType !== typeFilter) return false;
      return matchesSearch(asset, debouncedSearch);
    });
  }, [assets, typeFilter, debouncedSearch]);

  const hasActiveFilters =
    typeFilter !== "all" || debouncedSearch.trim().length > 0;

  function setSearch(value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set("q", value);
        else next.delete("q");
        return next;
      },
      { replace: true }
    );
  }

  function setTypeFilter(value: AssetType | "all") {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === "all") next.delete("type");
        else next.set("type", value);
        return next;
      },
      { replace: true }
    );
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  return (
    <div className="listing-page">
      <div className="listing-page__body">
        <div className="listing-toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <FilterChips active={typeFilter} onChange={setTypeFilter} />
        </div>

        {loading && <LoadingGrid />}

        {!loading && error && (
          <div className="state-panel" role="alert">
            <h2 className="state-panel__title">Unable to load assets</h2>
            <p className="state-panel__text">{error}</p>
            <button
              type="button"
              className="bh-btn bh-btn--primary state-panel__action"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="listing-meta" aria-live="polite">
              {filtered.length === assets.length
                ? `Showing ${filtered.length} asset${filtered.length === 1 ? "" : "s"}`
                : `Showing ${filtered.length} of ${assets.length} assets`}
            </p>

            {filtered.length === 0 ? (
              <EmptyState hasFilters={hasActiveFilters} onClear={clearFilters} />
            ) : (
              <div className="assets-grid">
                {filtered.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    coverImageSrc={assetCoverImage(asset)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
