import { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import TextBlock from "../../components/TextBlock/TextBlock";

const Article = ({ slice }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section>
      <TextBlock slice={slice} />
    </section>
  );
};

export default Article;
