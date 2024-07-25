// import { useEffect, useState, useRef, Suspense } from "react";
// import styles from "./ProjectCarousel.module.scss";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { PrismicLink } from "@prismicio/react";
// import AnimatedButton from "./AnimatedButton";
// import Progress from "./Progress/Progress";
// import "swiper/scss";
// import "swiper/css/lazy";
// import "swiper/scss/thumbs";
// import "swiper/scss/pagination";
// import "swiper/scss/effect-fade";
// import "swiper/scss/navigation";
// import "swiper/scss/free-mode";
// import "swiper/scss/mousewheel";
// import {
//   Navigation,
//   Thumbs,
//   FreeMode,
//   Mousewheel,
//   Lazy,
//   EffectFade
// } from "swiper";
// import LoadSpinner from "../LoadSpinner/LoadSpinner";
// import useVideo from "../Resolvers/States/Video";
// import {
//   motion,
// } from "framer-motion";
// import useCursor from "../Resolvers/States/Cursor";
// import GallerySlide from "./GallerySlide";
// import ThumbSlide from "./ThumbSlide";
// import useWindowDimensions from "../Resolvers/UseWindowDimensions";


// const slideInFromBottom = {
//   hidden: {
//     opacity: 0,
//     y: 100,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeInOut",
//     },
//   },
// };
// function JumbleWordInElement(element, word, speed){
//   const letters = "!!ZX#¤%/&)(!?=`^*Ø?§╚╚¥┘ █Å@abcdefghijklmenopqurstpuwvxyzæøå_-_= 0172";
//   let words = word.split(" ");

//   let interval = null;

//   let iteration = 0;

  
  
//   clearInterval(interval);
  
//   interval = setInterval(() => {
//     if(element && element.innerText){

//       let codedsentence = [];
//       for (let index = 0; index < words.length; index++) {
//         const singleWord = words[index];
//         let radnomcode = "";
//         for (let index = 0; index < singleWord.length; index++) {
//           const letter = letters[Math.floor(Math.random() * letters.length)];
//           radnomcode += letter;
//         }
//         codedsentence.push(radnomcode + " ");
//         codedsentence.join('   ');
        
//       }
  
//       element.innerText = codedsentence;
    
  
//     }
    
    
//     if(iteration >= speed){ 
//       clearInterval(interval);
//       element.innerText = word;
//     }
    
//     iteration += 1;
//   },1);
// }
// const ProjectCarousel = ({ slice, project }) => {
//   const gallerySwiperRef = useRef();
//   const carousel = useRef();
//   const thumbSwiperRef = useRef();
//   const [thumbsSwiper, setThumbsSwiper] = useState(0);
//   const [slideIndex, setSlideIndex] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [hovered, setHovered] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(null);
//   const { duration, setCurrentVideo, currentVideo,  setDuration } = useVideo();
//   const [paused, setPaused] = useState(true);
//   const nexturl = useCursor((state) => state.nexturl);
//   const url = useCursor((state) => state.url);


//   const {width} = useWindowDimensions();
//   const [section, setSection] = useState();

//   const [infoIsExpanded, setINfoIsExpanded] = useState(false);
//   const infoRef = useRef();
//   const creditRef = useRef();

//   const loaderImage = useCursor((state) => state.loaderImage);

//   useEffect(() => {
//     if (slice.items[slideIndex].carouselitem.kind === "image") {
//       setCurrentSlide("image");
//       // setCurrentVideo(null);
//       // useVideo.setState({ duration: null, currentTime: null });
//     } else {
//       setCurrentSlide("video");
//     }
//   }, [slideIndex, currentVideo]);

//   const timer = useRef(0);
//   useEffect(() => {
//     timer.current = setInterval(() => {
//       if (!paused || width < 600) {
//         setSeconds((seconds) => seconds + 1);
//       }
//     }, 1000);
//     return () => {
//       clearInterval(timer.current);
//     };
//   }, [paused]);

//   const resetTimer = () => {
//     setSeconds(0);
//   };
//   useEffect(() => {

