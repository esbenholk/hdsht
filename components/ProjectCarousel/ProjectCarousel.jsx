import { useEffect, useState, useRef, Suspense } from "react";
import styles from "./ProjectCarousel.module.scss";
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
import PrismicRichTextResolver from "../Resolvers/PrismicRichTextResolver/PrismicRichTextResolver";


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


function JumbleWordInElement(element, word, speed){
  const letters = "!!ZX#¤%/&)(!?=`^*Ø?§╚╚¥┘ █Å@abcdefghijklmenopqurstpuwvxyzæøå_-_= 0172";
  let words = word.split(" ");

  let interval = null;

  let iteration = 0;

  
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    if(element && element.innerText){

      let codedsentence = [];
      for (let index = 0; index < words.length; index++) {
        const singleWord = words[index];
        let radnomcode = "";
        for (let index = 0; index < singleWord.length; index++) {
          const letter = letters[Math.floor(Math.random() * letters.length)];
          radnomcode += letter;
        }
        codedsentence.push(radnomcode + " ");
        codedsentence.join('   ');
        
      }
  
      element.innerText = codedsentence;
    
  
    }
    
    
    if(iteration >= speed){ 
      clearInterval(interval);
      element.innerText = word;
    }
    
    iteration += 1;
  },1);
}






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

  const [infoIsExpanded, setINfoIsExpanded] = useState(false);
  const infoRef = useRef();
  const creditRef = useRef();


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


  // const handleScroll = () => {
  //     setCursorExpanded(false);
  //     useCursor.setState({
  //       cursorVariant: "default",
  //       isOverProject: false,
  //       description:"",
  //       title: "",
  //       shouldrenderdetailsontop: false,
  //       instruction: "click to read",
  //       carouselTopLeftPos: {x:0,y: 0}
  //     });

  //   window.removeEventListener('scroll', handleScroll);

  // };
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
  const handleHoverButton = (item) => {
    useCursor.setState({
        cursorVariant: "hoveronlink",

        instruction: !url.includes("work") ? "click to read" : "",
        title: item? item.data.title : "",
   
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


  const handleClick = (e, item)=>{
  
    if(infoIsExpanded){
      setINfoIsExpanded(false);
    }
    // if(gallerySwiperRef.current && section && !cursorExpanded ){
    //   expandCursor();
    //   setCursorExpanded(true);
    //   useCursor.setState({
    //     cursorVariant: "expanded",
    //     isOverProject: false,
    //     description: item? item.data.description : "",
    //     title: item? item.data.title : "",
    //     shouldrenderdetailsontop: false,
    //     instruction: "click to close",
    //     carouselTopLeftPos: {x:width>600 ? 100 : 0,y: width>600 ?120 : 0}
    //   });

    //   setTimeout(() => {
    //     window.addEventListener('scroll', handleScroll);
    //    }, 1000);

    // } else if(gallerySwiperRef.current && section && cursorExpanded){
    //   compressCursor();
    //   setCursorExpanded(false);
    //   useCursor.setState({
    //     cursorVariant: "default",
    //     isOverProject: false,
    //     description:"",
    //     title: "",
    //     shouldrenderdetailsontop: false,
    //     instruction: "click to read",
    //     carouselTopLeftPos: {x:width>600 ? 100 : 0,y: width>600 ?120 : 0}

    //   });
    //   window.removeEventListener('scroll', handleScroll);

    // }
   
  }


  // url.includes("work") ? styles.WorkCarouselContainer : 
  return (
    <motion.div
      className={`${styles.CarouselContainer }` }
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
      onClick={(e)=>{
        if(!url.includes("work")){
          handleClick(e, project);
        }
      }}
     
    >
      {/* {hovered &&  <Progress
        slice={slice}
        slideIndex={slideIndex}
        paused={paused}
        currentSlide={currentSlide}
      />} */}

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
          className={`${styles.ThumbSwiper}  ${infoIsExpanded && styles.Hidden}`}
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
 



{project && <>
      <div className={styles.InfoDiv}>
        <PrismicLink href={project.url}
          onMouseOver={() => {
            handleHoverButton(project);
          }}>
          <p>[{project.data.title}]</p>
        </PrismicLink>
        
        {project.data.description && <>
          <p 
          className={styles.InfoButton}
    
          onMouseOver={() => {
            handleHoverButton(project);
          }}
          onClick={(e) => {

            if(width>700 && !infoIsExpanded){
              gallerySwiperRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            }

            if(infoRef){
              JumbleWordInElement(infoRef.current, project.data.description, 15);
            }
            if(creditRef){
              JumbleWordInElement(creditRef.current, project.data.credits, 15);

            }
            setINfoIsExpanded(!infoIsExpanded);

            if(!url.includes("work") && section){
              handleClick(e, project);
            }
          }}
  
          >
          {width < 700 ? <> [<span>{infoIsExpanded ? "-" : "+"}</span>]</> : "[info]"}
          
        </p>
        </>}
      </div>

          
              <motion.div className={`${styles.InfoContainer} ${infoIsExpanded ? styles.Open : styles.Closed}` }>
           
                  <div className={styles.Content}>
                    <div className={`${infoIsExpanded ? styles.Open : styles.Closed} ${styles.Description}`}>
                      <p ref={infoRef} >
                        {project.data.description}
                      </p>

                    </div>

                    <div className={`${infoIsExpanded ? styles.Open : styles.Closed} ${styles.Credits}`}>

                      <span ref={creditRef} >
                        <p>{project.data.credits}</p>
                      </span>
                    </div>
                    
                  </div>
              </motion.div>
    </> }
    </motion.div>
  );
};

export default ProjectCarousel;
