import { Suspense, useRef, useEffect , useState} from "react";
import styles from "./LandingGrid.module.scss";

import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { motion } from "framer-motion";
import Layout from "../Layout/Layout";
import {WorkCarousel} from "../../slices/WorkCarousel"




export default function LandingGrid({workInGridWithDetails}) {

  const grid = useRef();


  // const { moveExcluder, removeExcluder } = useExcluder();
  // const [hovering, setHovering] = useState(false);
  const mediaWrapper = useRef();

  return (
    <motion.div
      className={styles.Wrapper}
      // onMouseLeave={() => removeExcluder()}
    >
      <Layout>
        <motion.div  ref={grid}>

   
          {workInGridWithDetails && workInGridWithDetails.map((item, key) => (
            <div key={key}>
            
         
            {item.data.slices && item.data.slices.map((slice, index)=>(
              <div key={index}>
            {slice && slice.slice_type === "work_carousel" && 
            <motion.div
                key={key}
                className={styles.MediaWrapper}
      
                ref={mediaWrapper}
                style={{
                  borderRadius: "1rem",
                }}
             
              >
                <Suspense fallback={<LoadSpinner />} style={{position: "relative"}}>
                  <motion.div 
         
                  >
                    <WorkCarousel slice={slice} project={item}/>

                
                  </motion.div>


               
                </Suspense>
              </motion.div> 
            }
          
             </div>
                
            ))}
          
            </div>
       
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

