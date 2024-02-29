import styles from "./ClientLogoGrid.module.scss";
import PrismicRichTextResolver from "../Resolvers/PrismicRichTextResolver/PrismicRichTextResolver";
import Image from "next/image";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import useCursor from "../Resolvers/States/Cursor";
import Layout from "../Layout/Layout";
import { useExcluder } from "../Resolvers/States/Excluder";

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

const ClientLogoGrid = ({ slice }) => {
  const grid = useRef();
  const inView = useInView(grid, { once: true });
  const { moveExcluder, removeExcluder } = useExcluder();

  return (
    <motion.div
      className={styles.Wrapper}
      initial="right"
      animate={inView ? "center" : "right"}
      ref={grid}
    >
      <motion.div className={styles.TitleContainer}>
        <span>{slice.primary.suborder}</span>
        <PrismicRichText field={slice.primary.title} />
      </motion.div>
      <Layout>
        <motion.div
          className={styles.Container}
          variants={fadeFromRight}
          onMouseLeave={() => removeExcluder()}
        >
          {slice?.items?.map((item, index) => {
            const wrapper = useRef();
            return (
              <motion.div
                className={styles.LogoWrapper}
                key={index}
                variants={fadeFromRight}
                ref={wrapper}
                onMouseOver={() => {
                  moveExcluder(wrapper.current);
                }}
                style={{
                  borderRadius: "1rem",
                }}
              >
                <PrismicLink
                  key={index}
                  href={item.link.url}
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
                  <Image
                    src={item.logo.url}
                    width={item.logo.dimensions.width}
                    height={item.logo.dimensions.height}
                    alt={item.logo.url}
                  />
                </PrismicLink>
              </motion.div>
            );
          })}
        </motion.div>
      </Layout>
    </motion.div>
  );
};

export default ClientLogoGrid;
