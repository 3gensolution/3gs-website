import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navbar.scss';

const navLinks = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/careers', label: 'Careers' },
];

const Navbar = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled state when leaving the hero section (100vh)
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.4,
          ease: 'power3.out'
        });
        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.3,
          ease: 'power3.in'
        });
        document.body.style.overflow = '';
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2.5 }
    );
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      >
        <div className="navbar__container">
          <Link to="/" className="navbar__logo">
            <img
              src="/3gs-light.png"
              alt="3GS Solution"
              className="navbar__logo-img"
            />
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="navbar__cta"
              onClick={onContactClick}
            >
              Contact Us
            </button>

            <button
              className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu"
      >
        <div className="mobile-menu__header">
          <Link to="/" className="mobile-menu__logo" onClick={closeMobileMenu}>
            <img
              src="/3gs-colored.jpeg"
              alt="3GS Solution"
            />
          </Link>
          <button
            className="mobile-menu__close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mobile-menu__content">
          <div className="mobile-menu__links">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                }
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            className="mobile-menu__cta"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onContactClick();
            }}
          >
            Contact Us
          </button>

          <div className="mobile-menu__social">
            <a
              href="https://www.linkedin.com/company/3gensolution"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu__social-link"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/AwinFiHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu__social-link"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu__overlay"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Navbar;
