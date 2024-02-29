import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionCanvas } from "framer-motion-3d";
import Phone from "./Phone/Phone";
const Scene = ({ slice, modal }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <Phone slice={slice} modal={modal} />
    </Canvas>
  );
};

export default Scene;
