import { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./AnimatedHeading.module.scss";

const fonts = [
  "Movement-DirectThin",
  "ZTBrosOskon90s-Regular",
  "Movement-IndirectBlack",
  "Subjectivity-Medium",
  "Meera Inimai",
  "Subjectivity-LightSlanted",
  "Subjectivity-Thin",
  "ZTBrosOskon90s-Light",
  "ZTBrosOskon90s-Italic",
];

const colors = [
  "var(--cobalt-blue)",
  "var(--prussian-blue)",
  "var(--mediumblue)",
  "var(--royalblue)",
  "var(--polynesianblue)",
  "var(--lighter-jet)",
  "var(--subtitleyellow)",
  "var(--aureolin)",
  "var(--naplesyellow)",
  "var(--flax)",
];

const AnimatedHeading = () => {
  const text = "Web Developer";
  const [charStyles, setCharStyles] = useState(
    text.split("").map(() => ({ fontFamily: "inherit", color: "inherit" }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newStyles = text.split("").map(() => ({
        fontFamily: Math.random() > 0.5
          ? fonts[Math.floor(Math.random() * fonts.length)]
          : "inherit",
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setCharStyles(newStyles);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={styles.title}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          style={{
            fontFamily: charStyles[index].fontFamily,
            color: charStyles[index].color
          }}
          animate={{ opacity: [0.8, 1], scale: [0.9, 1] }}
          transition={{ duration: 0.3 }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;
