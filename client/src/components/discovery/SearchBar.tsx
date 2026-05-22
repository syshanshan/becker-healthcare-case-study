interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-field">
      <label
        className="bh-sect-title bh-sect-title--sm search-field__label"
        htmlFor="asset-search"
      >
        Search assets
      </label>
      <div className="search-field__input-wrap">
        <svg
          className="search-field__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20L16 16" />
        </svg>
        <input
          id="asset-search"
          type="search"
          className="search-field__input"
          placeholder="Search by title, sponsor, or topic…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
