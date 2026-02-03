import PageHero from '../../components/common/PageHero';
import ServicesContent from '../../sections/services/ServicesContent';
import ServicesApproach from '../../sections/services/ServicesApproach';
import './Services.scss';

const Services = ({ onContactClick }) => {
  return (
    <div className="services-page">
      <PageHero
        title="Our Solutions"
        subtitle="Technology solutions designed for performance, scalability, and long-term impact."
        variant="services"
      />
      <ServicesContent />
      <ServicesApproach onContactClick={onContactClick} />
    </div>
  );
};

export default Services;
