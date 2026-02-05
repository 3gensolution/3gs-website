import ProjectsHero from '../../sections/projects/ProjectsHero';
import ProjectsContent from '../../sections/projects/ProjectsContent';
import './Projects.scss';

const Projects = () => {
  return (
    <div className="projects-page">
      <ProjectsHero />
      <ProjectsContent />
    </div>
  );
};

export default Projects;
