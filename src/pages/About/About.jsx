import PageHero from '../../components/common/PageHero';
import AboutContent from '../../sections/about/AboutContent';
import HowWeWork from '../../sections/about/HowWeWork';
import './About.scss';

const About = ({ onContactClick }) => {
  return (
    <div className="about-page">
      <PageHero
        title="About 3GS Solution"
        subtitle="Engineering reliable digital solutions for today and the future."
      />
      <AboutContent />
      <HowWeWork onContactClick={onContactClick} />
    </div>
  );
};

export default About;
