import { useEffect, useRef, Suspense } from "react";
import { useSwiperSlide } from "swiper/react";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import useVideo from "../Resolvers/States/Video";
import styles from "./ProjectCarousel.module.scss";
import PixelCanvas from "../Resolvers/pixelCanvas";

const GallerySlide = ({ item, slice, gallerySwiperRef, slideIndex }) => {
  const slide = useSwiperSlide();
  const videoRef = useRef();
  const { setCurrentVideo } = useVideo();

  useEffect(() => {
    if (
      slideIndex === slice.items.indexOf(item) &&
      item.carouselitem.kind !== "image"
    ) {
      setCurrentVideo(videoRef.current);
    }
  }, [slideIndex, gallerySwiperRef.current?.swiper?.realIndex]);

  return (<>
    {item.carouselitem &&     <Suspense fallback={<LoadSpinner />}>

    <MediaResolver
    onMouseOver={() => {
      setHovered(true);
    }}
    onMouseLeave={() => {
      setHovered(false);
    }}
    media={item.carouselitem}
    slide={slide}
    videoRef={videoRef}
    loop={false}
  />


    
  </Suspense>}</>

  );
};
export default GallerySlide;
