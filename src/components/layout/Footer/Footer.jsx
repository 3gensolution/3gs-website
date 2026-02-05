import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './Footer.scss';

gsap.registerPlugin(ScrollTrigger);

const AGENCY_URL = 'https://agency.3gensolutions.co.uk'; // External agency website

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const circleRef = useRef(null);
  const headlineRef = useRef(null);

  const navLinksLeft = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  const navLinksRight = [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Careers', path: '/contribute' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate circle
      gsap.fromTo(circleRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate headline
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 60%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__container">
        {/* Top Section - Nav and CTAs */}
        <div className="footer__top">
          <div className="footer__nav">
            <ul className="footer__nav-column">
              {navLinksLeft.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__nav-link" data-cursor-hover>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="footer__nav-column">
              {navLinksRight.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__nav-link" data-cursor-hover>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={AGENCY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__nav-link footer__nav-link--external"
                  data-cursor-hover
                >
                  Our Agency
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__ctas">
            <Link to="/contact" className="footer__cta footer__cta--outline" data-cursor-hover>
              Book a call
            </Link>
            <Link to="/contribute" className="footer__cta footer__cta--filled" data-cursor-hover>
              Join our team
            </Link>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="footer__circle" ref={circleRef} />

        {/* Large Headline */}
        <h2 className="footer__headline" ref={headlineRef}>
          Let's build the next big thing together.
        </h2>

        {/* Contact & Social Buttons */}
        <div className="footer__contact-row">
          <a
            href="mailto:hello@3gensolution.com"
            className="footer__contact-btn"
            data-cursor-hover
          >
            hello@3gensolution.com
          </a>
          <a
            href="https://x.com/AwinFiHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-btn"
            data-cursor-hover
          >
            TW
          </a>
          <a
            href="https://www.linkedin.com/company/3gensolution"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-btn"
            data-cursor-hover
          >
            IN
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} 3GS Solution
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
