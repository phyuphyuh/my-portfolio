import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#about" className={styles.navLink}>About</a>
        </li>
        <li className={styles.navItem}>
          <a href="#projects" className={styles.navLink}>Projects</a>
        </li>
        <li className={styles.navItem}>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
