import AnimatedHeading from './AnimatedHeading';
import { projects_paths } from "../svgPaths.js";
import styles from "./Projects.module.scss";

const Projects = () => {
  return (
    <section className={styles.projects}>
      <AnimatedHeading letters={projects_paths} className={styles.title} viewBox="0 0 300 60" />
      <div className={styles.projectsInner}>

        <div className={styles.projectList}>
          <div className={styles.projectItem}>
            <h3 className={styles.projectTitle}>Project 1</h3>
            <p className={styles.projectDescription}>Description of Project 1</p>
          </div>
          <div className={styles.projectItem}>
            <h3 className={styles.projectTitle}>Project 2</h3>
            <p className={styles.projectDescription}>Description of Project 2</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
