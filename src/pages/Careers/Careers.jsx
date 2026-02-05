import CareersHero from '../../sections/careers/CareersHero';
import CareersContent from '../../sections/careers/CareersContent';
import './Careers.scss';

const Careers = () => {
  return (
    <div className="careers-page">
      <CareersHero />
      <CareersContent />
    </div>
  );
};

export default Careers;
