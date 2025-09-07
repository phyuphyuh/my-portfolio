import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import styles from './Home.module.scss';
import NameComponent from './NameComponent';
import About from "./About";
import ScatterImages from './ScatterImages';
import AnimatedHeading from './AnimatedHeading';
import { web_developer_paths, yangon_mm_paths, portfolio_paths, email_paths } from '../data/svgPaths.js';

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const dimmedOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <section ref={containerRef} className={styles.home}>
      <div className={`${styles.homeBackground} ${styles.bgDefault}`} />
      <motion.div
        className={`${styles.homeBackground} ${styles.bgDimmed}`}
        style={{ opacity: dimmedOpacity }}
      />

      <div className={styles.homeContent}>
        <NameComponent scrollYProgress={scrollYProgress} />

        <ScatterImages containerRef={containerRef} scrollYProgress={scrollYProgress} />
        <AnimatedHeading
          sectionRef={containerRef}
          letters={web_developer_paths}
          className={styles.webdev}
          inViewOptions={{ margin: "-15% 0px", amount: 0.3 }}
        />
        <AnimatedHeading
          sectionRef={containerRef}
          letters={yangon_mm_paths}
          className={styles.yangon}
          inViewOptions={{ margin: "-15% 0px", amount: 0.3 }}
        />
        <AnimatedHeading
          sectionRef={containerRef}
          letters={portfolio_paths}
          className={styles.portfolio}
          inViewOptions={{ margin: "-15% 0px", amount: 0.3 }}
        />

        <a href="mailto:phyuphyu.h27@gmail.com">
          <AnimatedHeading
            sectionRef={containerRef}
            letters={email_paths}
            className={styles.email}
            viewBox="0 0 100 100"
            inViewOptions={{ margin: "-15% 0px", amount: 0.3 }}
          />
        </a>

        <About scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
};

export default Home;
