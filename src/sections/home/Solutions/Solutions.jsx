import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './Solutions.scss';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: 1,
    title: 'For Individuals',
    subtitle: 'DECENTRALIZED FINANCE',
    description: 'Deposit crypto or cash, earn interest, or lend funds to others at your own rate. Awinfi puts you in control of your assets.',
    bgColor: '#FF6B35', // Orange
    textColor: '#FFFFFF',
    dotColor: '#0A0A0A', // Black dots
    variant: 'orange',
  },
  {
    id: 2,
    title: 'For Businesses',
    subtitle: 'AI-POWERED TOOLS',
    description: 'AI tips & insights, workflow automation, and custom business support. GuideAI helps you make smarter decisions — coming soon.',
    bgColor: '#0A0A0A', // Black
    textColor: '#FFFFFF',
    dotColor: '#FF6B35', // Orange dots
    variant: 'dark',
  },
  {
    id: 3,
    title: 'How It Works',
    subtitle: 'SIMPLE AS 1-2-3',
    description: 'Learn what you need, sign up in minutes, and start using the product. Our tools are designed for fast onboarding and immediate value.',
    bgColor: '#FFFFFF', // White
    textColor: '#0A0A0A',
    dotColor: '#FF6B35', // Orange dots
    variant: 'light',
  },
  {
    id: 4,
    title: 'Why Choose Us',
    subtitle: 'PRODUCT FOCUSED',
    description: 'Powerful tools built with real users and businesses in mind — intuitive, secure, and scalable. We focus on outcomes, not just features.',
    bgColor: '#1A1A1A', // Dark grey
    textColor: '#FFFFFF',
    dotColor: '#FF6B35', // Orange dots
    variant: 'dark',
  },
];

const Solutions = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const panels = panelsRef.current;
    const container = containerRef.current;

    if (!container || panels.length === 0) return;

    const ctx = gsap.context(() => {
      // Pin each panel and create the stacking effect
      panels.forEach((panel, i) => {
        if (i < panels.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          });
        }

        // Animate content in
        const content = panel.querySelector('.solutions__panel-content');
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="solutions" ref={containerRef} id="solutions">
      {solutions.map((solution, index) => (
        <section
          key={solution.id}
          className={`solutions__panel solutions__panel--${solution.variant}`}
          ref={(el) => (panelsRef.current[index] = el)}
          style={{ backgroundColor: solution.bgColor }}
        >
          {/* Scattered Dots */}
          <div className="solutions__panel-dots">
            {[...Array(15)].map((_, i) => (
              <span
                key={i}
                className="solutions__panel-dot"
                style={{
                  backgroundColor: solution.dotColor,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 20 + 12}px`,
                  height: `${Math.random() * 20 + 12}px`,
                }}
              />
            ))}
          </div>

          <div className="solutions__panel-content">
            <span className="solutions__panel-number" style={{ color: solution.variant === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)' }}>
              {String(solution.id).padStart(2, '0')}
            </span>
            <span className="solutions__panel-subtitle" style={{ color: solution.variant === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)' }}>
              {solution.subtitle}
            </span>
            <h2 className="solutions__panel-title" style={{ color: solution.textColor }}>
              {solution.title}
            </h2>
            <p className="solutions__panel-description" style={{ color: solution.variant === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)' }}>
              {solution.description}
            </p>
          </div>
        </section>
      ))}

      {/* Final CTA Panel */}
      <section className="solutions__cta-panel">
        <div className="solutions__cta-content">
          <h2 className="solutions__cta-title">Ready to get started?</h2>
          <p className="solutions__cta-description">
            Explore our products and find the right solution for you.
          </p>
          <Link to="/projects" className="solutions__cta-link" data-cursor-hover>
            <span>Explore our products</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
