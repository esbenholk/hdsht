import { useEffect, useState, useRef, Suspense, lazy } from "react";
import styles from "./ProjectCarousel.module.scss";
// import { Swiper, SwiperSlide } from "swiper/react";
import { PrismicLink } from "@prismicio/react";
import AnimatedButton from "./AnimatedButton";
import Progress from "./Progress/Progress";

import LoadSpinner from "../LoadSpinner/LoadSpinner";
import useVideo from "../Resolvers/States/Video";
import {
  motion,
} from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import GallerySlide from "./GallerySlide";
import ThumbSlide from "./ThumbSlide";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import Slider from "react-slick";



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




const ProjectCarousel = ({ slice, project, isInViewport }) => {
  const [amountOfVideos, setAmoutOfVideos] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideType, setCurrentSlideType] = useState("");

  const carousel = useRef();
  const settings = {
    dots: false,
    fade: true,
    swipe: true,
    lazyLoad: isInViewport,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    // variableWidth: true,
    swipeToSlide: true,
    // centerMode: true,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
      resetTimer();
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />

  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={styles.ArrowButton}
        style={{ ...style, right: 0 }}
        onClick={onClick}
        onMouseOver={() => {
          handleHoverButton(project);
        }}        
        onMouseLeave={handleLeave}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={styles.ArrowButton}
        style={{ ...style, left: 0 }}
        onClick={onClick}
        onMouseOver={() => {
          handleHoverButton(project);
        }}
        onMouseLeave={handleLeave}
      />
    );
  
  
  }

  const gallerySwiperRef = useRef();

  // const thumbSwiperRef = useRef();
  // const [thumbsSwiper, setThumbsSwiper] = useState(0);
  // const [slideIndex, setSlideIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { duration} = useVideo();
  const [paused, setPaused] = useState(true);
  // const nexturl = useCursor((state) => state.nexturl);
  const url = useCursor((state) => state.url);


  const {width} = useWindowDimensions();
  // const [section, setSection] = useState();

  const [infoIsExpanded, setINfoIsExpanded] = useState(false);
  const infoRef = useRef();
  const creditRef = useRef();

  const loaderImage = useCursor((state) => state.loaderImage);

  useEffect(() => {
    if (slice.items[currentSlide].carouselitem.kind === "image") {
      setCurrentSlideType("image");
      // setCurrentVideo(null);
      // useVideo.setState({ duration: null, currentTime: null });
    } else {
      setCurrentSlideType("video");
    }
  }, [currentSlide]);

  const timer = useRef(0);
  useEffect(() => {
    timer.current = setInterval(() => {
      if (!paused || width < 600) {
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
  // useEffect(() => {

  //   console.log("swiper", slice, project);

  //   const gallerySwiper = gallerySwiperRef.current?.swiper;
  //   const thumbnailSwiper = thumbSwiperRef.current?.swiper;
  //   if (gallerySwiper && gallerySwiper.controller && thumbnailSwiper.controller) {
  //     gallerySwiper.controller.control = thumbnailSwiper;
  //     thumbnailSwiper.controller.control = gallerySwiper;
  //   }
  // }, []);

  useEffect(()=>{
    if(slice){
      let amount = 0;
      for (let index = 0; index < slice.items.length; index++) {
        const element = slice.items[index];
        if(element.carouselitem.kind === "video"){
          amount++;
        }
        
      }
      setAmoutOfVideos(amount);
    
    }


  },[])

  useEffect(() => {
      const trigger = currentSlideType === "image" ? 5 : duration;
      if (seconds > trigger && !paused) {
        gallerySwiperRef.current.slickNext();
      }
  }, [seconds]);

  const handleHover = (item) => {

    useCursor.setState({
        cursorVariant: "hover",
        isOverProject: true,
        description: "",
        instruction: !url.includes("work") && infoIsExpanded ? "" : "",
        // title: item? item.data.title : "",
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
      handleLeave();
    }
   
  }

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
      onMouseEnter={()=>{
        setPaused(false);
      }}
      onMouseLeave={()=>{
        setHovered(false);
        // pauseVideos();
        setPaused(true);
      }}
      onClick={(e)=>{
        if(!url.includes("work")){
          handleClick(e, project);
        }
      }}  
    >
      {hovered ? 
        <Progress
          slice={slice}
            slideIndex={currentSlide}
            paused={paused}
            currentSlide={currentSlideType}
          hovered={hovered}
          />
        : width < 600 ?
          <Progress
            slice={slice}
            slideIndex={currentSlide}
            paused={paused}
            currentSlide={currentSlideType}
            hovered={hovered}
        /> : null
      }

      <Slider
         {...settings}
        className={`${styles.SwiperTop} swiper--lazy`}
         onMouseOver={() => {
          handleHover(project);
        }}
        onMouseLeave={() => {
          handleLeave();
        }}
        ref={gallerySwiperRef}
      >
        {slice?.items.map((item, i) => {
          return (
            <div className={styles.GallerySlide}   key={i}> 
                  <GallerySlide
                  item={item}
                  slice={slice}
                  isActive={currentSlide == i}
                  currentSlide={currentSlide}
                />
                {/* <p style={{position: "absolute", top: 0}}>slide: {i} , isActive={currentSlide}, duration: {duration}, seconds: {seconds}, amount of videos: {amountOfVideos}</p> */}
              </div>

          );
        })}
      </Slider>

     {width > 600 && 
        <div
            className={`${styles.ThumbSwiper}  ${infoIsExpanded && styles.Hidden}`}
          >
            {slice?.items.map((item, i) => {
              return (
                <div
                  className={`${styles.ThumbSlide} ${!hovered ? styles.Hidden : null}`}
                  style={{width: item.carouselitem.kind === "image" && amountOfVideos > 1 ? `${(100/slice.items.length)*(amountOfVideos/slice.items.length) }%` :`${(100/slice.items.length)/(amountOfVideos/slice.items.length)}%` } }
                  key={i}
                  // onMouseOver={handleSlide}
                  onMouseLeave={handleLeave}
                  onClick={() => {
                    gallerySwiperRef.current.slickGoTo(i)
                  }}
                >   
                  
                  <Suspense fallback={<LoadSpinner />}>
                      <ThumbSlide
                        loaderImage={loaderImage}
                        item={item}
                        slideIndex={currentSlide}
                        slice={slice}
                        gallerySwiperRef={gallerySwiperRef}
                        paused={paused}
                     
                      />
                  </Suspense>
                </div>
              );
            })}
          </div>
        }
      
      {project && <>
      <div className={styles.InfoDiv}>
        <PrismicLink href={project.url}
          onMouseOver={() => {
            handleHoverButton(project);
          }}>
          <p>[{project.data.title}]</p>
        </PrismicLink>
        
        {project.data.description && <>
   
        <div onMouseOver={() => {
            handleHoverButton(project);
          }}
          onClick={(e) => {

            if(width>700 && !infoIsExpanded){
              carousel.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            }

            if(!infoIsExpanded && infoRef){
              JumbleWordInElement(infoRef.current, project.data.description, 15);
            }
            if(!infoIsExpanded && creditRef){
              JumbleWordInElement(creditRef.current, project.data.credits, 15);

            }
            setINfoIsExpanded(!infoIsExpanded);

            if(!url.includes("work")){
              handleClick(e, project);
            }
          }}>
      
          <AnimatedButton open={infoIsExpanded}/> 
        </div>

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
