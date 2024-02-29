import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import useCursor from "../States/Cursor";

const PrismicRichTextResolver = ({ fields }) => {
  const handleHover = () => {
    useCursor.setState({
      cursorVariant: "hover",
    });

  };
  const handleSlide = () => {
    useCursor.setState({
      cursorVariant: "slide",
    });
  };

  const handleLeave = () => {
    useCursor.setState({
      cursorVariant: "default",
    });
  };
  return (
    <PrismicRichText
      field={fields}
      components={{
        p: ({ children }) => <p className="text-lg">{children}</p>,
        h1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl">{children}</h4>,
        h5: ({ children }) => <h5 className="text-lg">{children}</h5>,
        h6: ({ children }) => <h6 className="text-base">{children}</h6>,
        a: ({ children, href }) => (
          <PrismicLink
            href={href ? href : "#"}
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
          >
            {children}
          </PrismicLink>
        ),
        ul: ({ children }) => <ul className="list-disc">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
        li: ({ children }) => <li className="ml-4">{children}</li>,
        img: ({ src, alt }) => (
          <PrismicNextImage field={fields} objectFit="contain" />
        ),
      }}
    />
  );
};

export default PrismicRichTextResolver;
