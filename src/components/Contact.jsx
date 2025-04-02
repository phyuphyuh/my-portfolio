import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  return (
    <nav className={styles.contact}>
      <ul className={styles.contactList}>
        <li className={styles.contactItem}>
          <a href="https://github.com/phyuphyuh" className={styles.contactLink}><FontAwesomeIcon icon={faGithub} /></a>
        </li>
        <li className={styles.navItem}>
          <a href="www.linkedin.com/in/phyuphyuhlaing" className={styles.contactLink}><FontAwesomeIcon icon={faLinkedin} /></a>
        </li>
        <li className={styles.navItem}>
          <a href="#contact" className={styles.contactLink}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Contact;
