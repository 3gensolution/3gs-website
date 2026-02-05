import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import CanvasBackground from '../../canvas/CanvasBackground';
import TextReveal from '../TextReveal';
import './PageHero.scss';

// Generate random positions for scattered dots
const generateScatteredDots = (count) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 12 + 8,
    });
  }
  return dots;
};

const PageHero = ({ title, subtitle, variant = 'default', label }) => {
  const heroRef = useRef(null);
  const labelRef = useRef(null);
  const subtitleRef = useRef(null);
  const dotsRef = useRef(null);

  const scatteredDots = useMemo(() => generateScatteredDots(15), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate dots
      const dots = dotsRef.current?.querySelectorAll('.page-hero__dot');
      if (dots && dots.length > 0) {
        gsap.fromTo(dots,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: { each: 0.05, from: 'random' },
            ease: 'back.out(1.5)',
            delay: 0.2,
          }
        );
      }

      if (labelRef.current) {
        tl.fromTo(labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const getCanvasVariant = () => {
    switch (variant) {
      case 'services':
        return 'grid';
      case 'projects':
        return 'particles';
      default:
        return 'gradient';
    }
  };

  return (
    <section className={`page-hero page-hero--${variant}`} ref={heroRef}>
      <CanvasBackground
        variant={getCanvasVariant()}
        particleCount={80}
      />

      {/* Animated Dots */}
      <div className="page-hero__dots" ref={dotsRef}>
        {scatteredDots.map((dot) => (
          <span
            key={dot.id}
            className="page-hero__dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              '--delay': dot.id,
            }}
          />
        ))}
      </div>

      <div className="page-hero__container">
        {label && (
          <span className="page-hero__label" ref={labelRef}>
            <span className="page-hero__label-icon">◆</span>
            {label}
          </span>
        )}
        <TextReveal
          as="h1"
          className="page-hero__title"
          type="words"
          stagger={0.04}
          duration={0.7}
          delay={0.4}
          trigger={false}
        >
          {title}
        </TextReveal>
        {subtitle && (
          <p className="page-hero__subtitle" ref={subtitleRef}>{subtitle}</p>
        )}
      </div>

      <div className="page-hero__gradient-bottom" />
    </section>
  );
};

export default PageHero;
