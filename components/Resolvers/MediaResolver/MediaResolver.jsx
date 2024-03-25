import { useEffect, useRef } from "react";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import CustomPlayer from "../VideoPlayer/CustomPlayer";
import useWindowDimensions from "../UseWindowDimensions";
import useCursor from "../States/Cursor";
const MediaResolver = ({ name, media, slide, videoRef, loop, isVideoHeader }) => {


  if (
    media.kind === "document" &&
    media.url.match(".(mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg)")
  ) {
    return <CustomPlayer media={media} videoRef={videoRef} />;
  } else if (isVideoHeader) {

    return <CustomPlayer media={media} videoRef={videoRef} />;
  }else if (media.kind === "image") {
    return (
      <>
       <Image
        src={media.url}
        width={media.width}
        height={media.height }
        alt={media.name}
        loading="eager"
      />
</>
    
    );
  }

  return null;
};

export default MediaResolver;
