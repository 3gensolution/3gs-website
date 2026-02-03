import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import Button from '../../../components/ui/Button';
import './ProjectsContent.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'awinfi',
    name: 'AwinFi',
    status: 'In Development',
    statusColor: 'orange',
    description: 'A digital lending platform designed to unlock liquidity by allowing users to deposit crypto assets and receive fiat cash — combining accessibility with security.',
    features: [
      'Crypto-backed lending',
      'Fiat liquidity access',
      'Secure asset management',
      'Transparent operations',
    ],
    highlight: true,
  },
  {
    id: 'wiremi',
    name: 'Wiremi',
    status: 'Active',
    statusColor: 'blue',
    description: 'A fintech solution built to serve both individuals and businesses, providing reliable financial tools tailored to modern needs.',
    features: [
      'User-friendly interface',
      'Business-focused tools',
      'Secure transactions',
      'Modern financial services',
    ],
    highlight: false,
  },
  {
    id: 'genius-home',
    name: 'Genius Home',
    status: 'Active',
    statusColor: 'green',
    description: 'An education-focused digital platform designed to support learning, growth, and knowledge accessibility through technology.',
    features: [
      'Interactive learning',
      'Knowledge accessibility',
      'Growth-focused design',
      'Technology-driven education',
    ],
    highlight: false,
  },
];

const ProjectsContent = ({ onContactClick }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.projects-content__card');

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

  return (
    <Section variant="light">
      <div className="projects-content" ref={sectionRef}>
        <div className="projects-content__intro">
          <p>
            We build digital products that solve real problems and deliver measurable value.
            Each project represents our commitment to quality, innovation, and long-term thinking.
          </p>
        </div>

        <div className="projects-content__list">
          {products.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className={`projects-content__card projects-content__card--${product.statusColor} ${product.highlight ? 'projects-content__card--highlight' : ''}`}
            >
              <div className="projects-content__card-content">
                <div className="projects-content__card-header">
                  <h2 className="projects-content__card-name">{product.name}</h2>
                  <span className={`projects-content__card-status projects-content__card-status--${product.statusColor}`}>
                    {product.status}
                  </span>
                </div>

                <p className="projects-content__card-description">{product.description}</p>

                <div className="projects-content__card-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {product.id === 'awinfi' && (
                  <Button
                    href="https://awinfi.com"
                    external
                    variant="primary"
                    size="medium"
                  >
                    Visit AwinFi
                  </Button>
                )}
              </div>

              {product.highlight && (
                <div className="projects-content__card-badge">
                  <span>Featured Product</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="projects-content__cta">
          <h3>Have a Project in Mind?</h3>
          <p>
            Let's discuss how 3GS Solution can help bring your digital product vision to life.
          </p>
          <Button variant="primary" size="large" onClick={onContactClick}>
            Contact Us
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ProjectsContent;
