import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './AboutContent.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutContent = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const elements = contentRef.current?.querySelectorAll('.about-content__animate');

    if (elements) {
      elements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
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
    <Section variant="light">
      <div className="about-content" ref={contentRef}>
        {/* Who We Are */}
        <div className="about-content__block about-content__animate">
          <span className="about-content__label">Who We Are</span>
          <h2 className="about-content__title">Who We Are</h2>
          <div className="about-content__text">
            <p>
              3GS Solution is a technology company dedicated to building scalable,
              secure, and future-ready digital solutions. We focus on designing systems
              and products that solve real business problems while remaining adaptable
              to change.
            </p>
            <p>
              Our approach blends strong engineering principles with forward-thinking
              design, ensuring every solution we deliver is reliable, efficient, and
              built to last.
            </p>
            <p>
              We work across industries and product types, helping organizations turn
              ideas into well-structured digital platforms.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="about-content__grid">
          <div className="about-content__card about-content__animate">
            <div className="about-content__card-icon">🎯</div>
            <h3 className="about-content__card-title">Our Mission</h3>
            <p className="about-content__card-text">
              To build high-quality digital solutions that empower businesses, enhance
              user experiences, and stand the test of time through innovation,
              scalability, and reliability.
            </p>
          </div>

          <div className="about-content__card about-content__animate">
            <div className="about-content__card-icon">🌍</div>
            <h3 className="about-content__card-title">Our Vision</h3>
            <p className="about-content__card-text">
              To be a trusted technology partner recognized for delivering impactful
              digital systems and products that shape the future of modern business
              and digital interaction.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutContent;
