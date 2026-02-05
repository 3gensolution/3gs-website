import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Default animation settings
export const defaultEase = 'power3.out';
export const defaultDuration = 0.8;

// Fade animations
export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: defaultDuration, ease: defaultEase },
};

export const fadeInUp = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0, duration: defaultDuration, ease: defaultEase },
};

export const fadeInDown = {
  from: { opacity: 0, y: -60 },
  to: { opacity: 1, y: 0, duration: defaultDuration, ease: defaultEase },
};

export const fadeInLeft = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0, duration: defaultDuration, ease: defaultEase },
};

export const fadeInRight = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0, duration: defaultDuration, ease: defaultEase },
};

// Scale animations
export const scaleIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1, duration: defaultDuration, ease: 'back.out(1.7)' },
};

// Reveal animations
export const revealUp = {
  from: { yPercent: 100 },
  to: { yPercent: 0, duration: 1, ease: 'power4.out' },
};

// Stagger presets
export const staggerFadeInUp = (stagger = 0.1) => ({
  from: { opacity: 0, y: 40 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: defaultEase,
    stagger,
  },
});

// Create scroll trigger animation
export const createScrollTrigger = (element, animation, options = {}) => {
  const defaults = {
    trigger: element,
    start: 'top 85%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
  };

  return gsap.fromTo(
    element,
    animation.from,
    {
      ...animation.to,
      scrollTrigger: { ...defaults, ...options },
    }
  );
};

// Batch scroll trigger for multiple elements
export const createBatchScrollTrigger = (elements, animation, stagger = 0.1) => {
  return gsap.fromTo(
    elements,
    animation.from,
    {
      ...animation.to,
      stagger,
      scrollTrigger: {
        trigger: elements[0]?.parentElement || elements[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Page transition animations
export const pageEnter = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
};

export const pageExit = {
  to: { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' },
};

// Hero animations
export const heroTitle = {
  from: { opacity: 0, y: 80, skewY: 3 },
  to: { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power4.out' },
};

export const heroSubtitle = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 },
};

export const heroCta = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 },
};

// Card hover animation
export const cardHover = {
  scale: 1.02,
  y: -8,
  duration: 0.3,
  ease: 'power2.out',
};

export const cardHoverReset = {
  scale: 1,
  y: 0,
  duration: 0.3,
  ease: 'power2.out',
};

// Split text animation helper
export const animateSplitText = (splitInstance, options = {}) => {
  const defaults = {
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.02,
    y: 40,
    opacity: 0,
  };

  const settings = { ...defaults, ...options };

  if (splitInstance.chars) {
    return gsap.from(splitInstance.chars, {
      y: settings.y,
      opacity: settings.opacity,
      duration: settings.duration,
      ease: settings.ease,
      stagger: settings.stagger,
    });
  }

  if (splitInstance.words) {
    return gsap.from(splitInstance.words, {
      y: settings.y,
      opacity: settings.opacity,
      duration: settings.duration,
      ease: settings.ease,
      stagger: settings.stagger * 3,
    });
  }

  if (splitInstance.lines) {
    return gsap.from(splitInstance.lines, {
      y: settings.y,
      opacity: settings.opacity,
      duration: settings.duration,
      ease: settings.ease,
      stagger: settings.stagger * 5,
    });
  }
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  revealUp,
  staggerFadeInUp,
  createScrollTrigger,
  createBatchScrollTrigger,
  pageEnter,
  pageExit,
  heroTitle,
  heroSubtitle,
  heroCta,
  cardHover,
  cardHoverReset,
  animateSplitText,
};
