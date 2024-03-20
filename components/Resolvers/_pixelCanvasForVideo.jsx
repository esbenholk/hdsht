import { useEffect, useRef,useState, createRef, useCallback,useGenerator } from "react";
// import Image from "next/image";
import useCursor from "./States/Cursor";
import useWindowDimensions from "./UseWindowDimensions";


class Cell {
    constructor(effect, x, y){
        this.effect = effect;
        this.x =  x;
        this.y = y;
        this.width = effect.cellWidth;
        this.height = effect.cellHeight;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        // this.baseX = x;
        // this.baseY = y;
        // this.drawOffsetX = 0;
        // this.drawOffsetY = 0;
        this.force = 0;
        this.vx = 0;
        this.vy = 0;
        this.slideX = 0;
        this.slideY = 0;
        this.positionSlideX = 0;
        this.positionSlideY = 0;
        this.distortX = 0;
        this.distortY = 0;
        this.xvel = Math.floor(Math.random() * (10 - -10 + 1)) + -10;
        this.yvel = Math.floor(Math.random() * (10 - -10 + 1)) + -10;

        this.friction = 0.9;
        this.ease = 0.05;
        this.isExploding = false;
    }
    update(){
        this.dx = this.effect.mouse.x-this.x;
        this.dy = this.effect.mouse.y-this.y;
        this.distance = (this.dx*this.dx) + (this.dy*this.dy);
        this.force = -this.effect.mouse.radius / this.distance;
 
        if(!this.isExploding){

            if(this.distance < this.effect.mouse.radius*(2+this.effect.mouse.gunsize)){

                this.force = this.distance/this.effect.mouse.radius;
                this.angle = Math.atan2(this.dx, this.dy);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force* Math.sin(this.angle);
            } 
    
            this.slideX += (this.vx *= this.friction)- (this.slideX *this.ease);
            this.slideY += (this.vy *= this.friction) - (this.slideY *this.ease);


        } else {

            // this.force = this.distance/this.effect.mouse.radius;
            // this.angle = Math.atan2(this.dx, this.dy);
            // this.vx += this.force * Math.cos(this.angle) * 2;
            // this.vy += this.force* Math.sin(this.angle) *2;
          
            this.positionSlideX += this.xvel;
            this.positionSlideY += this.yvel;
        }

 
       

    }


    shoot(gunSize){
      
        this.dx = this.effect.mouse.x-this.x;
        this.dy = this.effect.mouse.y-this.y;
        this.distance = (this.dx*this.dx) + (this.dy*this.dy);
        this.force = -this.effect.mouse.radius / this.distance;
        if(this.distance < this.effect.mouse.radius*gunSize){
            this.isExploding = true;
        } 


    }
    draw(context){
        if(context){
            // context.strokeRect(this.x ,this.y, this.width, this.height);
            // context.drawImage(this.effect.image, this.x + this.drawOffsetX, this.y + this.drawOffsetY, this.cellWidth, this.cellHeight, this.x, this.y, this.cellWidth, this.cellHeight);
            if(this.x+this.slideX < this.effect.width && this.y+this.slideY < this.effect.height || this.x+this.slideX > 0 && this.y+this.slideY > 0 ){
                context.drawImage(this.effect.image, this.x+this.slideX ,this.y+this.slideY, this.width, this.height,this.x + this.positionSlideX ,this.y + this.positionSlideY, this.width, this.height)
            } else {
                this.effect.removeCell(this);
            }
        }
    }
}

