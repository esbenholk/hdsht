import styles from "./CreditHeader.module.scss";
import { useRef, useEffect, useState } from "react";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";
import { useCreditOffset } from "../Resolvers/States/CreditOffset";
import { PrismicNextImage } from "@prismicio/next";
const CreditHeader = ({ slice }) => {
  const header = useRef();

  const { creditOffset, setCreditOffset } = useCreditOffset();
  useEffect(() => {
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
          slice.primary.negative_order * creditOffset * 0.6 - footerOffset
        }px - ${creditOffset}px)`,
        zIndex: slice.primary.order ? slice.primary.order : 0,
      }}
    >
      <div className={styles.Header}>
        <span>{slice.primary.line_one}</span>

        <span className={styles.lineTwo}>
          ©{thisYear}&nbsp;
          {slice.primary.line_two}
        </span>
      </div>
      <div className={styles.Logo}>
        <PrismicNextImage field={slice.primary.logo} />
      </div>
    </div>
  );
};

export default CreditHeader;
