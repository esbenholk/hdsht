import { useEffect, useState,useRef } from "react";
import { motion } from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
import styles from "./AnimatedButton.module.scss";

const AnimatedButton = ({open}) => {
  const cursorVariant = useCursor((state) => state.cursorVariant);
  const projectDesc = useCursor((state) => state.description);
  const projectTitle = useCursor((state) => state.title);
  const isOverProject = useCursor((state)=>state.isOverProject);
  const instruction = useCursor((state)=> state.instruction);
  const isLoader = useCursor((state)=> state.isLoader);

  const carouselTopLeftPos = useCursor((state)=> state.carouselTopLeftPos);

  const [trackedTitle, setTrackedTitle] = useState(null);
  const [trackedDesc, setTrackedDesc] = useState(null);



  const titleRef = useRef();
  const descRef = useRef();
  const mousePosition = {
    x: useCursor((state) => state.cursorPosition.x),
    y: useCursor((state) => state.cursorPosition.y),
  };
  const [isDesktop, setIsDesktop] = useState(false);





  useEffect(() => {
    // get device type by useragent
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsDesktop(!mobile);

    const handleMouseMove = (e) => {
      useCursor.setState({
        cursorPosition: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    //on first render invoke handleMouseMove
    handleMouseMove({ clientX: 0, clientY: 0 });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(()=>{
    if(projectTitle !== trackedTitle){
      if(titleRef.current){
        JumbleLettersInElement(titleRef.current, projectTitle, 100);
      }
      setTrackedTitle(projectTitle);
    }
  },[projectTitle, trackedTitle])

  useEffect(()=>{
    if(projectDesc !== trackedDesc){
      if(descRef.current){
        JumbleWordInElement(descRef.current, projectDesc ? projectDesc : "", 10);
      }
      // if(projectDesc !== ""){
      //   setTrackedDesc(projectDesc);
      // }
      setTrackedDesc(projectDesc);
    
    }
  },[projectDesc, trackedDesc])



  return (
    <>

      <motion.div
        className={`${styles.Button} ${open ? styles.Open : styles.Closed}`}
        animate={cursorVariant}
      >
        <div className={styles.Dot} >
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>

          <div></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
        </div>
        <div className={styles.Dot}>
        <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
        </div>



      </motion.div>


 
     
    
          
       
    </>
  );
};

export default AnimatedButton;