//     console.log("swiper", slice, project);

//     const gallerySwiper = gallerySwiperRef.current?.swiper;
//     const thumbnailSwiper = thumbSwiperRef.current?.swiper;
//     if (gallerySwiper && gallerySwiper.controller && thumbnailSwiper.controller) {
//       gallerySwiper.controller.control = thumbnailSwiper;
//       thumbnailSwiper.controller.control = gallerySwiper;
//     }
//   }, []);

//   useEffect(() => {
//       const trigger = currentSlide === "image" ? 5 : duration;
      
//       if (seconds > trigger && !paused) {
//         gallerySwiperRef.current.swiper.slideNext();
//       }
//   }, [seconds]);

//   const handleHover = (item) => {

//     useCursor.setState({
//         cursorVariant: "hover",
//         isOverProject: true,
//         description: "",
//         instruction: !url.includes("work") && infoIsExpanded ? "" : "",
//         title: item? item.data.title : "",
//         shouldrenderdetailsontop: false
//       });
//   };
//   const handleHoverButton = (item) => {
//     useCursor.setState({
//         cursorVariant: "hoveronlink",

//         instruction: !url.includes("work") ? "click to read" : "",
//         title: item? item.data.title : "",
   
//       });
 
   
//   };
//   const handleLeave = (e) => {
//     useCursor.setState({
//       cursorVariant: "default",
//       isOverProject: false,
//       description: "",
//       title: "",
//       shouldrenderdetailsontop: false
//     });
//   };
//   const handleClick = (e, item)=>{
  
//     if(infoIsExpanded){
//       setINfoIsExpanded(false);
//     }
   
//   }

//   // function pauseVideos(){
//   //   let videos = document.getElementsByTagName("video");
//   //   for (let index = 0; index < videos.length; index++) {
//   //     if(videos[index].id != "videoheader"){
//   //       videos[index].pause();
//   //       console.log("pause video", videos[index].id );
//   //     }    
//   //   }
//   // }
//   // function playCurrentVideo(){
//   //  let _currentVideo =document.getElementById(project.data.title + gallerySwiperRef.current?.swiper?.realIndex);
    
   
//   //  console.log("plays current video",currentVideo, duration, currentVideo.getDuration());
    
    
//   //   // if(currentVideo){
//   //   //     currentVideo.play();
//   //   // }
//   // }

//   return (
//     // <motion.div
//     //   className={`${styles.CarouselContainer }` }
//     //   variants={slideInFromBottom}
//     //   initial="hidden"
//     //   animate="visible"
//     //   exit="hidden"
//     //   ref={carousel}
//     //   onMouseOver={()=>{
//     //     setHovered(true);
//     //   }}
//     //   onMouseEnter={()=>{
//     //     setPaused(false);
//     //   }}
//     //   onMouseLeave={()=>{
//     //     setHovered(false);
//     //     // pauseVideos();
//     //     setPaused(true);
//     //   }}
//     //   onClick={(e)=>{
//     //     if(!url.includes("work")){
//     //       handleClick(e, project);
//     //     }
//     //   }}
     
//     // >
//     //   {hovered ? 
//     //     <Progress
//     //       slice={slice}
//     //         slideIndex={slideIndex}
//     //         paused={paused}
//     //         currentSlide={currentSlide}
//     //       hovered={hovered}
//     //       />
//     //     : width < 600 ?
//     //       <Progress
//     //         slice={slice}
//     //         slideIndex={slideIndex}
//     //         paused={paused}
//     //         currentSlide={currentSlide}
//     //         hovered={hovered}
//     //     /> : null
//     //   }


