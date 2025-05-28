import { useEffect, useState, useRef } from "react";
import { motion, useTransform, useMotionValueEvent } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import { me_paths } from "../data/svgPaths.js";
import { about_path } from "../data/svgPaths.js";
// import me from "../assets/images/me1.jpg";
// import me2 from "../assets/images/me2.jpg";
import pp from "../assets/images/pp3small.png";
import pp2 from "../assets/images/pp3small2.png";
import styles from "./About.module.scss";
// import AboutSVG from "../assets/aboutcontainer3.svg";

// const borderPaths = [
//   "m 1.1702114,3.1762882 c 0,18.8905558 0,37.7811108 0.027862,49.8175708 0.027862,12.036461 0.083587,17.218826 0.1393109,22.40119",
//   "M 2.3404228,2.0060767 C 15.881441,1.3373844 29.422457,0.66869226 37.864698,0.27862174 c 8.44224,-0.39007051 11.7857,-0.50151919 13.95895,-0.33434575 2.173251,0.16717344 3.176289,0.61296788 4.179327,1.05876231",
//   "m 56.337321,3.5106342 c 0,4.903743 0,9.8074858 0,20.3672508 0,10.559765 0,26.775551 -0.02786,36.638761 -0.02786,9.86321 -0.08359,13.373845 -0.334347,14.683367 -0.25076,1.309522 -0.696554,0.417934 -1.142349,-0.473656",
//   "M 1.3373845,74.726357 C 18.500485,74.837806 35.663587,74.949254 52.826687,75.060703",
// ]

