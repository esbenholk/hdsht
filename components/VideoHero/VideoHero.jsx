import styles from "./VideoHero.module.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import { PrismicRichText } from "@prismicio/react";
import Layout from "../Layout/Layout";
import { TypeShuffle } from "./TypeShuffle";
import Shuffle from "./Shuffle";

const VideoHero = ({ slice }) => {
  const videoRef = useRef();
  const span = useRef();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <motion.div className={styles.Container}>
        <div className={styles.VideoContainer}>
          <MediaResolver
            media={slice.primary.videolink}
            videoRef={videoRef}
            loop={true}
          />
        </div>
        {/* <div className={styles.HeroSection}>
          <Layout>
            <PrismicRichText field={slice.primary.title} />
            {slice.primary.description.map((paragraph, key) => {
              const words = Array.from(paragraph.text.split(" "));

              return (
                <motion.div key={key}>
                  {words.map((word, key) => {
                    return (
                      <motion.span
                        key={key}
                        className={styles.Word}
                        animate={"mix"}
                        ref={span}
                      >
                        <Shuffle word={word} />
                      </motion.span>
                    );
                  })}
                </motion.div>
              );
            })}
          </Layout>
        </div> */}
      </motion.div>
    )
  );
};
export default VideoHero;
