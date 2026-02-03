import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticleBackground from '../../three/ParticleBackground';
import './PageHero.scss';

const PageHero = ({ title, subtitle, variant = 'default' }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    );

    return () => tl.kill();
  }, []);

  return (
    <section className={`page-hero page-hero--${variant}`}>
      <ParticleBackground
        variant={variant === 'services' ? 'grid' : 'default'}
        particleCount={150}
      />

      <div className="page-hero__container">
        <h1 className="page-hero__title" ref={titleRef}>{title}</h1>
        {subtitle && (
          <p className="page-hero__subtitle" ref={subtitleRef}>{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
