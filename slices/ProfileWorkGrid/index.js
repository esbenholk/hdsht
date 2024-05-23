import React from 'react'
import { useState, useEffect } from "react";
import ProfileWorkExample from "../../components/ProfileWorkExamples/ProfileWorkExample";

const ProfileWorkGrid  = ({ slice, project }) => {
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    console.log(slice);
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <section>
        <ProfileWorkExample slice={slice} project={project}/>
      </section>
    )
  );
};

export default ProfileWorkGrid