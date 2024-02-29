import { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";

export const WorkCarousel = ({ slice, page }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log(slice);
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <section>
        <ProjectCarousel slice={slice} />
      </section>
    )
  );
};

export default WorkCarousel;
