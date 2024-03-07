import { useEffect, useState } from "react";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import useVideo from "../Resolvers/States/Video";
import styles from "./ProjectCarousel.module.scss";
import Scrubber from "./Scrubber";
import useCursor from "../Resolvers/States/Cursor";

const ThumbSlide = ({ item, slideIndex, slice, gallerySwiperRef, paused }) => {
  const [activeVideo, setActiveVideo] = useState(false);
  const { duration } = useVideo();

  const handleHover = (item) => {
    useCursor.setState({
      cursorVariant: "hoveronlink",

    });
  };
  const handleLeave = (e) => {
    useCursor.setState({
      cursorVariant: "default",

    });
  };

  useEffect(() => {
    if (
      gallerySwiperRef?.current?.swiper?.realIndex === slice.items.indexOf(item)
    ) {
      setActiveVideo(true);
    } else {
      setActiveVideo(false);
    }
  }, [gallerySwiperRef?.current?.swiper?.realIndex]);

  if (item.thumb && item.thumb.url) {
    return (
      <div        
        onMouseOver={() => {
          handleHover();
        }}
        onMouseLeave={() => {
          handleLeave();
        }}>
        <MediaResolver media={item.thumb} className={styles.VideoThumb} />

        {activeVideo && (
          <Scrubber
            paused={paused}
            slice={slice}
            item={item}
            slideIndex={slideIndex}
            activeVideo={activeVideo}
          />
        )}
      </div>
    );
  } else {
    return (
      <div     
      onMouseOver={() => {
        handleHover();
      }}
      onMouseLeave={() => {
        handleLeave();
      }}>
      <MediaResolver media={item.carouselitem} className={styles.ImageThumb} />
     
      </div>
    );
  }
};
export default ThumbSlide;
