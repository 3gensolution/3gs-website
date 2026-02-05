import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesContent.scss';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'DIGITAL PRODUCT DEVELOPMENT',
  'PLATFORM ENGINEERING',
  'TECHNOLOGY CONSULTING',
  'SYSTEM ARCHITECTURE',
  'API & INTEGRATIONS',
  'INFRASTRUCTURE SOLUTIONS',
  'BLOCKCHAIN & WEB3',
  'PERFORMANCE OPTIMIZATION',
  'SECURITY IMPLEMENTATION',
];

const ServicesContent = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const servicesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline words
      const words = headlineRef.current?.querySelectorAll('.services-content__word');
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

      // Animate service items
      servicesRef.current.forEach((item, index) => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into words for animation
  const headlineText = '3GS is a';
  const italicText1 = 'product lab';
  const midText = 'and';
  const italicText2 = 'technology partner';
  const endText = 'focused on building scalable digital systems. We know how to design it, build it, and help businesses use technology to thrive in a';
  const italicText3 = 'fast-moving digital world.';

  const renderWord = (word, index, isItalic = false) => (
    <span
      key={index}
      className={`services-content__word ${isItalic ? 'services-content__word--italic' : ''}`}
    >
      {word}{' '}
    </span>
  );

  return (
    <section className="services-content" ref={sectionRef}>
      <div className="services-content__container">
        {/* Large Statement Headline */}
        <h2 className="services-content__headline" ref={headlineRef}>
          {headlineText.split(' ').map((word, i) => renderWord(word, `h-${i}`))}
          {italicText1.split(' ').map((word, i) => renderWord(word, `i1-${i}`, true))}
          {midText.split(' ').map((word, i) => renderWord(word, `m-${i}`))}
          {italicText2.split(' ').map((word, i) => renderWord(word, `i2-${i}`, true))}
          {endText.split(' ').map((word, i) => renderWord(word, `e-${i}`))}
          {italicText3.split(' ').map((word, i) => renderWord(word, `i3-${i}`, true))}
        </h2>

        {/* Services Grid */}
        <div className="services-content__grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="services-content__item"
              ref={(el) => (servicesRef.current[index] = el)}
            >
              <span className="services-content__item-text">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesContent;
