import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'motion/react';
import styles from './NameComponent.module.scss';

const ShadowChar = ({ rotation, shadowLength, char }) => {
  const shadowSkewX = rotation.x * 1.8;

  const blurAmount = 1.2 + (shadowLength * 3.5);
  const opacityAmount = Math.max(0.05, 0.45 - (shadowLength * 0.12));

  return (
    <span className={styles.shadowWrapper}>
      <span
        className={styles.shadow}
        style={{
          transform: `
            rotateX(80deg)
            skewX(${shadowSkewX}deg)
            scaleY(${shadowLength * 2})
          `,
          filter: `blur(${blurAmount}px)`,
          opacity: opacityAmount
        }}
      >
        {char}
      </span>
    </span>
  );
};

const CharWithShadow = ({ char, hasMovedRef, rotation, shadowLength }) => (
  <span className={styles.charContainer}>
    <span className={styles.charText}>{char}</span>
    {hasMovedRef.current && (
      <ShadowChar char={char} rotation={rotation} shadowLength={shadowLength} />
    )}
  </span>
);

const WordRow = ({ word, hasMovedRef, rotation, shadowLength }) => (
  <div className={styles.wordRow}>
    {word.split('').map((char, index) => (
      <CharWithShadow
        key={index}
        char={char}
        hasMovedRef={hasMovedRef}
        rotation={rotation}
        shadowLength={shadowLength}
      />
    ))}
  </div>
);

const NameComponent = ({ scrollYProgress }) => {
  const nameWrapperRef = useRef(null);
  const hasMovedRef = useRef(false);
  const frameId = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shadowLength, setShadowLength] = useState(0.4);
  const [isNavMode, setIsNavMode] = useState(false);
  const [hasSentPosition, setHasSentPosition] = useState(false);

  const handleNameClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nameWrapperScale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0.3, 0.3]);
  const nameWrapperY = useTransform(scrollYProgress, [0, 0.2, 1], ["0%", "-45vh", "-45vh"]);
  const nameWrapperOpacity = useTransform(scrollYProgress, [0, 0.17, 1], [1, 1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsNavMode(value > 0.2);
  });

  useEffect(() => {
    setIsNavMode(scrollYProgress.get() > 0.2);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hasMovedRef.current) hasMovedRef.current = true;

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
        const scaleFactor = isNavMode ? 10 : 25; // Less rotation when in nav mode

        const x = distX / (isNavMode ? window.innerWidth / 3 : window.innerWidth / 2) * scaleFactor;
        const y = -distY / (isNavMode ? window.innerHeight / 3 : window.innerHeight / 2) * scaleFactor;

        setRotation({ x, y });

        // Calculate shadow length based on distance from mouse to element center
        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        const maxDist = Math.sqrt((window.innerWidth / 2) ** 2 + (window.innerHeight / 2) ** 2);
        const normalizedDist = distance / maxDist;

        const newShadowLength = 0.4 + normalizedDist * 1.8;
        setShadowLength(newShadowLength);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId.current);
    };
  }, [isNavMode]);

  useEffect(() => {
    const sendPositionToNav = () => {
      if (!nameWrapperRef.current || !isNavMode || hasSentPosition) return;

      // Get position once it's in nav mode
      const rect = nameWrapperRef.current.getBoundingClientRect();

      // Store position data in a global that Nav can access
      window.nameComponentPosition = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        scale: nameWrapperScale.get()
      };

      setHasSentPosition(true);
    };

    // Check position after scrolling or when mode changes
    if (isNavMode) {
      setTimeout(sendPositionToNav, 300);
    } else {
      setHasSentPosition(false);
    }

    const handleScroll = () => {
      if (isNavMode && !hasSentPosition) {
        sendPositionToNav();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavMode, hasSentPosition, nameWrapperScale]);

  useEffect(() => {
    const handleResize = () => {
      setHasSentPosition(false); // Reset position on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    >
      <div
        className={styles.nameRotationWrapper}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
        }}
      >
        <h2 className={styles.name}>
          {['Phyu', 'Phyu'].map((word, index) => (
            <WordRow
              key={index}
              word={word}
              hasMovedRef={hasMovedRef}
              rotation={rotation}
              shadowLength={shadowLength}
            />
          ))}
        </h2>
      </div>
    </motion.div>
  );
};

export default NameComponent;
