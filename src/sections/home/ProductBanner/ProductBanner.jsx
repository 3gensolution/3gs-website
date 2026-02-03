import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductBanner.scss';

gsap.registerPlugin(ScrollTrigger);

const ProductBanner = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const content = contentRef.current;

    gsap.fromTo(content,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: banner,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Pulse animation for the badge
    gsap.to('.product-banner__badge', {
      scale: 1.05,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleClick = () => {
    window.open('https://awinfi.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-banner" ref={bannerRef} onClick={handleClick}>
      <div className="product-banner__glow" />

      <div className="product-banner__container">
        <div className="product-banner__content" ref={contentRef}>
          <span className="product-banner__badge">
            <span className="product-banner__badge-icon">🚀</span>
            Product in Development
          </span>

          <div className="product-banner__info">
            <h3 className="product-banner__title">AwinFi</h3>
            <p className="product-banner__description">
              A crypto lending platform enabling users to deposit digital assets and
              access fiat liquidity with speed, security, and transparency.
            </p>
          </div>

          <div className="product-banner__cta">
            <span className="product-banner__cta-text">Visit AwinFi</span>
            <svg
              className="product-banner__cta-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="product-banner__decoration">
        <div className="product-banner__line product-banner__line--1" />
        <div className="product-banner__line product-banner__line--2" />
      </div>
    </div>
  );
};

export default ProductBanner;
