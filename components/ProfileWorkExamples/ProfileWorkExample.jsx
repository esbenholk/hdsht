import { useState, useRef} from "react";
import styles from "./ProfileWorkExample.module.scss";
import { PrismicLink } from "@prismicio/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  motion,
  useInView,
} from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import { PrismicRichText } from "@prismicio/react";


const ProfileWorkExample = ({ slice, project }) => {
  const gallerySwiperRef = useRef();
  const carousel = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const url = useCursor((state) => state.url);
  // const [isVisible, setIsVisible] = useState(false);
  const {width} = useWindowDimensions();

  const [projectTitle, setProjectTitle] = useState(slice?.items[currentSlide].title);
  const [projectLink, setProjectLink] = useState("");

  const container = useRef();
  const inView = useInView({
    once: true,
    margin: "100%",
  });
  const settings = {
    dots: false,
    fade: true,
    swipe: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // variableWidth: true,
    swipeToSlide: true,
    // centerMode: true,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
      setProjectLink(slice?.items[next].projectlink);
      setProjectTitle(slice?.items[next].title);
      // resetTimer();
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
  const handleHoverButton = (item) => {
    useCursor.setState({
        cursorVariant: "hoveronlink",
        instruction: !url.includes("work") ? "click to read" : "",
   
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

  return (

    <motion.div
    className={styles.Container}
    animate={inView ? "visible" : "hidden"}
    ref={container}
    >
    <motion.div className={styles.Content}>
      <motion.div
        className={styles.Category}
      >
        <PrismicRichText field={slice.primary.title} />
      </motion.div>


      <motion.div
        className={`${styles.CarouselContainer }` }

        initial="hidden"
        animate="visible"
        exit="hidden"
        ref={carousel}
      >

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
     
                 <MediaResolver
                        isActive={currentSlide == i}
                        media={item.media}
                        height={width < 600 ? width : null}
                        loop={false}
                      />  
              </div>

          );
        })}
      </Slider>
        <div className={styles.InfoDiv}>
                        <PrismicLink href={projectLink} onMouseEnter={handleHoverButton} onMouseLeave={handleLeave}>
                          <p>[{projectTitle}]</p>
                        </PrismicLink>
                        <p >
                          [<span>{currentSlide + 1} / {slice?.items.length} </span>]
                        </p>
    
        </div>

      </motion.div>
      
    </motion.div>
    </motion.div>
  );
};

export default ProfileWorkExample;
