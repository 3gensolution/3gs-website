import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import TextReveal from '../../../components/common/TextReveal';
import './ProjectsHero.scss';

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

const ProjectsHero = () => {
  const heroRef = useRef(null);
  const labelRef = useRef(null);
  const dotsRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate dots
      const dots = dotsRef.current?.querySelectorAll('.projects-hero__dot');
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
    <section className="projects-hero" ref={heroRef}>
      {/* Scattered Dots Background */}
      <div className="projects-hero__dots" ref={dotsRef}>
        {scatteredDots.map((dot) => (
          <span
            key={dot.id}
            className="projects-hero__dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
          />
        ))}
      </div>

      <div className="projects-hero__container">
        <span className="projects-hero__label" ref={labelRef}>
          Our Work
        </span>

        <TextReveal
          as="h1"
          className="projects-hero__title"
          type="words"
          stagger={0.04}
          duration={0.5}
          delay={0.6}
          trigger={false}
        >
          Products we're building for the future.
        </TextReveal>

        <p className="projects-hero__subtitle" ref={subtitleRef}>
          Digital platforms that solve real problems.
        </p>

        <Link to="/contact" className="projects-hero__cta" data-cursor-hover>
          <span>Work with us</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsHero;
