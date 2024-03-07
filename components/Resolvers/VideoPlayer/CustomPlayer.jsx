import styles from "./VideoPlayer.module.scss";
import useVideo from "../States/Video";
import { useRef, useEffect } from "react";

const CustomPlayer = ({ media, videoRef }) => {
  //make a custom video player that uses the media.url as src and scales to it's dimensions, as well as updates the currentTime and duration of useVideo
  //   make a regex that checks the media.rul prefix and returns a source JSX elemt with the correct type
  //   make a useEffect that updates the currentTime and duration of useVideo

  return (
    <div className={styles.VideoWrapper}>
      <video
        className={styles.Video}
        loop
        autoPlay
        playsInline
        muted
        controls={false}
        onLoadedMetadata={() => {
          useVideo.setState({
            duration: videoRef.current.duration,
            currentTime: videoRef.current.currentTime,
            ended: false,
          });
        }}
        onTimeUpdate={() => {
          useVideo.setState({
            currentTime: videoRef.current.currentTime,
            duration: videoRef.current.duration,
            ended: false,
          });
        }}
        onDurationChange={() => {
          useVideo.setState({
            duration: videoRef.current.duration,
          });
        }}
        ref={videoRef}
        onError={(e) => {
          console.log(e);
        }}
        onEnded={() => {
          useVideo.setState({
            ended: true,
          });
        }}
      >
        {media.url.match(/.mp4/) && <source src={media.url} type="video/mp4" />}
        {media.url.match(/.webm/) && (
          <source src={media.url} type="video/webm" />
        )}
        {media.url.match(/.ogg/) && <source src={media.url} type="video/ogg" />}
        {media.url.match(/.m4v/) && <source src={media.url} type="video/m4v" />}
        {media.url.match(/.mov/) && <source src={media.url} type="video/mov" />}
        {media.url.match(/.avi/) && <source src={media.url} type="video/avi" />}
        {media.url.match(/.flv/) && <source src={media.url} type="video/flv" />}
        {media.url.match(/.wmv/) && <source src={media.url} type="video/wmv" />}
        {media.url.match(/.mkv/) && <source src={media.url} type="video/mkv" />}
      </video>
    </div>
  );
};

export default CustomPlayer;
