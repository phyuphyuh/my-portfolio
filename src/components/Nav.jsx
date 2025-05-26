import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useMotionValueEvent } from "motion/react";
import styles from "./Nav.module.scss";

const Shadow = ({ rotation, shadowLength, text }) => (
  <span className={styles.shadowWrapper}>
    <span
      className={styles.shadow}
      style={{
        transform: `
          rotateX(${rotation.y}deg)
          scaleY(${shadowLength * 1.5})
          skew(${rotation.x * 0.5}deg)
          translateX(${-(rotation.x)}px)
          translateY(${rotation.y}px)
        `
      }}
    >
      {text}
    </span>
  </span>
);

const NameWithShadow = ({ text, rotation, shadowLength }) => (
  <span>
    {text}
    <Shadow rotation={rotation} shadowLength={shadowLength} text={text} />
  </span>
);

const Nav = ({ scrollYProgress }) => {
  const nameWrapperRef = useRef(null);
  const frameId = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shadowLength, setShadowLength] = useState(0.5);
  const [activeSection, setActiveSection] = useState('home');
  const [navOpacity, setNavOpacity] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const viewportHeight = window.innerHeight;
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(() => {
        if (!nameWrapperRef.current) return;

        const rect = nameWrapperRef.current.getBoundingClientRect();
        const elemCenterX = rect.left + rect.width / 2;
        const elemCenterY = rect.top + rect.height / 2;

        const { clientX, clientY } = e;
        const distX = clientX - elemCenterX;
        const distY = clientY - elemCenterY;

        const scaleFactor = 10;
        const x = distX / (window.innerWidth / 3) * scaleFactor;
        const y = -distY / (window.innerHeight / 3) * scaleFactor;

        setRotation({ x, y });

        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        const maxDist = Math.sqrt((window.innerWidth/2)**2 + (window.innerHeight/2)**2);
        const newShadowLength = Math.max(0.2, 1.5 - distance / (maxDist / 2));
        setShadowLength(newShadowLength);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId.current);
    };
  }, []);


  const scrollToSection = (section) => {
    let targetPosition = 0;

    switch(section) {
      case 'home':
        targetPosition = 0;
        break;
      case 'about':
        targetPosition = viewportHeight * 0.4;
        break;
      case 'projects':
        targetPosition = viewportHeight * 1.7;
        break;
      case 'contact':
        targetPosition = viewportHeight * 2.5;
        break;
      default:
        targetPosition = 0;
    }

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const visibilityThreshold = isMobile ? 0.10 : 0.18;
    const fadeStartThreshold = isMobile ? 0.07 : 0.15;

    if (latest >= visibilityThreshold) {
      setNavOpacity(1);
    } else if (latest > fadeStartThreshold) {
      setNavOpacity((latest - fadeStartThreshold) / (visibilityThreshold - fadeStartThreshold));
    } else {
      setNavOpacity(0);
    }

    const currentScroll = window.scrollY;

    if (currentScroll < viewportHeight * 0.3) {
      setActiveSection('home');
    } else if (currentScroll < viewportHeight * 1.5) {
      setActiveSection('about');
    } else {
      setActiveSection('projects');
    }
  });

  const nameElements = ['Phyu', 'Phyu'].map((text, index) => (
    <NameWithShadow
      key={index}
      text={text}
      rotation={rotation}
      shadowLength={shadowLength}
    />
  ));

  return (
    <motion.div
      className={styles.navContainer}
      style={{ opacity: navOpacity }}
    >
      <div className={styles.navGradient}></div>

      <div className={styles.navBar}>
        <motion.div
          ref={nameWrapperRef}
          className={styles.navNameWrapper}
          onClick={() => scrollToSection('home')}
        >
          <div
            className={styles.nameRotationWrapper}
            style={{
              transform: `perspective(500px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
            }}
          >
            <h2 className={styles.navName}>
              {nameElements}
            </h2>
          </div>
        </motion.div>

        <div className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${activeSection === 'about' ? styles.active : ''}`}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>

          <button
            className={`${styles.navLink} ${activeSection === 'projects' ? styles.active : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Nav;
