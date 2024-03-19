import styles from "./VideoHero.module.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import '@tensorflow/tfjs-backend-webgl';
import "@tensorflow/tfjs-backend-cpu";
import useCursor from "../Resolvers/States/Cursor";


const AiVideoCanvas = ({ media }) => {
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
    console.log("begins model load");

    setLoaded(true);  
    loadModel();
  },[]);

  async function loadModel() {
    try {
      const _model = await cocoSsd.load();

      console.log("has model");

      setModel(_model);
      setHasModel(true);
 
    } catch (err) {
      console.log(err);
    }
  } 

  const canvasRef = useCallback(node => {
    console.log("canvas ref callback");
    if (node !== null) {
        let _context = node.getContext("2d");
        setContext(_context);
        console.log("ai cnavas has context");
    }
  }, []);

  useEffect(()=>{
    console.log("useeffect updates ai canvas", context, model);

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
      <motion.div className={styles.Container} 
      

        onMouseDown={()=>{
          setMouseIsDowm(true);
          console.log("mouse is down");

        }}

        onMouseUp={()=>{
            setMouseIsDowm(false);
            console.log("mouse is up");
          
        }}
        onMouseOver={()=>{
            setIsActive(true);
            console.log("mouse is over");

        }}
        onMouseLeave={()=>{
            setIsActive(false);

            cancelAnimationFrame(animationFrameId);
        }}>
   
           
          <canvas ref={canvasRef} id="aicanvas" width={width} height={height} 
                 style={{width: width, height: height}} 
            ></canvas>
     
                <video
                style={{position: "fixed", objectFit: "cover", top: 0, width:200, height: height, visibility: mouseIsDown ? "hidden" : "visible"}}
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
      
        
    
        

      </motion.div>
    )
  );
};
export default AiVideoCanvas;
