import styles from "./CompanyStructure.module.scss";
import { motion, useInView } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import { useRef } from "react";
import { useExcluder } from "../Resolvers/States/Excluder";

const CompanyStructure = ({ slice }) => {
  return (
    <motion.div className={styles.Container}>
      <motion.div className={styles.Title}>
        <motion.span>{slice.primary.suborder}</motion.span>
        <PrismicRichText field={slice.primary.title} />
      </motion.div>

      {slice.items?.map((item, index) => {
        const locRef = useRef();
        const { moveExcluder, removeExcluder } = useExcluder();
        return (
          <motion.div className={styles.Content} key={index}>
            <motion.div
              className={styles.Location}
              ref={locRef}
              onMouseOver={() => moveExcluder(locRef.current)}
              onMouseLeave={() => removeExcluder()}
            >
              <PrismicRichText field={item.location} />
            </motion.div>
            <motion.div className={styles.Lists}>
              <motion.div
              className={styles.ListContainer}
              >
                <PrismicRichText field={item.category_title} />
                <PrismicRichText field={item.list} />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CompanyStructure;
