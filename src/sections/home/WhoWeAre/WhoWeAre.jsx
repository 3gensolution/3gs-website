import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './WhoWeAre.scss';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const elements = content.querySelectorAll('.who-we-are__animate');

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
          delay: index * 0.15,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section variant="light" id="who-we-are">
      <div className="who-we-are" ref={contentRef}>
        <span className="who-we-are__label who-we-are__animate">About Us</span>
        <h2 className="who-we-are__title who-we-are__animate">
          A Technology Company Focused on Impact
        </h2>
        <div className="who-we-are__content who-we-are__animate">
          <p>
            3GS Solution is an IT solutions company focused on building reliable
            digital systems, platforms, and products that solve real-world business
            challenges.
          </p>
          <p>
            We combine strong engineering practices with forward-thinking design to
            deliver solutions that scale with growth and adapt to change.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default WhoWeAre;
