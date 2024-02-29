import { PrismicLink, PrismicText } from "@prismicio/react";
import styles from "./Navigation.module.scss";
import HdshtFont from "../SVGR/HdshtFont";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import dynamic from "next/dynamic";
const Gizmo = dynamic(() => import("../Gizmo/Gizmo"), { ssr: false });
export function Navigation({ slice }) {
  const [isMounted, setIsMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const slider = useRef();
  const toggle = useRef();
  const nestedLinks = useRef();
  const [scrolled, setScrolled] = useState(0);
  const SlideIn = () => {
    setMenu(!menu);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const slideInFromRightContainer = {
    open: {
      transform: "translateX(0)",
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
      },
    },
    closed: {
      transform: "translateX(100%)",
      opacity: 0,
      transition: {
        duration: 0.1,
        staggerChildren: 0.1,
      },
    },
  };
  const slideInFromRightParent = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.025,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.1,
        staggerChildren: 0.005,
      },
    },
  };
  const handleHover = () => {
    useCursor.setState({
      cursorVariant: "hover",
    });
  };
  const handleMouseLeave = () => {
    useCursor.setState({
      cursorVariant: "default",
    });
  };
  return (
    isMounted && (
      <>
        <div className={styles.NavContainer}>
          <div>
            {/* <PrismicLink href="/">
              <HdshtFont />
            </PrismicLink> */}
            <Gizmo />
          </div>
        </div>
        <div
          className={styles.ToggleBtn}
          onClick={SlideIn}
          ref={toggle}
          onMouseOver={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            animate={menu ? "open" : "closed"}
            variants={{
              open: {
                rotate: 45,
                y: 5,
                transition: {
                  duration: 0.2,
                },
              },
              closed: {
                rotate: 0,
                y: 0,
                transition: {
                  duration: 0.1,
                },
              },
            }}
          ></motion.div>
          <motion.div
            animate={menu ? "open" : "closed"}
            variants={{
              open: {
                rotate: -45,
                y: -5,
                transition: {
                  duration: 0.2,
                },
              },
              closed: {
                rotate: 0,
                y: 0,
                transition: {
                  duration: 0.1,
                },
              },
            }}
          ></motion.div>
        </div>
        <motion.div
          className={styles.NavLinksContainer}
          variants={slideInFromRightContainer}
          animate={menu ? "open" : "closed"}
        >
          <motion.ul className={styles.NavLinks} ref={slider}>
            {slice?.data.slices.map((item, key) => {
              if (item.items[0]?.childlink.url) {
                return (
                  <motion.li
                    key={key}
                    variants={slideInFromRightParent}
                    onMouseOver={handleHover}
                    onMouseLeave={handleMouseLeave}
                  >
                    <PrismicLink
                      href={item.primary.link.url ? item.primary.link.url : "#"}
                    >
                      <PrismicText field={item.primary.title} />
                    </PrismicLink>
                    <ul className={styles.NestedLinks}>
                      {item.items.map((item, key) => {
                        return (
                          <motion.li
                            className={styles.ListChild}
                            key={key}
                            variants={slideInFromRightParent}
                            onMouseOver={handleHover}
                            onMouseLeave={handleMouseLeave}
                          >
                            <PrismicLink href={item.childlink.url}>
                              <motion.span>{item.childname}</motion.span>
                            </PrismicLink>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.li>
                );
              } else {
                return (
                  <motion.li
                    key={key}
                    variants={slideInFromRightParent}
                    onMouseOver={handleHover}
                    onMouseLeave={handleMouseLeave}
                  >
                    <PrismicLink href={item.primary.link.url}>
                      <PrismicText field={item.primary.title} />
                    </PrismicLink>
                  </motion.li>
                );
              }
            })}
          </motion.ul>
        </motion.div>
      </>
    )
  );
}
