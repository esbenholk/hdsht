import { useEffect, useRef, Suspense } from "react";
import { useSwiperSlide } from "swiper/react";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import useVideo from "../Resolvers/States/Video";


const GallerySlide = ({ item, slice, gallerySwiperRef, slideIndex, isActive, keynm }) => {
  const slide = useSwiperSlide();
  const videoRef = useRef();
  const { setCurrentVideo, currentVideo} = useVideo();

  useEffect(() => {
    if (
      slideIndex === slice.items.indexOf(item) &&
      item.carouselitem.kind !== "image"
    ) {

      setCurrentVideo(videoRef.current);
      console.log("setting current video", videoRef.current, slideIndex);

    }

   
  }, [gallerySwiperRef.current?.swiper?.realIndex]);



  return (<>
    {item.carouselitem &&     <Suspense fallback={<LoadSpinner />}>

    <MediaResolver
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        isActive={isActive}
        media={item.carouselitem}
        slide={slide}
        videoRef={videoRef}
        loop={false}
        keynm={keynm}
        autoPlay={false}
        item={item}
    
      />


    
  </Suspense>}</>

  );
};
export default GallerySlide;
