import PageHero from '../../components/common/PageHero';
import CareersContent from '../../sections/careers/CareersContent';
import './Careers.scss';

const Careers = ({ onContactClick }) => {
  return (
    <div className="careers-page">
      <PageHero
        title="Careers"
        subtitle="Explore opportunities to grow with a team that builds the future."
      />
      <CareersContent onContactClick={onContactClick} />
    </div>
  );
};

export default Careers;
