// a modal that hovers once the page is scrolled to the bottom of the page and links to homepage
//
// Path: components/Modal/Modal.jsx
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./GoBack.module.scss";
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

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setHeight(modal.current.offsetHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      if (clientX > innerWidth * 0.75 && clientY > innerHeight * 0.75) {
        setShowModal(true);
      } else if (scrollY > height) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };
    if (scrollY > height) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scrollY]);
  //if cursor is in bottom right corner of screen, show modal
  useEffect(() => {}, []);

  return (
    <motion.div
      className={styles.Modal}
      style={{
        display: showModal ? "flex" : "none",
      }}
      ref={modal}
      variants={fadeIn}
      initial="hidden"
      animate={showModal ? "visible" : "hidden"}
      exit="hidden"
    >
      <Link href="/">
        <motion.button variants={fadeIn}>go back</motion.button>
      </Link>
    </motion.div>
  );
};
export default GoBack;
