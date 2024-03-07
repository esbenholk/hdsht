import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";
import styles from "./Footer.module.scss";
import { useRef, useEffect, useState } from "react";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";
import useCursor from "../Resolvers/States/Cursor";

const hideDown = {
  hidden: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const Footer = ({ slice }) => {
  const footer = useRef();
  const [height, setHeight] = useState(0);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    setHeight(footer.current.offsetHeight);
  }, []);
  const { setFooterOffset } = useFooterOffset();

  
  return (
    <motion.div
      className={styles.Container}
      style={{
        bottom: "0",
        zIndex: slice.primary.order ? slice.primary.order : 0,
      }}
      variants={hideDown}
      initial="visible"
      animate={hide ? "hidden" : "visible"}
      ref={footer}
    >
      <PrismicLink field={slice.primary.imprintlink}>
        <PrismicRichText field={slice.primary.content} />
      </PrismicLink>
      {/* make a div that hast 2 divs inside that form an x */}

      <button
        onClick={() => {
          setHide(true);
          setFooterOffset(height)
        }}
        onMouseOver={() => {
          useCursor.setState({
            cursorVariant: "hoveronlink",
         
          });
        }}
        onMouseLeave={() => {
          useCursor.setState({
            cursorVariant: "default",
         
          });
        }}
      >
        OK
      </button>
    </motion.div>
  );
};

export default Footer;
