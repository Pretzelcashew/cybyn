import * as util from './util.js';
import * as input from './input.js';
import * as renderer from './renderer.js';

//#region Variable Init


let tick = null;
let lastTick = performance.now();


let change_bg_cooldown = 0.0;
let change_bg_cooldown_max = 1000.0;
let bg_color = [126, 100, 226];

let mouseX = 0;
let mouseY = 0;

let options = ['minerals', 'halogen', 'gelatin'];
let random_num = util.getRandomInt(0, options.length);
document.querySelector('.info-text').textContent = options[random_num];

let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');

let canvas_elements = new Map([
  ['object_01',new Map([
    ['position',new Map([['x',100],['y',100]])],
    ['scale',new Map([['x',1],['y',1]])],
    ['render', renderer.prefab.get('rect_sprite')],
    ['parent',ctx],
    ['children',new Map()]
  ])],
    ['object_02',new Map([
    ['position',new Map([['x',160],['y',70]])],
    ['scale',new Map([['x',1],['y',1]])],
    ['render', renderer.prefab.get('rect_sprite')],
    ['parent',ctx],
    ['children',new Map()]
  ])]

]);

//#endregion

//#region Input Listener Setup

input.keyDownListenerMap.set('p', new Map([
  ['pause', () => {
    toggle_pause();
  }]
]));

// This covers Mouse, Pen, and Touch
canvas.onpointermove = (e) => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
};

window.addEventListener('focus', () => {
  console.log("Window is active.");
  unpause();
});

window.addEventListener('blur', () => {
  console.log("Window lost focus.");
  pause();
});

//#endregion

//#region Pause/Unpause

let toggle_pause = () => {
  if (tick === null) {
    unpause();
  }
  else {
    pause();
  }
};

let pause = () => {
  if (tick === null) return;
  console.log('pause');
  tick.terminate();
  tick = null;
};
let unpause = () => {
  if (tick !== null) return;
  console.log('resume');
  tick = new Worker('./tick.js');
  tick.onmessage = () => {
    let currentTick = performance.now();
    let deltaTime = currentTick - lastTick;
    lastTick = currentTick;
    frame(deltaTime);
    
  };
};


unpause();

//#endregion

//document.getElementById("left-stack").insertAdjacentHTML('afterbegin', '<div>Welcome to Cybyn</div>');

function frame(delta) {

  renderer.render(canvas_elements,ctx);
  
};









