import Image from "next/image";
import CustomPlayer from "../VideoPlayer/CustomPlayer";
import useCursor from "../States/Cursor";
import { useRef, useState, useMemo, useEffect } from "react";
import { PrismicImage } from '@prismicio/react'
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

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

const MediaResolver = ({media, videoRef, keynm, isActive, height, localMuted, autoPlay }) => {
  const loaderImage = useCursor((state) => state.loaderImage);
  const ref = useRef();

  const isInViewport =  useIsInViewport(ref);
  if (
    media.kind === "image"
  ) {
    return  <div ref={ref}>
        <Image
          loading = 'lazy'
          src={media.url}
          width={media.width}
          height={height? height : media.height }
          alt={media.name}
          blurDataURL={loaderImage}
          placeholder="blur"
          className={`  swiper-lazy`} 
          // sizes="100vw"

        />
        {/* <PrismicImage field={media}/> */}
    </div>;
  }else{

    return <div ref={ref} >
        <CustomPlayer autoPlay={autoPlay} keynm={keynm} media={media} videoRef={videoRef} isActive={isActive} localMuted={localMuted}/> 
    </div>;
  }
  

  return null;
};

export default MediaResolver;
