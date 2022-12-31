import { checkBoxCollision, createImage } from "./utils";
import PlatformImage from './images/platform.png'
import HillsImage from './images/hills.png'
import BackgroundImage from './images/background.png' 

const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
console.log(c)
canvas.width = 1024;
canvas.height = 576;

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
    constructor({x, y, image}) {
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }
  
    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  export class GenericObject {
    constructor({x, y, image}) {
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }
  
    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  export const keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    }
  }

  export const player = new Player();
  const platformImage = createImage(PlatformImage)

  const platforms = [
    new Platform({
      x: 0, y: 450, image: platformImage
  }), 
    new Platform({
      x: platformImage.width, y: 450, image: platformImage
    }),
    new Platform({
      x: platformImage.width * 2 + 100, y: 450, image: platformImage
    })
  ]

  const genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(BackgroundImage)
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(HillsImage)
    })
  ]

  let scrollOffset = 0;
  
  export function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((object) => {
      object.draw();
    })

    platforms.forEach(platform => {
      platform.draw();
    })
    player.update();

      if(keys.right.pressed && player.position.x < 400){
      player.velocity.x = 5 }
    else if(keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5
    } else {
      player.velocity.x = 0;}

      //handle background scroll and paralax effect
      if(keys.right.pressed){
        scrollOffset += 5;
        platforms.forEach(platform => {
          platform.position.x -= 5
        })
        genericObjects.forEach((object) => {
          object.position.x -= 3
        })
      }else if(keys.left.pressed){
          scrollOffset -= 5;
          platforms.forEach(platform => {
          platform.position.x += 5
        })
        genericObjects.forEach((object) => {
          object.position.x += 3
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