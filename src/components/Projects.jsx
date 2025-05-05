import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import projects from "../data/projects.js";
import { projects_paths } from "../data/svgPaths.js";
import styles from "./Projects.module.scss";

const Projects = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.projects}>
      {/* <AnimatedHeading
        sectionRef={sectionRef}
        letters={projects_paths}
        className={styles.sectionTitle}
        viewBox="0 0 300 60"
        inViewOptions={{ margin: "-5% 0px", amount: 0.3 }}
      /> */}

      {/* <div className={styles.projectsContainer}>
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div> */}
    </section>
  );
};


export default Projects;
