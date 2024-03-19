
import React, { useRef } from "react";
import { TextureLoader } from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import rainVertShader from './rain.vert.glsl?raw';
import rainFragShader from './rain.frag.glsl?raw';




function Rain({image}){

  const {width} = useWindowDimensions();
  // const [uTime, setUTime] = useState(0);
  const material = useRef();

  let texture = useLoader(TextureLoader, image.url);



  // let video = document.createElement( 'video' );
  // video.src = imageUrl;
  // video.play();
  // let texture = new THREE.VideoTexture( video );
  const uTime = useRef({ value: 0 });

  const aspectRatio = image.dimensions.height / image.dimensions.width;

  const planeWidth = width/200;
  const planeHeight = planeWidth / aspectRatio;



  useFrame((state, delta) => {
    uTime.current.value += delta;
  });

  return ( <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1,1,1]} >
    <planeGeometry args={[planeHeight, planeWidth, 1]}/>

    <shaderMaterial
      vertexShader={rainVertShader}
      fragmentShader={rainFragShader}
      uniforms={{ u_time: uTime.current, u_texture: {value:texture} }}
      attach="material"
      ref={material}

    />

  </mesh>)
}

export default function ThreeD({image}){
  return (
    <>
    <Canvas
    id="canvas"
    concurrent
    colorManagement
    shadowMap={true}
    RGB
    alpha={true}
    antialias={true}
    linear
    style={{
      zIndex: "0",
      width: "100%",
      position: "fixed",
      top: "0",
      left: "0",

    }}
    camera={{ position: [0, 0, 1.5], near: 0.1, far: 110 }}
  >
   <Rain image={image}/>


  </Canvas>
  
    </>
   
  );
}

