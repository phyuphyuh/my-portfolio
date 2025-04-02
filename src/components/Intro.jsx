// import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import ScatterImages from './ScatterImages';
import AnimatedHeading from './AnimatedHeading';
import { web_developer_paths } from "../svgPaths.js";
import { yangon_mm_paths } from "../svgPaths.js";
import styles from "./Intro.module.scss";

const Intro = () => {
  const hasMovedRef = useRef(false);
  const frameId = useRef(null);
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shadowLength, setShadowLength] = useState(0.5);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
      }

      cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(() => {
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

  return (
    <section className={styles.intro} ref={containerRef}>
      <div
        className={styles.nameWrapper}
        style={{
          transform: `perspective(500px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
        }}
      >
        <h2 className={styles.name}>
          <span>
            Phyu
            {hasMovedRef.current && (
              <span className={styles.shadowWrapper}>
                <span className={styles.shadow} style={{ transform: `rotateX(${rotation.y}deg) scaleY(${shadowLength * 1.5}) skew(${rotation.x * 0.5}deg) translateX(${-(rotation.x)}px) translateY(${rotation.y}px)` }}>
                  Phyu
                </span>
              </span>
            )}
          </span>
          <span>
            Phyu
            {hasMovedRef.current && (
              <span className={styles.shadowWrapper}>
                <span className={styles.shadow} style={{ transform: `rotateX(${rotation.y}deg) scaleY(${shadowLength * 1.5}) skew(${rotation.x * 0.5}deg) translateX(${-(rotation.x)}px) translateY(${rotation.y}px)` }}>
                  Phyu
                </span>
              </span>
            )}
          </span>
        </h2>
      </div>
      <ScatterImages containerRef={containerRef} />
      <AnimatedHeading letters={web_developer_paths} className={styles.webdev} />
      <AnimatedHeading letters={yangon_mm_paths} className={styles.yangon} />
    </section>
  );
};

export default Intro;
