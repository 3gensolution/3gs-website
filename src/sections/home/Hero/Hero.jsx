import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '../../../components/ui/Button';
import ParticleBackground from '../../../components/three/ParticleBackground';
import './Hero.scss';

const Hero = ({ onContactClick }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    return () => tl.kill();
  }, []);

  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <ParticleBackground variant="network" particleCount={200} />

      <div className="hero__content">
        <h1 className="hero__title" ref={titleRef}>
          Building Digital Solutions
          <span className="hero__title-highlight"> for the Future</span>
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>
          We design, build, and scale innovative digital products and systems that
          power modern businesses and emerging industries.
        </p>

        <p className="hero__text" ref={textRef}>
          At 3GS Solution, we deliver secure, scalable, and future-ready technology
          solutions that help organizations transform ideas into reliable digital platforms.
        </p>

        <div className="hero__cta" ref={ctaRef}>
          <Button variant="primary" size="large" onClick={onContactClick}>
            Contact Us
          </Button>
          <Button variant="outline" size="large" onClick={scrollToSolutions}>
            Explore Our Solutions
          </Button>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
