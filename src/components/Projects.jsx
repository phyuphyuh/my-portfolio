import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import projects from "../data/projects.js";
import { projects_paths } from "../data/svgPaths.js";
import styles from "./Projects.module.scss";

const gridCellWidth = 120;
const gridCellHeight = 120;

const baseMotionProps = {
  drag: true,
  dragMomentum: false,
  dragConstraints: sectionRef,
  dragElastic: 0.5,
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: {
    scale: 0.8,
    top: initialCardPosition.y,
    left: initialCardPosition.x,
    rotate: initialCardPosition.rotate,
    zIndex: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
};

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

const ScatteredCard = ({ idx, style, children }) => (
  <motion.div
    key={idx}
    className={styles.scatteredCard}
    {...baseMotionProps}
    style={{
      ...style,
      zIndex: topCard === idx ? 100 : 1,
      position: "absolute",
    }}
    onMouseEnter={() => setTopCard(idx)}
    onMouseLeave={() => setTopCard(null)}
    onTapStart={() => setTopCard(idx)}
    onTapCancel={() => setTopCard(null)}
    onDragStart={() => setIsDragging(true)}
    onDragEnd={() => setIsDragging(false)}
  >
    {children}
  </motion.div>
);

const ScatteredImage = ({ idx, img, style }) => (
  <motion.img
    key={img}
    src={img}
    className={styles.scatteredCard}
    {...baseMotionProps}
    style={{
      ...style,
      zIndex: topCard === idx ? 100 : 1,
      position: "absolute",
    }}
    onMouseEnter={() => setTopCard(idx)}
    onMouseLeave={() => setTopCard(null)}
    onTapStart={() => setTopCard(idx)}
    onTapCancel={() => setTopCard(null)}
    onDragStart={() => setIsDragging(true)}
    onDragEnd={() => setIsDragging(false)}
  />
);

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [activeProject, setActiveProject] = useState(null);
  const [pendingProject, setPendingProject] = useState(null);
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

  useEffect(() => {
    if (pendingProject !== null) {
      const timeout = setTimeout(() => {
        setActiveProject(pendingProject);
        setPendingProject(null);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [pendingProject]);

  const handleMouseLeave = () => {
    if (!isDragging) {
      setActiveProject(null);
    }
  };

  const handleHover = (projectId) => {
    if (activeProject && activeProject !== projectId) {
      setActiveProject(null);
      setPendingProject(projectId);
    } else {
      setActiveProject(projectId);
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
            onMouseEnter={() => handleHover(project.id)}
            onTouchStart={() => handleHover(project.id)}
          >
            <h3>{project.name}</h3>

          </motion.div>
        ))}

        <AnimatePresence>
          {activeProject && (() => {
            const hovered = projects.find(p => p.id === activeProject);
            const initialCardPosition = {
              x: (hovered.gridCol + hovered.gridColSpan / 2 - 1.6 ) * gridCellWidth,
              y: (hovered.gridRow + hovered.gridRowSpan / 2 -1 ) * gridCellHeight,
              rotate: 0,
            };

            return (
              <>
              <ScatteredCard
                idx={0}
                style={{
                  top: scatteredCards[0]?.y,
                  left: scatteredCards[0]?.x,
                  rotate: scatteredCards[0]?.rotate,
                }}
              >
                <strong>{hovered.name}</strong>
                <p>{hovered.description}</p>
              </ScatteredCard>

              <ScatteredCard
                idx={1}
                style={{
                  top: scatteredCards[1]?.y,
                  left: scatteredCards[1]?.x,
                  rotate: scatteredCards[1]?.rotate,
                }}
              >
                <p>{hovered.techStack.join(", ")}</p>
              </ScatteredCard>

              {hovered.images.map((img, idx) => {
                const cardIdx = 2 + idx;
                const scatter = scatteredCards[cardIdx];
                return (
                  <ScatteredImage
                    key={img}
                    idx={cardIdx}
                    img={img}
                    style={{
                      top: scatter?.y,
                      left: scatter?.x,
                      rotate: scatter?.rotate,
                    }}
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
