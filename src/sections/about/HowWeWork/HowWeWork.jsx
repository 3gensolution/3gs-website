import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import Button from '../../../components/ui/Button';
import './HowWeWork.scss';

gsap.registerPlugin(ScrollTrigger);

const workPrinciples = [
  {
    id: 1,
    text: 'We prioritize clarity and structure before execution',
  },
  {
    id: 2,
    text: 'We design systems with scalability in mind',
  },
  {
    id: 3,
    text: 'We focus on security, performance, and maintainability',
  },
  {
    id: 4,
    text: 'We collaborate closely to ensure alignment with business goals',
  },
  {
    id: 5,
    text: 'We build with long-term growth in focus',
  },
];

const HowWeWork = ({ onContactClick }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.how-we-work__item');

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
      <div className="how-we-work" ref={sectionRef}>
        <div className="how-we-work__content">
          <span className="how-we-work__label">Our Process</span>
          <h2 className="how-we-work__title">How We Work</h2>
          <ul className="how-we-work__list">
            {workPrinciples.map((principle) => (
              <li key={principle.id} className="how-we-work__item">
                <span className="how-we-work__item-number">
                  {String(principle.id).padStart(2, '0')}
                </span>
                <span className="how-we-work__item-text">{principle.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="how-we-work__aside">
          <div className="how-we-work__card">
            <h3 className="how-we-work__card-title">What Sets Us Apart</h3>
            <p className="how-we-work__card-text">
              At 3GS Solution, we don't just build software — we build systems designed
              to grow, adapt, and perform reliably in real-world conditions. Our
              product-driven mindset ensures every solution delivers measurable value,
              not just functionality.
            </p>
          </div>

          <div className="how-we-work__cta">
            <h3 className="how-we-work__cta-title">
              Partner With a Team That Builds for the Future
            </h3>
            <Button variant="primary" size="large" onClick={onContactClick}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowWeWork;
