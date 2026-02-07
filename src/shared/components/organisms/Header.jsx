import { Link } from "react-router-dom";
import "../../../styles/components/Header.css";

const NIKE_LOGO_URL = "/images/nike.png";

const SearchIcon = () => (
  <svg
    className="header-icon search-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M16 16l4 4" />
  </svg>
);

const HeartIcon = () => (
  <svg
    className="header-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BagIcon = () => (
  <svg
    className="header-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function Header() {
  const utilityLinks = [
    { label: "Find a Store", href: "#" },
    { label: "Help", href: "#" },
    { label: "Sign Up", to: "/signup" },
    { label: "Sign In", href: "/signin" },
  ];

  const navLinks = [
    { label: "New & Featured", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Kids", href: "#" },
    { label: "Sale", href: "#" },
  ];

  return (
    <header className="header">
      <div className="header-utility">
        <div className="header-utility-left">
          <a href="/" className="header-utility-logo" aria-label="Nike">
            <img
              src={NIKE_LOGO_URL}
              alt="Nike"
              className="header-logo-img header-logo-no-bg"
            />
          </a>
        </div>
        <nav className="header-utility-links" aria-label="Utility">
          {utilityLinks.map((link, i) => (
            <span key={link.label}>
              {link.to ? (
                <Link to={link.to}>{link.label}</Link>
              ) : (
                <a href={link.href}>{link.label}</a>
              )}
              {i < utilityLinks.length - 1 && <span className="sep">|</span>}
            </span>
          ))}
        </nav>
      </div>

      <div className="header-main">
        <div className="header-main-left" />

        <nav className="header-nav" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="header-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-search-wrap">
            <SearchIcon />
            <input
              type="search"
              className="header-search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <a href="#" className="header-action-icon" aria-label="Favorites">
            <HeartIcon />
          </a>
          <a href="#" className="header-action-icon" aria-label="Bag">
            <BagIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
