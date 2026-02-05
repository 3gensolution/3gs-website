import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import TextReveal from '../../../components/common/TextReveal';
import './FeaturedProducts.scss';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'wiremi',
    name: 'Wiremi',
    tagline: 'Financial tools built for the modern world.',
    status: 'live',
    colorScheme: 'lavender',
  },
  {
    id: 'genius-home',
    name: 'Genius Home',
    tagline: 'Education reimagined through technology.',
    status: 'live',
    colorScheme: 'mint',
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
            Projects we've built for clients:
          </TextReveal>
        </div>

        {/* Project Cards */}
        <div className="featured-products__grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className={`featured-products__card featured-products__card--${project.colorScheme}`}
            >
              {/* Geometric shapes */}
              <div className="featured-products__shapes">
                <div className="featured-products__shape featured-products__shape--1" />
                <div className="featured-products__shape featured-products__shape--2" />
              </div>

              <div className="featured-products__card-content">
                {/* Top: Project Name */}
                <div className="featured-products__card-top">
                  <h3 className="featured-products__name">{project.name}</h3>
                  <p className="featured-products__tagline">{project.tagline}</p>
                </div>

                {/* Bottom: Status Tag */}
                <div className="featured-products__card-bottom">
                  <span className={`featured-products__status featured-products__status--${project.status}`}>
                    {project.status === 'coming-soon' ? 'Coming soon' : 'Live'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedProducts;
