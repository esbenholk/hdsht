import styles from "./VideoHero.module.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import '@tensorflow/tfjs-backend-webgl';
import "@tensorflow/tfjs-backend-cpu";
import useCursor from "../Resolvers/States/Cursor";


const AiVideoCanvas = ({ media }) => {
    const cursor = useCursor((state) => state);

  const videoRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [model, setModel] = useState();
  const [hasModel, setHasModel] = useState(false);
  const [context, setContext] = useState();
  const {width, height} = useWindowDimensions();
  const [mouseIsDown, setMouseIsDowm] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [animationFrameId, setAnimationId] = useState();
  
  useEffect(() => {
    console.log("MEDIA", media);
    setLoaded(true);  
    loadModel();
  },[]);

  async function loadModel() {
    try {
      const _model = await cocoSsd.load();
      setModel(_model);
      setHasModel(true);
      console.log("gets model", _model);
 
    } catch (err) {
      console.log(err);
    }
  } 

  const canvasRef = useCallback(node => {
    if (node !== null) {
        let _context = node.getContext("2d");
        setContext(_context);
    }
  }, []);

  useEffect(()=>{
    updateCanvas();
  }, [context, model, mouseIsDown, isActive])


  let last = 0;
    let num = 0;
    let speed = 0.1;


  function updateCanvas(timeStamp) {

    if(context && model){
        context.drawImage(
            videoRef.current,
          0,
          0,
         width, height
        );
          if(mouseIsDown){           
            const imageData = context.getImageData(
                0,
                0,
            width, height
            );
            let timeInSecond = timeStamp / 1000;
            if (timeInSecond - last >= speed) {
                last = timeInSecond;
                model.detect(imageData).then((pred)=>{
                    if(pred.length>0){
                        outlineStuff(pred);
                    }
                });
              }
     
          }
   
    
    
    }
    if(isActive){
        setAnimationId(requestAnimationFrame(updateCanvas));
    } else {
        cancelAnimationFrame(animationFrameId);
    }

  }

  function outlineStuff(predictions) {
    context.fillStyle = "#ff9999";
    context.strokeStyle ="#ff9999";
    context.lineWidth = 5;

    console.log("detection", mouseIsDown, predictions);
    predictions.map(prediction => {
      const [x, y, width, height] = prediction.bbox;
      context.fillText(prediction.class, x, y-30);
      context.strokeRect(x, y, width, height);
    return prediction;
    });
  }




  return (
    loaded && (
      <motion.div className={styles.Container}>
           <div 
            // onMouseEnter={()=>{
            //     setIsActive(true);
            //     updateCanvas();

            // }}
            onMouseDown={()=>{
                setMouseIsDowm(true);
            }}
       
            onMouseUp={()=>{
                setMouseIsDowm(false);
              
            }}
            onMouseOver={()=>{
                setIsActive(true);

            }}
            onMouseLeave={()=>{
                setIsActive(false);

                cancelAnimationFrame(animationFrameId);
            }}>

            <div id="canvas-container">
                <canvas ref={canvasRef} id="aicanvas" width={width} height={height} 
                 style={{position: "fixed", top: 0, width: width, height: height}} 
            ></canvas>
            </div>
            <div   style={{position: "fixed", top: 0, width: width, height: height, visibility: mouseIsDown ? "hidden" : "visible"}} >
                <video
                style={{position: "fixed", objectFit: "cover"}}
                autoPlay muted loop
                ref={videoRef}
                width={width}
                height={height}
                id="video"
                controls="false"
                preload="none"
                src={media.url}
                data-poster-time="10"
                crossOrigin="anonymous"
        
                />
            </div>
        
        </div>
        

      </motion.div>
    )
  );
};
export default AiVideoCanvas;
