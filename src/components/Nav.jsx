import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#projects" className={styles.navLink}>Projects</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
