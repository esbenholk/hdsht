import styles from "./BasicImage.module.scss";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const drop = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const BasicImage = ({ slice }) => {
  const img = useRef();
  const inView = useInView(img, { once: true });
  return (
    <motion.div
      className={styles.ImageContainer}
      ref={img}
      variants={drop}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      exit={"initial"}
    >
      <Image
        src={slice.primary.image.url}
        alt={slice.primary.title[0]?.text}
        width={Math.min(1000, slice.primary.image.dimensions.width)}
        height={Math.min(1000, slice.primary.image.dimensions.height)}
      />
    </motion.div>
  );
};

export default BasicImage;
