import { Link } from "react-router-dom";
import { signupParentFromPath } from "../../utils/signupBreadcrumb";

interface SignupBreadcrumbProps {
  from: string;
  assetName?: string | null;
  loading?: boolean;
}

export function SignupBreadcrumb({
  from,
  assetName,
  loading = false,
}: SignupBreadcrumbProps) {
  const parent = signupParentFromPath(from);
  const assetLabel = loading ? "Loading…" : assetName?.trim() || "Asset";

  return (
    <nav className="signup-breadcrumb" aria-label="Breadcrumb">
      <ol className="signup-breadcrumb__list">
        <li className="signup-breadcrumb__item">
          <Link className="signup-breadcrumb__link" to={parent.to}>
            {parent.label}
          </Link>
        </li>
        <li className="signup-breadcrumb__item">
          <span className="signup-breadcrumb__sep" aria-hidden="true">
            /
          </span>
          {loading || !assetName ? (
            <span className="signup-breadcrumb__text">{assetLabel}</span>
          ) : (
            <Link className="signup-breadcrumb__link" to={parent.to}>
              {assetLabel}
            </Link>
          )}
        </li>
        <li className="signup-breadcrumb__item">
          <span className="signup-breadcrumb__sep" aria-hidden="true">
            /
          </span>
          <span className="signup-breadcrumb__current" aria-current="page">
            Sign up
          </span>
        </li>
      </ol>
    </nav>
  );
}
