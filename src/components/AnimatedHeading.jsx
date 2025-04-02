import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./AnimatedHeading.module.scss";

const AnimatedHeading = ({ letters, className }) => {
  const [key, setKey] = useState(0);
  const totalDuration = 0.4 + letters.length * 0.3;
  const fadeOutDuration = totalDuration + 2.5;

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, (totalDuration + fadeOutDuration) * 1000);

    return () => clearInterval(interval);
  }, [totalDuration, fadeOutDuration]);

  return (
    <AnimatePresence propagate mode="wait">
      <motion.div
        key={key}
        className={`${styles.animatedText} ${className}`}
        initial="hidden"
        animate="visible"
        // initial={{ opacity: 1 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
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
                    delay: 0.4 + index * 0.3,
                  },
                }}
                exit={{
                  strokeDashoffset: "100%",
                  strokeOpacity: 0,
                  transition: {
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: 0.4 + (letters.length - 1 - index) * 0.3,
                  },
                }}
            />
          ))}
        </svg>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedHeading;
