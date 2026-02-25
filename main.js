const wait = ms => new Promise(res => setTimeout(res, ms));
const mod = (n, m) => ((n % m) + m) % m;
/**range excludes max number*/
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getAccessibiltyColor = (r, g, b) => {
    // 1. Normalize and apply Gamma Expansion to get Linear values
    const [rl, gl, bl] = [r, g, b].map(v => {
        let s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });

    // 2. Calculate Relative Luminance
    const L = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;

    // 3. Use the WCAG threshold for the best of Black vs White
    // This ensures a minimum 4.5:1 ratio (usually closer to 4.58:1)
    return L > 0.179 ? [0, 0, 0] : [255, 255, 255];
};



document.getElementById("left-stack").insertAdjacentHTML('afterbegin', '<div>Welcome to Cybyn</div>');


let canvas_elements = new Map();

canvas_elements.set("mouse_info","mouse: 0,0");

let change_bg_cooldown = 0.0;
let change_bg_cooldown_max = 1000.0;
let bg_color = [126,100,226];
//let bg_color = [182,255,203];

let mouseX = 0;
let mouseY = 0;
let counter = 0;
let counter_max = 100;

let options = ['minerals', 'halogen', 'gelatin'];
let random_num = getRandomInt(0,options.length);
document.querySelector('.info-text').textContent = options[random_num];

let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');

ctx.fillStyle = "rgb(182, 255, 203)";
ctx.fillRect(0,0,canvas.width,canvas.height);

window.addEventListener('keydown', (e) => {
  console.log(e.key);
});

// This covers Mouse, Pen, and Touch
canvas.onpointermove = (e) => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
};


const change_bg = () => {
  bg_color = [getRandomInt(0,255),getRandomInt(0,255),getRandomInt(0,255)];
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
  const inv = getAccessibiltyColor(bg_color[0], bg_color[1], bg_color[2]);
  ctx.fillStyle = `rgb(${inv[0]},${inv[1]},${inv[2]})`; 
  ctx.font = "bold 27px Arial";
  ctx.textBaseline = "top"; 
  ctx.fillText(`Pointer: x: ${mouseX}, y: ${mouseY}`, 15, 15);
  
  requestAnimationFrame(frame); 
}

requestAnimationFrame(frame);