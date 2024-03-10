// a modal that hovers once the page is scrolled to the bottom of the page and links to homepage
//
// Path: components/Modal/Modal.jsx
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./GoBack.module.scss";
import useCursor from "../Resolvers/States/Cursor";
const fadeIn = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.25,
      staggerChildren: 0.25,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      staggerChildren: 0.25,
    },
  },
};
const GoBack = () => {
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const modal = useRef();
  const nexturl = useCursor((state) => state.nexturl);
  const [isDeskTop, setIsmobile] = useState(false);



  useEffect(() => {

    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsmobile(!mobile);

    // window.addEventListener("scroll", handleScroll, { passive: true });
    // setHeight(modal.current.offsetHeight);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  const handleShowModal = (bool) =>{
   
    if(bool){
      useCursor.setState({
        cursorVariant: "hoveronlink",
        title: nexturl ? "go to next work" : "go to frontpage",
        description: nexturl ? nexturl : "/",
        isOverProject: true, 
        shouldrenderdetailsontop: true
      });
    } else {
      useCursor.setState({
        cursorVariant: "default",
        title: "",
        description: "",
        isOverProject: false, 
        shouldrenderdetailsontop: false
      });
    }

  }
  const handleShowBackModal = (bool) =>{
   
    if(bool){
      useCursor.setState({
        cursorVariant: "hoveronlink",
        title: "go to frontpage",
        description: "",
        isOverProject: true, 
        shouldrenderdetailsontop: false
      });
    } else {
      useCursor.setState({
        cursorVariant: "default",
        title: "",
        description: "",
        isOverProject: false, 
        shouldrenderdetailsontop: false
      });
    }

  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      if (scrollY > height) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scrollY]);
  //if cursor is in bottom right corner of screen, show modal
  useEffect(() => {}, []);

  return (
    <>
      {isDeskTop ? <>
      <a
        href={nexturl ? nexturl : "/"}
        ref={modal}
        className={styles.Modal}

        onMouseLeave={()=>{
          handleShowModal(false);
        }}
        onMouseEnter={()=>{
          handleShowModal(true);
        }}
      >
      </a>

      <a
        href="/"
        ref={modal}
        className={styles.BackModal}

        onMouseLeave={()=>{
          handleShowBackModal(false);
        }}
        onMouseEnter={()=>{
          handleShowBackModal(true);
        }}
      >
        </a >
        </>
      : 
     
      


        <div className={styles.Row}>
       <Link href="/" className={styles.Redirect}>
        go back
       </Link>
       {nexturl.length > 0 && 
       <Link href={nexturl} className={styles.Redirect} >
        next
       </Link>}
       </div>
      
      }
      
      

    </>
  );
};
export default GoBack;
