import styles from "./VideoHero.module.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import { PrismicRichText } from "@prismicio/react";
import Layout from "../Layout/Layout";
import { TypeShuffle } from "./TypeShuffle";
import Shuffle from "./Shuffle";
import VideoCanvas from "../Resolvers/videoCanvas";
import ThreeD from "../threeD/threeD";
import AiVideoCanvas from "./aiImageCanvas";
import PixelCanvas from "../Resolvers/_pixelCanvasForImages";
import PixelCanvasVideo from "../Resolvers/_pixelCanvasForVideo";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";


const VideoHero = ({ slice }) => {
  const videoRef = useRef();
  const span = useRef();

  const [isMobile, setIsMobile] = useState();
  const [loaded, setLoaded] = useState(false);
  const {width} = useWindowDimensions();
  useEffect(() => {
    setLoaded(true);
    if(width < 600){
      setIsMobile(true);

    }
  }, []);



  return (
    loaded && (
      <motion.div className={styles.Container}>
            <div className={styles.VideoContainer}>
              {isMobile ? 
                <>
                {!slice.primary.videolink ?    
                  <MediaResolver
                    media={slice.primary.image}
                  videoRef={videoRef}
                  loop={true}
                />:
                <MediaResolver
                  media={slice.primary.videolink}
                  videoRef={videoRef}
                  loop={true}
                  />  
                }
                </> : <>
           
              {/* object recognition in video cnavas */}
              {/* <AiVideoCanvas  media={slice.primary.videolink}/> */}

                {/* simple image in pixelation canvas */}
                {/* <PixelCanvas imageUrl={slice.primary.image.url} /> */}

                {/* video in pixelation canvas */}
                <PixelCanvasVideo  imageUrl={slice.primary.image.url} videoUrl={slice.primary.videolink.url}/>
                
                {/* rain shader */}
                {/* <ThreeD image={slice.primary.image}/> */}
              
              </>
              }
            </div>

   
        

      </motion.div>
    )
  );
};
export default VideoHero;
