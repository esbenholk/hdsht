import { PrismicLink, PrismicText } from "@prismicio/react";
import styles from "./Navigation.module.scss";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import Loader from "../Loader/Loader";




export function Navigation({ slice, logo, links, settings }) {
  const [isMounted, setIsMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const slider = useRef();
  const toggle = useRef();
  const muted = useCursor((state) => state.muted);
  const url = useCursor((state) => state.url);
  
  const SlideIn = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    setIsMounted(true);
    if(url.includes("#")){
      goToAnchor(url.slice(2));
      setMenu(false);
    }
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

  function setSoundSettings(){
    useCursor.setState({
      muted: !muted
    });
    setMenu(false);
  }

  function goToAnchor(id){
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView();
      
    }
  }


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

  function generateLink(link, text){
    return (<>
      {link.url.includes("#") && url.length < 2 ? <p onClick={()=>{
        goToAnchor(link.url.slice(1));
        setMenu(!menu);
      }}>{text}</p> : link.url.includes("#") ?
        <PrismicLink
          href={"/" + link.url}>
            {text}            
        </PrismicLink>  
      : <PrismicLink
          href={link.url}>
            {text}            
        </PrismicLink>}
      </>)
  }
  return (
    isMounted && (
      <>
        <Loader settings={settings}/>

        <motion.div
          className={`${styles.NavLinksContainer}  ${menu ? styles.Open : styles.Closed}`}
        >
          <motion.div className={styles.NavLinks} ref={slider}>

            {links[0] && 
                <>
                {links[0].link1 && links[0].link1.url && 
                  <>
                    {generateLink(links[0].link1, links[0].text1)}
                  </>
                }
                
                {links[0].link2 && links[0].link2.url && 
                  <>
                    {generateLink(links[0].link2, links[0].text2)}
                  </>
                }
                {links[0].link3 && links[0].link3.url && 
                  <>
                    {generateLink(links[0].link3, links[0].text3)}
                  </>
                }
                {links[0].link4 && links[0].link4.url && 
                  <>
                    {generateLink(links[0].link4, links[0].text4)}
                  </>
                }

                {links[0].link5 && links[0].link5.url && 
                  <>
                    {generateLink(links[0].link5, links[0].text5)}
                  </>
                } 
            </>   
            }
     
            <p onClick={()=>{
              setSoundSettings();
            }}>SOUND {muted ? " ON": " OFF"}</p>
          </motion.div>

          
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
