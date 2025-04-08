import styles from "./Projects.module.scss";

const Projects = () => {
  return (
    <section className={styles.projects}>
      <div className={styles.projectsInner}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.projectList}>
          <div className={styles.projectItem}>
            <h3 className={styles.projectTitle}>Project 1</h3>
            <p className={styles.projectDescription}>Description of Project 1</p>
          </div>
          <div className={styles.projectItem}>
            <h3 className={styles.projectTitle}>Project 2</h3>
            <p className={styles.projectDescription}>Description of Project 2</p>
          </div>
          {/* Add more projects as needed */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
