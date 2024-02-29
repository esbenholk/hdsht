import { useEffect, useState } from "react";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import useVideo from "../Resolvers/States/Video";
import styles from "./ProjectCarousel.module.scss";
import Scrubber from "./Scrubber";

const ThumbSlide = ({ item, slideIndex, slice, gallerySwiperRef, paused }) => {
  const [activeVideo, setActiveVideo] = useState(false);
  const { duration } = useVideo();



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
      <>
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
      </>
    );
  } else {
    return (
      <>
      <MediaResolver media={item.carouselitem} className={styles.ImageThumb} />
     
      </>
    );
  }
};
export default ThumbSlide;
