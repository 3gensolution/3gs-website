import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Section from '../../../components/common/Section';
import './FeaturedProducts.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'awinfi',
    name: 'AwinFi',
    status: 'In Development',
    statusColor: 'orange',
    description: 'A digital lending platform designed to unlock liquidity by allowing users to deposit crypto assets and receive fiat cash — combining accessibility with security.',
    link: '/projects#awinfi',
  },
  {
    id: 'wiremi',
    name: 'Wiremi',
    status: 'Active',
    statusColor: 'blue',
    description: 'A fintech solution built to serve both individuals and businesses, providing reliable financial tools tailored to modern needs.',
    link: '/projects#wiremi',
  },
  {
    id: 'genius-home',
    name: 'Genius Home',
    status: 'Active',
    statusColor: 'green',
    description: 'An education-focused digital platform designed to support learning, growth, and knowledge accessibility through technology.',
    link: '/projects#genius-home',
  },
];

const FeaturedProducts = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.featured-products__card');

    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
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
      <div className="featured-products" ref={sectionRef}>
        <div className="featured-products__header">
          <span className="featured-products__label">Our Work</span>
          <h2 className="featured-products__title">Products We've Built & Are Building</h2>
        </div>

        <div className="featured-products__grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={product.link}
              className={`featured-products__card featured-products__card--${product.statusColor}`}
            >
              <div className="featured-products__card-header">
                <h3 className="featured-products__card-name">{product.name}</h3>
                <span className={`featured-products__card-status featured-products__card-status--${product.statusColor}`}>
                  {product.status}
                </span>
              </div>
              <p className="featured-products__card-description">{product.description}</p>
              <span className="featured-products__card-link">
                Learn more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedProducts;
