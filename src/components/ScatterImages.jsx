import { animate, hover } from "motion";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useRef } from "react";
import mochi from "../assets/images/mochiedit.png";
import muffin from "../assets/images/muffinedit.png";
import milo from "../assets/images/milo2.png";
import pac from "../assets/images/pac.png";
import matcha from "../assets/images/matcha.png";
import styles from "./ScatterImages.module.scss";

const images = [
  // { src: pp, size: 'large' },
  { src: mochi, size: 'small' },
  { src: muffin },
  { src: milo, size: 'xsmall' },
  // { src: pac, size: 'small' },
  // { src: matcha, size: 'small' },
];

const ScatterImages = ({ containerRef, scrollYProgress }) => {
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);
  const imagesRef = useRef([]);

  const exitProgress = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  useEffect(() => {
    if (!containerRef.current) return;

    const imageElements = containerRef.current.querySelectorAll(`.${styles.scatterImg}`);

    imagesRef.current = Array.from(imageElements);

    const handlePointerMove = (event) => {
      const now = performance.now();
      const timeSinceLastEvent = (now - prevEvent.current) / 1000;
      prevEvent.current = now;
      velocityX.set(event.movementX / timeSinceLastEvent);
      velocityY.set(event.movementY / timeSinceLastEvent);
    };

    document.addEventListener("pointermove", handlePointerMove);

    hover(imageElements, (element) => {
      const speed = Math.sqrt(
        velocityX.get() * velocityX.get() +
        velocityY.get() * velocityY.get()
      );
      const angle = Math.atan2(velocityY.get(), velocityX.get());
      const distance = speed * 0.1;

      animate(
        element,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        },
        { type: "spring", stiffness: 100, damping: 50 }
      );
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove)
    };
  }, [containerRef]);

   useMotionValueEvent(exitProgress, "change", (value) => {
    imagesRef.current.forEach((img) => {
      if (!img) return;

      // Get image position
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Find nearest edge
      const distToLeft = centerX;
      const distToRight = viewportWidth - centerX;
      const distToTop = centerY;
      const distToBottom = viewportHeight - centerY;

      const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

      // Calculate target position (outside viewport)
      let targetX = 0;
      let targetY = 0;

      if (minDist === distToLeft) {
        // Left edge is nearest
        targetX = -rect.width - 500;
      } else if (minDist === distToRight) {
        // Right edge is nearest
        targetX = viewportWidth + 500;
      } else if (minDist === distToTop) {
        // Top edge is nearest
        targetY = -rect.height - 500;
      } else {
        // Bottom edge is nearest
        targetY = viewportHeight + 500;
      }

      animate(img, {
        x: targetX * value,
        y: targetY * value,
      }, {
        // duration: 0.4,
        // easing: [0.22, 1, 0.36, 1]
        type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8
      });
    });
  });

  return images.map(({ src, size }, index) => (
    <motion.img
      key={index}
      src={src}
      className={`${styles.scatterImg} ${styles[`position${index + 1}`]} ${size ? styles[size] : ''}`}
      alt="scatter"
      ref={(el) => {
        if (el) imagesRef.current[index] = el;
      }}
    />
  ));
};

export default ScatterImages;
