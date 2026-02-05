import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import TextReveal from '../../../components/common/TextReveal';
import './CareersHero.scss';

// Generate random positions for scattered dots
const generateScatteredDots = (count) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 18 + 14,
    });
  }
  return dots;
};

const scatteredDots = generateScatteredDots(20);

const CareersHero = () => {
  const heroRef = useRef(null);
  const labelRef = useRef(null);
  const dotsRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate dots
      const dots = dotsRef.current?.querySelectorAll('.careers-hero__dot');
      if (dots) {
        gsap.fromTo(dots,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: { each: 0.03, from: 'random' },
            ease: 'back.out(1.5)',
            delay: 0.3,
          }
        );
      }

      // Animate label
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );

      // Animate subtitle
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="careers-hero" ref={heroRef}>
      {/* Scattered Dots Background */}
      <div className="careers-hero__dots" ref={dotsRef}>
        {scatteredDots.map((dot) => (
          <span
            key={dot.id}
            className="careers-hero__dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
          />
        ))}
      </div>

      <div className="careers-hero__container">
        <span className="careers-hero__label" ref={labelRef}>
          Contribute
        </span>

        <TextReveal
          as="h1"
          className="careers-hero__title"
          type="words"
          stagger={0.04}
          duration={0.5}
          delay={0.6}
          trigger={false}
        >
          Join us in building tomorrow's digital solutions.
        </TextReveal>

        <p className="careers-hero__subtitle" ref={subtitleRef}>
          Be part of a team that values innovation and impact.
        </p>

        <Link to="/contact" className="careers-hero__cta" data-cursor-hover>
          <span>Join the team</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CareersHero;
