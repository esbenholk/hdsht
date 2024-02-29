import styles from "./Sticky.module.scss";
import { useRef, useEffect, useState } from "react";
import useCursor from "../Resolvers/States/Cursor";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";

const OffSetValue = 1;
const Sticky = ({ slice }) => {
  const header = useRef();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(header.current.offsetHeight );
  }, []);
  const { footerOffset } = useFooterOffset();
  console.log(footerOffset);


  
  return (
    <h3
      className={styles.Header}
      style={{
        top: `calc(${slice.primary.order * height * OffSetValue}px - ${height}px)`,
        bottom: `calc(${
          slice.primary.negative_order * height * OffSetValue - footerOffset
        }px - ${height}px)`,
        zIndex: slice.primary.order ? slice.primary.order : 0,
      }}
      ref={header}
      id={slice.primary.title}
      onClick={() => {
        const nextSibling = header.current.nextSibling;
        const offset =
          nextSibling.offsetTop -
          slice.primary.order * height * OffSetValue +
          window.innerHeight * 0.7;

        if (nextSibling) {
          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        }
      }}
      onMouseOver={() => {
        useCursor.setState({
          cursorVariant: "hover",
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
