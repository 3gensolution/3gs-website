import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.scss';

// Color themes that cycle during loading
const colorThemes = [
  { bg: '#FFFFFF', text: '#0A0A0A', dot: '#FF6B35' },  // White bg, black text, orange dot
  { bg: '#FF6B35', text: '#FFFFFF', dot: '#0A0A0A' },  // Orange bg, white text, black dot
  { bg: '#0A0A0A', text: '#FFFFFF', dot: '#FF6B35' },  // Black bg, white text, orange dot
];

const Loader = ({ onLoadComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const dotRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(0);

  useEffect(() => {
    // Text entrance animation
    gsap.fromTo(textRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Bouncing dot animation
    gsap.to(dotRef.current, {
      y: -8,
      duration: 0.4,
      ease: 'power2.out',
      yoyo: true,
      repeat: -1,
    });

    // Cycle through color themes
    const themeInterval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % colorThemes.length);
    }, 800);

    // Minimum loading time then exit
    const exitTimer = setTimeout(() => {
      clearInterval(themeInterval);

      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: onLoadComplete
      });
    }, 2400);

    return () => {
      clearInterval(themeInterval);
      clearTimeout(exitTimer);
    };
  }, [onLoadComplete]);

  const theme = colorThemes[currentTheme];

  return (
    <div
      className="loader"
      ref={loaderRef}
      style={{ backgroundColor: theme.bg }}
    >
      <div className="loader__content">
        <div className="loader__brand" ref={textRef}>
          <span className="loader__text" style={{ color: theme.text }}>
            3gs
          </span>
          <span
            className="loader__dot"
            ref={dotRef}
            style={{ backgroundColor: theme.dot }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
