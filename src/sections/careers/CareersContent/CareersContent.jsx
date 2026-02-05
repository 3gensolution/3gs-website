import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import './CareersContent.scss';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    id: 1,
    numeral: 'I.',
    title: 'Innovation First',
    description: 'We embrace new ideas and technologies to solve complex problems. Our approach combines creativity with technical excellence to deliver solutions that push boundaries.',
  },
  {
    id: 2,
    numeral: 'II.',
    title: 'Integrity of Thought and Action',
    description: 'We apply a dialectic approach to critical reasoning to guard against self-deception and biases. We test and challenge our ideas to arrive at better solutions.',
  },
  {
    id: 3,
    numeral: 'III.',
    title: 'Client Focus',
    description: 'Our clients interests are at the center of every decision we make. Our service culture ensures that we take care of our client\'s investments as if they were ours.',
  },
  {
    id: 4,
    numeral: 'IV.',
    title: 'Excellence in Execution',
    description: 'We strive for the highest quality in everything we build. Continuous learning and development are core to who we are as a team.',
  },
];

const CareersContent = () => {
  const sectionRef = useRef(null);
  const valuesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each value with stagger
      valuesRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 60 },
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
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="careers-content" ref={sectionRef}>
      {/* Core Values Header */}
      <div className="careers-content__header">
        <h2 className="careers-content__header-title">
          OUR<br />CORE VALUES
        </h2>
      </div>

      {/* Values Section */}
      <div className="careers-content__values">
        <div className="careers-content__values-grid">
          {values.map((value, index) => (
            <div
              key={value.id}
              className={`careers-content__value careers-content__value--${index % 2 === 0 ? 'left' : 'right'}`}
              ref={(el) => (valuesRef.current[index] = el)}
            >
              <span className="careers-content__value-numeral">{value.numeral}</span>
              <h3 className="careers-content__value-title">{value.title}</h3>
              <p className="careers-content__value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* No Openings Notice */}
      <div className="careers-content__notice">
        <div className="careers-content__notice-content">
          <div className="careers-content__notice-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h3 className="careers-content__notice-title">No Open Positions at the Moment</h3>
          <p className="careers-content__notice-text">
            We're not currently hiring, but we're always interested in connecting with
            talented individuals. If you believe you'd be a great fit for 3GS Solution,
            feel free to reach out and introduce yourself.
          </p>
          <Button variant="secondary" size="medium" to="/contact">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareersContent;
