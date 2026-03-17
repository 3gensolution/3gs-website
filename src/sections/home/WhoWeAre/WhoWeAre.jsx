import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './WhoWeAre.scss';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each line
      const lines = textRef.current?.querySelectorAll('.who-we-are__line');
      if (lines) {
        gsap.fromTo(lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section variant="light" id="who-we-are">
      <div className="who-we-are" ref={sectionRef}>
        <div className="who-we-are__statement" ref={textRef}>
          <span className="who-we-are__line">
            Powerful tools built with{' '}
            <em className="who-we-are__italic">real users</em>
          </span>
          <span className="who-we-are__line">
            and{' '}
            <em className="who-we-are__italic">businesses</em>{' '}
            in mind —
          </span>
          <span className="who-we-are__line">
            <em className="who-we-are__italic">intuitive,</em>{' '}
            secure, and
          </span>
          <span className="who-we-are__line">
            <em className="who-we-are__italic">scalable.</em>
          </span>
        </div>
      </div>
    </Section>
  );
};

export default WhoWeAre;
