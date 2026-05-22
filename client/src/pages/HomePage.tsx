import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAssets } from "../api/assets";
import { FeaturedAssets } from "../components/home/FeaturedAssets";
import { LoadingGrid } from "../components/discovery/LoadingGrid";
import type { LeadGenAsset } from "../types";
import { selectFeaturedAssets } from "../utils/featuredAssets";

export function HomePage() {
  const [featured, setFeatured] = useState<LeadGenAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const assets = await fetchAssets();
        if (!cancelled) {
          setFeatured(selectFeaturedAssets(assets, 3));
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : "Could not load featured content. Is the API running?"
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

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__inner">
          <h1 className="home-hero__title">
            Actionable insights for healthcare leaders
          </h1>
          <p className="home-hero__lede">
            Stay ahead of AI, workforce, operations, and care delivery trends
            through expert-led webinars, reports, and executive podcasts.
          </p>
          <div className="home-hero__actions">
            <Link to="/assets" className="bh-btn bh-btn--ghost home-hero__cta">
              Explore Insights
            </Link>
          </div>
        </div>
      </section>

      <div className="home-page__body">
        {loading && (
          <section className="home-featured home-featured--loading">
            <h2 className="bh-sect-title bh-sect-title--sm">Recently updated</h2>
            <LoadingGrid count={3} />
          </section>
        )}

        {!loading && error && (
          <div className="state-panel" role="alert">
            <h2 className="state-panel__title">Content temporarily unavailable</h2>
            <p className="state-panel__text">{error}</p>
            <Link to="/assets" className="bh-btn bh-btn--primary state-panel__action">
              Go to asset library
            </Link>
          </div>
        )}

        {!loading && !error && featured.length > 0 && (
          <FeaturedAssets assets={featured} />
        )}
      </div>
    </div>
  );
}
