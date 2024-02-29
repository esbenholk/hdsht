import React from "react";
import styles from "./LoadSpinner.module.scss";

const LoadSpinner = () => {
  return (
    <div className={styles.LoadSpinner}>
      <div className={styles.Crosshair}>
        <span>a</span>
      </div>
    </div>
  );
};

export default LoadSpinner;
