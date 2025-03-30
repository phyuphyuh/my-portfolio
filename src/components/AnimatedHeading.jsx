import { motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./AnimatedHeading.module.scss";

const AnimatedHeading = ({ letters, className }) => {
  const [key, setKey] = useState(0);
  const totalDuration = 0.4 + letters.length * 0.3;

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, totalDuration * 1000);

    return () => clearInterval(interval);
  }, [totalDuration]);

  return (
    <motion.div
      key={key}
      className={`${styles.animatedText} ${className}`}
      initial="hidden"
      animate="visible"
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
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: 0.2 + index * 0.3,
              }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default AnimatedHeading;
