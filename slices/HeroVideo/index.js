import React from "react";
import { RichText } from "prismic-reactjs";
import VideoHero from "../../components/VideoHero/VideoHero";
const HeroVideo = ({ slice }) => {
  return (
    <section>
      <VideoHero slice={slice} />
    </section>
  );
};

export default HeroVideo;
