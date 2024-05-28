import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./ProfileWorkExample.module.scss";
import layoutStyles from "../CompanyPhilosophy/CompanyPhilosophy.module.scss"
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";
import { PrismicLink } from "@prismicio/react";
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
  useInView,
} from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import GallerySlide from "../ProjectCarousel/GallerySlide";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import { PrismicRichText } from "@prismicio/react";


const ProfileWorkExample = ({ slice, project }) => {
  const gallerySwiperRef = useRef();
  const carousel = useRef();
  const thumbSwiperRef = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { duration, setCurrentVideo, currentVideo } = useVideo();
  const [paused, setPaused] = useState(false);
  const nexturl = useCursor((state) => state.nexturl);
  const url = useCursor((state) => state.url);
  // const [isVisible, setIsVisible] = useState(false);
  const {width, height} = useWindowDimensions();
  const [section, setSection] = useState();
  const [cursorExpanded, setCursorExpanded] = useState(false);

  const [infoIsExpanded, setINfoIsExpanded] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectIndex, setProjectIndex] = useState(1);

  const container = useRef();
  const inView = useInView({
    once: true,
    margin: "100%",
  });

  // useEffect(()=>{
  //   let cursor = document.getElementById("Cross");
  //   if(cursor){
  //     let _section = cursor.getElementsByTagName("section")[0];
  //     setSection(_section);
  //   }
    
  //   console.log("PROJECT", project, slice);

  // },[])
  // useEffect(() => {
  //   if (slice.items[slideIndex].carouselitem.kind === "image") {
  //     setCurrentSlide("image");
  //     setCurrentVideo(null);
  //     useVideo.setState({ duration: null, currentTime: null });
  //   }
  //   if (slice.items[slideIndex].carouselitem.kind === "document") {
  //     setCurrentSlide("video");
  //   }
  // }, [slideIndex, currentVideo]);


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

    console.log("looking for projekt link", slice);
    setProjectIndex(1);
    setProjectLink(slice?.items[0].projectlink.url);
    setProjectTitle(slice?.items[0].title);
  }, []);

  const updateIndex = useCallback(
    () => 
      {
        setProjectIndex(gallerySwiperRef.current.swiper.realIndex + 1);
        setProjectLink(slice?.items[gallerySwiperRef.current.swiper.realIndex].projectlink);
        setProjectTitle(slice?.items[gallerySwiperRef.current.swiper.realIndex].title);
        setCurrentSlide(gallerySwiperRef.current.swiper.realIndex);
      },
    []
  );
  // Add eventlisteners for swiper after initializing
  useEffect(() => {
    const swiperInstance = gallerySwiperRef.current.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, [updateIndex]);

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
    className={layoutStyles.Container}
    animate={inView ? "visible" : "hidden"}
    ref={container}
    >
    <motion.div className={layoutStyles.Content}>
      <motion.div
        className={layoutStyles.Category}
      >
        <PrismicRichText field={slice.primary.title} />
      </motion.div>


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
      >


        <Swiper

          ref={gallerySwiperRef}
          className={styles.SwiperTop}
          slidesPerView={1}
          loop={true}
          mousewheel={false}
          lazy={true}
          centeredSlides={true}
          // onRealIndexChange={(element)=>{
          //   setProjectIndex(slideIndex + 1);
          //   setProjectLink(slice?.items[slideIndex].projectlink);
          //   setProjectTitle(slice?.items[slideIndex].title);

          // }}
          // onSlideChange={() => {
          //   setProjectIndex(slideIndex + 1);
          //   setProjectLink(slice?.items[slideIndex].projectlink);
          //   setProjectTitle(slice?.items[slideIndex].title);
          // }}
          onMouseOver={() => {
            handleHover(project);
          }}
          onMouseLeave={() => {
            handleLeave();
          }}
    
          onInit={() => {
            setProjectIndex(slideIndex + 1);
            setProjectLink(slice?.items[slideIndex].projectlink);
            setProjectTitle(slice?.items[slideIndex].title);
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
               
                    <MediaResolver
                        isActive={isActive}
                        media={item.media}
                        height={width < 600 ? width : null}
                        loop={false}
                      />  
                )}  
            
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={styles.InfoDiv}>
                        <PrismicLink href={projectLink}>
                          <p>[{projectTitle}]</p>
                        </PrismicLink>
                        <p >
                          [<span>{projectIndex} / {slice?.items.length} </span>]
                        </p>
    
        </div>

      </motion.div>
      
    </motion.div>
    </motion.div>
  );
};

export default ProfileWorkExample;
