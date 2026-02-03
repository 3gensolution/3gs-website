import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import Button from '../../../components/ui/Button';
import './CareersContent.scss';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    id: 1,
    icon: '💡',
    title: 'Innovation First',
    description: 'We embrace new ideas and technologies to solve complex problems.',
  },
  {
    id: 2,
    icon: '🤝',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and open communication.',
  },
  {
    id: 3,
    icon: '📈',
    title: 'Growth Mindset',
    description: 'Continuous learning and development are core to who we are.',
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Excellence',
    description: 'We strive for the highest quality in everything we build.',
  },
];

const CareersContent = ({ onContactClick }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.careers-content__animate');

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
      <div className="careers-content" ref={sectionRef}>
        {/* Culture Section */}
        <div className="careers-content__culture careers-content__animate">
          <span className="careers-content__label">Our Culture</span>
          <h2 className="careers-content__title">Join a Team That Builds the Future</h2>
          <p className="careers-content__text">
            At 3GS Solution, we foster a culture of innovation, collaboration, and
            continuous growth. We believe that the best solutions come from diverse
            perspectives and a shared commitment to excellence.
          </p>
        </div>

        {/* Values Grid */}
        <div className="careers-content__values">
          {values.map((value) => (
            <div key={value.id} className="careers-content__value-card careers-content__animate">
              <span className="careers-content__value-icon">{value.icon}</span>
              <h3 className="careers-content__value-title">{value.title}</h3>
              <p className="careers-content__value-description">{value.description}</p>
            </div>
          ))}
        </div>

        {/* No Openings Notice */}
        <div className="careers-content__notice careers-content__animate">
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
          <Button variant="secondary" size="medium" onClick={onContactClick}>
            Get in Touch
          </Button>
        </div>

        {/* Why Join Section */}
        <div className="careers-content__why careers-content__animate">
          <h3 className="careers-content__why-title">Why Join 3GS Solution?</h3>
          <div className="careers-content__why-grid">
            <div className="careers-content__why-item">
              <span className="careers-content__why-number">01</span>
              <h4>Meaningful Work</h4>
              <p>Work on products that impact real businesses and users.</p>
            </div>
            <div className="careers-content__why-item">
              <span className="careers-content__why-number">02</span>
              <h4>Learning Environment</h4>
              <p>Continuous opportunities to learn and grow your skills.</p>
            </div>
            <div className="careers-content__why-item">
              <span className="careers-content__why-number">03</span>
              <h4>Innovation Focus</h4>
              <p>Be at the forefront of technology and innovation.</p>
            </div>
            <div className="careers-content__why-item">
              <span className="careers-content__why-number">04</span>
              <h4>Team Culture</h4>
              <p>Collaborative environment with talented professionals.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CareersContent;
