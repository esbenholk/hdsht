import styles from "./ContactSection.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { PrismicLink } from "@prismicio/react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useCursor from "../Resolvers/States/Cursor";
import DateTime from "../DateTime/DateTime";
import { useExcluder } from "../Resolvers/States/Excluder";

const ContactSection = ({ slice }) => {
  const container = useRef(null);
  const [links, setLinks] = useState([]);
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

    <motion.div className={styles.Grid} exit="closed" ref={container}>
      {slice.items.map((item, index) => {
        const [hovered, setHovered] = useState(false);
        const container = useRef();
        return (
          <motion.div
            className={styles.Content}
            key={index}
            variants={bounceDown}
            initial="closed"
            animate={hovered ? "open" : "closed"}
            onMouseOver={() => {
              // setHovered(true);
              // moveExcluder(container.current);
            }}
            onMouseLeave={() => {
              // setHovered(false);
              // removeExcluder();
            }}
            ref={container}
          >
            {/* <DateTime location={item.timezone} hovered={hovered} /> */}
            <motion.div className={styles.Title}>
              <PrismicRichText field={item.title} />
            </motion.div>
            <motion.div className={styles.Address}>
              <PrismicRichText field={item.address} />

                {item.link1 !== null && item.link1.url && 
                    <>
                    <PrismicLink
                        href={item.link1.url}
                        onMouseOver={() => {
                            useCursor.setState({
                              cursorVariant: "hoveronlink",
                              isOverProject: true,
                              title: "link"
                            });
                          }}
                        onMouseLeave={() => {
                            useCursor.setState({
                              cursorVariant: "default",
                              isOverProject: false
                            });
                          }}
                        >
                           {item.text1}            
                    </PrismicLink>
                    </>
                }
                {item.link2 !== null  && item.link2.url && 
                    <>
                    <PrismicLink
                        href={item.link2.url}
                        onMouseOver={() => {
                            useCursor.setState({
                              cursorVariant: "hoveronlink",
                              isOverProject: true,
                              title: "link"
                            });
                          }}
                        onMouseLeave={() => {
                            useCursor.setState({
                              cursorVariant: "default",
                              isOverProject: false
                            });
                          }}
                        >
                           {item.text2}            
                    </PrismicLink>
                    </>
                }
                {item.link3 !== null   && item.link3.url && 
                    <>
                    <PrismicLink
                        href={item.link3.url}
                        onMouseOver={() => {
                            useCursor.setState({
                              cursorVariant: "hoveronlink",
                              isOverProject: true,
                              title: "link"
                            });
                          }}
                        onMouseLeave={() => {
                            useCursor.setState({
                              cursorVariant: "default",
                              isOverProject: false
                            });
                          }}
                        >
                           {item.text3}            
                    </PrismicLink>
                    </>
                }
                {item.link4 !== null && item.link4.url && 
                    <>
                    <PrismicLink
                        href={item.link4.url}
                        onMouseOver={() => {
                            useCursor.setState({
                              cursorVariant: "hoveronlink",
                              isOverProject: true,
                              title: "link"
                            });
                          }}
                        onMouseLeave={() => {
                            useCursor.setState({
                              cursorVariant: "default",
                              isOverProject: false
                            });
                          }}
                        >
                           {item.text4}            
                    </PrismicLink>
                    </>
                }

                {item.link5 !== null  && item.link5.url && 
                    <>
                    <PrismicLink
                        href={item.link5.url}
                        onMouseOver={() => {
                            useCursor.setState({
                              cursorVariant: "hoveronlink",
                              isOverProject: true,
                              title: "link"
                            });
                          }}
                        onMouseLeave={() => {
                            useCursor.setState({
                              cursorVariant: "default",
                              isOverProject: false
                            });
                          }}
                        >
                           {item.text5}            
                    </PrismicLink>
                    </>
                } 
       
              </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
    </motion.div>
  );
};

export default ContactSection;
