import { motion, useSpring } from "framer-motion";
import { useExcluder } from "../Resolvers/States/Excluder";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";

const HighlightExclusion = () => {
  const { offsetTop, offsetLeft, opacity, height, width, borderRadius } =
    useExcluder();

  const spring = useSpring(2, { damping: 1000, stiffness: 100 });
  const change = {
    move: {
      x: offsetLeft,
      y: offsetTop,
      opacity: opacity,
      height: height,
      width: width,
      borderRadius: borderRadius,
    },
  };
  const { footerOffset } = useFooterOffset();
  return (
    <motion.div
      variants={change}
      animate="move"
      style={{
        position: "fixed",
        zIndex: 100,
        pointerEvents: "none",
        backgroundColor: "white",
        mixBlendMode: "difference",
        marginTop: `calc(-70vh - ${footerOffset}px)`,
        spring,
      }}
    />
  );
};

export default HighlightExclusion;
