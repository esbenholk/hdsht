import styles from "./VideoPlayer.module.scss";
import useVideo from "../States/Video";
import useCursor from "../States/Cursor";
import { useState, useEffect, useMemo } from "react";
import useWindowDimensions from "../UseWindowDimensions";


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
  const muted = useCursor((state) => state.muted);
  const [localMuted, setMuted] = useState(true);
  const isInViewport = useIsInViewport(videoRef);

  useEffect(()=>{
    if(isInViewport && isActive && videoRef){
      videoRef.current.play();
    }
  },[isInViewport])


  


  return (
    <div className={url.includes("work") ? styles.VideoWrapperInWork : styles.VideoWrapper} >
      <video
        ref={videoRef}
        id={keynm}
        className={styles.Video}
        loop
        autoPlay={true}
        playsInline
        muted={isInViewport && !muted && !localMuted  ? false : true}
        controls={false}
        onLoadedMetadata={() => {
          useVideo.setState({
            duration: videoRef && videoRef.current.duration,
            currentTime: videoRef && videoRef.current.currentTime,
            ended: false,
          });
        }}
        onTimeUpdate={() => {
          useVideo.setState({
            currentTime: videoRef && videoRef.current.currentTime,
            duration: videoRef && videoRef.current.duration,
            ended: false,
          });
        }}
        onDurationChange={() => {
          useVideo.setState({
            duration: videoRef && videoRef.current.duration,
          });
        }}
        ref={videoRef}
        onError={(e) => {
          // console.log(e);
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
        {
          media.url && <>
              {/* <source src={media.url} /> */}
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
          
          </>
        }

      </video>
    </div>
  );
};

export default CustomPlayer;
