import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import useCursor from "../Resolvers/States/Cursor";
import { motion } from "framer-motion";
import * as React from "react";
import useSound from "use-sound";
import Image from "next/image";
import ReactPlayer from 'react-player/lazy';
import useWindowDimensions from "../Resolvers/UseWindowDimensions";

export default function Loader({settings}) {
  const [index, setIndex] = useState(0);
  const [userHasEntered, setUserHasEntered] = useState(false);
  const [userIsIn, setUserIsIn] = useState(false);
 
  const sounds = settings.data.slices[3].items;
  const [soundUrl, setSoundUrl] = useState(sounds[Math.floor(Math.random() * sounds.length)].media.url);
  const  [play] = useSound(soundUrl, {interrupt: true});

  const {width} = useWindowDimensions();



 
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
        style={{backgroundImage: `url(${settings.data.slices[1] && settings.data.slices[1].items.length>0 && width > 600 ? settings.data.slices[1].items[Math.floor(Math.random() * settings.data.slices[1].items.length)].media.url : settings.data.slices[6] && settings.data.slices[6].items.length>0 ? settings.data.slices[6].items[Math.floor(Math.random() * settings.data.slices[6].items.length)].media.url : "hej"})`, backgroundColor: "var(--main-border-glow-color)"}}
        onClick={(e)=>{

                  setUserHasEntered(true);
                  play();
        
                  setTimeout(() => {
                    setUserIsIn(true);
                  }, 1500);

                  useCursor.setState({
                    muted: false
                  });
              
                }}
      >
          <div >
              {settings.data.slices[0] && settings.data.slices[0].items.length>0  &&
                    <Image width={300} height={300} priority src={settings.data.slices[0].items[index].media.url} alt="loading gif" 
                      onMouseEnter={()=>{
                            useCursor.setState({
                              cursorVariant: "hoveronbiglink",
                              isOverProject: false,
                              title: "click to enter",
                              description: ""
                            })
                      }}
                      onClick={(e)=>{

                        setUserHasEntered(true);
                        play();
              
                        setTimeout(() => {
                          setUserIsIn(true);
                        }, 1500);

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
              <h2 className={`${styles.enter} ${!userHasEntered ? styles.On : styles.Off}`} >click to enter</h2>
          </div>

        {settings.data.slices[4] && settings.data.slices[4].items.length>0 && <>
          <div className={`${styles.Container}` }>
            <ReactPlayer
              className={` ${!userHasEntered ? styles.Video : styles.TransparentVideo}`}
              loop
              // autoPlay={autoPlay}
              loading="lazy"
              playsInline
              controls={false}
              url={width > 600 ? settings.data.slices[4].items[Math.floor(Math.random() * settings.data.slices[4].items.length)].media.url : settings.data.slices[5].items[Math.floor(Math.random() * settings.data.slices[5].items.length)].media.url}
              playing={true}
              width={"100%"}
              height={"100%"}
              volume={1}
              // style={{padding: 0, width: "100%", height: "100%"}}
              muted={true}
            >
            </ReactPlayer>
          </div>
        </>}
      
      </motion.div>

 
    </>
    }
    
  </>
  );
};

