import React,  { Suspense} from "react";
import styles from "./LandingGrid.module.scss";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { motion } from "framer-motion";
import Layout from "../Layout/Layout";
import ProjectCarousel from "../ProjectCarousel/ProjectCarousel";


export default function LandingGrid({workInGridWithDetails}) {
  return (
    <motion.div
      className={styles.Wrapper}
    >
      <Layout>
        <motion.div>
          {workInGridWithDetails && workInGridWithDetails.map((item, key) => (
            <div key={key}>
              {item.data.slices && item.data.slices.map((slice, index)=>(
                <div key={index}>
                    {slice && slice.slice_type === "work_carousel" && 
                      <motion.div
                          key={key}
                          className={styles.MediaWrapper}
                          style={{
                            borderRadius: "1rem",
                          }}
                        >
                          <Suspense fallback={<LoadSpinner />} style={{position: "relative"}}>
                              <ProjectCarousel slice={slice} project={item} />
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