//     //   {/* <Controls
//     //     hovered={hovered}
//     //     setHovered={setHovered}
//     //     paused={paused}
//     //     setPaused={setPaused}
//     //   /> */}
//     //   <Swiper
//     //     ref={gallerySwiperRef}
//     //     className={`${styles.SwiperTop} swiper--lazy`}
//     //     slidesPerView={1}
//     //     loop={true}
//     //     effect={"fade"}
//     //     thumbs={{
//     //       swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//     //     }}
//     //     onReachEnd={() => {
//     //         if(url.includes("work") && nexturl){
//     //           window.location.href = nexturl;              
//     //         } 
//     //     }}
//     //     modules={[EffectFade, FreeMode, Navigation, Thumbs, Mousewheel, Lazy]}
//     //     mousewheel={false}
//     //        checkinview="true"
//     //       lazy="true"
//     //     onSlideChange={() => {
//     //       // if (slice?.items[slideIndex].carouselitem.kind === "document") {
//     //       // } else {
//     //       //   setCurrentVideo(null);
//     //       // }
//     //       resetTimer();

//     //       if(currentVideo){
//     //         setDuration(currentVideo.getDuration());
//     //       }
//     //       // pauseVideos();
//     //       // playCurrentVideo(); 
//     //       setSlideIndex(gallerySwiperRef.current.swiper.realIndex) 
//     //     }}
//     //     onMouseOver={() => {
//     //       handleHover(project);
//     //     }}
//     //     onMouseLeave={() => {
//     //       handleLeave();
//     //     }}

//     //     onSlideNextTransitionStart={() => {
//     //       if (thumbSwiperRef.current?.swiper) {
//     //         thumbSwiperRef.current.swiper.slideNext();
//     //       }
//     //     }}
//     //     onSlidePrevTransitionStart={() => {
//     //       if (thumbSwiperRef.current?.swiper) {
//     //         thumbSwiperRef.current.swiper.slidePrev();
//     //       }
//     //     }}

//     //     onClick={(e) => {
//     //       gallerySwiperRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
//     //     }}

//     //   >
//     //     {slice?.items.map((item, i) => {
//     //       return (
//     //         <SwiperSlide
//     //           className={styles.GallerySlide}
//     //           key={i}
//     //         >
//     //           {({ isActive }) => (
//     //             <>
//     //             <GallerySlide
//     //             // keynm={project.data.title + i}
//     //             item={item}
//     //             gallerySwiperRef={gallerySwiperRef}
//     //             slice={slice}
//     //             isActive={isActive}
//     //             slideIndex={slideIndex}
//     //           />

//     //             </>
//     //           )}
           
//     //         </SwiperSlide>
//     //       );
//     //     })}
//     //   </Swiper>
   
//     //   {width > 600 && 
      
//     //   <Swiper
//     //       checkinview="true"
//     //       lazy="true"
//     //       onSwiper={setThumbsSwiper}
//     //       ref={thumbSwiperRef}
//     //       className={`${styles.ThumbSwiper}  ${infoIsExpanded && styles.Hidden}`}
//     //       modules={[FreeMode, Thumbs, Mousewheel]}
//     //       mousewheel
//     //       // spaceBetween={10}
//     //       direction={"horizontal"}
//     //       slideToClickedSlide={true}
//     //       slidesPerView={"auto"}
//     //       loop
//     //       freeMode={true}
//     //       centeredSlides
//     //     >
//     //       {slice?.items.map((item, i) => {
//     //         return (
//     //           <SwiperSlide
//     //             className={`${styles.ThumbSlide} ${item.carouselitem.kind === "image" && styles.ThumbSlideImage}`}
//     //             key={i}
//     //             // onMouseOver={handleSlide}
//     //             onMouseLeave={handleLeave}
//     //           >
                
//     //             <Suspense fallback={<LoadSpinner />}>
//     //                   <ThumbSlide
//     //                   loaderImage={loaderImage}
//     //                   item={item}
//     //                   slideIndex={slideIndex}
//     //                   slice={slice}
//     //                   gallerySwiperRef={gallerySwiperRef}
//     //                   paused={paused}
//     //                 />
//     //             </Suspense>
//     //           </SwiperSlide>
//     //         );
//     //       })}
//     //     </Swiper>
//     //   }
      
      

   
 



