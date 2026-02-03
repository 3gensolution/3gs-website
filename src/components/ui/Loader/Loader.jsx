import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.scss';

const Loader = ({ onLoadComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: onLoadComplete
        });
      }
    });

    // Logo entrance
    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );

    // Text fade in
    tl.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    );

    // Progress animation
    tl.to({ value: 0 }, {
      value: 100,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].value));
      }
    }, '-=0.2');

    // Particles animation
    const particles = particlesRef.current?.querySelectorAll('.loader__particle');
    if (particles) {
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-100, 100),
          opacity: 0,
          duration: 2,
          delay: index * 0.1,
          repeat: -1,
          ease: 'power1.out'
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, [onLoadComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__background">
        <div className="loader__grid" />
        <div className="loader__gradient" />
      </div>

      <div className="loader__content">
        <div className="loader__particles" ref={particlesRef}>
          {[...Array(12)].map((_, i) => (
            <span key={i} className="loader__particle" />
          ))}
        </div>

        <div className="loader__logo" ref={logoRef}>
          <img
            src="/3gs-light.png"
            alt="3GS Solution"
            className="loader__logo-img"
          />
        </div>

        <div className="loader__progress-container">
          <div className="loader__progress" ref={progressRef}>
            <div
              className="loader__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="loader__text" ref={textRef}>
          Initializing digital systems
        </p>
      </div>

      <div className="loader__lines">
        <span className="loader__line loader__line--1" />
        <span className="loader__line loader__line--2" />
        <span className="loader__line loader__line--3" />
      </div>
    </div>
  );
};

export default Loader;
