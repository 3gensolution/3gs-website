import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import Button from '../../../components/ui/Button';
import TextReveal from '../../../components/common/TextReveal';
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
            Our Process
          </span>
          <TextReveal
            as="h2"
            className="how-we-work__title"
            type="words"
            stagger={0.04}
            duration={0.6}
          >
            How We Work
          </TextReveal>
          <ul className="how-we-work__list" ref={listRef}>
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

        <div className="how-we-work__aside" ref={asideRef}>
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
            <Button variant="primary" size="large" to="/contact" showArrow>
              Start a Conversation
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowWeWork;
