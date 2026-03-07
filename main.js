//#region Imports

import * as util from './util.js';
import * as input from './input.js';
import * as renderer from './renderer.js';
import * as bvh from './bvh.js';

//#endregion

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


let tx = 0; let ty = 0; let tw = 10; let th = 10;

let canvas_elements = {};

tx = 55; ty = 74, tw = 32; th = 79;
canvas_elements.object_01 = {
  position: { x: tx, y: tx },
  scale: { x: 1, y: 1 },
  aabb: { x1: tx - tw, y1: ty - th, x2: tx + tw, y2: ty + th },
  render: renderer.prefab.aabb_sprite,
  parent: ctx,
  children: []
};

tx = 200; ty = 300, tw = 100; th = 21;
canvas_elements.object_02 = {
  position: { x: tx, y: tx },
  scale: { x: 1, y: 1 },
  aabb: { x1: tx - tw, y1: ty - th, x2: tx + tw, y2: ty + th },
  render: renderer.prefab.aabb_sprite,
  parent: canvas_elements.object_01,
  children: []
};
canvas_elements.object_01.children.push(canvas_elements.object_02);


let main_bvh = bvh.create();
bvh.insert(main_bvh,
  bvh.create(canvas_elements.object_01)
);

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

//#region Unused

//document.getElementById("left-stack").insertAdjacentHTML('afterbegin', '<div>Welcome to Cybyn</div>');

//#endregion

//#region Frames

function frame(delta) {

  renderer.render(canvas_elements, ctx);

};

//#endregion








