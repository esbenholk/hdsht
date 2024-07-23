import { useEffect, useState,useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Cursor.module.scss";
import useCursor from "../Resolvers/States/Cursor";
import useSound from "use-sound";
// import buttonHoverSound1 from 'sounds/1.mp3';

const sounds = ["sounds/2.mp3", "sounds/3.mp3", "sounds/4.mp3"]




const Cursor = () => {
  const cursorVariant = useCursor((state) => state.cursorVariant);
  const muted = useCursor((state)=> state.muted);

  const [soundUrl, setSoundUrl] = useState(sounds[Math.floor(Math.random() * sounds.length)]);
  const  [play, { stop, pause }] = useSound(soundUrl, {interrupt: true});

  const mousePosition = {
    x: useCursor((state) => state.cursorPosition.x),
    y: useCursor((state) => state.cursorPosition.y),
  };




  useEffect(()=>{
    if(!muted){
      setSoundUrl(sounds[Math.floor(Math.random() * sounds.length)]);
      if(cursorVariant === "hoveronlink" || cursorVariant === "hoveronbiglink"){
        play();
        // sound.fade(0, 1, 1000);
      }  else {
        pause();
        stop();
      }
    }
  
  },[cursorVariant]);

  useEffect(() => {


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
    // handleMouseMove({ clientX: 0, clientY: 0 });
    
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
    hoveronbiglink:{
      x: mousePosition.x + 16,
      y: mousePosition.y + 16,
      ease: [0.1, 0.2, 0.01, 0.99],
      scale: 4,
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
      <motion.div
        className={styles.Cursor}
        variants={variants}
        animate={cursorVariant}
      >
  
        <div className={cursorVariant==="hoveronlink" ? styles.Hoveronlink : cursorVariant==="hoveronbiglink" ? styles.Hoveronlink:null }>
          <div className={cursorVariant==="logo" ? styles.PinkDot : styles.Dot} >
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null} ></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
          </div>
          <div className={cursorVariant==="logo" ? styles.PinkDot : styles.Dot}>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
            <div className={cursorVariant==="default" ? styles.Activecursor : cursorVariant==="logo" ? styles.Activecursor : cursorVariant==="hoveronbiglink" ? styles.Activecursor : null}></div>
          </div>
        </div>
     </motion.div>
  );
};

export default Cursor;
