import { useState } from "react";
import { motion } from "motion/react";
import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import TabSVG from "../assets/contacttab5.svg";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={styles.contact}
      initial={false}
      animate={{ left: isOpen ? '-84px' : '-130px' }}
      whileHover={{ left: '-84px'}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onTap={() => setIsOpen((prev) => !prev)}
    >
      <div className={styles.contactInner}>
        <img className={styles.tab} src={TabSVG} alt="Contact Tab" />

        <ul className={styles.contactList}>
          <motion.li
            className={styles.contactItem}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <a href="https://github.com/phyuphyuh" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
          </motion.li>
          <motion.li
            className={styles.contactItem}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <a href="https://www.linkedin.com/in/phyuphyuhlaing" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
          </motion.li>
          <motion.li
            className={styles.contactItem}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <a href="mailto:phyuphyu.h27@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
          </motion.li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Contact;
