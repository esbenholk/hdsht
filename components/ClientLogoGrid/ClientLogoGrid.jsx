import styles from "./ClientLogoGrid.module.scss";
import PrismicRichTextResolver from "../Resolvers/PrismicRichTextResolver/PrismicRichTextResolver";
import Image from "next/image";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCursor from "../Resolvers/States/Cursor";
import Layout from "../Layout/Layout";
import { useExcluder } from "../Resolvers/States/Excluder";
import Marquee from "react-marquee-slider";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";

const fadeFromRight = {
  right: {
    opacity: 0,
    x: 100,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.05,
    },
  },
};

const TickerContent = ({slice}) =>{
  return (<>
        <div
          className="tickerContent"
          style={{
              display: "flex",
              position: "relative",
              width: "auto",
              height: "10rem",
            }}
          >
                  {slice?.items?.map((item, index) =>  (
                          <motion.div
                            className={styles.LogoWrapper}
                            key={index}
                            variants={fadeFromRight}
                      
                          >
                            <a
                              key={index}
                              target="_blank"
                              href={item.link.url}
                              onMouseOver={() => {
                                useCursor.setState({
                                  cursorVariant: "hoveronlink",
                                  isOverProject: true,
                                  title: "click 2 open",
                                  description: item.link.url
                                });
                              }}
                              onMouseLeave={() => {
                                useCursor.setState({
                                  cursorVariant: "default",
                                  title: "",
                                  description: "",
                                  isOverProject: false
                                });
                              }}
                            >
                              <Image
                                src={item.logo.url}
                                width={100}
                                height={90}
                                alt={item.logo.url}
                              />
                            </a>
                          </motion.div>
                        
                        ))}
                </div>
  </>)
}

const ClientLogoGrid = ({ slice }) => {
  const grid = useRef();
  const inView = useInView(grid, { once: true });
  const {width} = useWindowDimensions();
  const [paused, setPaused] = useState(false);

  return (
    <motion.div
      className={styles.Wrapper}
      initial="right"
      animate={inView ? "center" : "right"}
      ref={grid}
      onMouseOver={()=>{
        setPaused(true);
      }}
      onMouseLeave={()=>{
        setPaused(false);
      }}
    >
      <motion.div className={styles.TitleContainer}>
        <span>{slice.primary.suborder}</span>
        <PrismicRichText field={slice.primary.title} />
      </motion.div>

        <motion.div
          className={styles.Container}
          variants={fadeFromRight}
        >
          <div
            style={{
              display: "block",
              position: "relative",
              width: "100%",
              // height: "90px",
              overflow: "hidden",
            }}
          >
              <Marquee
                velocity={paused ? 0 : width>700 ? 50: 5}
                minScale={0.7}
                resetAfterTries={200}
                scatterRandomly={false}
              
              >
              <TickerContent slice={slice}/>
              <TickerContent slice={slice}/>

              <TickerContent slice={slice}/>

              </Marquee>
          </div>
         
        </motion.div>
    </motion.div>
  );
};










export default ClientLogoGrid;
