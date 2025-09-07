import { useState, useRef } from "react";
import { motion, useTransform, useMotionValueEvent } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import { about_path } from "../data/svgPaths.js";
// import me from "../assets/images/me1.jpg";
// import me2 from "../assets/images/me2.jpg";
// import pp from "../assets/images/pp3small.png";
// import pp2 from "../assets/images/pp3small2.png";
import styles from "./About.module.scss";
// import AboutSVG from "../assets/aboutcontainer3.svg";

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
    ["0%", "-70%"]
  );

  const middleLayerY = useTransform(
    scrollYProgress,
    [0.30, 0.9],
    ["0%", "-85%"]
  );

  const backLayerY = useTransform(
    scrollYProgress,
    [0.35, 0.9],
    ["0%", "-100%"]
  );

  const layers = [
    {
      y: frontLayerY,
      pairs: [
        { top: "Massive foodie", bottom: "Life rookie", position: { top: '70%', left: '15%' } },
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
        { top: "Flannel wearer", bottom: "Whim weaver", position: { top: '95%', left: '5%' } },
        { top: "Master escapist", bottom: "Neurotic perfectionist", position: { top: '35%', left: '60%' } },
        { top: "Shower singer", bottom: "Sky gazer", position: { top: '5%', left: '10%' } },
        { top: "Expert navigator", bottom: "Chapstick collector", position: { top: '95%', left: '90%' } },
        { top: "Perennial bloomer", bottom: "Aisle roamer", position: { top: '80%', left: '80%' } },
        { top: "Designated snapper", bottom: "Anemic napper", position: { top: '25%', left: '85%' } },
        { top: "Shy snob", bottom: "Stylish slob", position: { top: '80%', left: '0%' } },
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

    const shadowBlur = 2 + (distanceFromCenter * 1);
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

    </motion.section>
  );
};

export default About;
