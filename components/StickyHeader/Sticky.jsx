import styles from "./Sticky.module.scss";
import { useRef, useEffect, useState } from "react";
import useCursor from "../Resolvers/States/Cursor";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";


// if(bodyContainer.scrollTop < offset){
//   for (let i = bodyContainer.scrollTop; i <= offset; i++) {
//     setTimeout(() => (bodyContainer.scrollTop = i), 4);
//   }
// } else {
//   for (let i = bodyContainer.scrollTop; i >= offset; i--) {
//     setTimeout(() => (bodyContainer.scrollTop = i), 4);
//   }
// }

const Sticky = ({ slice }) => {
  const header = useRef();
  const [height, setHeight] = useState(0);
  const [OffSetValue, setOffset] = useState(0.9);
  const {width} = useWindowDimensions();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if(!mobile){
      setOffset(0.75);
    }
    setHeight(header.current.offsetHeight);
  }, []);
  const { footerOffset } = useFooterOffset();

  return (
 
    <h3
      className={styles.Header}
      style={{
        top: `calc(${slice.primary.order * height * OffSetValue}px - ${height}px)`,
        bottom: `calc(${
          slice.primary.negative_order * height * OffSetValue - footerOffset
        }px - ${height}px)`,
        zIndex: slice.primary.order ? slice.primary.order + 10 : 10,
      }}
      ref={header}
      id={slice.primary.title}
      onClick={() => {
        const nextSibling = header.current.nextSibling;
        const offset =
         ( nextSibling.offsetTop -
          slice.primary.order * height * OffSetValue) - 50;


        const bodyContainer = document.getElementsByClassName("body")[0];
        bodyContainer.scrollTop = offset;

     
 
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
      <span className={styles.Order}>{slice.primary.order}.</span>
      {slice.primary.title}
    </h3>
 
  );
};

export default Sticky;
