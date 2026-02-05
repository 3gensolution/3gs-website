import ServicesHero from '../../sections/services/ServicesHero';
import ServicesContent from '../../sections/services/ServicesContent';
import './Services.scss';

const Services = () => {
  return (
    <div className="services-page">
      <ServicesHero />
      <ServicesContent />
    </div>
  );
};

export default Services;
