import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import TextReveal from '../../../components/common/TextReveal';
import './CTA.scss';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Animate text
      tl.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.3
      );

      // Animate button
      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta__background">
        <div className="cta__gradient" />
        <div className="cta__pattern" />
        <div className="cta__glow" />
      </div>

      <div className="cta__container">
        <div className="cta__content" ref={contentRef}>
          <TextReveal
            as="h2"
            className="cta__title"
            type="words"
            stagger={0.04}
            duration={0.7}
          >
            Let's Build Something Exceptional
          </TextReveal>
          <p className="cta__text" ref={textRef}>
            Whether you're exploring a new digital product or improving an existing system,
            3GS Solution is ready to help bring your vision to life.
          </p>
          <div ref={buttonRef}>
            <Button
              variant="primary"
              size="large"
              to="/contact"
              showArrow
            >
              Start a Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
