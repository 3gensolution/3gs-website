import AboutHero from '../../sections/about/AboutHero';
import AboutContent from '../../sections/about/AboutContent';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutContent />
    </div>
  );
};

export default About;
