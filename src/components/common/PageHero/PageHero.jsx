import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CanvasBackground from '../../canvas/CanvasBackground';
import TextReveal from '../TextReveal';
import './PageHero.scss';

const PageHero = ({ title, subtitle, variant = 'default', label }) => {
  const heroRef = useRef(null);
  const labelRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

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
