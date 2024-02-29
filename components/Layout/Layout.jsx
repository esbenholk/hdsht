import styles from "./Layout.module.scss";
import { useState, useEffect, useRef } from "react";
const Layout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return <>{isMounted && <div className={styles.Container}>{children}</div>}</>;
};
export default Layout;
