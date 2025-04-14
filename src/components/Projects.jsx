import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import projects from "../data/projects.js";
import { projects_paths } from "../data/svgPaths.js";
import styles from "./Projects.module.scss";

const gridCellWidth = 120;
const gridCellHeight = 120;

// function getScatteredPositions(baseX, baseY, count) {
//   return Array.from({ length: count }).map(() => ({
//     x: baseX + (Math.random() - 0.5) * 500,
//     y: baseY + (Math.random() - 0.5) * 500,
//     rotate: (Math.random() - 0.5) * 20,
//   }));
// }
function getScatteredPositions(baseX, baseY, count) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    // const radius = 220 + Math.random() * 100;
    // const radius = 180 + i * 60 + Math.random() * 40;
    const radius = 220 + i * 10 + Math.random() * 60;

    return {
      x: baseX + Math.cos(angle) * radius,
      y: baseY + Math.sin(angle) * radius,
      rotate: (Math.random() - 0.5) * 20,
    };
  });
}

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [activeProject, setActiveProject] = useState(null);
  const [scatteredCards, setScatteredCards] = useState([]);
  const [topCard, setTopCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (activeProject) {
      const hovered = projects.find(p => p.id === activeProject);
      const scattered = getScatteredPositions(
        hovered.gridCol * gridCellWidth,
        hovered.gridRow * gridCellHeight,
        2 + hovered.images.length
      );
      setScatteredCards(scattered);
    } else {
      setScatteredCards([]);
    }
  }, [activeProject]);

  const handleMouseLeave = () => {
    if (!isDragging) {
      setActiveProject(null);
    }
  };

  return (
    <section ref={sectionRef} className={styles.projects} onMouseLeave={handleMouseLeave}>
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
            onTouchStart={() => setActiveProject(project.id)}
          >
            <h3>{project.name}</h3>
          </motion.div>
        ))}

        <AnimatePresence>
          {activeProject && (() => {
            const hovered = projects.find(p => p.id === activeProject);
            {/* const scattered = getScatteredPositions(
              hovered.gridCol * gridCellWidth,
              hovered.gridRow * gridCellHeight,
              2 + hovered.images.length
            ); */}

            return (
              <>
                <motion.div
                  className={styles.scatteredCard}
                  key="desc"
                  drag
                  dragMomentum={false}
                  dragConstraints={sectionRef}
                  dragElastic={0.5}
                  style={{
                    top: scatteredCards[0]?.y,
                    left: scatteredCards[0]?.x,
                    rotate: scatteredCards[0]?.rotate,
                    zIndex: topCard === 0 ? 100 : 1,
                    position: "absolute"
                  }}
                  onMouseEnter={() => setTopCard(0)}
                  onMouseLeave={() => setTopCard(null)}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <strong>{hovered.name}</strong>
                  <p>{hovered.description}</p>
                </motion.div>

                <motion.div
                  className={styles.scatteredCard}
                  key="tech"
                  drag
                  dragMomentum={false}
                  dragConstraints={sectionRef}
                  dragElastic={0.5}
                  style={{
                    top: scatteredCards[1]?.y,
                    left: scatteredCards[1]?.x,
                    rotate: scatteredCards[1]?.rotate,
                    zIndex: topCard === 1 ? 100 : 1,
                    position: "absolute"
                  }}
                  onMouseEnter={() => setTopCard(1)}
                  onMouseLeave={() => setTopCard(null)}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p>{hovered.techStack.join(", ")}</p>
                </motion.div>

                {hovered.images.map((img, idx) => {
                  const cardIdx = 2 + idx;
                  const scatter = scatteredCards[cardIdx];

                  return (
                    <motion.img
                      key={img}
                      src={img}
                      drag
                      dragMomentum={false}
                      dragConstraints={sectionRef}
                      dragElastic={0.5}
                      className={styles.scatteredCard}
                      style={{
                        top: scatter?.y,
                        left: scatter?.x,
                        rotate: scatter?.rotate,
                        zIndex: topCard === cardIdx ? 100 : 1,
                        position: "absolute"
                      }}
                      onMouseEnter={() => setTopCard(cardIdx)}
                      onMouseLeave={() => setTopCard(null)}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={() => setIsDragging(false)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  );
                })}
              </>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
