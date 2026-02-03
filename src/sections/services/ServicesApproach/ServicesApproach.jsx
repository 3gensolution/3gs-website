import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import Button from '../../../components/ui/Button';
import './ServicesApproach.scss';

gsap.registerPlugin(ScrollTrigger);

const approaches = [
  'Business-aligned solution design',
  'Clean and maintainable system architecture',
  'Security-first mindset',
  'Performance-driven development',
  'Continuous improvement and optimization',
];

const ServicesApproach = ({ onContactClick }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.services-approach__item');

    if (items) {
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section variant="dark">
      <div className="services-approach" ref={sectionRef}>
        <div className="services-approach__content">
          <span className="services-approach__label">Our Method</span>
          <h2 className="services-approach__title">Our Approach to Delivery</h2>
          <ul className="services-approach__list">
            {approaches.map((approach, index) => (
              <li key={index} className="services-approach__item">
                <span className="services-approach__item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="services-approach__item-text">{approach}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="services-approach__cta">
          <h3 className="services-approach__cta-title">
            Let's Build the Right Solution Together
          </h3>
          <p className="services-approach__cta-text">
            Whether you're building a new product or improving an existing system,
            our team is ready to help you move forward with confidence.
          </p>
          <Button variant="primary" size="large" onClick={onContactClick}>
            Contact Us
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ServicesApproach;
