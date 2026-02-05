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
          <span className="product-banner__label">Featured Product</span>
          <h2 className="product-banner__title">Check out our latest product</h2>
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
            {/* Left: Image placeholder */}
            <div className="product-banner__image">
              <div className="product-banner__image-inner">
                <span className="product-banner__image-icon">💎</span>
                <span className="product-banner__image-text">AwinFi</span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="product-banner__info">
              <span className="product-banner__tag">
                <span className="product-banner__tag-dot" />
                Launching Soon
              </span>

              <h3 className="product-banner__name">
                <span className="product-banner__name-highlight">AwinFi:</span>{' '}
                <span className="product-banner__name-tagline">
                  Unlocking crypto liquidity for everyone.
                </span>
              </h3>

              <p className="product-banner__description">
                A digital lending platform that lets you deposit crypto assets and receive
                fiat cash instantly. Bridging the gap between digital and traditional finance
                with security and transparency at its core.
              </p>

              <span className="product-banner__cta">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductBanner;
