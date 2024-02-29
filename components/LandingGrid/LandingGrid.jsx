import { Suspense, useRef, useEffect , useState} from "react";
import styles from "./LandingGrid.module.scss";
import { PrismicLink } from "@prismicio/react";
import PrismicRichTextResolver from "../Resolvers/PrismicRichTextResolver/PrismicRichTextResolver";
import MediaResolver from "../Resolvers/MediaResolver/MediaResolver";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { motion } from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import Layout from "../Layout/Layout";
import { useExcluder } from "../Resolvers/States/Excluder";
import {WorkCarousel} from "../../slices/WorkCarousel"


const blendIn = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
}



export default function LandingGrid({workInGridWithDetails}) {

  const grid = useRef();

  console.log("GRID HAS ARRAY", workInGridWithDetails);
 

  const handleHover = (e) => {
    useCursor.setState({
      cursorVariant: "hover",
      isOverProject: true
    });
  };
  const handleLeave = (e) => {
    useCursor.setState({
      cursorVariant: "default",
      isOverProject: false
    });
  };

  const { moveExcluder, removeExcluder } = useExcluder();
  const [hovering, setHovering] = useState(false);
  const mediaWrapper = useRef();

  return (
    <motion.div
      // className={styles.Wrapper}
      onMouseLeave={() => removeExcluder()}
    >
      <Layout>
        <motion.div  ref={grid}>

   
          {workInGridWithDetails && workInGridWithDetails.map((item, key) => (
            <>
            
         
            {item.data.slices && item.data.slices.map((slice, index)=>(
         
            <motion.div
                key={key}
                className={styles.MediaWrapper}
                onMouseOver={() => {
                  setHovering(true);
                  moveExcluder(mediaWrapper.current);
                  handleHover();
                }}
                onMouseLeave={() => {
                  setHovering(false);
                  handleLeave();
                }}
                ref={mediaWrapper}
                style={{
                  borderRadius: "1rem",
                }}
             
              >
                <Suspense fallback={<LoadSpinner />}>
                  <motion.div
                    // className={styles.LinkOverlay}
                    // variants={blendIn}
                    // animate={hovering ? "visible" : "hidden"}
            
                  >
                    {slice && slice.slice_type === "work_carousel" && <WorkCarousel slice={slice}/>}

                    <PrismicLink href={item.url}>
                      {item.project_title}
                    </PrismicLink>
                  </motion.div>
        
                </Suspense>
              </motion.div> 
          
             
                
            ))}
          
            </>
       
            // const videoRef = useRef();
            // const mediaWrapper = useRef();
            // const [hovering, setHovering] = useState(false);
            // return (
            //   <motion.div
            //     key={key}
            //     className={styles.MediaWrapper}
            //     onMouseOver={() => {
            //       setHovering(true);
            //       moveExcluder(mediaWrapper.current);
            //       handleHover();
            //     }}
            //     onMouseLeave={() => {
            //       setHovering(false);
            //       handleLeave();
            //     }}
            //     ref={mediaWrapper}
            //     style={{
            //       borderRadius: "1rem",
            //     }}
             
            //   >
            //     <Suspense fallback={<LoadSpinner />}>
            //       <motion.div
            //         className={styles.LinkOverlay}
            //         variants={blendIn}
            //         animate={hovering ? "visible" : "hidden"}
            
            //       >
            //         <PrismicLink href={item.worklink.url}>
            //           {item.project_title}
            //         </PrismicLink>
            //       </motion.div>
            //       <MediaResolver
            //         media={item.mediaforgrid}
            //         videoRef={videoRef}
            //         loop={true}
            //       />
            //     </Suspense>
            //   </motion.div>
            // );
          ))}
        </motion.div>
      </Layout>
    </motion.div>
  );
};

