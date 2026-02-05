import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutContent.scss';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  'CLARITY BEFORE EXECUTION',
  'SCALABILITY BY DESIGN',
  'SECURITY & PERFORMANCE',
  'BUSINESS ALIGNMENT',
  'LONG-TERM GROWTH',
  'PRODUCT-DRIVEN MINDSET',
];

const AboutContent = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const principlesRef = useRef([]);
  const missionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline words
      const words = headlineRef.current?.querySelectorAll('.about-content__word');
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate principles
      principlesRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.05,
            }
          );
        }
      });

      // Animate mission section
      if (missionRef.current) {
        gsap.fromTo(missionRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWord = (word, index, isItalic = false) => (
    <span
      key={index}
      className={`about-content__word ${isItalic ? 'about-content__word--italic' : ''}`}
    >
      {word}{' '}
    </span>
  );

  return (
    <section className="about-content" ref={sectionRef}>
      <div className="about-content__container">
        {/* Large Statement Headline */}
        <h2 className="about-content__headline" ref={headlineRef}>
          {'3GS is a'.split(' ').map((word, i) => renderWord(word, `h-${i}`))}
          {'technology company'.split(' ').map((word, i) => renderWord(word, `i1-${i}`, true))}
          {'dedicated to building scalable, secure, and future-ready digital solutions. We focus on'.split(' ').map((word, i) => renderWord(word, `m1-${i}`))}
          {'designing systems'.split(' ').map((word, i) => renderWord(word, `i2-${i}`, true))}
          {'and products that solve real business problems while remaining adaptable to'.split(' ').map((word, i) => renderWord(word, `m2-${i}`))}
          {'change.'.split(' ').map((word, i) => renderWord(word, `i3-${i}`, true))}
        </h2>

        {/* Principles Grid */}
        <div className="about-content__principles">
          <span className="about-content__principles-label">Our Principles</span>
          <div className="about-content__principles-grid">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="about-content__principle"
                ref={(el) => (principlesRef.current[index] = el)}
              >
                <span className="about-content__principle-text">{principle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="about-content__mission" ref={missionRef}>
          <div className="about-content__mission-block">
            <span className="about-content__mission-label">Our Mission</span>
            <p className="about-content__mission-text">
              To build high-quality digital solutions that empower businesses, enhance user
              experiences, and stand the test of time through innovation, scalability, and reliability.
            </p>
          </div>
          <div className="about-content__mission-block">
            <span className="about-content__mission-label">Our Vision</span>
            <p className="about-content__mission-text">
              To be a trusted technology partner recognized for delivering impactful digital
              systems and products that shape the future of modern business and digital interaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
