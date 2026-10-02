import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './ProductBanner.scss';

gsap.registerPlugin(ScrollTrigger);

const ProductBanner = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate card
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section variant="light" className="product-banner-section">
      <div className="product-banner" ref={sectionRef}>
        {/* Header */}
        <div className="product-banner__header" ref={headerRef}>
          <span className="product-banner__label">Our Products</span>
          <h2 className="product-banner__title">Product making waves right now: 3Guide.</h2>
        </div>

        {/* Product Card */}
        <div
          className="product-banner__card"
          ref={cardRef}
        >
          {/* Geometric shapes */}
          <div className="product-banner__shapes">
            <div className="product-banner__shape product-banner__shape--1" />
            <div className="product-banner__shape product-banner__shape--2" />
            <div className="product-banner__shape product-banner__shape--3" />
          </div>

          <div className="product-banner__card-content">
            {/* Left: Live product preview and logo */}
            <div className="product-banner__image">
              <div className="product-banner__image-inner">
                <img
                  src="/3guide-preview.png"
                  alt="3Guide live product homepage"
                  className="product-banner__preview"
                />
                <div className="product-banner__logo-badge">
                  <img src="/guide-logo.jpeg" alt="3Guide logo" />
                  <span>3Guide</span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="product-banner__info">
              <span className="product-banner__tag">
                <span className="product-banner__tag-dot" />
                The digital adoption agent
              </span>

              <h3 className="product-banner__name">
                <span className="product-banner__name-highlight">Software should teach itself.</span>{' '}
                <span className="product-banner__name-tagline">3Guide makes that possible.</span>
              </h3>

              <p className="product-banner__description">
                3Guide is the intelligence layer for software adoption. It guides users step by step,
                answers questions in context, and reveals where adoption breaks down through analytics.
              </p>

              <a
                href="https://www.3guideai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="product-banner__cta"
              >
                Explore 3Guide →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductBanner;
