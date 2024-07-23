
import { motion } from "framer-motion";
import styles from "./AnimatedButton.module.scss";

const AnimatedButton = ({open}) => {
  return (
    <>

      <motion.div
        className={`${styles.Button} ${open ? styles.Open : styles.Closed}`}

      >
        <div className={styles.Dot} >
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>

          <div></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
        </div>
        <div className={styles.Dot}>
        <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
          <div className={ styles.Activecursor } ></div>
        </div>



      </motion.div>


 
     
    
          
       
    </>
  );
};

export default AnimatedButton;
