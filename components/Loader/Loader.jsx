import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import useCursor from "../Resolvers/States/Cursor";
import { motion } from "framer-motion";
import * as React from "react";
import useSound from "use-sound";
import Image from "next/image";

export default function Loader({settings}) {
  const [index, setIndex] = useState(0);
  const [userHasEntered, setUserHasEntered] = useState(false);
  const [userIsIn, setUserIsIn] = useState(false);
 
  const sounds = settings.data.slices[3].items;
  const [soundUrl, setSoundUrl] = useState(sounds[Math.floor(Math.random() * sounds.length)].media.url);
  const  [play] = useSound(soundUrl, {interrupt: true});





 
  useEffect(()=>{
    setSoundUrl(sounds[Math.floor(Math.random() * sounds.length)].media.url);
  },[]);
  
  useEffect(() => {
    useCursor.setState({
      cursorVariant: "hover",
      isOverProject: false,
      title: "",
      description: "",
      isLoader: true
    })
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * settings.data.slices[0].items.length);
      setIndex(randomNumber);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    {!userIsIn && 

      <>
      <motion.div
      className={`${styles.Container}  ${!userHasEntered ? styles.On : styles.Off} ${!settings.data.slices[1] && styles.ImageContainer}`}
      style={{backgroundImage: `url(${settings.data.slices[1] && settings.data.slices[1].items.length>0 && settings.data.slices[1].items[Math.floor(Math.random() * settings.data.slices[1].items.length)].media.url})`, backgroundColor: "var(--main-border-glow-color)"}}
      >
      </motion.div>
      {settings.data.slices[0] && settings.data.slices[0].items.length>0  &&
            <Image width={300} height={300} priority src={settings.data.slices[0].items[index].media.url} alt="loading gif" className={`${!userHasEntered ? styles.Opaque : styles.Transparent}`}
              onMouseEnter={()=>{
                    useCursor.setState({
                      cursorVariant: "hoveronbiglink",
                      isOverProject: false,
                      title: "click to enter",
                      description: ""
                    })
              }}
              onClick={(e)=>{

                if(!window.location.href.includes("pink")){
        
                  setUserHasEntered(true);
                  play();
        
                  setTimeout(() => {
                    setUserIsIn(true);
                  }, 1500);
                }
                useCursor.setState({
                  muted: false
                });
            
              }}
              onMouseLeave={()=>{
                    useCursor.setState({
                    cursorVariant: "default",
                    isOverProject: false,
                    title: "HDSHT",
                    description: ""
                    });
                  }}
              />
      }
    </>
    }
    
  </>
  );
};

