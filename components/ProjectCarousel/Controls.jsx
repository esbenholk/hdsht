import styles from "./ProjectCarousel.module.scss";
import { motion } from "framer-motion";
import useVideo from "../Resolvers/States/Video";

const blendIn = {
  visible: {
    opacity: 0.7,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const Controls = ({ hovered, setHovered, setPaused, paused }) => {
  const { currentVideo } = useVideo();
  //   console.dir(currentVideo);
  function hasAudio(video) {
    return (
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length)
    );
  }
  return (
    currentVideo && (
      <motion.div
        className={styles.Controls}
        // variants={blendIn}
        initial="hidden"
        animate={currentVideo && hovered ? "visible" : "hidden"}
        onMouseOver={() => {
          setHovered(true);
        }}
      >
        <motion.button
          className={styles.PlayPause}
          onClick={() => {
            currentVideo.paused ? currentVideo.play() : currentVideo.pause();
            setPaused(!paused);
          }}
        >
          {currentVideo.paused ? "play" : "pause"}
        </motion.button>
        {hasAudio(currentVideo) && (
          <motion.button
            className={styles.Mute}
            onClick={() => {
              currentVideo.muted = !currentVideo.muted;
              currentVideo.loop = false;
            }}
          >
            {currentVideo.muted ? "sound on" : "mute"}
          </motion.button>
        )}
      </motion.div>
    )
  );
};
export default Controls;
