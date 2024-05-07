import { useEffect, useRef } from "react";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import CustomPlayer from "../VideoPlayer/CustomPlayer";
import useWindowDimensions from "../UseWindowDimensions";
import useCursor from "../States/Cursor";
const MediaResolver = ({ name, media, slide, videoRef, isVideoHeader, isActive }) => {

  // if (
  //   media.kind === "document" &&
  //   media.url.match(".(video | mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg)")
  // ) {
  //   return <CustomPlayer media={media} videoRef={videoRef} isActive={isActive}/>;
  // } else if (isVideoHeader) {

  //   return <CustomPlayer media={media} videoRef={videoRef} isActive={true}/>;
  // }else if (media.kind === "image") {
  //   return (
  //      <Image
  //       src={media.url}
  //       width={media.width}
  //       height={media.height }
  //       alt={media.name}
  //       loading="eager"
  //     />
  //   );
  // }

  if (
    media.kind === "image"
  ) {
    return  <Image
    src={media.url}
    width={media.width}
    height={media.height }
    alt={media.name}
    loading="eager"
  />;
  }else{

    return <CustomPlayer media={media} videoRef={videoRef} isActive={true}/>;
  }
  

  return null;
};

export default MediaResolver;
