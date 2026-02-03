import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import './CTA.scss';

gsap.registerPlugin(ScrollTrigger);

const CTA = ({ onContactClick }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta__background">
        <div className="cta__gradient" />
        <div className="cta__pattern" />
      </div>

      <div className="cta__container">
        <div className="cta__content" ref={contentRef}>
          <h2 className="cta__title">Let's Build Something Exceptional</h2>
          <p className="cta__text">
            Whether you're exploring a new digital product or improving an existing system,
            3GS Solution is ready to help bring your vision to life.
          </p>
          <Button variant="primary" size="large" onClick={onContactClick}>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
