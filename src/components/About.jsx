import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import { me_paths } from "../svgPaths.js";
import pp from "../assets/pp3small.png";
import pp2 from "../assets/pp3small2.png";
import styles from "./About.module.scss";
// import AboutSVG from "../assets/aboutcontainer3.svg";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const borderPaths = [
  "m 1.1702114,3.1762882 c 0,18.8905558 0,37.7811108 0.027862,49.8175708 0.027862,12.036461 0.083587,17.218826 0.1393109,22.40119",
  "M 2.3404228,2.0060767 C 15.881441,1.3373844 29.422457,0.66869226 37.864698,0.27862174 c 8.44224,-0.39007051 11.7857,-0.50151919 13.95895,-0.33434575 2.173251,0.16717344 3.176289,0.61296788 4.179327,1.05876231",
  "m 56.337321,3.5106342 c 0,4.903743 0,9.8074858 0,20.3672508 0,10.559765 0,26.775551 -0.02786,36.638761 -0.02786,9.86321 -0.08359,13.373845 -0.334347,14.683367 -0.25076,1.309522 -0.696554,0.417934 -1.142349,-0.473656",
  "M 1.3373845,74.726357 C 18.500485,74.837806 35.663587,74.949254 52.826687,75.060703",
]

const About = () => {
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  // const width = useWindowWidth();

  // const x = useTransform(
  //   scrollYProgress,
  //   [0.3, 0.8],
  //   width < 768 ? ["100vw", "5vw"] : ["100vw", "0vw"]
  // );

  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.35) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <section ref={aboutRef} className={styles.about}>
      <AnimatedHeading letters={me_paths} className={styles.title} viewBox="-2 -2 80 57" />
      <motion.div
        className={styles.aboutImg}
        whileHover="hover"
        initial="initial"
        style={{
          x: useTransform(scrollYProgress, [0.2, 0.3, 0.6], ["-10%", "0%", "5%"]),
          y: useTransform(scrollYProgress, [0.2, 0.3, 0.6], ["100%", "0%", "-150%"]),
          scale: useTransform(scrollYProgress, [0.2, 0.3, 0.6], [0.8, 1, 1.1]),
          rotate: useTransform(scrollYProgress, [0.2, 0.3, 0.6], [15, 0, -10]),
        }}
      >
        <div className={styles.aboutImgInner}>
          <svg
            className={styles.borderSvg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 -1 58 77"
          >
            {borderPaths.map((d, index) => (
              <motion.path
                key={index}
                d={d}
                fill="transparent"
                stroke="var(--lighter-jet)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                vector-effect="non-scaling-stroke"
                variants={{
                  initial: {
                    strokeDasharray: 300,
                    strokeDashoffset: 300,
                  },
                  hover: {
                    strokeDashoffset: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.2 + index * 0.2,
                    },
                  },
                }}
              />
            ))}
          </svg>
          <motion.img
            src={pp}
            alt="Me"
            variants={{
              hover: {
                scale: 1.2,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              },
            }}
          />
        </div>
      </motion.div>
      <motion.img
        className={styles.fixedImg}
        src={pp2}
        alt="Me"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className={styles.aboutContent}
      >
        <p className={styles.aboutText}>
          Full-stack developer with a passion for frontend.
        </p>
        <p className={styles.aboutText}>
          Trained in Tokyo. From Yangon.
        </p>
      </div>
      <motion.div>

      </motion.div>
    </section>
  );
};

export default About;
