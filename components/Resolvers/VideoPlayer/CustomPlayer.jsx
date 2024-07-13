import styles from "./VideoPlayer.module.scss";
import useVideo from "../States/Video";
import useCursor from "../States/Cursor";
import { useState, useEffect, useRef, useMemo } from "react";

import ReactPlayer from 'react-player/lazy'


function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    if(ref){
      observer.observe(ref.current);
    }


    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

const CustomPlayer = ({ media, videoRef, isActive, keynm, autoPlay }) => {
  const url = useCursor((state) => state.url);
  const containerRef = useRef();
  const muted = useCursor((state) => state.muted);
  const isInViewport = useIsInViewport(containerRef);


  useEffect(()=>{
    if(isInViewport && isActive && videoRef.current){
      videoRef.current.playing = true;
    } else {
      videoRef.current.playing = false;
    }
  },[isInViewport])

  return (
    <div  className={url.includes("work") ? styles.VideoWrapperInWork : styles.VideoWrapper} >
      <div ref={containerRef} className={styles.CenterPoint}></div>
      <ReactPlayer
        ref={videoRef}
        id={keynm}
        className={styles.Video}
        loop
        // autoPlay={autoPlay}
        loading="lazy"
        playsInline
        controls={false}
        url={media.url}
        playing={isInViewport && isActive}
        width={"100%"}
        height={"100%"}
        volume={1}
        style={{padding: 0, width: "100%", height: "100%"}}
        muted={isInViewport && !muted   ? false : true}
        // controls={false}
        onPlay={() => {
          useVideo.setState({
            duration: videoRef && videoRef.current.getDuration(),
            currentTime: videoRef && videoRef.current.currentTime,
            ended: false,
          });
        }}
        onEnded={() => {
          useVideo.setState({
            ended: true,
          });
        }}

      >
      </ReactPlayer>
    </div>
  );
};

export default CustomPlayer;
