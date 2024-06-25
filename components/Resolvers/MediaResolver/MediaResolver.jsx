import Image from "next/image";
import CustomPlayer from "../VideoPlayer/CustomPlayer";

const MediaResolver = ({isVideoHeader, media, videoRef, keynm, isActive, height, localMuted, autoPlay }) => {

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
    height={height? height : media.height }
    alt={media.name}
    loading="eager"
  />;
  }else{

    return <CustomPlayer autoPlay={autoPlay} keynm={keynm} media={media} videoRef={videoRef} isActive={isActive} localMuted={localMuted}/>;
  }
  

  return null;
};

export default MediaResolver;
