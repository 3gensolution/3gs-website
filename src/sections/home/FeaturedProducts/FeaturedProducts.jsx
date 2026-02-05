import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import TextReveal from '../../../components/common/TextReveal';
import './FeaturedProducts.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'awinfi',
    name: 'AwinFi',
    tagline: 'Unlocking crypto liquidity for everyone.',
    description: 'A digital lending platform that lets users deposit crypto assets and receive fiat cash — bridging the gap between digital and traditional finance.',
    colorScheme: 'coral', // coral/peach
  },
  {
    id: 'wiremi',
    name: 'Wiremi',
    tagline: 'Financial tools built for the modern world.',
    description: 'A fintech solution serving individuals and businesses with reliable, accessible financial infrastructure.',
    colorScheme: 'lavender', // lavender/purple
  },
  {
    id: 'genius-home',
    name: 'Genius Home',
    tagline: 'Education reimagined through technology.',
    description: 'A platform designed to support learning and knowledge accessibility, making education more engaging and effective.',
    colorScheme: 'mint', // mint/teal
  },
];

const FeaturedProducts = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section variant="light" id="products" className="featured-products-section">
      <div className="featured-products" ref={sectionRef}>
        {/* Statement Header */}
        <div className="featured-products__header">
          <TextReveal
            as="h2"
            className="featured-products__statement"
            type="words"
            stagger={0.02}
            duration={0.4}
          >
            This isn't our first build.
          </TextReveal>
          <TextReveal
            as="h2"
            className="featured-products__statement"
            type="words"
            stagger={0.02}
            duration={0.4}
          >
            Some products we're creating:
          </TextReveal>
        </div>

        {/* Product Cards */}
        <div className="featured-products__grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              className={`featured-products__card featured-products__card--${product.colorScheme}`}
            >
              {/* Geometric shapes */}
              <div className="featured-products__shapes">
                <div className="featured-products__shape featured-products__shape--1" />
                <div className="featured-products__shape featured-products__shape--2" />
              </div>

              <div className="featured-products__card-content">
                <h3 className="featured-products__name">
                  <span className="featured-products__name-highlight">{product.name}:</span>{' '}
                  <span className="featured-products__tagline">{product.tagline}</span>
                </h3>

                <span className="featured-products__cta">
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedProducts;
