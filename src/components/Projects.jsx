import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useTransform, useScroll } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import projects from "../data/projects.js";
import { projects_paths } from "../data/svgPaths.js";
import styles from "./Projects.module.scss";

const ProjectCard = ({ project, isExpanded, setExpandedId, scrollYProgress, index }) => {
  const cardRef = useRef(null);
  const imgScrollerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  // const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate row and column indices
  const rowIndex = Math.floor(index / 4); // 4 columns
  const colIndex = index % 4;

  // Track viewport size changes
  // useEffect(() => {
  //   const handleResize = () => {
  //     setViewportWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // // Calculate sliding distances based on viewport width
  // let slideDistance;
  // if (viewportWidth > 1200) {
  //   slideDistance = viewportWidth * 0.25;
  // } else if (viewportWidth > 768) {
  //   slideDistance = viewportWidth * 0.35;
  // } else {
  //   slideDistance = viewportWidth * 0.5;
  // }

  const { initialX, initialY, startProgress, endProgress } = useMemo(() => {
    // - First card in each row is static
    let initialX = 0;
    let initialY = 0;

    if (colIndex === 1 || colIndex === 2) {
      // Second and third cards - slide in from right
      initialX = 350;
      initialY = 0;
    } else if (colIndex === 3) {
      // Fourth card - slide in from below
      initialX = 0;
      initialY = 550;
    }

    // Calculate staggered timing for each card in the row
    let startProgress, endProgress;

    // Base starting point for the row
    const rowStartPoint = 0.20 + (rowIndex * 0.15);
    // let rowStartPoint;
    // if (viewportWidth <= 1024) {
    //   rowStartPoint = 0.20 + (rowIndex * 0.15); // Start earlier on mobile/tablet
    // } else {
    //   rowStartPoint = 0.25 + (rowIndex * 0.15);
    // }

    if (colIndex === 0) {
      startProgress = rowStartPoint;
      endProgress = rowStartPoint + 0.05;
    } else if (colIndex === 1) {
      startProgress = rowStartPoint;
      endProgress = rowStartPoint + 0.1;
    } else if (colIndex === 2) {
      startProgress = rowStartPoint + 0.05;
      endProgress = rowStartPoint + 0.15;
    } else if (colIndex === 3) {
      // Fourth card - wait for third card to get in place
      startProgress = rowStartPoint + 0.1;
      endProgress = rowStartPoint + 0.2;
    }

    return { initialX, initialY, startProgress, endProgress };
  }, [rowIndex, colIndex]);

  const x = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    colIndex === 0 ? [0, 0] : [initialX, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    colIndex === 3 ? [initialY, 0] : [0, 0]
  );

  const toggleExpand = () => {
    setExpandedId(isExpanded ? null : project.id);
  };

  // Image scrolling logic
  // Scroll to next/previous image
  const scrollImages = (direction) => {
    if (!imgScrollerRef.current || !project.images) return;

    const scroller = imgScrollerRef.current;
    const imageWidth = scroller.children[0].clientWidth;

    let newIndex;
    if (direction === 'next') {
      newIndex = Math.min(currentImageIndex + 1, project.images.length - 1);
    } else {
      newIndex = Math.max(currentImageIndex - 1, 0);
    }

    const scrollAmount = (imageWidth) * newIndex;
    scroller.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });

    setCurrentImageIndex(newIndex);
  };

  // Scroll to specific image
  const scrollToImage = (index) => {
    if (!imgScrollerRef.current || !project.images) return;

    const scroller = imgScrollerRef.current;
    const imageWidth = scroller.children[0].clientWidth;

    const scrollAmount = (imageWidth) * index;
    scroller.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });

    setCurrentImageIndex(index);
  };

  // Update current index to manual scrolling
  useEffect(() => {
    const scroller = imgScrollerRef.current;
    if (!scroller || !project.images || project.images.length <= 1) return;

    const handleScroll = () => {
      const imageWidth = scroller.children[0].clientWidth;
      const scrollPosition = scroller.scrollLeft;
      const newIndex = Math.round(scrollPosition / imageWidth);

      if (newIndex !== currentImageIndex) {
        setCurrentImageIndex(newIndex);
      }
    };

    scroller.addEventListener('scroll', handleScroll);

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, [currentImageIndex, project.images]);

  // Reset current image index when card expands/collapses
  useEffect(() => {
    if (!isExpanded) {
      setCurrentImageIndex(0);
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.projectCard} ${isExpanded ? styles.expanded : ''}`}
      onClick={toggleExpand}
      onHoverStart={() => !isExpanded && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
      style={{
        x: isExpanded ? 0 : x,
        y: isExpanded ? 0 : y,
      }}
      whileHover={isExpanded ? {} : {
        scale: 1.02,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 200,
          damping: 25
        }
      }}
    >
      <motion.div
        className={styles.cardContent}
        layoutId={`content-${project.id}`}
      >
        {!isExpanded && (
          <div
            className={styles.hoverImageContainer}
            style={{
              opacity: isHovered ? 0.8 : 0,
              transition: 'opacity 0.3s',
              backgroundImage: isHovered ? `url(${project.images[0]})` : 'none',
            }}
          />
        )}

        <motion.div
          className={styles.textContent}
          layout
        >
          <h3 className={styles.cardTitle}>
            {project.name}
          </h3>

          <div className={styles.techStack}>
            {project.techStack.map((tech, i) => (
              <span key={i} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {isExpanded && (
          <motion.div layout className={styles.expandedContent}>
            <div className={styles.mediaContainer}>
              {project.images && project.images.length > 1 && (
                <>
                  <button
                    className={`${styles.navArrow} ${styles.navPrev}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollImages('prev');
                    }}
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <button
                    className={`${styles.navArrow} ${styles.navNext}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollImages('next');
                    }}
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}

              <div className={styles.mediaScroller} ref={imgScrollerRef}>
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className={styles.projectVideo}
                  />
                ) : (
                  project.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${project.name} image ${index + 1}`}
                      className={styles.projectImage}
                    />
                  ))
                )}
              </div>
            </div>

            {project.images && project.images.length > 1 && (
              <div className={styles.imageIndicators}>
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${currentImageIndex === index ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToImage(index);
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <p className={styles.description}>
              {project.description.before}
              <span>{project.description.highlight}</span>
              {project.description.after}
            </p>

            <div className={styles.links}>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  Visit Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  // Close expanded project when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setExpandedId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} className={styles.projects}>
      <AnimatedHeading
        sectionRef={sectionRef}
        letters={projects_paths}
        className={styles.sectionTitle}
        viewBox="0 0 110 200"
        inViewOptions={{ margin: "-5% 0px", amount: window.innerWidth <= 768 ? 0.1 : 0.3 }}
      />

      <motion.div
        ref={gridRef}
        className={styles.projectsGrid}
        layout
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            setExpandedId={setExpandedId}
            scrollYProgress={scrollYProgress}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
