import { useRef } from 'react';
import { useScroll } from 'motion/react';
import styles from './Home.module.scss';
import NameComponent from './NameComponent';
import About from "./About";
import ScatterImages from './ScatterImages';
import AnimatedHeading from './AnimatedHeading';
import { web_developer_paths, yangon_mm_paths, portfolio_paths, me_paths } from '../data/svgPaths.js';

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className={styles.homeContainer}>
      <div className={styles.fixedBackground}></div>

      <section className={styles.home}>
        <NameComponent scrollYProgress={scrollYProgress} />

        <ScatterImages containerRef={containerRef} />
        <AnimatedHeading letters={web_developer_paths} className={styles.webdev} />
        <AnimatedHeading letters={yangon_mm_paths} className={styles.yangon} />
        <AnimatedHeading letters={portfolio_paths} className={styles.portfolio} />

        <About scrollYProgress={scrollYProgress} />
      </section>
    </div>
  );
};

export default Home;
