import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../components/common/Section';
import './ServicesContent.scss';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    color: 'orange',
    title: 'Digital Product Development',
    description: 'We design and build digital products that are reliable, scalable, and aligned with business goals. From initial planning to deployment, we ensure products are built with strong foundations and room for growth.',
    features: [
      'Product architecture & planning',
      'Secure and scalable development',
      'Performance optimization',
      'Long-term maintainability',
    ],
  },
  {
    id: 2,
    color: 'blue',
    title: 'Platform & System Engineering',
    description: 'We develop robust platforms and backend systems capable of supporting complex operations, integrations, and growing user demands.',
    features: [
      'System architecture design',
      'Data and process management',
      'API and system integrations',
      'Reliability and fault tolerance',
    ],
  },
  {
    id: 3,
    color: 'green',
    title: 'Technology Consulting & Integration',
    description: 'We help businesses adopt and integrate modern technologies by providing strategic guidance and implementation support tailored to their needs.',
    features: [
      'Technical strategy and planning',
      'System evaluation and optimization',
      'Seamless technology integration',
      'Risk and performance assessment',
    ],
  },
  {
    id: 4,
    color: 'purple',
    title: 'Infrastructure & Scalability Solutions',
    description: 'We design infrastructure that supports growth, performance, and resilience, ensuring systems remain stable as demand increases.',
    features: [
      'Scalable infrastructure design',
      'Performance and availability optimization',
      'Security and reliability planning',
      'Future expansion readiness',
    ],
  },
];

const ServicesContent = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.services-content__card');

    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
      <div className="services-content" ref={sectionRef}>
        <div className="services-content__intro">
          <p>
            We provide comprehensive digital solutions tailored to support businesses
            at every stage — from concept and development to deployment and ongoing
            optimization.
          </p>
          <p>
            Our services are designed to remain flexible, secure, and future-ready.
          </p>
        </div>

        <div className="services-content__grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`services-content__card services-content__card--${service.color}`}
            >
              <div className="services-content__card-header">
                <span className={`services-content__card-number services-content__card-number--${service.color}`}>
                  {String(service.id).padStart(2, '0')}
                </span>
                <h3 className="services-content__card-title">{service.title}</h3>
              </div>
              <p className="services-content__card-description">{service.description}</p>
              <div className="services-content__card-features">
                <h4 className="services-content__card-features-title">Key Focus Areas:</h4>
                <ul className="services-content__card-features-list">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServicesContent;
