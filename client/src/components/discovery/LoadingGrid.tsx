interface LoadingGridProps {
  count?: number;
}

export function LoadingGrid({ count = 6 }: LoadingGridProps) {
  return (
    <div className="loading-grid" aria-busy="true" aria-label="Loading assets">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__cover" />
          <div className="skeleton-card__body">
            <div className="skeleton-line skeleton-line--sm" />
            <div className="skeleton-line skeleton-line--lg" />
            <div className="skeleton-line skeleton-line--md" />
            <div className="skeleton-line skeleton-line--md" style={{ width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
