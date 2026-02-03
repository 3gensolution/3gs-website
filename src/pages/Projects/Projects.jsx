import PageHero from '../../components/common/PageHero';
import ProjectsContent from '../../sections/projects/ProjectsContent';
import './Projects.scss';

const Projects = ({ onContactClick }) => {
  return (
    <div className="projects-page">
      <PageHero
        title="Our Projects"
        subtitle="Explore the digital products and platforms we've built and are building."
        variant="projects"
      />
      <ProjectsContent onContactClick={onContactClick} />
    </div>
  );
};

export default Projects;
