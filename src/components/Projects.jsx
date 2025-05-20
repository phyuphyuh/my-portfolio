import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import projects from "../data/projects.js";
import { projects_paths } from "../data/svgPaths.js";
import styles from "./Projects.module.scss";

const Projects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imgContainerRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const toggleExpand = (id) => {
    if (isDragging) return;
    setExpandedId(expandedId === id ? null : id);
  };

  const closeExpandedProject = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setExpandedId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeExpandedProject);
    return () => {
      document.removeEventListener("click", closeExpandedProject);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.projects}>
      <AnimatedHeading
        sectionRef={sectionRef}
        letters={projects_paths}
        className={styles.sectionTitle}
        viewBox="0 0 300 60"
        inViewOptions={{ margin: "-5% 0px", amount: 0.3 }}
      />

      <div ref={containerRef} className={styles.projectsList}>
        {projects.map((project, index) => (
          <div key={project.id}>
            <motion.div
              layout
              className={styles.projectRow}
              onClick={() => toggleExpand(project.id)}
              onHoverStart={() => setExpandedId(project.id)}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
            >
              <div className={styles.projectHeader}>
                <h3>{project.name}</h3>
                <div className={styles.techStack}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    className={styles.projectDetails}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={styles.description}>{project.description}</p>
                    <div className={styles.imgContainerWrapper} ref={imgContainerRef}>
                      <motion.div
                        className={styles.imgContainer}
                        drag="x"
                        dragConstraints={imgContainerRef}
                        dragElastic={0.1}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        whileTap={{ cursor: "grabbing" }}
                      >
                        {project.images.map((img, index) => (
                          <motion.img
                            key={index}
                            src={img}
                            alt={`${project.name} ${index + 1}`}
                            whileHover={{ scale: 1.05 }}
                            draggable="false"
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {index < projects.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </section>
  );
};


export default Projects;
