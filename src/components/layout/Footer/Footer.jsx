import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Projects', path: '/projects' },
      { label: 'Careers', path: '/careers' },
    ],
    products: [
      { label: 'AwinFi', path: '/projects#awinfi', external: false },
      { label: 'Wiremi', path: '/projects#wiremi', external: false },
      { label: 'Genius Home', path: '/projects#genius-home', external: false },
    ],
    social: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/3gensolution' },
      { label: 'X (Twitter)', url: 'https://x.com/AwinFiHQ' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Section */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img
                src="/3gs-light.png"
                alt="3GS Solution"
                className="footer__logo-img"
              />
            </Link>
            <p className="footer__tagline">
              Delivering future-ready digital solutions.
            </p>
            <div className="footer__social">
              {footerLinks.social.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={link.label}
                >
                  {link.label === 'LinkedIn' ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="footer__section">
            <h4 className="footer__section-title">Company</h4>
            <ul className="footer__links">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div className="footer__section">
            <h4 className="footer__section-title">Products</h4>
            <ul className="footer__links">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer__section">
            <h4 className="footer__section-title">Get in Touch</h4>
            <p className="footer__text">
              Have a project in mind? Let's build something exceptional together.
            </p>
            <button className="footer__cta" onClick={onContactClick}>
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} 3GS Solution. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer__legal-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
