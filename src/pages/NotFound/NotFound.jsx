import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import ParticleBackground from '../../components/three/ParticleBackground';
import Button from '../../components/ui/Button';
import './NotFound.scss';

const NotFound = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('.not-found__code',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.not-found__title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.not-found__text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo('.not-found__actions',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="not-found">
      <ParticleBackground variant="network" particleCount={100} />

      <div className="not-found__content" ref={contentRef}>
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__text">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="not-found__actions">
          <Button to="/" variant="primary" size="large">
            Back to Home
          </Button>
          <Button to="/contact" variant="outline" size="large">
            Contact Us
          </Button>
        </div>

        <div className="not-found__links">
          <p>Or try one of these pages:</p>
          <div className="not-found__links-list">
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/careers">Careers</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
