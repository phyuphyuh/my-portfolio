import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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

const About = () => {
  const { scrollYProgress } = useScroll();
  const width = useWindowWidth();

  const x = useTransform(
    scrollYProgress,
    [0, 0.8],
    width < 768 ? ["100vw", "0vw"] : ["100vw", "40vw"]
  );

  return (
    <section className={styles.about}>
      <motion.div
        className={styles.aboutContent}
        style={{ x }}
      >
        {/* <img className={styles.aboutContainer} src={AboutSVG} /> */}
        <svg
          viewBox="0 0 246.11736 142.17525"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.aboutContainer}
        >
          <path
            d="M 86.349982,0.57007852 C 81.716962,0.57054276 77.083849,0.56913053 72.45093,0.60762596 56.738945,1.5649671 40.83819,-0.14462533 25.295436,2.7255624 -4.5750897,8.3293636 0.96183503,34.8754 0.97873581,59.214562 0.82695128,76.056355 0.61430587,92.877982 2.8696085,109.59689 c 4.6054148,27.18834 20.1551235,29.91823 44.8891975,29.91048 29.313323,0.25226 29.993061,1.21715 95.664374,1.03113 2.63847,0.16408 5.2754,0.333 7.91785,0.42213 17.19467,0.48105 33.57568,0.60976 58.28462,0.60976 h 4.16269 c 8.84636,0.36555 17.48107,-1.29647 23.34423,-8.47831 6.20757,-7.06172 9.21787,-16.72327 8.2475,-26.06474 -0.6714,-12.037114 -0.96012,-21.610508 -0.83813,-31.997418 0.12191,-10.38691 0.17631,-20.630488 0.12617,-31.137518 -0.0261,-3.022668 -0.0344,-6.051636 -0.30951,-9.064281 -0.22865,-2.10639 -0.47242,-4.217033 -0.84516,-6.3026 -0.37115,-1.66514 -0.73743,-3.336115 -1.21144,-4.974868 -0.41198,-1.234294 -0.88339,-2.433794 -1.47881,-3.593115 C 233.0633,1.2279137 214.61473,1.8240232 197.13077,0.87026849 191.00836,0.5322954 184.88066,0.53986691 178.7504,0.5735905 c -8.09473,0 -16.18995,-3.54e-6 -24.28466,0 -7.61692,0 -15.23377,-1.063e-5 -22.8507,0 -6.08651,8.86e-6 -12.17301,3.367e-5 -18.2595,0 -4.46862,-5.138e-5 -8.93689,-8.682e-5 -13.405497,-9.1609e-4 -4.532964,-9.3736e-4 -9.066654,-0.002304 -13.599635,-0.002835 z"
            fill="none"
            stroke="var(--lighter-jet)"
            strokeWidth="3"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 128.06891,139.95814 C 46.174015,138.57866 30.580325,138.10077 26.067347,136.83213 10.743953,132.52459 4.7292454,123.07263 2.8250424,100.30745 1.7795259,87.808103 1.2224575,34.728469 2.0735229,28.700043 3.8781428,15.917224 8.7303679,9.2836783 19.121949,5.3928805 28.024969,2.0594328 33.529763,1.8170028 110.52512,1.3675196 c 92.37493,-0.53926208 106.43395,0.11911 117.05702,5.4816153 7.23647,3.6529571 12.5853,11.0943981 14.8667,20.6829401 0.92582,3.891097 1.15936,10.495083 1.2936,36.580187 0.24785,48.146088 1.42475,46.773448 0.34973,52.303748 -1.89743,9.76119 -8.92109,19.33967 -16.39537,22.35914 -5.08916,2.05594 -39.15562,2.20161 -99.62789,1.18299 z"
            fill="var(--wave)"
            fillOpacity={0.854902}
            stroke="none"
            strokeWidth="0"
          />
        </svg>
        <h2 className={styles.aboutTitle}>About Me</h2>
        <p className={styles.aboutText}>
          Hi! I'm Phyu Phyu, a full-stack developer with a passion for frontend. Trained in Tokyo. From Yangon.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
