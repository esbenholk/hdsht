import { motion, useAnimationControls } from "framer-motion";
import useVideo from "../Resolvers/States/Video";
import { useEffect } from "react";
import styles from "./ProjectCarousel.module.scss";

const Scrubber = ({ paused, slice, item, slideIndex, activeVideo }) => {
  const controls = useAnimationControls();
  const { duration } = useVideo();
  useEffect(() => {
    if (activeVideo && slideIndex === slice.items.indexOf(item)) {
      controls.start({
        left: "100%",
        transition: {
          duration: duration,
          ease: "linear",
        },
      });
    }

    return () => controls;
  }, [activeVideo, slideIndex]);

  useEffect(() => {
    if (paused) {
      controls.stop();
    } else {
      controls.start({
        left: "100%",
        transition: {
          duration: duration,
        },
      });
    }
  }, [paused]);
  return <motion.div className={styles.Scrubber} animate={controls} />;
};
export default Scrubber;
