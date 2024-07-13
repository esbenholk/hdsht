import { useEffect, useRef, useState } from "react";
import styles from "./Description.module.scss";
import PrismicRichTextResolver from "../../Resolvers/PrismicRichTextResolver/PrismicRichTextResolver";
import { motion, useInView } from "framer-motion";
import useCursor from "@/components/Resolvers/States/Cursor";

const DescriptionModal = ({ slice }) => {
  const div = useRef();
  const inView = useInView(div, { once: true });

  const slideInFromBottom = {
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
  };

  const letterBlend = {
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.25,
        type: "spring",
        staggerChildren: 0.5,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  const handleHover = (item) => {
    useCursor.setState({
      cursorVariant: "hoveronlink",
      shouldrenderdetailsontop: false,
      description: "",
      title: "",
      shouldrenderdetailsontop: false,
      instruction: "",

    });
  };
  const handleLeave = (e) => {
    useCursor.setState({
      cursorVariant: "default",
      shouldrenderdetailsontop: false,
      description: "",
      title: "",
      shouldrenderdetailsontop: false,
      instruction: "",

    });
  };

  return (
    slice?.items && (
      <div className={styles.Container}>
        <PrismicRichTextResolver
          fields={slice.primary.title}
          className={styles.Title}
        />
        <motion.div
          className={styles.Content}
          variants={slideInFromBottom}
          // initial="visible"
          // animate={inView ? "visible" : "hidden"}
          exit="hidden"
        >
          {slice?.items?.map((item, index) => {
            return (
              <motion.div
                ref={div}
                className={styles.RichText}
                key={index}
                variants={slideInFromBottom}
                onMouseOver={() => {
                  handleHover();
                }}
                onMouseLeave={() => {
                  handleLeave();
                }}
              >
                <PrismicRichTextResolver
                  fields={item.text_block}
                  variants={slideInFromBottom}
                  className={styles.Title}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    )
  );
};

export default DescriptionModal;
