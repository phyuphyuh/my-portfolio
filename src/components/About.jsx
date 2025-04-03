import styles from "./About.module.scss";

const About = () => {

  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutTitle}>About Me</h2>
        <p className={styles.aboutText}>
          Hi! I'm Phyu Phyu, a full-stack developer with a passion for frontend. Trained in Tokyo. From Yangon.
        </p>
      </div>
    </section>
  );
};

export default About;
