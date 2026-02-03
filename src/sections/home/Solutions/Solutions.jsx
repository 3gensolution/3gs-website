import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './Solutions.scss';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: 1,
    icon: '💻',
    title: 'Digital Product Development',
    description: 'We build secure, scalable digital products from concept to deployment, ensuring performance, reliability, and long-term maintainability.',
  },
  {
    id: 2,
    icon: '⚙️',
    title: 'Platform & System Engineering',
    description: 'Robust platforms and backend systems designed to support growth, integration, and evolving business requirements.',
  },
  {
    id: 3,
    icon: '🔧',
    title: 'Technology Consulting & Integration',
    description: 'Strategic guidance and implementation support to help businesses adopt, optimize, and integrate modern technologies seamlessly.',
  },
  {
    id: 4,
    icon: '📈',
    title: 'Infrastructure & Scalability Solutions',
    description: 'Systems architected for performance, resilience, and future expansion.',
  },
];

const Solutions = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.solutions__card');

    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.15,
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % solutions.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  return (
    <Section variant="dark" id="solutions">
      <div className="solutions" ref={sectionRef}>
        <div className="solutions__header">
          <span className="solutions__label">Our Solutions</span>
          <h2 className="solutions__title">What We Do</h2>
          <p className="solutions__subtitle">
            We provide end-to-end digital solutions designed to meet today's needs
            and tomorrow's opportunities.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="solutions__grid" ref={cardsRef}>
          {solutions.map((solution) => (
            <div key={solution.id} className="solutions__card">
              <span className="solutions__card-icon">{solution.icon}</span>
              <h3 className="solutions__card-title">{solution.title}</h3>
              <p className="solutions__card-description">{solution.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="solutions__carousel">
          <div
            className="solutions__carousel-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {solutions.map((solution) => (
              <div key={solution.id} className="solutions__carousel-card">
                <span className="solutions__card-icon">{solution.icon}</span>
                <h3 className="solutions__card-title">{solution.title}</h3>
                <p className="solutions__card-description">{solution.description}</p>
              </div>
            ))}
          </div>

          <div className="solutions__carousel-controls">
            <button
              className="solutions__carousel-btn"
              onClick={handlePrev}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="solutions__carousel-dots">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  className={`solutions__carousel-dot ${index === activeIndex ? 'solutions__carousel-dot--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="solutions__carousel-btn"
              onClick={handleNext}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Solutions;
