import styles from "./ContactSection.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { PrismicLink } from "@prismicio/react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import useCursor from "../Resolvers/States/Cursor";
import DateTime from "../DateTime/DateTime";
import { useExcluder } from "../Resolvers/States/Excluder";

const ContactSection = ({ slice }) => {
  const container = useRef(null);
  const inView = useInView(container, {
    once: true,
  });
  const bounceDown = {
    open: {
      x: 20,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div className={styles.Container} exit="closed" ref={container}>
      {slice.items.map((item, index) => {
        console.log(item.phone, item.mail);
        const [hovered, setHovered] = useState(false);
        const { moveExcluder, removeExcluder } = useExcluder();
        const container = useRef();
        return (
          <motion.div
            className={styles.Content}
            key={index}
            variants={bounceDown}
            initial="closed"
            animate={hovered ? "open" : "closed"}
            onMouseOver={() => {
              setHovered(true);
              moveExcluder(container.current);
            }}
            onMouseLeave={() => {
              setHovered(false);
              removeExcluder();
            }}
            ref={container}
          >
            <DateTime location={item.timezone} hovered={hovered} />
            <motion.div className={styles.Title}>
              <PrismicRichText field={item.title} />
            </motion.div>
            <motion.div className={styles.Address}>
              <PrismicLink
                field={item.maps_link}
                target="_blank"
                onMouseOver={() => {
                  useCursor.setState({
                    cursorVariant: "hover",
                  });
                }}
                onMouseLeave={() => {
                  useCursor.setState({
                    cursorVariant: "default",
                  });
                }}
              >
                <PrismicRichText field={item.address} />
              </PrismicLink>
              <PrismicLink
                field={item.phone}
                target="_blank"
                onMouseOver={() => {
                  useCursor.setState({
                    cursorVariant: "hover",
                  });
                }}
                onMouseLeave={() => {
                  useCursor.setState({
                    cursorVariant: "default",
                  });
                }}
              >
                {item.phone.url && <span>{item.phone.url.replace("tel:", "")}</span>}
              </PrismicLink>
              <PrismicLink
                field={item.email}
                target="_blank"
                onMouseOver={() => {
                  useCursor.setState({
                    cursorVariant: "hover",
                  });
                }}
                onMouseLeave={() => {
                  useCursor.setState({
                    cursorVariant: "default",
                  });
                }}
              >
               { item.email.url && <span>{item.email.url.replace("mailto:", "")}</span>}
              </PrismicLink>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ContactSection;
