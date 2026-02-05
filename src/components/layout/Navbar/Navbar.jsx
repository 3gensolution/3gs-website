import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navbar.scss';

const navLinks = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Products' },
  { path: '/contribute', label: 'Contribute' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.5,
          ease: 'power4.out'
        });

        // Animate mobile links
        const links = mobileMenuRef.current.querySelectorAll('.mobile-menu__link');
        gsap.fromTo(links,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.2 }
        );

        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in'
        });
        document.body.style.overflow = '';
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 2.8 }
      );

      // Stagger animate nav links
      gsap.fromTo(linksRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 3.2 }
      );
    });

    return () => ctx.revert();
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
          <Link to="/" className="navbar__logo" data-cursor-hover>
            <img
              src="/3gs-light.png"
              alt="3GS Solution"
              className="navbar__logo-img"
            />
          </Link>

          <div className="navbar__links">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                ref={el => linksRef.current[index] = el}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                data-cursor-hover
              >
                <span className="navbar__link-text">{link.label}</span>
                <span className="navbar__link-line" />
              </NavLink>
            ))}
          </div>

          <div className="navbar__actions">
            <Link
              to="/contact"
              className="navbar__cta"
              data-cursor-hover
            >
              <span>Contact Us</span>
            </Link>

            <button
              className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              data-cursor-hover
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
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
      >
        <div className="mobile-menu__header">
          <Link to="/" className="mobile-menu__logo" onClick={closeMobileMenu}>
            <img
              src="/3gs-light.png"
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
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                }
                onClick={closeMobileMenu}
              >
                <span className="mobile-menu__link-number">0{navLinks.indexOf(link) + 1}</span>
                <span className="mobile-menu__link-text">{link.label}</span>
              </NavLink>
            ))}
          </div>

          <Link
            to="/contact"
            className="mobile-menu__cta"
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>

          <div className="mobile-menu__footer">
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
            <p className="mobile-menu__copyright">
              &copy; {new Date().getFullYear()} 3GS Solution
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`mobile-menu__overlay ${isMobileMenuOpen ? 'mobile-menu__overlay--visible' : ''}`}
        onClick={closeMobileMenu}
      />
    </>
  );
};

export default Navbar;
