import styles from "./Gizmo.module.scss";
import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useScroll } from "framer-motion";
import useCursor from "../Resolvers/States/Cursor";
// import { KernelSize } from "postprocessing";

extend({ RenderPass, UnrealBloomPass });

const Atom = () => {
  const group = useRef();
  const pageHeight = document.body.scrollHeight;
  const { scrollY } = useScroll();
  const { cursorPosition } = useCursor();
  const isMobile =
    navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/) ||
    window.innerWidth < 768;
  const [touched, setTouched] = useState({});
  useEffect(() => {
    const handleTouch = (e) => {
      setTouched({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };
    if (isMobile) {
      window.addEventListener("touchstart", handleTouch);
      window.addEventListener("touchmove", handleTouch);
    }
    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouch);
        window.removeEventListener("touchmove", handleTouch);
      }
    };
  }, []);

  useFrame(() => {
    greenMesh.current.rotation.z = lerp(
      greenMesh.current.rotation.z,
      -Math.PI * 0.5 - (Math.PI * (scrollY.get() / pageHeight)) / 1.5,
      0.1
    );
    if (!isMobile) {
      group.current.rotation.y = lerp(
        group.current.rotation.y,
        -Math.PI * 0.5 +
          Math.PI * (cursorPosition.x / window.innerWidth) * 0.75,
        0.1
      );
      group.current.rotation.x = lerp(
        group.current.rotation.x,
        (cursorPosition.y / window.innerHeight) * 0.75,
        0.1
      );
    } else {
      group.current.rotation.y = lerp(
        group.current.rotation.y,
        -Math.PI * 0.5 + Math.PI * (touched.x / window.innerWidth) * 0.75,
        0.1
      );
      group.current.rotation.x = lerp(
        group.current.rotation.x,
        (touched.y / window.innerHeight) * 0.75,
        0.1
      );
    }
  });

  const whiteMesh = useRef();
  const redMesh = useRef();
  const greenMesh = useRef();
  const blueMesh = useRef();

  return (
    <>
      <mesh rotation={[0, 0, 0]} scale={0.13} ref={whiteMesh}>
        <torusGeometry args={[20, 0.5, 18, 60, Math.PI * 2]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
      <mesh rotation={[0, Math.PI, -Math.PI * 0.5]} scale={0.1} ref={greenMesh}>
        <torusGeometry args={[20, 0.5, 18, 60, Math.PI]} />
        <meshStandardMaterial color={"rgba(0,255,0,1)"} />
      </mesh>
      <group ref={group}>
        <mesh
          rotation={[0, -Math.PI * 0.5, -Math.PI * 0.5]}
          scale={0.1}
          ref={redMesh}
        >
          <torusGeometry args={[20, 0.5, 18, 60, Math.PI]} />
          <meshStandardMaterial color={"rgba(255,0,255,1)"} />
        </mesh>
        <mesh rotation={[Math.PI * 0.5, 0, 0]} scale={0.1} ref={blueMesh}>
          <torusGeometry args={[20, 0.5, 18, 60, Math.PI]} />
          <meshStandardMaterial color={"rgba(0,0,255,1)"} />
        </mesh>
      </group>
    </>
  );
};
const Gizmo = () => {
  return (
    <div className={styles.Canvas}>
      <Canvas
        camera={{
          position: [0, 0, 4],
        }}
      >
        <ambientLight intensity={6} />
        <Atom />
        {/* <EffectComposer multisampling={4}>
          <Bloom
            kernelSize={1}
            luminanceThreshold={0}
            luminanceSmoothing={0.1}
            intensity={0.1}
          />
          <Bloom
            kernelSize={KernelSize.SMALL}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={-0.1}
          />
        </EffectComposer> */}
      </Canvas>
    </div>
  );
};

export default Gizmo;
