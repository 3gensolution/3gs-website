import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './WhyUs.scss';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    id: 1,
    icon: '🏢',
    text: 'Enterprise-grade engineering standards',
  },
  {
    id: 2,
    icon: '🔒',
    text: 'Scalable and secure system design',
  },
  {
    id: 3,
    icon: '🎯',
    text: 'Product-focused mindset',
  },
  {
    id: 4,
    icon: '📈',
    text: 'Long-term support and growth readiness',
  },
  {
    id: 5,
    icon: '✨',
    text: 'Clean, future-oriented technology approach',
  },
];

const WhyUs = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.why-us__item');

    if (items) {
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
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
      <div className="why-us">
        <div className="why-us__content">
          <span className="why-us__label">Our Advantage</span>
          <h2 className="why-us__title">Why Work With Us</h2>
          <p className="why-us__subtitle">
            We bring together expertise, innovation, and commitment to deliver
            solutions that drive real business results.
          </p>
        </div>

        <ul className="why-us__list" ref={listRef}>
          {reasons.map((reason) => (
            <li key={reason.id} className="why-us__item">
              <span className="why-us__item-icon">{reason.icon}</span>
              <span className="why-us__item-text">{reason.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default WhyUs;
