import styles from "./Hero.module.scss";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const drop = {
  hidden: {
    opacity: 0,
    transform: "rotateX(90deg)",
  },
  visible: {
    opacity: 1,
    transform: "rotateX(0deg)",
    transition: {
      duration: 0.05,
      staggerChildren: 0.01,
      ease: "easeInOut",
    },
  },
};

const Hero = ({ slice }) => {
  const character = useRef(null);
  const inView = useInView(character, { once: true });
  return (
    <motion.div
      className={styles.Container}
      variants={drop}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {slice.items?.map((item, index) => {
        const letters = Array.from(item.hero_text);

        return (
          <motion.div key={index} className={styles.LineWrapper}>
            {letters.map((letter, key) => {
              return (
                <motion.span
                  key={key}
                  className={styles.Letter}
                  ref={character}
                  variants={drop}
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Hero;
