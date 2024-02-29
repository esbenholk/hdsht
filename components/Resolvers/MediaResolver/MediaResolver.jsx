import { useEffect, useRef } from "react";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import CustomPlayer from "../VideoPlayer/CustomPlayer";

const MediaResolver = ({ media, slide, videoRef, loop }) => {
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
        height={media.height > 500 ? 500: media.height }
        alt={media.name}
        loading="eager"
      />
    );
  }

  return null;
};

export default MediaResolver;
