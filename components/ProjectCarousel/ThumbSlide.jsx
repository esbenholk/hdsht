import { useEffect, useState } from "react";
import useVideo from "../Resolvers/States/Video";
import styles from "./ProjectCarousel.module.scss";
import Scrubber from "./Scrubber";
import useCursor from "../Resolvers/States/Cursor";
import Image from "next/image";


const ThumbSlide = ({ item, slideIndex, slice, gallerySwiperRef, paused, loaderImage}) => {
  const [activeVideo, setActiveVideo] = useState(false);
  const { duration } = useVideo();


  const handleHover = (item) => {
    useCursor.setState({
      cursorVariant: "hoveronlink",
      shouldrenderdetailsontop: false,
      description: "",
      title: "",
      shouldrenderdetailsontop: false,
      instruction: "view",

    });
  };
  const handleLeave = (e) => {
    useCursor.setState({
      cursorVariant: "default",
      shouldrenderdetailsontop: false,
      description: "",
      title: "",
      shouldrenderdetailsontop: false,
      instruction: "",

    });
  };

  useEffect(() => {
    if (
      slideIndex === slice.items.indexOf(item) 
    ) {
      setActiveVideo(true);
      // console.log("thmbslide is the current slide");

    } else {
      setActiveVideo(false);
    }
  }, [slideIndex]);



  return (
    <div  
    onMouseOver={() => {
      handleHover();
    }}
    onMouseLeave={() => {
      handleLeave();
    }}>
      {item.carouselitem && 
        <>
          <Image
              loading="lazy"
              src={item.thumb && item.thumb.url ? item.thumb.url : item.carouselitem.kind === "image" ? item.carouselitem.url : loaderImage}
              width={300}
              height={100}
              alt={item.carouselitem.name}
              
              className={`${styles.VideoThumb } ${activeVideo ? styles.Active : null }` } 
             
          />

          {activeVideo && item.carouselitem.kind !== "image"  && (
            <>
              <Scrubber
                paused={paused}
                slice={slice}
                item={item}
                slideIndex={slideIndex}
                activeVideo={activeVideo}
              />
            </>
          )}
        </>   
      }
     
    </div>
  );
};
export default ThumbSlide;
