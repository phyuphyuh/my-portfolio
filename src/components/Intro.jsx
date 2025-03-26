// import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import styles from "./Intro.module.scss";
// import cloudImage from "../assets/cloud.png";

const Intro = () => {
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
        const { innerWidth: width, innerHeight: height } = window;
        const x = (e.clientX / width - 0.5) * 30;
        const y = (e.clientY / height - 0.5) * -30;
        setRotation({ x, y });

        const centerX = width / 2;
        const centerY = height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        const newShadowLength = Math.max(0.2, 1.5 - distance / 300);
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
    <section className={styles.intro}>
      <div className={styles.header}>
        <div
          className={styles.nameWrapper}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
          }}
        >
          <h2 className={styles.name}>Phyu Phyu</h2>
          {hasMovedRef.current && (
            <div
              className={styles.shadow}
              style={{
                transform: `rotateX(${rotation.y}deg) scaleY(${shadowLength}) skew(${rotation.x * 0.5}deg)`,
              }}
            >
              Phyu Phyu
            </div>
          )}
        </div>
        <div className={styles.title}>
          <h1>Web Developer</h1>
        </div>
        {/* <div className={styles.images}>
          <img
            className={styles.clouds}
            src={cloudImage}
            alt="clouds"
          />
        </div> */}

        {/* <motion.div
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h1
            className={styles.nameOne}
            variants={{
              hidden: { y: 100, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
            }}
          >
            Phyu
          </motion.h1>{" "}
          <motion.h1
            className={styles.nameTwo}
            variants={{
              hidden: { y: 100, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
            }}
          >
            Phyu
          </motion.h1>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Intro;
