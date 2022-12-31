import {Player, Platform, animate, player, platform, keys} from "./game"
import "./index.css";
animate();




window.addEventListener('keydown', (e) => {
  switch(e.key){
    case 'a': 
      console.log('left')
      keys.left.pressed = true;
      break
    case 'd': 
      console.log('right')
      keys.right.pressed = true;
      break
    case 'w': 
      console.log('up')
      player.velocity.y -= 20
      break
    case 's': 
      console.log('down')
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch(e.key){
    case 'a': 
      console.log('left')
      keys.left.pressed = false;
      break
    case 'd': 
      console.log('right')
      keys.right.pressed = false;
      break
    case 'w': 
      console.log('up')
      player.velocity.y = 0
      break
    case 's': 
      console.log('down')
      break
  }
})
