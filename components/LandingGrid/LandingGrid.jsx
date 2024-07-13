import React,  { Suspense, useRef, useEffect , useState} from "react";
import styles from "./LandingGrid.module.scss";

import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { motion } from "framer-motion";
import Layout from "../Layout/Layout";
import ProjectCarousel from "../ProjectCarousel/ProjectCarousel";

export default function LandingGrid({workInGridWithDetails}) {

  const grid = useRef();
  const mediaWrapper = useRef();

  return (
    <motion.div
      className={styles.Wrapper}
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
                    {/* <WorkCarousel slice={slice} project={item}/> */}
                    <ProjectCarousel slice={slice} project={item}/>

                
                  </motion.div>


               
                </Suspense>
              </motion.div> 
            }
          
             </div>
                
            ))}
          
            </div>
          ))}
        </motion.div>
      </Layout>
    </motion.div>
  );
};

