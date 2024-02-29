import { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import Description from "../../components/ProjectCarousel/Description/Description";

const CarouselDescription = ({ slice }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return loaded && <Description slice={slice} />;
};

export default CarouselDescription;
