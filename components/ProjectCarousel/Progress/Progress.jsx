import { useState, useEffect } from "react";
import styles from "./Progress.module.scss";
import useVideo from "../../Resolvers/States/Video";
import { motion, useAnimationControls } from "framer-motion";
const Progress = ({ slice, slideIndex, paused, currentSlide }) => {
  const { duration } = useVideo();

  return (
    <div className={styles.ProgressBar}>
      {slice.items.map((item, index) => {
        const [played, setPlayed] = useState(false);
        const [playing, setPlaying] = useState(false);
        const controls = useAnimationControls();

        useEffect(() => {
          if (slideIndex > index) {
            setPlaying(false);
            setPlayed(true);
          } else if (slideIndex < index) {
            setPlaying(false);
            setPlayed(false);
          } else if (slideIndex === index) {
            setPlaying(true);
            setPlayed(false);
          }
        }, [slideIndex]);
        useEffect(() => {
          if (playing && !played) {
            console.log("playing");

            if (paused) {
              console.log("paused controls");
              controls.stop();
            } else {
              console.log("start controls");
              controls.start({
                width: "100%",
                transition: {
                  duration: currentSlide === "video" ? duration : 5,
                  ease: "linear",
                },
              });
            }
          } else if (!played) {
            controls.stop();
            controls.set({
              width: 0,
            });
          }
        }, [currentSlide, paused, playing, played]);

        return (
          <div className={styles.ProgressContainer} key={index}>
            {played ? (
              <div
                className={styles.Progress}
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <motion.div className={styles.Progress} animate={controls} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
