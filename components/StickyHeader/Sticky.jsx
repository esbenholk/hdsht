import styles from "./Sticky.module.scss";
import { useRef, useEffect, useState } from "react";
import useCursor from "../Resolvers/States/Cursor";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import ParticleCanvas from "../Resolvers/_particleCanvas";
import Logo from 'assets/svg/HDSHT_HD.svg';

// if(bodyContainer.scrollTop < offset){
//   for (let i = bodyContainer.scrollTop; i <= offset; i++) {
//     setTimeout(() => (bodyContainer.scrollTop = i), 4);
//   }
// } else {
//   for (let i = bodyContainer.scrollTop; i >= offset; i--) {
//     setTimeout(() => (bodyContainer.scrollTop = i), 4);
//   }
// }

const Sticky = ({ slice, isProjectPage }) => {
  const header = useRef();
  const [height, setHeight] = useState(0);
  const [OffSetValue, setOffset] = useState(0.7);
  const {width} = useWindowDimensions();
  const [isNotInAHirarchy, setIsNotInAHirarchy] = useState(true);
  const [hirarchyTitle, setHirarchyTitle] = useState("");



  const [logoInPosition, setLogoInPosition] = useState(false);
  const { footerOffset } = useFooterOffset();
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsMobile(mobile);
    if(!mobile){
      setOffset(1);
    }
    setHeight(header.current.offsetHeight);

    if(isNaN(slice.primary.order)){
      setHirarchyTitle(slice.primary.order);
      slice.primary.order = 1;
      setIsNotInAHirarchy(true);
    } else {
      setHirarchyTitle(slice.primary.order-1);
      setIsNotInAHirarchy(false);
    }
  }, []);




  return (
    <>
    <h3 
      className={`${styles.Header},  ${isProjectPage ? styles.ProjectPageHeader : styles.Header}`}
      style={{
        top: isNotInAHirarchy ? `calc(${1 * height}px` : `calc(${slice.primary.order * height * OffSetValue}px - ${height}px)`,
        bottom: isNotInAHirarchy ? `calc(${1 * height}px` : `calc(${
          slice.primary.negative_order * height * OffSetValue - footerOffset - 25
        }px - ${height}px)`,
      
        zIndex: slice.primary.order ? slice.primary.order + 10 : 10,
      }}
      ref={header}
      id={slice.primary.title}
      onClick={() => {

        const nextSibling = header.current.nextSibling;
        nextSibling.scrollIntoView()


        // const offset =
        //  ( nextSibling.offsetTop -
        //   slice.primary.order * height * OffSetValue) - 50;


        // // const bodyContainer = document.getElementsByClassName("body")[0];
        // // bodyContainer.scrollTop = offset;
        // window.scrollTo( { top: offset,behavior: "smooth"});
     
 
      }}
      onMouseOver={() => {
        useCursor.setState({
          cursorVariant: "hoveronlink",
        });
      }}
      onMouseLeave={() => {
        useCursor.setState({
          cursorVariant: "default",
        });
      }}
    >
      {/* {slice.primary.title !== "logo" &&   <span className={styles.Order}>{hirarchyTitle}.</span> } */}
    
      {slice.primary.title !== "logo" && slice.primary.title}
    </h3>
  
    </>
  );
};

export default Sticky;
