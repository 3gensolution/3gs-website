import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import TextReveal from '../../../components/common/TextReveal';
import './WhyUs.scss';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    id: 1,
    icon: '🏢',
    title: 'Enterprise Standards',
    text: 'Enterprise-grade engineering standards and best practices',
  },
  {
    id: 2,
    icon: '🔒',
    title: 'Secure & Scalable',
    text: 'Scalable and secure system design from day one',
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Product Focus',
    text: 'Product-focused mindset driving every decision',
  },
  {
    id: 4,
    icon: '📈',
    title: 'Growth Ready',
    text: 'Long-term support and growth readiness built-in',
  },
  {
    id: 5,
    icon: '✨',
    title: 'Future Tech',
    text: 'Clean, future-oriented technology approach',
  },
];

const WhyUs = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate items with stagger
      const items = listRef.current?.querySelectorAll('.why-us__item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, x: -40 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section variant="dark">
      <div className="why-us" ref={sectionRef}>
        <div className="why-us__content" ref={contentRef}>
          <span className="why-us__label">
            <span className="why-us__label-icon">◆</span>
            Our Advantage
          </span>
          <TextReveal
            as="h2"
            className="why-us__title"
            type="words"
            stagger={0.03}
            duration={0.6}
          >
            Why Work With Us
          </TextReveal>
          <p className="why-us__subtitle">
            We bring together expertise, innovation, and commitment to deliver
            solutions that drive real business results.
          </p>
        </div>

        <ul className="why-us__list" ref={listRef}>
          {reasons.map((reason) => (
            <li key={reason.id} className="why-us__item">
              <span className="why-us__item-icon">{reason.icon}</span>
              <div className="why-us__item-content">
                <span className="why-us__item-title">{reason.title}</span>
                <span className="why-us__item-text">{reason.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default WhyUs;
