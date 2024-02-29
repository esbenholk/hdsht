import styles from "./TextBlock.module.scss";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PrismicRichText } from "@prismicio/react";

const drop = {
  up: {
    y: -60,
    opacity: 0,
  },
  down: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.7,
    },
  },
};

const TextBlock = ({ slice }) => {
  const text = useRef();
  const inView = useInView(text, { once: true });

  return (
    <motion.div
      className={styles.TextBlock}
      ref={text}
      variants={drop}
      animate={inView ? "down" : "up"}
      initial="up"
      exit={"up"}
    >
      {slice.items?.map((item, key) => {
        return (
          <motion.div
            className={styles.TextBlock__Content}
            key={key}
            variants={drop}
          >
            <PrismicRichText field={item.content} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TextBlock;
