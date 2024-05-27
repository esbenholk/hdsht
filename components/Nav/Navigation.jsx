import { PrismicLink, PrismicText } from "@prismicio/react";
import styles from "./Navigation.module.scss";
import HdshtFont from "../SVGR/HdshtFont";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import dynamic from "next/dynamic";
import Logo from 'assets/svg/HDSHT_HD.svg';
const Gizmo = dynamic(() => import("../Gizmo/Gizmo"), { ssr: false });



export function Navigation({ slice, logo, links }) {
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
    console.log("NAVIGATIOn", slice, logo, links);
    setIsMounted(true);
  }, []);

  const slideInFromRightContainer = {
    open: {
      transform: "translateY(0)",
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
    closed: {
      transform: "translateY(100%)",
      opacity:1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };
  // const slideInFromRightParent = {
  //   open: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.2,
  //       staggerChildren: 0.025,
  //     },
  //   },
  //   closed: {
  //     opacity: 1,
  //     x: "100%",
  //     transition: {
  //       duration: 0.1,
  //       staggerChildren: 0.005,
  //     },
  //   },
  // };


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
        <motion.div
          className={`${styles.NavLinksContainer}  ${menu ? styles.Open : styles.Closed}`}
        >
          <motion.ul className={styles.NavLinks} ref={slider}>
           {links.map((item, key)=>{
              return (
                  <motion.li
                      key={key}
           
                    >
                    {item.link1 && 
                        <>
                      
                        <PrismicLink
                            href={item.link1.url}>
                              {item.text1}            
                        </PrismicLink>
                        </>
                    }
                    {item.link2 && 
                        <>
                        <PrismicLink
                            href={item.link2.url}>
                              {item.text2}            
                        </PrismicLink>
                        </>
                    }
                    {item.link3 && 
                        <>
                        <PrismicLink
                            href={item.link3.url} >
                              {item.text3}            
                        </PrismicLink>
                        </>
                    }
                    {item.link4 && 
                        <>
                        <PrismicLink
                            href={item.link4.url}>
                              {item.text4}            
                        </PrismicLink>
                        </>
                    }

                    {item.link5 && 
                        <>
                        <PrismicLink
                            href={item.link5.url}>
                              {item.text5}            
                        </PrismicLink>
                        </>
                    } 
            
                  </motion.li>
              )
            })}
            <p>Sound On/Off</p>
          </motion.ul>

          
        </motion.div>

        <div className={styles.NavContainer}>
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
            <motion.div
              animate={menu ? "open" : "closed"}
              variants={{
                open: {
                  rotate: -45,
                  y: -5,
                  transition: {
                    duration: 0.2,
                  },
                  opacity: 0
                },
                closed: {
                  rotate: 0,
                  y: 0,
                  transition: {
                    duration: 0.1,
                  },
                  opacity: 1
                },
              }}
            ></motion.div>
          </div>
        </div>
  
        <div className={styles.BottomNavContainer}>
          <img src={logo.url} alt="logo"/>
        </div>
      </>
    )
  );
}
