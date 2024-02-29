import styles from "./CompanyPhilosophy.module.scss";
import { motion, useInView } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useRef } from "react";
import { useExcluder } from "../Resolvers/States/Excluder";
import SvgAfrica from "./SvgAfrica";

const CompanyPhilosophy = ({ slice }) => {
  const container = useRef();
  const inView = useInView({
    once: true,
    margin: "100%",
  });
  const bounceInFromBottom = {
    visible: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={styles.Container}
      variants={bounceInFromBottom}
      animate={inView ? "visible" : "hidden"}
      ref={container}
    >
      <motion.div className={styles.Title} variants={bounceInFromBottom}>
        <motion.span variants={bounceInFromBottom}>
          {slice.primary.suborder}
        </motion.span>
        <PrismicRichText field={slice.primary.title} />
      </motion.div>

      {slice.items.map((item, index) => {
        console.log(item.list);

        const IMGref = useRef();

        const { moveExcluder, removeExcluder } = useExcluder();
        return (
          <motion.div
            className={styles.Content}
            key={index}
            variants={bounceInFromBottom}
          >
            <motion.div
              className={styles.Category}
              variants={bounceInFromBottom}
            >
              <PrismicRichText field={item.category} />
            </motion.div>
            {item.type === "Description with image" ? (
              <motion.div
                variants={bounceInFromBottom}
                className={styles.Description}
              >
                <motion.div className={styles.DescriptionWImage}>
                  <PrismicRichText field={item.description} />
                  <motion.div
                    variants={bounceInFromBottom}
                    className={styles.Image}
                    ref={IMGref}
                    style={{
                      borderRadius: ".5rem",
                    }}
                    onMouseOver={() => {
                      moveExcluder(IMGref.current);
                    }}
                    onMouseLeave={() => {
                      removeExcluder();
                    }}
                  >
                    <PrismicNextImage field={item.image} />

                  </motion.div>
                  <PrismicRichText field={item.text} />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div variants={bounceInFromBottom} className={styles.List}>
                <PrismicRichText field={item.description} />
                <PrismicRichText field={item.list_heading} />
                <PrismicRichText field={item.text} />
                <div>
                  <ul>
                    {item.list.map((listItem, index) => {
                      const listRef = useRef();
                      const { moveExcluder, removeExcluder } = useExcluder();
                      return listItem.type === "list-item" ? (
                        <motion.li
                          ref={listRef}
                          onMouseOver={() => {
                            moveExcluder(listRef.current);
                          }}
                          onMouseLeave={() => {
                            removeExcluder();
                          }}
                          style={{
                            borderRadius: ".5rem",
                          }}
                        >
                          {listItem.text}
                        </motion.li>
                      ) : (
                        <h4>{listItem.text}</h4>
                      );
                    })}
                  </ul>
                  {/* (Placeholder for map)
                  <SvgAfrica /> */}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CompanyPhilosophy;
