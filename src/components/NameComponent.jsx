import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'motion/react';
import styles from './NameComponent.module.scss';

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

const NameWithShadow = ({ text, hasMovedRef, rotation, shadowLength }) => (
  <span>
    {text}
    {hasMovedRef.current && <Shadow rotation={rotation} shadowLength={shadowLength} text={text} />}
  </span>
);

const NameComponent = ({ scrollYProgress }) => {
  const nameWrapperRef = useRef(null);
  const hasMovedRef = useRef(false);
  const frameId = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shadowLength, setShadowLength] = useState(0.5);
  const [isNavMode, setIsNavMode] = useState(false);

  const handleNameClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nameWrapperScale = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [1, 0.3, 0.3]
  );

  const nameWrapperY = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    ["0%", "-45vh", "-45vh"]
  );

  const nameWrapperOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.22, 1],
    [1, 0.9, 1, 1]
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsNavMode(value > 0.2);
  });

  useEffect(() => {
    setIsNavMode(scrollYProgress.get() > 0.2);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
      }

      cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(() => {
        // Get the current position of the nameWrapper element
        if (!nameWrapperRef.current) return;

        // Get the element's position and dimensions
        const rect = nameWrapperRef.current.getBoundingClientRect();
        const elemCenterX = rect.left + rect.width / 2;
        const elemCenterY = rect.top + rect.height / 2;

        // Calculate rotation based on mouse position relative to the element center
        const { clientX, clientY } = e;
        const distX = clientX - elemCenterX;
        const distY = clientY - elemCenterY;

        // Scale the rotation based on the element's size and scroll position
        const scaleFactor = isNavMode ? 10 : 30; // Less rotation when in nav mode

        const x = distX / (isNavMode ? window.innerWidth / 3 : window.innerWidth / 2) * scaleFactor;
        const y = -distY / (isNavMode ? window.innerHeight / 3 : window.innerHeight / 2) * scaleFactor;

        setRotation({ x, y });

        // Calculate shadow length based on distance from mouse to element center
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
  }, [isNavMode]);

  const nameElements = ['Phyu', 'Phyu'].map((text, index) => (
    <NameWithShadow
      key={index}
      text={text}
      hasMovedRef={hasMovedRef}
      rotation={rotation}
      shadowLength={shadowLength}
    />
  ));

  return (
    <motion.div
      ref={nameWrapperRef}
      className={`${styles.nameWrapper} ${isNavMode ? styles.navMode : ''}`}
      style={{
        scale: nameWrapperScale,
        y: nameWrapperY,
        opacity: nameWrapperOpacity,
      }}
      onClick={handleNameClick}
      // whileHover={{
      //   scale: isNavMode ? 0.35 : 1.05,
      //   transition: { duration: 0.2 }
      // }}
    >
      <div
        className={styles.nameRotationWrapper}
        style={{
          transform: `perspective(500px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
        }}
      >
        <h2 className={styles.name}>
          {nameElements}
        </h2>
      </div>
    </motion.div>
  );
};

export default NameComponent;
