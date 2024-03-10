import { useEffect, useRef } from "react";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import CustomPlayer from "../VideoPlayer/CustomPlayer";
import useWindowDimensions from "../UseWindowDimensions";
import useCursor from "../States/Cursor";
const MediaResolver = ({ media, slide, videoRef, loop }) => {

  const url = useCursor((state) => state.url);
  const {width, height} = useWindowDimensions();
  const userAgent = navigator.userAgent;
  let mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
  if(width < 768){
    mobile = true;
  }

  if (
    media.kind === "document" &&
    media.url.match(".(mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg)")
  ) {
    const playerRef = useRef();

    const videoJsOptions = {
      autoplay: () => {
        if (slide && slide.isActive) {
          return true;
        } else {
          return true;
        }
      },
      loop: loop,
      muted: true,
      controls: false,
      preload: "auto",
      fluid: true,
      sources: [
        {
          src: media.url,
        },
      ],
    };

    return <CustomPlayer media={media} videoRef={videoRef} />;
  } else if (media.kind === "image") {
    return (
      <Image
        src={media.url}
        width={media.width}
        height={mobile && !url.includes("work") ? 150 : !mobile && media.height  > 500  && !url.includes("work") ? 500 : url.includes("work") ? height-200 : media.height }
        alt={media.name}
        loading="eager"
      />
    );
  }

  return null;
};

export default MediaResolver;
