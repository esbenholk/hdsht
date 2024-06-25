import styles from "./VideoHero.module.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import useCursor from "../Resolvers/States/Cursor";
import Logo from 'assets/svg/HDSHT_HD.svg';

const VideoHero = ({ slice }) => {
  const videoRef = useRef();
  const span = useRef();
  const muted = useCursor((state) => state.muted);

  const [isDesktop, setIsDesktop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const {width, height} = useWindowDimensions();
  const logoRef = useRef();
  const [headerInPosition, setHeaderInPosition] = useState(false);
  const [localMuted, setMuted] = useState(false);


  useEffect(() => {
    console.log("welcome to HDSHT");
    const handleScroll = () => {


      // if(logoRef.current ){
      //   const itemOffset = logoRef.current.getBoundingClientRect().y;
      //   if (itemOffset < -50) {
      //     setLogoInPosition(true);
      //     setMuted(true);
      //   } else {
      //     setLogoInPosition(false);
      //     setMuted(false);
      //   }
      // }

      let h3s = document.getElementsByTagName('h3');
      if(h3s[0]){
        let stickyPosY = h3s[0].getBoundingClientRect().y;
  
       
        if(stickyPosY<50 ){
          setHeaderInPosition(true);
          setMuted(true);

        } else {
          setHeaderInPosition(false);
          setMuted(false);

        }
      }

    }; 
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

    // console.log("PAGE", page);
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsDesktop(!mobile);
    setLoaded(true);
  }, [width]);



  return (
    loaded && (
      <motion.div className={styles.Container}>
            <div className={styles.VideoContainer}>
                <video
                  id={"videoheader"}
                  className={styles.Video}
                  loop
                  autoPlay={true}
                  playsInline
                  muted={!muted && !localMuted ? false : true}
                  controls={false}
                  ref={videoRef}
                  onError={(e) => {
                    // console.log(e);
                  }}
                  onMouseEnter={()=>{
                    setMuted(false);
                  }}
                  onMouseLeave={()=>{
                      setMuted(false);
                
                  }}
                >
                  {
                    slice.primary.videolink.url && <>
                        {slice.primary.videolink.url.match(/.mp4/) && <source src={slice.primary.videolink.url} type="video/mp4" />}  
                    </>
                  }

                </video>


            </div>

    

            
      </motion.div>
    )
  );
};
export default VideoHero;
