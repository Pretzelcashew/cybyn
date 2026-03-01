import * as util from './util.js';
import * as input from './input.js';

const keyListen = (e) => {
  if(e.repeat) return;
  console.log("input from main.js: "+e.key);
}

input.keyDownListener.add(keyListen);

document.getElementById("left-stack").insertAdjacentHTML('afterbegin', '<div>Welcome to Cybyn</div>');

let canvas_elements = new Map();

canvas_elements.set("mouse_info","mouse: 0,0");

let change_bg_cooldown = 0.0;
let change_bg_cooldown_max = 1000.0;
let bg_color = [126,100,226];
//let bg_color = [182,255,203];

let mouseX = 0;
let mouseY = 0;

let options = ['minerals', 'halogen', 'gelatin'];
let random_num = util.getRandomInt(0,options.length);
document.querySelector('.info-text').textContent = options[random_num];

let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');

ctx.fillStyle = "rgb(182, 255, 203)";
ctx.fillRect(0,0,canvas.width,canvas.height);



// This covers Mouse, Pen, and Touch
canvas.onpointermove = (e) => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
};


const change_bg = () => {
  bg_color = [util.getRandomInt(0,255),util.getRandomInt(0,255),util.getRandomInt(0,255)];
}

let lastTime = 0;

function frame(currentTime) {
  const delta = currentTime - lastTime;
  lastTime = currentTime;

  change_bg_cooldown -= delta;
  //console.log(delta)
  if (change_bg_cooldown <= 0) {
    change_bg_cooldown = change_bg_cooldown_max;
    change_bg();
  }


  //console.log(`Pointer: x: ${mouseX}, y: ${mouseY}`);
  ctx.fillStyle = `rgb(${bg_color[0]},${bg_color[1]},${bg_color[2]})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const inv = util.getAccessibiltyColor(bg_color[0], bg_color[1], bg_color[2]);
  ctx.fillStyle = `rgb(${inv[0]},${inv[1]},${inv[2]})`; 
  ctx.font = "bold 27px Arial";
  ctx.textBaseline = "top"; 
  ctx.fillText(`Pointer: x: ${mouseX}, y: ${mouseY}`, 15, 15);
  
  requestAnimationFrame(frame); 
}

requestAnimationFrame(frame);