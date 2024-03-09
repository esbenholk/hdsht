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
import useWindowDimensions from "../Resolvers/UseWindowDimensions";

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
  const {width} = useWindowDimensions();
  console.log("GRID HAS ARRAY", workInGridWithDetails);
 

  const handleHover = (item) => {
    console.log("hovers over", item);
    useCursor.setState({
      cursorVariant: "hover",
      isOverProject: true,
      description: item.data.description,
      title: item.data.title,
    });
  };
  const handleLeave = (e) => {
    useCursor.setState({
      cursorVariant: "default",
      isOverProject: false,
      description: "",
      title: "",
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
                <Suspense fallback={<LoadSpinner />}>
                  <motion.div
                    onMouseOver={() => {
                      setHovering(true);
                      moveExcluder(mediaWrapper.current);
                      handleHover(item);
                    }}
                    onMouseLeave={() => {
                      setHovering(false);
                      handleLeave();
                    }}
                  >
                    <WorkCarousel slice={slice}/>

                
                  </motion.div>

                    <PrismicLink href={item.url} 
                    className={styles.Redirect}
                    onMouseOver={() => {
                      useCursor.setState({
                        cursorVariant: "hoveronlink",
                     
                      });
                    }}
                    onMouseLeave={() => {
                      useCursor.setState({
                        cursorVariant: "default",
                     
                      });
                    }}>
                      {item.data.title}
                    </PrismicLink>
      
                    {width<700 &&      
                        <motion.div>
                          <p> {item.data.description}</p>
                        </motion.div>
                    }
               
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

