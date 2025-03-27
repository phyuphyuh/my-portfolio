import { animate, hover } from "motion";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import mochi from "../assets/mochi.png";
import muffin from "../assets/muffin.png";
import milo from "../assets/milo.png";
import styles from "./ScatterImages.module.scss";

const images = [mochi, muffin, milo];

const ScatterImages = ({ containerRef }) => {
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);

  useEffect(() => {
      if (!containerRef.current) return;

      const imageElements = containerRef.current.querySelectorAll(`.${styles.scatterImg}`);

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

  return images.map((src, index) => (
    <img key={index} src={src} className={styles.scatterImg} alt="scatter" />
  ));
};

export default ScatterImages;
