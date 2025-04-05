import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import styles from "./AnimatedHeading.module.scss";

const AnimatedHeading = ({ letters, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "20% 0px" });

  const [key, setKey] = useState(0);
  const [wasInView, setWasInView] = useState(false);

  const totalDuration = 0.1 + letters.length * 0.3;
  const fadeOutDuration = totalDuration + 1.5;

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
    <div ref={ref}>
      <AnimatePresence propagate mode="wait">
        {isInView && (
          <motion.div
            key={key}
            className={`${styles.animatedText} ${className}`}
            initial="hidden"
            animate="visible"
            transition={{ duration: fadeOutDuration, ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg">
              {letters.map((d, index) => (
                <motion.path
                    key={index}
                    d={d}
                    fill="transparent"
                    stroke="var(--lighter-jet)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ strokeDasharray: "100%", strokeDashoffset: "100%" }}
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
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.1 + index * 0.3,
                      },
                    }}
                    exit={{
                      strokeDashoffset: "100%",
                      transition: {
                        duration: 0.1,
                        ease: "easeOut",
                        // delay: 0.1 + (letters.length - 1 - index) * 0.3,
                        delay: 0.1,
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
