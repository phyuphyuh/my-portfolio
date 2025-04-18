import { useEffect, useState, useRef } from "react";
import ScatterImages from './ScatterImages';
import AnimatedHeading from './AnimatedHeading';
import { web_developer_paths, yangon_mm_paths, portfolio_paths } from "../data/svgPaths.js";
import styles from "./Intro.module.scss";

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

const Intro = ({ containerRef }) => {
  const hasMovedRef = useRef(false);
  const frameId = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shadowLength, setShadowLength] = useState(0.5);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
      }

      cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(() => {
        // Calculate rotation based on mouse position relative to the window center
        const { innerWidth: width, innerHeight: height } = window;
        const x = (e.clientX / width - 0.5) * 30;
        const y = (e.clientY / height - 0.5) * -30;
        setRotation({ x, y });

        const centerX = width / 2;
        const centerY = height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        const newShadowLength = Math.max(0.2, 1.5 - distance / 500);
        setShadowLength(newShadowLength);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId.current);
    };
  }, []);

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
    <section className={styles.intro}>
      <div
        className={styles.nameWrapper}
        style={{
          transform: `perspective(500px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
        }}
      >
        <h2 className={styles.name}>
          {nameElements}
        </h2>
      </div>
      <ScatterImages containerRef={containerRef} />
      <AnimatedHeading letters={web_developer_paths} className={styles.webdev} />
      <AnimatedHeading letters={yangon_mm_paths} className={styles.yangon} />
      <AnimatedHeading letters={portfolio_paths} className={styles.portfolio} />
    </section>
  );
};

export default Intro;
