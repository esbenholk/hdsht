import { useState, useEffect } from "react";
import BasicImage from "../../components/BasicImage/BasicImage";

const ImageSlice = ({ slice }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    console.log(slice);
    
  }, []);
  return <section>{loaded && <BasicImage slice={slice} />}</section>;
};

export default ImageSlice;