class Effect {
    constructor(canvas, image){
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.cellWidth = this.width  /15;
        this.cellHeight =  this.cellWidth;
        this.imageGrid = [];
        this.image = image;
        // this.particleArray = []; 
        // this.gap = 7;
        // this.centerX = this.width*0.5;
        // this.centerY = this.height*0.5;
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 1300,
            offsetX: 10,
            offsetY: 10,
            directionX: undefined,
            directionY: undefined,
            moving: false,
            stepCounter: 0,
            gunsize: 1
        }
        window.addEventListener('mousemove', e=>{
            var rect = canvas.getBoundingClientRect();
            this.mouse.x =  e.clientX -rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    removeCell(cell){
        for (let i = 0; i <  this.imageGrid.length; i++) { 
            if ( this.imageGrid[i] === cell) { 
                this.imageGrid.splice(i, 1); 
            } 
        }
    }

    init(){     
        for (let y = 0; y < this.height; y+= this.cellHeight) {
            for (let x = 0; x < this.width; x+= this.cellWidth) {
               this.imageGrid.push(new Cell(this, x, y));
            } 
        } 
    }
    update(){ 
     
        this.imageGrid.forEach(cell=>cell.update());
    }
    increaseGun(gunSize){
        this.mouse.gunsize = gunSize;
    }
    draw(context){
        this.imageGrid.forEach(cell=>cell.draw(context));
    }
    shoot(e, gunSize){
        this.mouse.gunsize = gunSize;
        this.imageGrid.forEach(particle=>particle.shoot(gunSize));
    }
}


const PixelCanvasVideo  = ({ imageUrl, videoUrl, imageHeight, isPageTop }) => {
    const {width, height} = useWindowDimensions();
    const [context, setContext] = useState();
    const [effect, setEffect] = useState();
    const [canvas, setCanvas] = useState();
    const [animationFrameId, setAnimationId] = useState();
    const videoRef = useRef();
    const [gunSize, setGunSize] = useState(1);
    const [mouseIsDown, setMouseIsDowm] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [size, setSize] = useState({x:width,y:width});


    const timer = useRef(null);
    const increment = () => {
       
        timer.current = setInterval(() => {
            let gunSizeTemp = gunSize + 1;
            setGunSize(prev => prev + 1);
            effect.increaseGun(gunSize);
        }, 100);
       
    };

    function timeoutClear() {
        setGunSize(1);
        effect.increaseGun(1);
        clearInterval(timer.current);
    }

    
    const render = () => {

        if(context && effect && canvas){
            context.clearRect(0,0,width, canvas.height);
            effect.draw(context);
            effect.update(context);

        }
        setAnimationId(window.requestAnimationFrame(render));

    };

    const shoot = (e) =>{
        if(effect){
            effect.shoot(e, gunSize);
        }
    }

    const canvasRef = useCallback(node => {
        if (node !== null) {
            let _context = node.getContext("2d");
            _context.globalCompositeOperation='destination-over';
            setContext(_context);
            setCanvas(node);
    
            node.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
            'image-rendering: -moz-crisp-edges;' + // FireFox
            'image-rendering: -o-crisp-edges;' +  // Opera
            'image-rendering: -webkit-crisp-edges;' + // Chrome
            'image-rendering: crisp-edges;' + // Chrome
            'image-rendering: -webkit-optimize-contrast;' + // Safari
            'image-rendering: pixelated; ' + // Future browsers
            '-ms-interpolation-mode: nearest-neighbor;'; 
        }
      }, []);



    
    useEffect(()=>{
        if(canvas && context){
            startImage();
        }
      }, [context, canvas])
    
    useEffect(()=>{
        window.requestAnimationFrame(render);

      }, [effect])


    useEffect(()=>{

        window.addEventListener('resize', startImage);
        
        return () => {
            window.removeEventListener('resize', startImage);

            window.cancelAnimationFrame(animationFrameId);
        };

  
    },[context, canvas])

    const startImage = () =>{

        cancelAnimationFrame(animationFrameId);
        const myImage = videoRef.current;

        console.log("start image", canvasRef);
        
        const _effect = new Effect(canvas, myImage);
        setEffect(_effect);
        _effect.init(context);
        _effect.draw(context);
        setIsActive(true);
        // render();
    }


    function toggleMouseOver(){
        useCursor.setState({
            cursorVariant: "logo",
            isOverProject: true,
            title: mouseIsDown ? "increasing power ":"click 2 shoot",
            description: mouseIsDown ? "increasing power ": "hold to increase power"
          });
        setIsActive(true);
    }

    return (
        <>
         <div 
            onMouseOver={toggleMouseOver}
            onMouseEnter={()=>{
                window.requestAnimationFrame(render); 
                // setIsActive(true);
            }}

            onMouseLeave={() => {
                // setIsActive(false);
                cancelAnimationFrame(animationFrameId);

                useCursor.setState({
                    cursorVariant: "default",
                    isOverProject: false,
                    title: "",
                    description: ""

                  });
            }} >
            <canvas
                // onClick={(e)=>{
                //     shoot(e);
                // }}
                ref={canvasRef}
                onMouseDown={(e)=>{
                    increment();
                    setMouseIsDowm(true);
                }}

                onMouseUp={(e)=>{
                    shoot(e, gunSize);
                    timeoutClear();
                    setMouseIsDowm(false);
                }}
          
                
       

                height={size.y}
                width={size.x}
                style={{maxWidth: "100%", maxHeight: "100%", backgroundColor: "var( --main-bg-color)"}}
             
            ></canvas> 
            <video
                style={{position: "fixed", top:0, left:0,right:0, bottom:0,objectFit: "cover", visibility: isActive ? "hidden" : "visible"}}
                autoPlay muted loop
                ref={videoRef}
                width={width}
                height={height}
                id="video"
                controls="false"
                preload="true"
                src={videoUrl}
                data-poster-time="10"
                crossOrigin="anonymous"
        
                /> 
        </div>
   
  
        </>
       
    );
};

export default PixelCanvasVideo ;