const About = ({ scrollYProgress }) => {
  const sectionRef = useRef(null);
  const aboutContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const aboutSectionY = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.9, 1],
    ["100vh", "0vh", "0vh", "-100vh"]
  );

  const aboutContainerScale = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.8],
    [0, 1, 1.1]
  );

  const mainTextY = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 0.8],
    ["0%", "0%", "0%", "0%"]
  );

  const detailsY = useTransform(
    scrollYProgress,
    [0.3, 0.55, 0.7, 0.9],
    ["150%", "0%", "-80%", "-100%"]
  );

  const mainScale = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 0.8],
    [0.8, 1, 1.1, 1.2]
  );

  const detailsOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.40, 0.7],
    [0, 1, 1]
  );

  const frontLayerY = useTransform(
    scrollYProgress,
    [0.30, 0.9],
    ["0%", "-50%"]
  );

  const middleLayerY = useTransform(
    scrollYProgress,
    [0.30, 0.9],
    ["0%", "-70%"]
  );

  const backLayerY = useTransform(
    scrollYProgress,
    [0.35, 0.9],
    ["0%", "-90%"]
  );

  const layers = [
    {
      y: frontLayerY,
      pairs: [
        { top: "Massive foodie", bottom: "Life rookie", position: { top: '65%', left: '15%' } },
        { top: "Anxious zillennial", bottom: "Go-to material", position: { top: '5%', left: '75%' } },
      ],
      style: {
        // fontSize: "clamp(1.4rem, 1.2rem + 1vw, 1.8rem)",
        fontSize: "clamp(1rem, 1rem + 1vw, 1.4rem)",
        zIndex: 3,
        opacity: "var(--layer1-opacity)",
      }
    },
    {
      y: middleLayerY,
      pairs: [
        { top: "Cat lady", bottom: "Precocious baby", position: { top: '25%', left: '30%' } },
        { top: "Shadow dweller", bottom: "Book dabbler", position: { top: '70%', left: '65%' } },
        { top: "Aspiring baker", bottom: "City walker", position: { top: '35%', left: '10%' } }
      ],
      style: {
        // fontSize: "clamp(1.2rem, 1rem + 1vw, 1.6rem)",
        fontSize: "clamp(0.8rem, 0.8rem + 1vw, 1.2rem)",
        zIndex: 2,
        opacity: "var(--layer2-opacity)",
      }
    },
    {
      y: backLayerY,
      pairs: [
        { top: "Coffee sipper", bottom: "Hardcore shipper", position: { top: '80%', left: '40%' } },
        { top: "Flannel wearer", bottom: "Whim weaver", position: { top: '90%', left: '5%' } },
        { top: "Master escapist", bottom: "Neurotic perfectionist", position: { top: '35%', left: '60%' } },
        { top: "Shower singer", bottom: "Sky gazer", position: { top: '20%', left: '10%' } },
        { top: "Expert navigator", bottom: "Chapstick collector", position: { top: '50%', left: '85%' } },
        { top: "Perennial bloomer", bottom: "Aisle roamer", position: { top: '80%', left: '80%' } },
        { top: "Designated snapper", bottom: "Awkward yapper", position: { top: '30%', left: '85%' } },
      ],
      style: {
        // fontSize: "clamp(1rem, 0.8rem + 1vw, 1.4rem)",
        fontSize: "clamp(0.6rem, 0.6rem + 1vw, 1rem)",
        zIndex: 1,
        opacity: "var(--layer3-opacity)",
      }
    }
  ];

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.48) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const handleMouseMove = (e) => {
    const container = aboutContainerRef.current;
    if (!container) return;

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Set flashlight position
    container.style.setProperty("--x", `${x}px`);
    container.style.setProperty("--y", `${y}px`);

    // Find the shadowOverlay element
    const shadowOverlay = container.querySelector('.shadowOverlay');
    if (shadowOverlay) {
      const shadowRect = shadowOverlay.getBoundingClientRect();

      // Calculate mouse position relative to shadowOverlay
      const shadowX = e.clientX - shadowRect.left;
      const shadowY = e.clientY - shadowRect.top;

      // Set these as custom properties on the shadowOverlay
      shadowOverlay.style.setProperty("--overlay-x", `${shadowX}px`);
      shadowOverlay.style.setProperty("--overlay-y", `${shadowY}px`);
    }

    // Perspective calculation
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // Calculate distance from center
    const distanceFromCenterX = (x - centerX) / centerX;
    const distanceFromCenterY = (y - centerY) / centerY;

    // Calculate perspective factor - stronger at edges
    const distanceFromCenter = Math.sqrt(distanceFromCenterX**2 + distanceFromCenterY**2);
    const perspectiveFactor = Math.min(distanceFromCenter * 1.5, 1);

    const shadowDistanceX = -distanceFromCenterX * 25 * perspectiveFactor;
    const shadowDistanceY = -distanceFromCenterY * 25 * perspectiveFactor;

    container.style.setProperty("--shadow-x", `${shadowDistanceX}px`);
    container.style.setProperty("--shadow-y", `${shadowDistanceY}px`);

    const shadowBlur = 2 + (distanceFromCenter * 2);
    container.style.setProperty("--shadow-blur", `${shadowBlur}px`);

    const shadowOpacity = 0.5 + (distanceFromCenter * 0.3);
    container.style.setProperty("--shadow-opacity", shadowOpacity.toFixed(2));
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.about}
      style={{
        y: aboutSectionY,
      }}
    >
      <motion.div
        ref={aboutContainerRef}
        className={styles.aboutContainer}
        onMouseMove={handleMouseMove}
        style={{
          scale: aboutContainerScale,
        }}
      >
        {/* <AnimatedHeading
          sectionRef={sectionRef}
          letters={me_paths}
          className={styles.title}
          viewBox="-2 -2 80 57"
          inViewOptions={{ margin: "-10% 0px", amount: 0.7 }}
        /> */}
        {/* <svg
          className={styles.borderSvg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 90"
        >
          <g transform="translate(-49.724753,-41.190831)">
            <path
              d={about_path}
              fill="transparent"
              stroke="var(--scriptwhite)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg> */}

        <div className={styles.aboutContent}>
          <motion.div
            className={styles.aboutMain}
            style={{
              y: mainTextY,
              scale: mainScale,
            }}
          >
            {/* <div className={styles.imageWrapper}>
              <img src={me} alt="Me" className={styles.aboutImg} />
              <img src={me2} alt="Me" className={styles.aboutImg} />
            </div> */}

            <p className={styles.aboutText}>
              &nbsp;Full-stack developer with a passion for frontend and design.&nbsp;
            </p>
            <p className={styles.aboutText}>
              &nbsp;Trained in Tokyo. From Yangon.&nbsp;
            </p>
          </motion.div>

          <motion.div
            className={styles.aboutDetailsContainer}
            style={{
              // y: detailsY,
              opacity: detailsOpacity,
            }}
          >
            {layers.map((layer, layerIndex) => (
              <motion.div
                key={`layer-${layerIndex}`}
                className={styles.descLayer}
                style={{
                  y: layer.y,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              >
                {layer.pairs.map((pair, pairIndex) => (
                  <div
                    key={`pair-${layerIndex}-${pairIndex}`}
                    className={styles.descPair}
                    style={{
                      position: 'absolute',
                      top: pair.position.top,
                      left: pair.position.left,
                      transform: 'translateX(-50%)',
                      ...layer.style
                    }}
                  >
                    <p className={styles.descTop}>{pair.top}</p>
                    <p className={styles.descBottom}>{pair.bottom}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className={`${styles.shadowOverlay} shadowOverlay`}>
          <motion.div
            className={styles.aboutMain}
            style={{
              y: mainTextY,
              scale: mainScale,
              zIndex: 10
            }}
          >
            {/* <div className={styles.imageWrapper}>
              <img src={me} alt="Me" className={styles.aboutImg} />
              <img src={me2} alt="Me" className={styles.aboutImg} />
            </div> */}

            <div className={styles.shadowText}>
              <p className={styles.aboutText}>
                &nbsp;Full-stack developer with a passion for frontend and design.&nbsp;
              </p>
              <p className={styles.aboutText}>
                &nbsp;Trained in Tokyo. From Yangon.&nbsp;
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.aboutDetailsContainer}
            style={{
              // y: detailsY,
              opacity: detailsOpacity,
              zIndex: 5
            }}
          >
            {layers.map((layer, layerIndex) => (
              <motion.div
                key={`shadow-layer-${layerIndex}`}
                className={styles.descLayer}
                style={{
                  y: layer.y,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              >
                {layer.pairs.map((pair, pairIndex) => (
                  <div
                    key={`shadow-pair-${layerIndex}-${pairIndex}`}
                    className={styles.descPair}
                    style={{
                      position: 'absolute',
                      top: pair.position.top,
                      left: pair.position.left,
                      transform: 'translateX(-50%)',
                      ...layer.style,
                      opacity: 1,
                    }}
                  >
                    <p className={`${styles.descTop} ${styles.shadowText}`}>{pair.top}</p>
                    <p className={`${styles.descBottom} ${styles.shadowText}`}>{pair.bottom}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* <motion.div
        className={styles.aboutImg}
        whileHover="hover"
        initial="initial"
        style={{
          x: useTransform(scrollYProgress, [0.4, 0.45, 0.7, 0.85], ["-10%", "0%", "5%", "50%"]),
          y: useTransform(scrollYProgress, [0.4, 0.45, 0.7, 0.85], ["200%", "0%", "-150%", "-300%"]),
          scale: useTransform(scrollYProgress, [0.4, 0.45, 0.7, 0.85], [0.8, 1, 1.1, 0.8]),
          rotate: useTransform(scrollYProgress, [0.4, 0.45, 0.7, 0.85], [15, 0, -10, -20]),
        }}
      > */}
        {/* <div className={styles.aboutImgInner}> */}
          {/* <svg
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
                vectorEffect="non-scaling-stroke"
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
          </svg> */}
          {/* <motion.img
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
      </motion.div> */}
      {/* <motion.img
        className={styles.fixedImg}
        src={pp2}
        alt="Me"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
        }}
      /> */}

    </motion.section>
  );
};

export default About;
