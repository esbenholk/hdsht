import { useEffect, useState, useRef, Suspense } from "react";
import styles from "./ProjectCarousel.module.scss";
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";
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
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import DescriptionModal from "./Description/Description";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import Progress from "./Progress/Progress";
import useVideo from "../Resolvers/States/Video";
import {
  checkTargetForNewValues,
  motion,
  useAnimationControls,
} from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import Controls from "./Controls";
import GallerySlide from "./GallerySlide";
import ThumbSlide from "./ThumbSlide";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";

const slideInFromBottom = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const ProjectCarousel = ({ slice, project }) => {
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

  useEffect(()=>{
    let cursor = document.getElementById("Cross");
    if(cursor){
      let _section = cursor.getElementsByTagName("section")[0];
      setSection(_section);
    }

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


      compressCursor();
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
    console.log("hovers over", item);
    setCursorExpanded(false);

  
    useCursor.setState({
        cursorVariant: "hover",
        isOverProject: true,
        description: "",
        instruction: !url.includes("work") ? "click to read" : "",
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
    compressCursor();
  };

  function expandCursor(){
    if(section){
      let s = section.style;
      s.width = gallerySwiperRef.current.offsetWidth-500 +"px";
      s.height = gallerySwiperRef.current.offsetHeight-200 +"px";
      s.maxWidth = gallerySwiperRef.current.offsetWidth-500 +"px";
      s.maxHeight = gallerySwiperRef.current.offsetHeight-200 +"px";
      s.transform = "translate(0,0)";
      s.margin = "6rem";
      s.backgroundColor = "rgba(211, 211, 211, 0.284)";

    }

  }

  
  function compressCursor(){
    if(section){


    let s = section.style;
    s.width = 200 +"px";
    s.height = 200 +"px";
    s.transform = "translate(-50%,-50%)";
    s.margin = "0";
    s.maxWidth = "200px";
    s.maxHeight = "200px";
    s.backgroundColor = "rgba(0,0,0,0)";
  }

  }

  const handleClick = (e, item)=>{
  
    if(gallerySwiperRef.current && section && !cursorExpanded ){
      expandCursor();
      setCursorExpanded(true);
      useCursor.setState({
        cursorVariant: "expanded",
        isOverProject: false,
        description: item? item.data.description : "",
        title: item? item.data.title : "",
        shouldrenderdetailsontop: false,
        instruction: "click to close",
        carouselTopLeftPos: {x:width>600 ? 100 : 0,y: width>600 ?120 : 0}
      });

      setTimeout(() => {
        window.addEventListener('scroll', handleScroll);
       }, 1000);

    } else if(gallerySwiperRef.current && section && cursorExpanded){
      compressCursor();
      setCursorExpanded(false);
      useCursor.setState({
        cursorVariant: "default",
        isOverProject: false,
        description:"",
        title: "",
        shouldrenderdetailsontop: false,
        instruction: "click to read",
        carouselTopLeftPos: {x:width>600 ? 100 : 0,y: width>600 ?120 : 0}

      });
      window.removeEventListener('scroll', handleScroll);

    }
   
  }

  return (
    <motion.div
      className={`${url.includes("work") ? styles.WorkCarouselContainer : styles.CarouselContainer }` }
      variants={slideInFromBottom}
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
     
    >
      {hovered &&  <Progress
        slice={slice}
        slideIndex={slideIndex}
        paused={paused}
        currentSlide={currentSlide}
      />}

      {/* <Controls
        hovered={hovered}
        setHovered={setHovered}
        paused={paused}
        setPaused={setPaused}
      /> */}
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
          if(!url.includes("work") && section){
            handleClick(e, project);
          }
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
      <Swiper
        onSwiper={setThumbsSwiper}
        ref={thumbSwiperRef}
        className={styles.ThumbSwiper}
        modules={[FreeMode, Thumbs, Mousewheel]}
        mousewheel
        // spaceBetween={10}
        direction={"horizontal"}
        slideToClickedSlide={true}
        slidesPerView={"auto"}
        loop
        freeMode={true}
        centeredSlides
      >
        {slice?.items.map((item, i) => {
          return (
            <SwiperSlide
              className={styles.ThumbSlide}
              key={i}
              // onMouseOver={handleSlide}
              onMouseLeave={handleLeave}
            >
              <Suspense fallback={<LoadSpinner />}>
           
                <ThumbSlide
                  item={item}
                  slideIndex={slideIndex}
                  slice={slice}
                  gallerySwiperRef={gallerySwiperRef}
                  paused={paused}
                />
              </Suspense>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <DescriptionModal data={slice.primary.projectdescription} /> */}
    </motion.div>
  );
};

export default ProjectCarousel;
