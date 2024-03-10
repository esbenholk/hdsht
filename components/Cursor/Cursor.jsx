import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Cursor.module.scss";
import useCursor from "../Resolvers/States/Cursor";
import { TypeAnimation } from 'react-type-animation';

const Cursor = () => {
  const cursorVariant = useCursor((state) => state.cursorVariant);
  const projectDesc = useCursor((state) => state.description);
  const projectTitle = useCursor((state) => state.title);
  const isOverProject = useCursor((state)=>state.isOverProject);
  const shouldrenderdetailsontop = useCursor((state)=>state.shouldrenderdetailsontop);
  const mousePosition = {
    x: useCursor((state) => state.cursorPosition.x),
    y: useCursor((state) => state.cursorPosition.y),
  };
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    // get device type by useragent
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsDesktop(!mobile);

    const handleMouseMove = (e) => {
      useCursor.setState({
        cursorPosition: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    //on first render invoke handleMouseMove
    handleMouseMove({ clientX: 0, clientY: 0 });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
      // mixBlendMode: "occlusion",
      scale: 1,
      ease: [0.1, 0.2, 0.01, 0.99],
    },
    hover: {
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
      ease: [0.1, 0.2, 0.01, 0.99],
      scale: 0.7,
      // mixBlendMode: "difference",
    },
    logo: {
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
      mixBlendMode: "difference",
      transitionTime: 3,
      scale: 2,
      ease: [0.1, 0.2, 0.01, 0.99],
    },
    hoveronlink: {
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
      ease: [0.1, 0.2, 0.01, 0.99],
      scale: 1,
      mixBlendMode: "difference",
  
    },
    cross: {
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
   
      transition: { type: "spring", mass: 0.25}
    },
    data: {
      y: mousePosition.y + 16
    },
    slide: {
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
      // mixBlendMode: "difference",
 
      ease: [0.1, 0.2, 0.01, 0.99],
       },
  };


  return (
    <>
    {isOverProject && isDesktop && (
      <>
      <motion.div className={styles.Data}    
      variants={variants}
      animate={"data"}
      >
      
       <span >x: {mousePosition.x}</span>
       <span >y: {mousePosition.y}</span>
 

 

      </motion.div>
      <motion.div className={styles.Cross}    
      variants={variants}
      animate={"cross"}
      >
      
        <div>
        </div>
        <div>
        </div>
   
        {isOverProject && projectTitle !=="" && 
          <div className={shouldrenderdetailsontop ? styles.DescriptionContianerTopLeft : styles.DescriptionContianer}> 
            <TypeAnimation
            sequence={[
              projectTitle
            ]}
              wrapper="span"
              speed={10}
            />
            {projectDesc !== null && projectDesc !== "" && 
              <TypeAnimation
              sequence={[
                projectDesc
              ]}
                wrapper="span"
                speed={100}
              />
              }
        
           
          </div>
        }
 

 

      </motion.div>
      <div>
      {/* <motion.div
            className={styles.Fly}
            animate={{
              x: mousePosition.x -8,
              y: mousePosition.y -8,
            }}
            transition={{ type: "spring", mass: 2}}
          />
               <motion.div
            className={styles.Fly}
            animate={{
              x: mousePosition.x -8,
              y: mousePosition.y -8,
            }}
            transition={{ type: "spring", mass: 1.3}}
          /> */}
      {/* <motion.div
            className={styles.Fly}
            animate={{
              x: mousePosition.x -8,
              y: mousePosition.y -8,
            }}
            transition={{ type: "spring" }}
          />
      <motion.div
            className={styles.Fly}
            animate={{
              x: mousePosition.x -8,
              y: mousePosition.y -8,
            }}
            transition={{ type: "circIn" }}
          />
      <motion.div
            className={styles.Fly}
            animate={{
              x: mousePosition.x -8,
              y: mousePosition.y -8,
            }}
            transition={{ type: "tween" }}
          /> */}
      </div>
      </>)


    }
    {isDesktop && (
      <motion.div
        className={styles.Cursor}
        variants={variants}
        animate={cursorVariant}
      >
  
        <div className={cursorVariant==="hoveronlink" && styles.Hoveronlink}>
        <div className={cursorVariant==="logo" ? styles.PinkDot : styles.Dot} >
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null} ></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
        </div>
        <div className={cursorVariant==="logo" ? styles.PinkDot : styles.Dot}>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
          <div className={cursorVariant==="hover" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : null}></div>
        </div>
        </div>


      </motion.div>
    )}
    </>
  );
};

export default Cursor;
