import styles from "./VideoPlayer.module.scss";
import useVideo from "../States/Video";
import useCursor from "../States/Cursor";
import { useState, useEffect, useRef, useMemo } from "react";

import ReactPlayer from 'react-player'

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
  //make a custom video player that uses the media.url as src and scales to it's dimensions, as well as updates the currentTime and duration of useVideo
  //   make a regex that checks the media.rul prefix and returns a source JSX elemt with the correct type
  //   make a useEffect that updates the currentTime and duration of useVideo
  const url = useCursor((state) => state.url);
  const containerRef = useRef();
  const muted = useCursor((state) => state.muted);
  const [localMuted, setMuted] = useState(true);
  const isInViewport = useIsInViewport(containerRef);


  useEffect(()=>{
    if(isInViewport && isActive && videoRef.current){
      videoRef.current.playing = true;
    } else {
      videoRef.current.playing = false;
    }
  },[isInViewport])


  


  return (
    <div ref={containerRef} className={url.includes("work") ? styles.VideoWrapperInWork : styles.VideoWrapper} >
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
        style={{padding: 0, width: "100%", height: "100%"}}
        muted={isInViewport && !muted && !localMuted  ? false : true}
        // controls={false}
        onReady={() => {
          console.log("react player sets duration", videoRef.current.getDuration());
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
        onMouseEnter={()=>{
          setMuted(false);
        }}
        onMouseLeave={()=>{
            setMuted(false);
       
        }}
      >


      </ReactPlayer>
    </div>
  );
};

export default CustomPlayer;
