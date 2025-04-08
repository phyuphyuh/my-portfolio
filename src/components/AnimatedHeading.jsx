import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import styles from "./AnimatedHeading.module.scss";

const AnimatedHeading = ({ letters, className, viewBox = "0 0 300 100" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "10% 0px", amount: "all" });

  const [key, setKey] = useState(0);
  const [wasInView, setWasInView] = useState(false);

  const totalDuration = 0.1 + letters.length * 0.2;
  const fadeOutDuration = totalDuration + 1.5;

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isInView && !wasInView) {
      setKey((prev) => prev + 1);
    }
    setWasInView(isInView);
  }, [isInView, wasInView]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setKey((prevKey) => prevKey + 1);
  //   }, (totalDuration + fadeOutDuration) * 1000);

  //   return () => clearInterval(interval);
  // }, [totalDuration, fadeOutDuration]);

  return (
    <div ref={ref} className={styles.animatedTextWrapper}>
      <AnimatePresence propagate mode="wait" initial={false}>
        {isInView && (
          <motion.div
            key={key}
            className={`${styles.animatedText} ${className}`}
            initial="hidden"
            animate="visible"
            transition={{ duration: fadeOutDuration, ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
              {letters.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    fill="transparent"
                    stroke="var(--lighter-jet)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ strokeDasharray: 800, strokeDashoffset: 800 }}
                    // animate={{ strokeDashoffset: 0 }}
                    // exit={{ strokeOpacity: 0, strokeDashoffset: "100%" }}
                    // transition={{
                    //   duration: 0.4,
                    //   ease: "easeInOut",
                    //   delay: 0.4 + index * 0.3,
                    // }}
                    animate={{
                      strokeDashoffset: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.1 + index * 0.2,
                      },
                    }}
                    exit={{
                      strokeDashoffset: 800,
                      transition: {
                        duration: 0.1,
                        ease: "easeOut",
                        delay: 0.1 + (letters.length - 1 - index) * 0.1,
                        // delay: 0.2,
                      },
                    }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeading;
