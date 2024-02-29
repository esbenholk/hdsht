import React, { useState, useEffect } from "react";
import styles from "./DateTime.module.scss";
import { motion } from "framer-motion";

const DateTime = ({ location, hovered }) => {
  const [date, setDate] = useState(new Date());
  const blendIn = {
    hidden: {
      opacity: 0,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      x: -20,
      transition: {
        duration: 0.5,
      },
    },
  };
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <motion.div
      className={styles.DateTime}
      variants={blendIn}
      initial="hidden"
      animate={hovered ? "visible" : "hidden"}
    >
      <span>
        {date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
          timeZone: location ? location : "Europe/Berlin",
        })}
      </span>
    </motion.div>
  );
};

export default DateTime;
