import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsContent.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'awinfi',
    name: 'AwinFi',
    tagline: 'Decentralized Crypto Lending',
    description: 'Borrow against your crypto assets or earn yield by providing liquidity. No intermediaries, no credit checks.',
    status: 'In Development',
    url: 'https://awinfi.com',
    image: '/awinfi-preview.png',
    bgColor: '#0A1628',
  },
  {
    id: 'wiremi',
    name: 'Wiremi',
    tagline: 'Multi-Currency Accounts',
    description: 'Hold, convert, and manage multiple currencies in one powerful account. Perfect for global citizens.',
    status: 'Active',
    url: 'https://wiremi.com',
    image: '/wiremi-preview.png',
    bgColor: '#E8F4FC',
  },
  {
    id: 'genius-home',
    name: 'Genius Home',
    tagline: 'Education Platform',
    description: 'An education-focused digital platform designed to support learning and knowledge accessibility.',
    status: 'Active',
    url: '#',
    image: null,
    bgColor: '#1A1A1A',
  },
  {
    id: 'coming-soon',
    name: 'More Coming',
    tagline: 'Future Products',
    description: 'We\'re constantly building new digital products. Stay tuned for exciting launches.',
    status: 'Coming Soon',
    url: '/contact',
    image: null,
    bgColor: '#2D2D2D',
    isPlaceholder: true,
  },
];

const ProjectsContent = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const tooltipRef = useRef(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
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
              delay: index * 0.1,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth tooltip follow
  useEffect(() => {
    if (tooltipRef.current && activeProduct) {
      gsap.to(tooltipRef.current, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [mousePos, activeProduct]);

  const handleMouseMove = (e, product) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setActiveProduct(product);
  };

  const handleMouseLeave = () => {
    setActiveProduct(null);
  };

  return (
    <div className="projects-content" ref={sectionRef}>
      <div className="projects-content__grid">
        {products.map((product, index) => (
          <a
            key={product.id}
            href={product.url}
            target={product.url.startsWith('http') ? '_blank' : '_self'}
            rel={product.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`projects-content__card ${product.image ? 'projects-content__card--has-image' : ''}`}
            style={{ backgroundColor: product.bgColor }}
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, product)}
            onMouseLeave={handleMouseLeave}
            data-cursor-hover
          >
            {/* Background Image */}
            {product.image && (
              <div
                className="projects-content__card-image"
                style={{ backgroundImage: `url(${product.image})` }}
              />
            )}

            {/* Pattern for cards without images */}
            {!product.image && (
              <div className="projects-content__card-pattern" />
            )}

            {/* Status Badge */}
            <span className={`projects-content__card-status ${product.id === 'wiremi' ? 'projects-content__card-status--dark' : ''}`}>
              {product.status}
            </span>

            {/* Product Name */}
            <span className={`projects-content__card-name ${product.id === 'wiremi' ? 'projects-content__card-name--dark' : ''}`}>
              {product.name}
            </span>

            {/* Mouse-following Tooltip */}
            {activeProduct?.id === product.id && (
              <div
                className="projects-content__tooltip"
                ref={tooltipRef}
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                }}
              >
                <span className="projects-content__tooltip-tagline">{product.tagline}</span>
                <p className="projects-content__tooltip-description">{product.description}</p>
                <span className="projects-content__tooltip-cta">
                  {product.isPlaceholder ? 'Get in Touch' : 'Visit Site'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
