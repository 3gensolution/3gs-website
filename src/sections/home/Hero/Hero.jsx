import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import TextReveal from '../../../components/common/TextReveal';
import './Hero.scss';

// Slide data
const slides = [
  {
    id: 1,
    question: 'Build smarter digital products',
    answer: 'for people and businesses.',
    description: 'We create solutions that empower individuals and enterprises — from decentralized finance to AI tools for growth.',
    variant: 'scattered',
  },
];

// Generate random positions for scattered dots
const generateScatteredDots = (count) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 15 + 12,
    });
  }
  return dots;
};

const scatteredDots = generateScatteredDots(20);

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef(null);
  const slideRef = useRef(null);
  const dotsRef = useRef(null);
  const contentRef = useRef(null);
  const intervalRef = useRef(null);

  const animateSlideIn = useCallback(() => {
    if (!slideRef.current) return;

    const ctx = gsap.context(() => {
      // Animate slide container - scale up from center
      gsap.fromTo(slideRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );

      // Animate dots - bounce in randomly
      const dots = dotsRef.current?.querySelectorAll('.hero__dot');
      if (dots && dots.length > 0) {
        gsap.fromTo(dots,
          { scale: 0, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: { each: 0.04, from: 'random' },
            ease: 'back.out(2)',
            delay: 0.3,
          }
        );
      }

      // Animate content - fade up from center
      const content = contentRef.current;
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.5 }
        );
      }
    }, slideRef);

    return ctx;
  }, []);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);

    // Animate out current slide - zoom in and fade out
    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentSlide(index);
        gsap.set(slideRef.current, { opacity: 0, scale: 0.85 });
        setIsAnimating(false);
      },
    });
  }, [currentSlide, isAnimating]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }, [currentSlide, goToSlide]);

  // Auto-advance slides
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(intervalRef.current);
  }, [nextSlide]);

  // Animate on slide change
  useEffect(() => {
    const ctx = animateSlideIn();
    return () => ctx?.revert();
  }, [currentSlide, animateSlideIn]);

  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlideData = slides[currentSlide];

  const renderDots = () => {
    switch (currentSlideData.variant) {
      case 'horizontal':
        return (
          <div className="hero__dots hero__dots--horizontal" ref={dotsRef}>
            {[...Array(18)].map((_, i) => (
              <span key={i} className="hero__dot" />
            ))}
          </div>
        );
      case 'grid':
        return (
          <div className="hero__dots hero__dots--grid" ref={dotsRef}>
            {[...Array(16)].map((_, i) => (
              <span key={i} className="hero__dot" />
            ))}
          </div>
        );
      case 'diagonal':
        return (
          <div className="hero__dots hero__dots--diagonal" ref={dotsRef}>
            {[...Array(12)].map((_, i) => (
              <span key={i} className="hero__dot" style={{ '--i': i }} />
            ))}
          </div>
        );
      default: // scattered
        return (
          <div className="hero__dots hero__dots--scattered" ref={dotsRef}>
            {scatteredDots.map((dot) => (
              <span
                key={dot.id}
                className="hero__dot"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__slide" ref={slideRef} key={currentSlide}>
        {/* Dots Background */}
        {renderDots()}

        <div className="hero__container">
          {/* Statement Section */}
          <div className="hero__statement">
            <div className="hero__question">
              <TextReveal
                as="h1"
                className="hero__question-text"
                type="words"
                stagger={0.03}
                duration={0.4}
                delay={0.3}
                trigger={false}
              >
                {currentSlideData.question}
              </TextReveal>
            </div>

            <div className="hero__answer">
              <TextReveal
                as="h2"
                className="hero__answer-text"
                type="words"
                stagger={0.03}
                duration={0.4}
                delay={0.5}
                trigger={false}
              >
                {currentSlideData.answer}
              </TextReveal>
            </div>
          </div>

          {/* Description & CTA */}
          <div className="hero__content" ref={contentRef}>
            <p className="hero__description">
              {currentSlideData.description}
            </p>
            <div className="hero__cta-buttons">
              <a href="https://app.awinfi.com/" target="_blank" rel="noopener noreferrer" className="hero__cta-link" data-cursor-hover>
                <span>Try Awinfi</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link to="/contact" className="hero__cta-link hero__cta-link--secondary" data-cursor-hover>
                <span>Get early access to GuideAI</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero__indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll" onClick={scrollToSolutions}>
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
