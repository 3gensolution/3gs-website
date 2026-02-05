import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TextReveal from '../../../components/common/TextReveal';
import './AboutHero.scss';

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

const AboutHero = () => {
  const heroRef = useRef(null);
  const labelRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate dots
      const shapes = dotsRef.current?.querySelectorAll('.about-hero__shape');
      if (shapes) {
        gsap.fromTo(shapes,
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-hero" ref={heroRef}>
      {/* Scattered Dots Background */}
      <div className="about-hero__shapes" ref={dotsRef}>
        {scatteredDots.map((dot) => (
          <div
            key={dot.id}
            className="about-hero__shape"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
          />
        ))}
      </div>

      <div className="about-hero__container">
        <span className="about-hero__label" ref={labelRef}>
          About 3GS
        </span>

        <TextReveal
          as="h1"
          className="about-hero__title"
          type="words"
          stagger={0.04}
          duration={0.5}
          delay={0.6}
          trigger={false}
        >
          On a mission to build reliable digital solutions that power businesses and communities.
        </TextReveal>
      </div>
    </section>
  );
};

export default AboutHero;