//     // {project && <>
//     //   <div className={styles.InfoDiv}>
//     //     <PrismicLink href={project.url}
//     //       onMouseOver={() => {
//     //         handleHoverButton(project);
//     //       }}>
//     //       <p>[{project.data.title}]</p>
//     //     </PrismicLink>
        
//     //     {project.data.description && <>
   
//     //     <div onMouseOver={() => {
//     //         handleHoverButton(project);
//     //       }}
//     //       onClick={(e) => {

//     //         if(width>700 && !infoIsExpanded){
//     //           gallerySwiperRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
//     //         }

//     //         if(!infoIsExpanded && infoRef){
//     //           JumbleWordInElement(infoRef.current, project.data.description, 15);
//     //         }
//     //         if(!infoIsExpanded && creditRef){
//     //           JumbleWordInElement(creditRef.current, project.data.credits, 15);

//     //         }
//     //         setINfoIsExpanded(!infoIsExpanded);

//     //         if(!url.includes("work") && section){
//     //           handleClick(e, project);
//     //         }
//     //       }}>
      
//     //       <AnimatedButton open={infoIsExpanded}/> 
//     //     </div>

//     //     </>}
//     //   </div>

//     //           <motion.div className={`${styles.InfoContainer} ${infoIsExpanded ? styles.Open : styles.Closed}` }>
           
//     //               <div className={styles.Content}>
//     //                 <div className={`${infoIsExpanded ? styles.Open : styles.Closed} ${styles.Description}`}>
//     //                   <p ref={infoRef} >
//     //                     {project.data.description}
//     //                   </p>
                

//     //                 </div>

//     //                 <div className={`${infoIsExpanded ? styles.Open : styles.Closed} ${styles.Credits}`}>

//     //                   <span ref={creditRef} >
//     //                     <p>{project.data.credits}</p>
//     //                   </span>
//     //                 </div>
                    
//     //               </div>
//     //           </motion.div>
//     // </> }


//     // </motion.div>


//     <div>
//     {project && <>
//       <div className={styles.InfoDiv}>
//         <PrismicLink href={project.url}
//           onMouseOver={() => {
//             handleHoverButton(project);
//           }}>
//           <p>[{project.data.title}]</p>
//         </PrismicLink>
        
//         {project.data.description && <>
   
//         <div onMouseOver={() => {
//             handleHoverButton(project);
//           }}
//           onClick={(e) => {

//             if(width>700 && !infoIsExpanded){
//               gallerySwiperRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
//             }

//             if(!infoIsExpanded && infoRef){
//               JumbleWordInElement(infoRef.current, project.data.description, 15);
//             }
//             if(!infoIsExpanded && creditRef){
//               JumbleWordInElement(creditRef.current, project.data.credits, 15);

//             }
//             setINfoIsExpanded(!infoIsExpanded);

//             if(!url.includes("work") && section){
//               handleClick(e, project);
//             }
//           }}>
      
//           <AnimatedButton open={infoIsExpanded}/> 
//         </div>

//         </>}
//       </div>

//               <motion.div className={`${styles.InfoContainer} ${infoIsExpanded ? styles.Open : styles.Closed}` }>
           
//                   <div className={styles.Content}>
//                     <div className={`${infoIsExpanded ? styles.Open : styles.Closed} ${styles.Description}`}>
//                       <p ref={infoRef} >
//                         {project.data.description}
//                       </p>
                

//                     </div>

//                     <div className={`${infoIsExpanded ? styles.Open : styles.Closed} ${styles.Credits}`}>

//                       <span ref={creditRef} >
//                         <p>{project.data.credits}</p>
//                       </span>
//                     </div>
                    
//                   </div>
//               </motion.div>
//     </> }




//         {slice?.items.map((item, i) => {
//           return (
         
//                 <>
//                 <GallerySlide
//                 // keynm={project.data.title + i}
//                 item={item}
//                 gallerySwiperRef={gallerySwiperRef}
//                 slice={slice}
//                 // isActive={isActive}
//                 slideIndex={slideIndex}
//               />

//                 </>
          
            
//           );
//         })}


        
        
//     </div>
//   );
// };

// export default ProjectCarousel;
