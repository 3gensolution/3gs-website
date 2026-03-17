import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import Button from '../../../components/ui/Button';
import TextReveal from '../../../components/common/TextReveal';
import './HowWeWork.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    text: 'Awinfi — Decentralized lending platform on Base blockchain',
  },
  {
    id: 2,
    text: 'Deposit crypto or cash and earn interest at your own rate',
  },
  {
    id: 3,
    text: 'Non-custodial, cross-chain, and fully transparent',
  },
  {
    id: 4,
    text: 'GuideAI — AI-powered insights and workflow automation for businesses',
  },
  {
    id: 5,
    text: 'Custom business support and smarter decision-making tools',
  },
];

const HowWeWork = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const asideRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate list items
      const items = listRef.current?.querySelectorAll('.how-we-work__item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate aside
      const asideElements = asideRef.current?.children;
      if (asideElements) {
        gsap.fromTo(asideElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: asideRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section variant="dark">
      <div className="how-we-work" ref={sectionRef}>
        <div className="how-we-work__content">
          <span className="how-we-work__label">
            <span className="how-we-work__label-icon">◆</span>
            Our Products
          </span>
          <TextReveal
            as="h2"
            className="how-we-work__title"
            type="words"
            stagger={0.04}
            duration={0.6}
          >
            What We're Building
          </TextReveal>
          <ul className="how-we-work__list" ref={listRef}>
            {products.map((product) => (
              <li key={product.id} className="how-we-work__item">
                <span className="how-we-work__item-number">
                  {String(product.id).padStart(2, '0')}
                </span>
                <span className="how-we-work__item-text">{product.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="how-we-work__aside" ref={asideRef}>
          <div className="how-we-work__card">
            <h3 className="how-we-work__card-title">Awinfi — Live Now</h3>
            <p className="how-we-work__card-text">
              Turn crypto or cash into earning power. A decentralized lending platform
              on Base — deposit, earn interest, or lend funds at your own rate.
              Non-custodial, cross-chain, and fully transparent.
            </p>
            <a href="https://app.awinfi.com/" target="_blank" rel="noopener noreferrer" className="how-we-work__card-link" data-cursor-hover>
              Try Awinfi →
            </a>
          </div>

          <div className="how-we-work__cta">
            <h3 className="how-we-work__cta-title">
              Experience Our Products Today
            </h3>
            <Button variant="primary" size="large" to="/contact" showArrow>
              Join GuideAI Waitlist
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowWeWork;
