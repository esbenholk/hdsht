import { useEffect, useRef, Suspense } from "react";
// import { useSwiperSlide } from "swiper/react";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import useVideo from "../Resolvers/States/Video";


const GallerySlide = ({ item, slice, currentSlide, isActive, keynm }) => {
  // const slide = useSwiperSlide();
  const videoRef = useRef();
  const { setCurrentVideo, setDuration, currentVideo} = useVideo();

  useEffect(() => {

    if(isActive){

      if (
        currentSlide === slice.items.indexOf(item) &&
        item.carouselitem.kind !== "image"
      ) {
        setCurrentVideo(videoRef.current);
        setDuration(videoRef.current.getDuration()); 
      }
    }
   

   
  }, [currentSlide]);



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
        // slide={slide}
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
