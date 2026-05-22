import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="bh-footer">
      <div className="bh-footer__inner">
        <div className="bh-footer__brand">
          <div className="bh-footer__contact">
            <h4>Contact us</h4>
            <a className="bh-footer__phone" href="tel:18004172035">
              1-800-417-2035
            </a>
            <a className="bh-footer__mail" href="mailto:becker@beckershealthcare.com">
              becker@beckershealthcare.com
            </a>
          </div>
        </div>
        <div className="bh-footer__col">
          <h4>Content library</h4>
          <ul>
            <li>
              <Link to="/assets">All assets</Link>
            </li>
            <li>
              <Link to="/assets">Live webinars</Link>
            </li>
            <li>
              <Link to="/assets">Whitepapers</Link>
            </li>
          </ul>
        </div>
        <div className="bh-footer__col">
          <h4>More resources</h4>
          <ul>
            {["Events", "Webinars", "Whitepapers", "Podcasts"].map((label) => (
              <li key={label}>
                <Link to="/assets">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bh-footer__col">
          <h4>About</h4>
          <ul>
            {["About Becker's", "Media kit", "Privacy policy"].map((label) => (
              <li key={label}>
                <a href="#">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bh-footer__legal">
        <span>Copyright © 2026 Becker&apos;s Healthcare. All rights reserved.</span>
      </div>
    </footer>
  );
}
