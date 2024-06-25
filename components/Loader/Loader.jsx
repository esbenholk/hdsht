import { useEffect, useState, useRef } from "react";
import styles from "./Loader.module.scss";
import useCursor from "../Resolvers/States/Cursor";
import { motion } from "framer-motion";
import * as React from "react";
import useSound from "use-sound";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";

export default function Loader({settings}) {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); 
  const [userHasEntered, setUserHasEntered] = useState(false);
  const [userIsIn, setUserIsIn] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const blocksRef = useRef(blocks);


  const {width, height} = useWindowDimensions();
  const url = useCursor((state) => state.url);

  const sounds = settings.data.slices[3].items;
  const [soundUrl, setSoundUrl] = useState(sounds[Math.floor(Math.random() * sounds.length)].media.url);
  const  [play, { stop, pause }] = useSound(soundUrl, {interrupt: true});


  useEffect(() => {
    blocksRef.current = blocks; // Keep the ref updated with the current blocks
  }, [blocks]);


  function closeLoader(){
    setUserHasEntered(true);
    useCursor.setState({
      muted: false
    });
  }
 
  useEffect(()=>{
    setSoundUrl(sounds[Math.floor(Math.random() * sounds.length)].media.url);
  },[]);
  
  useEffect(() => {
    setIsLoaded(true);
    useCursor.setState({
      cursorVariant: "hover",
      isOverProject: false,
      title: "",
      description: "",
      isLoader: true
    })
  }, []);

  useEffect(() => {
      if (isLoaded) {
          setIsPageLoaded(true);
      }
  }, [isLoaded]);

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
      {settings.data.slices[1] && settings.data.slices[1].items.length>0 && 
        <div className={`${styles.BackgroundGame}  ${!userHasEntered ? styles.BackGroundOn : styles.BackGroundOff}`}>
        </div>
      }
      <motion.div
      className={`${styles.Container}  ${!userHasEntered ? styles.On : styles.Off}`}
      style={{backgroundImage: `url(${settings.data.slices[1] && settings.data.slices[1].items.length>0 && settings.data.slices[1].items[Math.floor(Math.random() * settings.data.slices[1].items.length)].media.url})`}}
      onClick={(e)=>{
        //handleMouseDown(e);

        if(!window.location.href.includes("pink")){

          console.log("user goes in through loader" );
          setUserHasEntered(true);

          setTimeout(() => {
            setUserIsIn(true);
          }, 1500);
        }
        useCursor.setState({
          muted: false
        });
    
      }}
    >
    </motion.div>
    {settings.data.slices[0] && settings.data.slices[0].items.length>0  &&
      
      <img src={settings.data.slices[0].items[index].media.url} alt="loading gif" className={`${!userHasEntered ? styles.Opaque : styles.Transparent}`}
            onMouseOver={()=>{
                  useCursor.setState({
                    cursorVariant: "hoveronbiglink",
                    isOverProject: false,
                    title: "click to enter",
                    description: ""
                  })
            }}
            onClick={(e)=>{
              //handleMouseDown(e);
      
              if(!window.location.href.includes("pink")){
                setUserHasEntered(true);

                play();
      
                setTimeout(() => {
                  setUserIsIn(true);
                  // stop();
                }, 1500);

                useCursor.setState({
                  muted: false
                });
              }
        
          
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

