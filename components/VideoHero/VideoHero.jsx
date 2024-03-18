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


const VideoHero = ({ slice }) => {
  const videoRef = useRef();
  const span = useRef();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log("VIDEO HEADER", slice);
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <motion.div className={styles.Container}>
              {/* {slice.primary.image ? <ThreeD image={slice.primary.image}/> : 
               <div className={styles.VideoContainer}>
               <MediaResolver
                 media={slice.primary.videolink}
                 videoRef={videoRef}
                 loop={true}
               />
               <AiVideoCanvas  media={slice.primary.videolink}/>
               <VideoCanvas videoUrl={slice.primary.videolink}/>
             </div>} */}
             <PixelCanvas imageUrl={slice.primary.image.url}/>
             {/* <AiVideoCanvas  media={slice.primary.videolink}/> */}

      </motion.div>
    )
  );
};
export default VideoHero;
