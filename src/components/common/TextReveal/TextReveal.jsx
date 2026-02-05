import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './TextReveal.scss';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({
  children,
  as: Component = 'div',
  type = 'words', // 'chars', 'words', 'lines'
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  trigger = true,
  triggerStart = 'top 85%',
  className = '',
  animation = 'fadeUp', // 'fadeUp', 'fadeIn', 'reveal', 'slideUp'
  onComplete,
  ...props
}) => {
  const elementRef = useRef(null);
  const splitRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.style.opacity = 1;
      return;
    }

    try {
      // Create split text
      splitRef.current = new SplitType(element, {
        types: type === 'chars' ? 'chars,words' : type,
        tagName: 'span',
      });

      const targets = type === 'chars'
        ? splitRef.current.chars
        : type === 'words'
          ? splitRef.current.words
          : splitRef.current.lines;

      if (!targets || targets.length === 0) {
        element.style.opacity = 1;
        return;
      }

      // Set initial state based on animation type
      let fromVars = {};
      let toVars = {};

      switch (animation) {
        case 'fadeUp':
          fromVars = { opacity: 0, y: 30 };
          toVars = { opacity: 1, y: 0 };
          break;
        case 'fadeIn':
          fromVars = { opacity: 0 };
          toVars = { opacity: 1 };
          break;
        case 'reveal':
          fromVars = { yPercent: 100 };
          toVars = { yPercent: 0 };
          // Add overflow hidden to parent words/lines for reveal effect
          if (type === 'chars' && splitRef.current.words) {
            splitRef.current.words.forEach(word => {
              word.style.overflow = 'hidden';
              word.style.display = 'inline-block';
            });
          }
          break;
        case 'slideUp':
          fromVars = { opacity: 0, y: '100%' };
          toVars = { opacity: 1, y: '0%' };
          break;
        default:
          fromVars = { opacity: 0, y: 30 };
          toVars = { opacity: 1, y: 0 };
      }

      gsap.set(targets, fromVars);

      const animationConfig = {
        ...toVars,
        duration,
        stagger,
        ease,
        delay,
        onComplete,
      };

      if (trigger) {
        tweenRef.current = gsap.to(targets, {
          ...animationConfig,
          scrollTrigger: {
            trigger: element,
            start: triggerStart,
            toggleActions: 'play none none none',
          },
        });
      } else {
        tweenRef.current = gsap.to(targets, animationConfig);
      }
    } catch (error) {
      console.error('TextReveal error:', error);
      element.style.opacity = 1;
    }

    return () => {
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
      try {
        splitRef.current?.revert();
      } catch (e) {
        // Ignore revert errors
      }
    };
  }, [type, stagger, duration, delay, ease, trigger, triggerStart, animation, onComplete]);

  return (
    <Component
      ref={elementRef}
      className={`text-reveal text-reveal--${animation} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default TextReveal;
