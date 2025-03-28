import { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./AnimatedHeading.module.scss";

const fonts = [
  "ZTBrosOskon90s-Light",
  "ZTBrosOskon90s-Italic",
  "ZTBrosOskon90s-LightItalic",
];

const colors = [
  "var(--jet2)",
  "var(--lapis)",
  "var(--cobalt-blue)",
];

const AnimatedHeading = () => {
  const text = "Web Developer";
  const [charStyles, setCharStyles] = useState(
    text.split("").map(() => ({ fontFamily: "inherit", color: "inherit" }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCharStyles((prevStyles) =>
        prevStyles.map((style) => ({
          fontFamily: Math.random() > 0.8
            ? fonts[Math.floor(Math.random() * fonts.length)]
            : style.fontFamily,
          color: Math.random() > 0.8
            ? colors[Math.floor(Math.random() * colors.length)]
            : style.color,
        }))
      );
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
