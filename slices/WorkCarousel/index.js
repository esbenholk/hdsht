import { useState, useEffect } from "react";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";

export const WorkCarousel = ({ slice, project }) => {
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <section>
        <ProjectCarousel slice={slice} project={project}/>

      
      </section>
    )
  );
};

export default WorkCarousel;
