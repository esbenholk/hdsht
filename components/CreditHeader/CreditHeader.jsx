import styles from "./CreditHeader.module.scss";
import { useRef, useEffect, useState } from "react";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";
import { useCreditOffset } from "../Resolvers/States/CreditOffset";
import { PrismicNextImage } from "@prismicio/next";


const CreditHeader = ({ slice }) => {
  const header = useRef();
  const [offset, setOffset] = useState(0.35);



  const { creditOffset, setCreditOffset } = useCreditOffset();
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if(!mobile){
      setOffset(0.2 );
    }
    setCreditOffset(header.current.offsetHeight);
  }, []);
  const thisYear = new Date().getFullYear();
  const { footerOffset } = useFooterOffset();
  const logo = document.createElement("svg");
  logo.src = slice.primary.logo.url;
  console.log(logo);

  return (
    <div
      className={styles.Container}
      ref={header}
      style={{
        bottom: `calc(${
          slice.primary.negative_order * creditOffset * offset - footerOffset
        }px - ${creditOffset}px)`,
        zIndex: slice.primary.order ? slice.primary.order +10 : 10,
        
      }}
      onClick={() => {

        const nextSibling = header.current.nextSibling;
        nextSibling.scrollIntoView()

        console.log("header click", slice.primary.title, header.current, nextSibling);

        // const offset =
        //  ( nextSibling.offsetTop -
        //   slice.primary.order * height * OffSetValue) - 50;


        // // const bodyContainer = document.getElementsByClassName("body")[0];
        // // bodyContainer.scrollTop = offset;
        // window.scrollTo( { top: offset,behavior: "smooth"});
     
 
      }}
    >
      <div className={styles.Header}>
        <div className={styles.Logo}>
          <PrismicNextImage field={slice.primary.logo} />
        </div>
        <span>{slice.primary.line_one}</span>

        <span className={styles.lineTwo}>
          ©{thisYear}&nbsp;
          {slice.primary.line_two}
        </span>

      </div>
   
    </div>
  );
};

export default CreditHeader;
