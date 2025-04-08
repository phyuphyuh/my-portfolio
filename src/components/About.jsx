import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useAnimation } from "motion/react";
import AnimatedHeading from './AnimatedHeading';
import { me_paths } from "../svgPaths.js";
import pp from "../assets/pp3small.png";
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
  const { scrollYProgress } = useScroll();
  const width = useWindowWidth();

  // const x = useTransform(
  //   scrollYProgress,
  //   [0.3, 0.8],
  //   width < 768 ? ["100vw", "5vw"] : ["100vw", "0vw"]
  // );

  const y = useTransform(
    scrollYProgress,
    [0.20, 0.3, 0.5],
    ["120%", "0%", "-100%"]
  );

  const x = useTransform(
    scrollYProgress,
    [0.10, 0.3, 0.5],
    ["-5%", "5%", "0%"]
  );

  const scale = useTransform(scrollYProgress,  [0.10, 0.3, 0.5], [0.8, 1.2, 1]);
  const rotate = useTransform(scrollYProgress,  [0.10, 0.3, 0.5], [10, 5, 0]);

  return (
    <section className={styles.about}>
      <AnimatedHeading letters={me_paths} className={styles.me} viewBox="-2 -2 80 57" />
      <motion.div
        className={styles.aboutImg}
        whileHover="hover"
        initial="initial"
        style={{ x, y, rotate, scale }}
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
      <motion.div
        className={styles.aboutContent}
      >
        {/* <img className={styles.aboutContainer} src={AboutSVG} /> */}
        {/* <svg
          viewBox="0 0 246.11736 142.17525"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.aboutContainer}
        >
          <path
            d="M 86.349982,0.57007852 C 81.716962,0.57054276 77.083849,0.56913053 72.45093,0.60762596 56.738945,1.5649671 40.83819,-0.14462533 25.295436,2.7255624 -4.5750897,8.3293636 0.96183503,34.8754 0.97873581,59.214562 0.82695128,76.056355 0.61430587,92.877982 2.8696085,109.59689 c 4.6054148,27.18834 20.1551235,29.91823 44.8891975,29.91048 29.313323,0.25226 29.993061,1.21715 95.664374,1.03113 2.63847,0.16408 5.2754,0.333 7.91785,0.42213 17.19467,0.48105 33.57568,0.60976 58.28462,0.60976 h 4.16269 c 8.84636,0.36555 17.48107,-1.29647 23.34423,-8.47831 6.20757,-7.06172 9.21787,-16.72327 8.2475,-26.06474 -0.6714,-12.037114 -0.96012,-21.610508 -0.83813,-31.997418 0.12191,-10.38691 0.17631,-20.630488 0.12617,-31.137518 -0.0261,-3.022668 -0.0344,-6.051636 -0.30951,-9.064281 -0.22865,-2.10639 -0.47242,-4.217033 -0.84516,-6.3026 -0.37115,-1.66514 -0.73743,-3.336115 -1.21144,-4.974868 -0.41198,-1.234294 -0.88339,-2.433794 -1.47881,-3.593115 C 233.0633,1.2279137 214.61473,1.8240232 197.13077,0.87026849 191.00836,0.5322954 184.88066,0.53986691 178.7504,0.5735905 c -8.09473,0 -16.18995,-3.54e-6 -24.28466,0 -7.61692,0 -15.23377,-1.063e-5 -22.8507,0 -6.08651,8.86e-6 -12.17301,3.367e-5 -18.2595,0 -4.46862,-5.138e-5 -8.93689,-8.682e-5 -13.405497,-9.1609e-4 -4.532964,-9.3736e-4 -9.066654,-0.002304 -13.599635,-0.002835 z"
            fill="none"
            stroke="var(--lighter-jet)"
            strokeWidth="2.5"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 128.06891,139.95814 C 46.174015,138.57866 30.580325,138.10077 26.067347,136.83213 10.743953,132.52459 4.7292454,123.07263 2.8250424,100.30745 1.7795259,87.808103 1.2224575,34.728469 2.0735229,28.700043 3.8781428,15.917224 8.7303679,9.2836783 19.121949,5.3928805 28.024969,2.0594328 33.529763,1.8170028 110.52512,1.3675196 c 92.37493,-0.53926208 106.43395,0.11911 117.05702,5.4816153 7.23647,3.6529571 12.5853,11.0943981 14.8667,20.6829401 0.92582,3.891097 1.15936,10.495083 1.2936,36.580187 0.24785,48.146088 1.42475,46.773448 0.34973,52.303748 -1.89743,9.76119 -8.92109,19.33967 -16.39537,22.35914 -5.08916,2.05594 -39.15562,2.20161 -99.62789,1.18299 z"
            fill="var(--wave)"
            fillOpacity={0.854902}
            stroke="none"
            strokeWidth="0"
          />
        </svg> */}
        {/* <h2 className={styles.aboutTitle}>About Me</h2> */}
        <p className={styles.aboutText}>
          Full-stack developer with a passion for frontend.
        </p>
        <p className={styles.aboutText}>
          Trained in Tokyo. From Yangon.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
