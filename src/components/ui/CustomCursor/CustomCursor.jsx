import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.scss';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        document.body.classList.add('custom-cursor-active');
        gsap.set(cursor, { x: mouseX, y: mouseY });
        gsap.set(cursorDot, { x: mouseX, y: mouseY });
        cursorX = mouseX;
        cursorY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove('custom-cursor-active');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animate cursor with smooth follow
    const animateCursor = () => {
      // Cursor ring follows with easing
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });

      // Cursor dot follows faster
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      gsap.set(cursorDot, { x: dotX, y: dotY });

      requestAnimationFrame(animateCursor);
    };

    // Handle hover states
    const handleElementMouseEnter = (e) => {
      const target = e.target;

      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);

        const cursorTextAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (cursorTextAttr) {
          setCursorText(cursorTextAttr);
        }
      }
    };

    const handleElementMouseLeave = (e) => {
      const target = e.target;

      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementMouseEnter);
    document.addEventListener('mouseout', handleElementMouseLeave);

    const animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementMouseEnter);
      document.removeEventListener('mouseout', handleElementMouseLeave);
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'custom-cursor--visible' : ''} ${isHovering ? 'custom-cursor--hovering' : ''}`}
      >
        {cursorText && <span className="custom-cursor__text">{cursorText}</span>}
      </div>
      <div
        ref={cursorDotRef}
        className={`custom-cursor__dot ${isVisible ? 'custom-cursor__dot--visible' : ''} ${isHovering ? 'custom-cursor__dot--hovering' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
