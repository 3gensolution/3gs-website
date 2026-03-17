import AboutHero from '../../sections/about/AboutHero';
import AboutContent from '../../sections/about/AboutContent';
import HowWeWork from '../../sections/about/HowWeWork';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutContent />
      <HowWeWork />
    </div>
  );
};

export default About;
