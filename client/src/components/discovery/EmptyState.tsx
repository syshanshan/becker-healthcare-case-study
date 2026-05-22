interface EmptyStateProps {
  hasFilters: boolean;
  onClear: () => void;
}

export function EmptyState({ hasFilters, onClear }: EmptyStateProps) {
  return (
    <div className="state-panel" role="status">
      <h2 className="state-panel__title">
        {hasFilters ? "No assets match your filters" : "No assets available"}
      </h2>
      <p className="state-panel__text">
        {hasFilters
          ? "Try a different keyword or clear your filters to see the full catalog."
          : "Check back soon for new sponsored content from Becker's Healthcare."}
      </p>
      {hasFilters && (
        <button
          type="button"
          className="bh-btn bh-btn--ghost state-panel__action"
          onClick={onClear}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
