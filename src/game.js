import { checkBoxCollision, checkAllBoxes } from "./utils";

const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = 1000;
canvas.height = 1000;

const gravity = 1

export class Player {
    constructor() {
      this.position = {
        x: 100,
        y: 100
      }
      this.velocity = {
        x: 0,
        y: 0
      }
      this.width = 30
      this.height = 30
    }
  
    draw() {
      c.fillStyle = 'red';
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      if(this.position.y + this.height + this.velocity.y <= canvas.height){
        this.velocity.y += gravity
      }
      else this.velocity.y = 0;
    }
  }
  
  
  export class Platform {
    constructor({x, y}) {
      this.position = {
        x,
        y
      }
  
      this.width = 200
      this.height = 20
    }
  
    draw() {
      c.fillStyle = 'blue';
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  
  }

  export const player = new Player();

  const platforms = [
    new Platform({
      x: 200, y: 800
  }), 
    new Platform({
      x: 400, y: 600
    })
  ]

  export const keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    }
  }

  let scrollOffset = 0;
  
  export function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update();
    platforms.forEach(platform => {
      platform.draw();
    })
    
  
    if(keys.right.pressed && player.position.x < 400){
      player.velocity.x = 5 }
    else if(keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5
    } else {
      player.velocity.x = 0;}

      if(keys.right.pressed){
        scrollOffset += 5;
        platforms.forEach(platform => {
          platform.position.x -= 5
        })
      }else if(keys.left.pressed){
        scrollOffset -= 5;
        platforms.forEach(platform => {
          platform.position.x += 5
        })
      }
    
      platforms.forEach((platform => {
        if(checkBoxCollision(player, platform)){
          player.velocity.y = 0;
        }
      }) 
    )
    
    if(scrollOffset === 2000){
      console.log("YOU WIN!")
    }
  }