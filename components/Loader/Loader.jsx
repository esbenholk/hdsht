import { useEffect, useState, useRef } from "react";
import styles from "./Loader.module.scss";
import useCursor from "../Resolvers/States/Cursor";
import { motion } from "framer-motion";

import * as React from "react";
import { Engine, Render, Bodies, World, Query, Runner} from 'matter-js'


import useWindowDimensions from "../Resolvers/UseWindowDimensions";






export default function Loader({settings}) {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); 
  const [userHasEntered, setUserHasEntered] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const blocksRef = useRef(blocks);
  const [shotsFired, setShotsFired] = useState(0);
  const [floor, setFloor] = useState();

  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())
  const {width, height} = useWindowDimensions();


  useEffect(() => {
    blocksRef.current = blocks; // Keep the ref updated with the current blocks
  }, [blocks]);

  const cw = width + 140;
  const ch = height + 140;

  const squareSize = 200; // Size of the squares



  function closeLoader(){
    World.remove(engine.current.world, [floor])
    setUserHasEntered(true);
    useCursor.setState({
      muted: false
    });
  }
  // const randomNumberInRange = (min, max) => {
  //   return Math.floor(Math.random()
  //       * (max - min + 1)) + min;
  // };

  // function fragmentBlock(adjacentPosition){
  //   const randomNumber = randomNumberInRange(3, 10)

  //     for (let x = 0; x < randomNumber ; x++) {
  //       for (let y = 0; y < randomNumber; y++) {
  //         World.add(engine.current.world, [
  //           Bodies.rectangle(adjacentPosition.x+x, adjacentPosition.y+y, Math.floor(squareSize/randomNumber),  Math.floor(squareSize/randomNumber), { isStatic: false,         restitution: 0.001,
  //             friction: 9.9,
  //             density: 0.1,
  //             applyForce: 30,
  //             render: {
  //               fillStyle: "#ff9999",
          
  //             }, })
    
  //         ])
          
  //       } 
  //     }
  // }
  // function getAdjacentBlocks(block, parameter) {
  //   const adjacentPositions = [
  //     { x: block.position.x - squareSize *parameter, y: block.position.y }, // Left
  //     { x: block.position.x + squareSize *parameter, y: block.position.y }, // Right
  //     { x: block.position.x, y: block.position.y - squareSize *parameter }, // Up
  //     { x: block.position.x, y: block.position.y + squareSize*parameter }, // Down
  //     { x: block.position.x + squareSize *parameter, y: block.position.y + squareSize *parameter}, // Left top coorner
  //     { x: block.position.x - squareSize *parameter, y: block.position.y - squareSize *parameter }, // Right  bottom corner
  //     { x: block.position.x + squareSize *parameter, y: block.position.y - squareSize *parameter }, // Up right corner
  //     { x: block.position.x - squareSize *parameter, y: block.position.y + squareSize*parameter }, // Down left corner
  //   ];


  //   const adjacentBlocks = adjacentPositions
  //     .map((pos) => Query.point(engine.current.world.bodies, pos))
  //     .flat()
  //     .filter((foundBlock) => foundBlock !== block);




  //   return adjacentBlocks;
  // }

  // const handleMouseDown = (e) => {
  //   const mousePosition = {
  //     x: e.clientX - scene.current.getBoundingClientRect().left,
  //     y: e.clientY - scene.current.getBoundingClientRect().top,
  //   };
  //   const bodiesUnderMouse = Query.point(
  //     engine.current.world.bodies,
  //     mousePosition
  //   );
    
  //   if (bodiesUnderMouse.length > 0) {
  //     setShotsFired(shotsFired + 1);
      
  //     if(shotsFired > 1 || width < 600){
  //       closeLoader();
  //     } 
  //     const clickedBody = bodiesUnderMouse[0];
  //     const nearBlocks = getAdjacentBlocks(clickedBody, 1);
 
  //     nearBlocks.forEach(element => {
  //       World.remove(engine.current.world, element);
  //       fragmentBlock(element.position);
  //     });

  //     World.remove(engine.current.world, clickedBody)
  //     fragmentBlock(clickedBody.position);

  //     var explosionCircle = Bodies.circle(clickedBody.position.x, clickedBody.position.y, 300, { isStatic: false,         restitution: 0.001,
  //       friction: 9.9,
  //       density: 0.1,
  //       applyForce: 30,
  //       render: {
  //         fillStyle: "rgba(0,0,0,0)"},
  //     })



  //     World.add(engine.current.world, [
  //       explosionCircle
  //     ])

  //     setTimeout(() => {
  //       World.remove(engine.current.world, explosionCircle)
  //     }, 1500);

  //   }
  // };

  // function initializeBlocks() {
  //   const initialBlocks = [];

  //   const rows = (height)/squareSize + 4;
  //   const columns = (width )/squareSize;

  //   const offsetX = (cw - columns * squareSize) / 2; // Center the grid
  //   const offsetY = 0; // Starting Y position

  //   for (let row = 0; row < rows; row++) {
  //     for (let col = 0; col < columns; col++) {
  //       const x = offsetX + col * squareSize + squareSize / 2;
  //       const y = offsetY + row * squareSize + squareSize / 2;
  //       const block = Bodies.rectangle(x, y, squareSize, squareSize, {
  //         restitution: 0.001,
  //         friction: 0,
  //         density: 0.1,
  //         render: {
  //           fillStyle: "#ff9999",
      
  //         },
  //         isStatic: false
  //       });
  //       block.id = `block-${row}-${col}`;

  //       World.add(engine.current.world, [block]);
  //       initialBlocks.push(block);
  //     }
  //   }
  //   setBlocks(initialBlocks);
  // }
  // useEffect(() => {


  //   const render = Render.create({
  //     element: scene.current,
  //     engine: engine.current,
  //     options: {
  //       width: cw,
  //       height: ch,
  //       wireframes: false,
  //       background: 'transparent'
  //     }
  //   })

  //   var _floor = Bodies.rectangle(cw / 2, ch + 70, cw, 20, { isStatic: true });

  //   setFloor(_floor);

  //   World.add(engine.current.world, [_floor]);
  //   World.add(engine.current.world, [
  //     Bodies.rectangle(-70, ch / 2, 20, ch, { isStatic: true }),
      
  //     Bodies.rectangle(cw / 2, -70, cw, 20, { isStatic: true }),
  //     Bodies.rectangle(cw + 70, ch / 2, 20, ch, { isStatic: true })
  //   ])

   

    

  //   initializeBlocks(true);

  //   Engine.run(engine.current)
  //   Render.run(render)

  //   Runner.enabled = false;

  //   return () => {
  //     Render.stop(render)
  //     World.clear(engine.current.world)
  //     Engine.clear(engine.current)
  //     render.canvas.remove()
  //     render.canvas = null
  //     render.context = null
  //     render.textures = {}
  //   }
  // }, [])



  useEffect(() => {
    setIsLoaded(true);
    useCursor.setState({
      cursorVariant: "hover",
      isOverProject: false,
      title: "",
      description: "",
      isLoader: true
    })
  }, []);

  useEffect(() => {
      if (isLoaded) {
          setIsPageLoaded(true);
      }
  }, [isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * settings.data.slices[0].items.length);
      setIndex(randomNumber);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`${styles.Container}  ${!userHasEntered ? styles.On : styles.Off}`}
      onClick={(e)=>{
        //handleMouseDown(e);

        setUserHasEntered(true);
        useCursor.setState({
          muted: false
        });
    
      }}
    >
   
        {/* <div className={styles.BackgroundGame}>
             <div
              // onMouseDown={handleDown}
              // onMouseUp={handleUp}
              // onMouseMove={handleAddCircle}
            >
              <div ref={scene} style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    */}
    
        <img src={settings.data.slices[0].items[index].media.url} alt="loading gif" 
            onMouseOver={()=>{
                   useCursor.setState({
                    cursorVariant: "hoveronbiglink",
                    isOverProject: false,
                    title: "click to enter",
                    description: ""
                  })
            }}
 
            onMouseLeave={()=>{
              useCursor.setState({
               cursorVariant: "default",
               isOverProject: false,
               title: "HDSHT",
               description: ""
              });
            }}
        />
        {isLoaded && isPageLoaded && 
          <h2 
      
            onMouseLeave={()=>{
              useCursor.setState({
              cursorVariant: "default",
              isOverProject: false,
              title: "",
              description: ""
              });
            }}
            onMouseOver={()=>{
              useCursor.setState({
               cursorVariant: "hoveronlink",
               isOverProject: false,
               title: "click to enter",
               description: ""
             })
       }} >[ENTER]</h2>}
    </motion.div>
  );
};

