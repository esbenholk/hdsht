import { useEffect, useState, useRef, Suspense } from "react";
import styles from "./ProjectCarousel.module.scss";
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";
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

const ProjectCarousel = ({ slice }) => {
  const gallerySwiperRef = useRef();
  const thumbSwiperRef = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const { duration, setCurrentVideo, currentVideo } = useVideo();
  const [paused, setPaused] = useState(false);
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
    const thumbnailSwiper = thumbSwiperRef.current.swiper;

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
    const trigger = currentSlide === "image" ? 5 : duration;
    if (seconds > trigger && !paused) {
      gallerySwiperRef.current.swiper.slideNext();
    }
  }, [seconds]);

  const handleSlide = () => {
    useCursor.setState({
      cursorVariant: "slide",
    });
    setHovered(true);
  };

  const handleLeave = () => {
    useCursor.setState({
      cursorVariant: "default",
    });
    setHovered(false);
  };

  return (
    <motion.div
      className={styles.CarouselContainer}
      variants={slideInFromBottom}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Progress
        slice={slice}
        slideIndex={slideIndex}
        paused={paused}
        currentSlide={currentSlide}
      />
      <Controls
        hovered={hovered}
        setHovered={setHovered}
        paused={paused}
        setPaused={setPaused}
      />
      <Swiper
        ref={gallerySwiperRef}
        className={styles.SwiperTop}
        slidesPerView={1}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel, Autoplay, Lazy]}
        mousewheel={false}
        lazy={true}
        onSlideChange={() => {
          if (slice?.items[slideIndex].carouselitem.kind === "document") {
          } else {
            setCurrentVideo(null);
          }
          resetTimer();
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
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        {slice?.items.map((item, i) => {
          return (
            <SwiperSlide
              className={styles.GallerySlide}
              key={i}
              onMouseOver={handleSlide}
              onMouseLeave={handleLeave}
            >
              <GallerySlide
                item={item}
                gallerySwiperRef={gallerySwiperRef}
                slice={slice}
                slideIndex={slideIndex}
              />
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
        spaceBetween={10}
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
              onMouseOver={handleSlide}
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
      <DescriptionModal data={slice.primary.projectdescription} />
    </motion.div>
  );
};

export default ProjectCarousel;
