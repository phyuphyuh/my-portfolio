import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import TabSVG from "../assets/contacttab3.svg";

const Contact = () => {
  return (
    <nav className={styles.contact}>
      <div className={styles.contactInner}>
        <img className={styles.tab} src={TabSVG} alt="Contact Tab" />
        <ul className={styles.contactList}>
          <li className={styles.contactItem}>
            <a href="https://github.com/phyuphyuh" target="_blank" className={styles.contactLink}><FontAwesomeIcon icon={faGithub} /></a>
          </li>
          <li className={styles.contactItem}>
            <a href="https://www.linkedin.com/in/phyuphyuhlaing" target="_blank" className={styles.contactLink}><FontAwesomeIcon icon={faLinkedin} /></a>
          </li>
          <li className={styles.contactItem}>
            <a href="mailto:phyuphyu.h27@gmail.com" className={styles.contactLink}><FontAwesomeIcon icon={faEnvelope} /></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Contact;
