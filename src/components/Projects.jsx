import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import projects from "../data/projects.js";
import { projects_paths } from "../data/svgPaths.js";
import styles from "./Projects.module.scss";

const gridCellWidth = 120;
const gridCellHeight = 120;

function getScatteredPositions(baseX, baseY, count) {
  return Array.from({ length: count }).map(() => ({
    x: baseX + (Math.random() - 0.5) * 500,
    y: baseY + (Math.random() - 0.5) * 500,
    rotate: (Math.random() - 0.5) * 20,
  }));
}

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [activeProject, setActiveProject] = useState(null);

  return (
    <section ref={sectionRef} className={styles.projects}>
      <AnimatedHeading letters={projects_paths} className={styles.title} viewBox="0 0 300 60" />

      <div className={styles.grid}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            style={{
              gridRowStart: project.gridRow,
              gridColumnStart: project.gridCol,
              gridRowEnd: `span ${project.gridRowSpan || 1}`,
              gridColumnEnd: `span ${project.gridColSpan || 1}`,
              rotate: `${(Math.random() - 0.5) * 6}deg`,
              zIndex: activeProject === project.id ? 10 : 1,
            }}
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
            onTouchStart={() => setActiveProject(project.id)}
          >
            <h3>{project.name}</h3>
          </motion.div>
        ))}

        <AnimatePresence>
          {activeProject && (() => {
            const hovered = projects.find(p => p.id === activeProject);
            const scattered = getScatteredPositions(
              hovered.gridCol * gridCellWidth,
              hovered.gridRow * gridCellHeight,
              2 + hovered.images.length
            );

            return (
              <>
                <motion.div
                  className={styles.scatteredCard}
                  key="desc"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    top: scattered[0].y,
                    left: scattered[0].x,
                    rotate: scattered[0].rotate,
                  }}
                >
                  <strong>{hovered.title}</strong>
                  <p>{hovered.description}</p>
                </motion.div>

                <motion.div
                  className={styles.scatteredCard}
                  key="tech"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    top: scattered[1].y,
                    left: scattered[1].x,
                    rotate: scattered[1].rotate,
                  }}
                >
                  <p>{hovered.techStack.join(", ")}</p>
                </motion.div>

                {hovered.images.map((img, idx) => (
                  <motion.img
                    key={img}
                    src={img}
                    className={styles.scatteredCard}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      top: scattered[2 + idx]?.y,
                      left: scattered[2 + idx]?.x,
                      rotate: scattered[2 + idx]?.rotate,
                    }}
                  />
                ))}
              </>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
