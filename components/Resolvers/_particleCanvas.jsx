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

class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particleArray = []; 
        this.gap = 7;
        this.centerX = this.width*0.5;
        this.centerY = this.height*0.5;
        this.mouse = {
            radius: 7000,
            x: 0,
            y: 0
        }
        window.addEventListener('mousemove', e=>{
            var rect = canvas.getBoundingClientRect();
            this.mouse.x =  e.clientX -rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    init(context){
            
            const pixelsObject = context.getImageData(0,0, this.width, this.height);
            const pixels = pixelsObject.data;
  
            for (let y = 0; y < this.height; y+= this.gap) {
                for (let x = 0; x < this.width; x+= this.gap) {
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index+1];
                    const blue = pixels[index+2];
                    const alpha = pixels[index+3];
                    const color = 'rgba('+ red+','+green+','+ blue+','+alpha+')';
                
                    if(alpha>0){
                        this.particleArray.push(new Particle(this,color,x,y));
                    }
                
                   
                } 
            }


        
    }
    update(){ 
        this.particleArray.forEach(particle=>particle.update());
    }
    draw(context){
        this.particleArray.forEach(particle=>particle.draw(context));
    }
    shoot(e){
        var rect = this.canvas.getBoundingClientRect();
        let x =  e.clientX -rect.left;
        let y = e.clientY - rect.top;
        this.particleArray.forEach(particle=>particle.shoot(x,y));
        console.log("effect shoot");
    }
}


const ParticleCanvas = ({ imageUrl, imageWidth, imageHeight, isPageTop }) => {
    const {width} = useWindowDimensions();
    const [context, setContext] = useState();
    const [effect, setEffect] = useState();
    const canvas = useRef();
    const [animationFrameId, setAnimationId] = useState();
    
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

    useEffect(()=>{
        

        const _effect = new Effect(canvas.current);
        let _context = canvas.current.getContext('2d')
        setContext(_context); 
        setEffect(_effect);

        const myImage = new Image();
        myImage.src = imageUrl;
    

        if(canvas.current){
            myImage.onload = function() {
                startImage();
            }
        }

        const startImage = () =>{
            
            if(canvas.current){
                let imageWidthHolder = myImage.width;
                let imageHeightHolder = myImage.height;
                if(imageWidthHolder > width){
                    imageWidthHolder = width;
                    imageHeightHolder = myImage.height * (myImage.width/myImage.height);
                }
                imageWidthHolder = width-100;
                imageHeightHolder = imageWidthHolder / (myImage.width/myImage.height);
    
                _context.clearRect(0,0,width, canvas.current.height);
                _context.drawImage(myImage, canvas.current.width*0.5-imageWidthHolder*0.5,canvas.current.height*0.5-imageHeightHolder*0.5, imageWidthHolder, imageHeightHolder);
                _effect.init(_context);
                _effect.draw(_context);
    
                render();
            }
      
        }

        window.addEventListener('resize', startImage);
        return () => {
            window.removeEventListener('resize', startImage);

            window.cancelAnimationFrame(animationFrameId);
        };

  
    },[context, canvas])





    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: isPageTop ? "0" : "-10rem"}} >
            <canvas
            // onClick={(e)=>{
            //     shoot(e);
            // }}
                ref={canvas}
                width={width}   
                height={imageHeight ? imageHeight : 400} 
            />  
        </div>
    );
};

export default ParticleCanvas;
