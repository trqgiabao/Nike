import { useState } from "react";
import "../../../styles/components/Footer.css";

const RESOURCES = [
  { label: "Find A Store", href: "#" },
  { label: "Become A Member", href: "#" },
  { label: "Running Shoe Finder", href: "#" },
  { label: "Nike Coaching", href: "#" },
  { label: "Send Us Feedback", href: "#" },
];

const HELP = [
  { label: "Get Help", href: "#" },
  { label: "Order Status", href: "#" },
  { label: "Delivery", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Payment Options", href: "#" },
  { label: "Contact Us", href: "#" },
];

const COMPANY = [
  { label: "About Nike", href: "#" },
  { label: "News", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Investors", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Impact", href: "#" },
  { label: "Report a Concern", href: "#" },
];

const LEGAL = [
  { label: "Terms of Sale", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Nike Privacy Policy", href: "#" },
  { label: "Privacy Settings", href: "#" },
];

function GlobeIcon() {
  return (
    <svg className="footer-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="footer-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Footer() {
  const [region, setRegion] = useState("Vietnam");
  const [guidesOpen, setGuidesOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-inner">
          <div className="footer-columns">
            <div className="footer-col">
              <h3 className="footer-title">Resources</h3>
              <ul className="footer-links">
                {RESOURCES.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-title">Help</h3>
              <ul className="footer-links">
                {HELP.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-links">
                {COMPANY.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-region">
              <button
                type="button"
                className="footer-region-btn"
                onClick={() => setRegion(region)}
                aria-label="Change country or region"
              >
                <GlobeIcon />
                <span>{region}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-inner">
          <div className="footer-bottom-content">
            <span className="footer-copy">© 2026 Nike, Inc. All rights reserved</span>
            <div className="footer-bottom-links">
              <button
                type="button"
                className="footer-guides-btn"
                onClick={() => setGuidesOpen(!guidesOpen)}
                aria-expanded={guidesOpen}
              >
                Guides
                <ChevronDownIcon />
              </button>
              {LEGAL.map((item) => (
                <a key={item.label} href={item.href} className="footer-legal-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
