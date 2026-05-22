import { NavLink } from "react-router-dom";
import beckersLogo from "@design/assets/logos/beckers-hospital-review-logo.png";

export function SiteHeader() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <NavLink to="/" className="app-header__logo" end>
          <img
            src={beckersLogo}
            alt="Becker's Hospital Review"
            className="app-header__logo-img"
            width={320}
            height={72}
          />
        </NavLink>
        <nav className="app-header__nav" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `app-header__nav-item${isActive ? " is-active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/assets"
            className={({ isActive }) =>
              `app-header__nav-item${isActive ? " is-active" : ""}`
            }
          >
            Asset library
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
