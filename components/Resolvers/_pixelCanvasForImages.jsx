import { useEffect, useRef,useState, createRef, useCallback,useGenerator } from "react";
// import Image from "next/image";
import useCursor from "./States/Cursor";
import useWindowDimensions from "./UseWindowDimensions";

class Particle {
    constructor(effect, color, x, y){
        this.effect = effect;
        this.x =  Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.size = 7;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0; 
        this.ease = 0.7;
        this.friction = 0.9;
        this.isExploding = false;
        this.explosionPointx = 0;
        this.explosionPointy = 0;
    }
    draw(context){
        if(context){
            context.fillStyle = this.color;
            context.fillRect(this.x ,this.y, this.size, this.size);
        }
    }
    shoot(x,y){
        this.dx = x-this.x;
        this.dy = y-this.y;
        this.distance = (this.dx*this.dx) + (this.dy*this.dy);
        this.force = -this.effect.mouse.radius / this.distance;

        if(this.distance < this.effect.mouse.radius*1){
            this.angle = Math.atan2(this.dx, this.dy);
            this.vx += this.force*0.1 * Math.cos(this.angle);
            this.vy += this.force*0.1 * Math.sin(this.angle);
            this.isExploding = true;
            this.color = "#ff9999";
            this.explosionPointx = Math.random() * this.effect.width;
            this.explosionPointy = Math.random() * this.effect.height;
        }
    }
    update(){
 
        this.dx = this.effect.mouse.x-this.x;
        this.dy = this.effect.mouse.y-this.y;
        this.distance = (this.dx*this.dx) + (this.dy*this.dy);
        this.force = -this.effect.mouse.radius / this.distance;

        if(this.isExploding){
            if(this.distance < this.effect.mouse.radius*0.5){
                this.angle = Math.atan2(this.dx, this.dy);
                this.vx += this.force*0.1 * Math.cos(this.angle);
                this.vy += this.force*0.1 * Math.sin(this.angle);
            }
            this.x += (this.vx * this.friction) + (this.originX -this.x) * this.ease;
            this.y += (this.vy * this.friction)  + (this.originY -this.y) * this.ease;

        } else{

            if(this.distance < this.effect.mouse.radius*1){
                this.angle = Math.atan2(this.dx, this.dy);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            this.x += (this.vx *= this.friction) + (this.originX -this.x) * this.ease;
            this.y += (this.vy *= this.friction)  + (this.originY -this.y) * this.ease;
        }



    }

}
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

            if(this.distance < this.effect.mouse.radius){

                this.force = this.distance/this.effect.mouse.radius;
                this.angle = Math.atan2(this.dx, this.dy);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force* Math.sin(this.angle);
            } 
    
            this.slideX += (this.vx *= this.friction)- (this.slideX *this.ease);
            this.slideY += (this.vy *= this.friction) - (this.slideY *this.ease);
        } else {
            this.positionSlideX -= (this.vx *= this.friction)- (this.slideX *this.ease);
            this.positionSlideY -= (this.vx *= this.friction)- (this.slideX *this.ease);
        }

        // if (distance < this.effect.mouse.radius && this.drawOffsetX < cellWidth && this.drawOffsetX > -cellWidth && this.drawOffsetY < cellHeight && this.drawOffsetY > -cellHeight && this.effect.mouse.moving){
        //         this.drawOffsetX -= dx;
        //         this.drawOffsetY -= dy;

        // } else {
        //     if (this.drawOffsetX !== 0 ) {
        //         this.drawOffsetX -= this.drawOffsetX/12;
        //     } if (this.drawOffsetY !== 0) {
        //         this.drawOffsetY -= this.drawOffsetY/12;
        //     }
        // }


    }
    shoot(x,y){
      
        this.dx = this.effect.mouse.x-this.x;
        this.dy = this.effect.mouse.y-this.y;
        this.distance = (this.dx*this.dx) + (this.dy*this.dy);
        this.force = -this.effect.mouse.radius / this.distance;
 

        if(!this.isExploding){

            if(this.distance < this.effect.mouse.radius){
                this.isExploding = true;
            } 
      
        } 


    }
    draw(context){
        if(context){
            // context.strokeRect(this.x ,this.y, this.width, this.height);
            // context.drawImage(this.effect.image, this.x + this.drawOffsetX, this.y + this.drawOffsetY, this.cellWidth, this.cellHeight, this.x, this.y, this.cellWidth, this.cellHeight);
            context.drawImage(this.effect.image, this.x+this.slideX ,this.y+this.slideY, this.width, this.height,this.x + this.positionSlideX ,this.y + this.positionSlideY, this.width, this.height)
        }
    }
}

class Effect {
    constructor(canvas, image){
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.cellWidth = this.width  / 70;
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
            radius: 7000,
            offsetX: 10,
            offsetY: 10,
            directionX: undefined,
            directionY: undefined,
            moving: false,
            stepCounter: 0,
        }
        window.addEventListener('mousemove', e=>{
            var rect = canvas.getBoundingClientRect();
            this.mouse.x =  e.clientX -rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
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
    draw(context){
        this.imageGrid.forEach(cell=>cell.draw(context));
    }
    shoot(e){
        var rect = this.canvas.getBoundingClientRect();
        let x =  e.clientX -rect.left;
        let y = e.clientY - rect.top;
        this.imageGrid.forEach(particle=>particle.shoot(x,y));
        console.log("effect shoot");
    }
}


const PixelCanvas = ({ imageUrl, imageWidth, imageHeight, isPageTop }) => {
    const {width} = useWindowDimensions();
    const [context, setContext] = useState();
    const [effect, setEffect] = useState();
    const canvas = useRef();
    const [animationFrameId, setAnimationId] = useState();
    const imageRef = useRef();
    // const [size, setSize] = useState({x:925,y:115});
    const [size, setSize] = useState({x:width,y:width});
    
    const render = () => {
        if(context && effect && canvas.current){
            context.clearRect(0,0,width, canvas.current.height);
            effect.draw(context);
            effect.update(context);
            setAnimationId(window.requestAnimationFrame(render));
        }
    };

    const shoot = (e) =>{
        window.cancelAnimationFrame(animationFrameId);
        if(effect){
            effect.shoot(e);
        }
       render();
    }

    const startImage = () =>{

        let _context = canvas.current.getContext('2d')
        setContext(_context); 

        // const myImage = new Image(100, 100);
        // myImage.src = imageUrl;
        const myImage = imageRef.current;
        
        const _effect = new Effect(canvas.current, myImage);
        setEffect(_effect);
        _effect.init(_context);
        _effect.draw(_context);
        render();
 
    }

    useEffect(()=>{
        startImage();
        window.addEventListener('resize', startImage);
        
        return () => {
            window.removeEventListener('resize', startImage);

            window.cancelAnimationFrame(animationFrameId);
        };

  
    },[context, canvas])




    // 
    return (
        <>
         <div style={{width: "100%", display: "flex",  alignContent: "center", justifyContent: "center", marginBottom: isPageTop ? "0" : "10rem"}} >
            <canvas
                onClick={(e)=>{
                    shoot(e);
                }}
                height={size.y}
                width={size.x}
                style={{maxWidth: "100%", maxHeight: "100%"}}
                ref={canvas}
       
            />  
        </div>
        <img src={imageUrl} ref={imageRef} style={{width: size.x+200, height: size.y, display: "none"}}/>
        </>
       
    );
};

export default PixelCanvas;
