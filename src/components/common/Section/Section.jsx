import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Section.scss';

gsap.registerPlugin(ScrollTrigger);

const Section = ({
  children,
  className = '',
  variant = 'light',
  id,
  fullHeight = false,
  noPadding = false,
  animate = true,
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const section = sectionRef.current;
    const elements = section.querySelectorAll('.animate-on-scroll');

    elements.forEach((el, index) => {
      gsap.fromTo(el,
        {
          opacity: 0,
          y: 50,
        },
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animate]);

  const classes = [
    'section',
    `section--${variant}`,
    fullHeight ? 'section--full-height' : '',
    noPadding ? 'section--no-padding' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <section ref={sectionRef} className={classes} id={id}>
      <div className="section__container">
        {children}
      </div>
    </section>
  );
};

export default Section;
