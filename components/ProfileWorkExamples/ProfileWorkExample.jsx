import { useEffect, useState, useRef, Suspense } from "react";
import styles from "./ProfileWorkExample.module.scss";
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";
import { PrismicLink } from "@prismicio/react";
import throttle from "lodash.throttle";
import "swiper/scss";
import "swiper/scss/thumbs";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import "swiper/scss/navigation";
import "swiper/scss/free-mode";
import "swiper/scss/mousewheel";
import {
  Navigation,
  Thumbs,
  Pagination,
  FreeMode,
  Mousewheel,
  Lazy,
  Autoplay,
} from "swiper";

import useVideo from "../Resolvers/States/Video";
import {
  checkTargetForNewValues,
  motion,
  useAnimationControls,
} from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import GallerySlide from "../ProjectCarousel/GallerySlide";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";


const ProfileWorkExample = ({ slice, project }) => {
  const gallerySwiperRef = useRef();
  const carousel = useRef();
  const thumbSwiperRef = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const { duration, setCurrentVideo, currentVideo } = useVideo();
  const [paused, setPaused] = useState(false);
  const nexturl = useCursor((state) => state.nexturl);
  const url = useCursor((state) => state.url);
  // const [isVisible, setIsVisible] = useState(false);
  const {width, height} = useWindowDimensions();
  const [section, setSection] = useState();
  const [cursorExpanded, setCursorExpanded] = useState(false);

  const [infoIsExpanded, setINfoIsExpanded] = useState(false);
  const infoRef = useRef();
  const creditRef = useRef();


  useEffect(()=>{
    let cursor = document.getElementById("Cross");
    if(cursor){
      let _section = cursor.getElementsByTagName("section")[0];
      setSection(_section);
    }
    
    console.log("PROJECT", project, slice);

  },[])
  useEffect(() => {
    if (slice.items[slideIndex].carouselitem.kind === "image") {
      setCurrentSlide("image");
      setCurrentVideo(null);
      useVideo.setState({ duration: null, currentTime: null });
    }
    if (slice.items[slideIndex].carouselitem.kind === "document") {
      setCurrentSlide("video");
    }
  }, [slideIndex, currentVideo]);


  const handleScroll = () => {
    console.log(cursorExpanded);
      setCursorExpanded(false);
      useCursor.setState({
        cursorVariant: "default",
        isOverProject: false,
        description:"",
        title: "",
        shouldrenderdetailsontop: false,
        instruction: "click to read",
        carouselTopLeftPos: {x:0,y: 0}
      });

    window.removeEventListener('scroll', handleScroll);

  };
  const timer = useRef(0);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!paused) {
        setSeconds((seconds) => seconds + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [paused]);
  const resetTimer = () => {
    setSeconds(0);
  };
  useEffect(() => {
    const gallerySwiper = gallerySwiperRef.current?.swiper;
    const thumbnailSwiper = thumbSwiperRef.current?.swiper;

    if (gallerySwiper.controller && thumbnailSwiper.controller) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, []);

  useEffect(() => {
    gallerySwiperRef.current.swiper.on("slideChange", () => {
      setSlideIndex(gallerySwiperRef.current.swiper.realIndex);
    });
    const leftArrowKey = 37;
    const rightArrowKey = 39;

    const handleKeyDown = (e) => {
      if (e.keyCode === leftArrowKey) {
        gallerySwiperRef.current.swiper.slidePrev();
      } else if (e.keyCode === rightArrowKey) {
        gallerySwiperRef.current.swiper.slideNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if(hovered){
      const trigger = currentSlide === "image" ? 5 : duration;
      if (seconds > trigger && !paused) {
        gallerySwiperRef.current.swiper.slideNext();
      }
    }
  }, [seconds]);

  const handleHover = (item) => {

    useCursor.setState({
        cursorVariant: "hover",
        isOverProject: true,
        description: "",
        instruction: !url.includes("work") && infoIsExpanded ? "" : "",
        title: item? item.data.title : "",
        shouldrenderdetailsontop: false
      });
  };

  const handleLeave = (e) => {
    useCursor.setState({
      cursorVariant: "default",
      isOverProject: false,
      description: "",
      title: "",
      shouldrenderdetailsontop: false
    });
  };



  // url.includes("work") ? styles.WorkCarouselContainer : 
  return (
    <motion.div
      className={`${styles.CarouselContainer }` }

      initial="hidden"
      animate="visible"
      exit="hidden"
      ref={carousel}
      onMouseOver={()=>{
        setHovered(true);
      }}
      onMouseLeave={()=>{
        setHovered(false);
      }}
      onClick={(e)=>{
        if(!url.includes("work")){
          handleClick(e, project);
        }
      }}
     
    >


      <Swiper

        ref={gallerySwiperRef}
        className={styles.SwiperTop}
        slidesPerView={1}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onReachEnd={() => {
            if(url.includes("work") && nexturl){
              window.location.href = nexturl;              
            } else {
              // if(gallerySwiperRef.current && gallerySwiperRef.current.nextSibling){
              //   gallerySwiperRef.current.nextSibling.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
              // }
            }
        }}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel, Lazy]}
        mousewheel={false}
        lazy={true}
        onSlideChange={() => {
          if (slice?.items[slideIndex].carouselitem.kind === "document") {
          } else {
            setCurrentVideo(null);
          }
          resetTimer();
        }}
        onMouseOver={() => {
          handleHover(project);
        }}
        onMouseLeave={() => {
          handleLeave();
        }}
   
        // onInit={() => {
        //   startTimer();
        // }}
        onSlideNextTransitionStart={() => {
          if (thumbSwiperRef.current?.swiper) {
            thumbSwiperRef.current.swiper.slideNext();
          }
        }}
        onSlidePrevTransitionStart={() => {
          if (thumbSwiperRef.current?.swiper) {
            thumbSwiperRef.current.swiper.slidePrev();
          }
        }}

        onClick={(e) => {
          gallerySwiperRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
   
        }}

      >
        {slice?.items.map((item, i) => {
          return (
            <SwiperSlide
              className={styles.GallerySlide}
              key={i}
              // onMouseOver={handleSlide}
     
              onMouseOver={() => {
                handleHover(project);
              }}
              onMouseLeave={handleLeave}
            >
              {({ isActive }) => (
                   <GallerySlide
                item={item}
                gallerySwiperRef={gallerySwiperRef}
                slice={slice}
                isActive={isActive}
                slideIndex={slideIndex}
              />
              )}
           
            </SwiperSlide>
          );
        })}
      </Swiper>

    </motion.div>
  );
};

export default ProfileWorkExample;
