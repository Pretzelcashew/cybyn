const wait = ms => new Promise(res => setTimeout(res, ms));
const mod = (n, m) => ((n % m) + m) % m;
/**range excludes max number*/
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getAccessibleColor = (r, g, b) => {
  // Standard weighted luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If the background is bright ( > 0.5), use black. 
  // If it's dark, use white.
  return luminance > 0.5 ? [0, 0, 0] : [255, 255, 255];
};

const getAccessibleInverteded = (r, g, b) => {
// 1. WCAG Luminance
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // 2. Linear Inversion
  let ir = 255 - r, ig = 255 - g, ib = 255 - b;

  // 3. The "Contrast Stretch"
  // If the background is dark (L < 0.5), force the text to be very bright.
  // If the background is light (L >= 0.5), force the text to be very dark.
  if (L < 0.5) {
    ir = Math.min(255, ir + 100); ig = Math.min(255, ig + 100); ib = Math.min(255, ib + 100);
  } else {
    ir = Math.max(0, ir - 100); ig = Math.max(0, ig - 100); ib = Math.max(0, ib - 100);
  }

  return [Math.round(ir), Math.round(ig), Math.round(ib)];
};





const getAccessibleInverted = (r, g, b) => {
  const power = 100;
  const font_size = 27; 
  const font_weight = 700;

  // 1. WCAG Luminance
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // 2. Inversion & Stretch
  let ir = 255 - r, ig = 255 - g, ib = 255 - b;
  if (L < 0.5) {
    ir = Math.min(255, ir + power); ig = Math.min(255, ig + power); ib = Math.min(255, ib + power);
  } else {
    ir = Math.max(0, ir - power); ig = Math.max(0, ig - power); ib = Math.max(0, ib - power);
  }
  const result = [Math.round(ir), Math.round(ig), Math.round(ib)];

  // --- DERIVED CONTRAST REQUIREMENT ---
  
  // Convert font weight to a 0.0-1.0 scale (based on max weight 1000)
  const wScale = font_weight / 1000; 
  
  // Calculate visual density: as size and weight go up, density goes down.
  // We use 6.0 as a baseline "hard" contrast and subtract based on font mass.
  const req = 6.0 - (font_size * 0.1) - (wScale * 1.5);

  // --- LOGGING ---
  const getRelativeLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const l1 = getRelativeLuminance(r, g, b);
  const l2 = getRelativeLuminance(...result);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  console.log(`Contrast: ${ratio.toFixed(2)} | Derived Req: ${req.toFixed(2)} | ${ratio >= req ? '✅' : '❌'}`);

  return result;
};


const getAccessibleInvert = (r, g, b) => {
  // 1. Calculate the perceived brightness (Luminance)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 2. If it's bright, return a dark version of the same "hue"
  // If it's dark, return a bright version
  return brightness > 128 
    ? [Math.round(r * 0.2), Math.round(g * 0.2), Math.round(b * 0.2)] 
    : [Math.min(255, r + 100), Math.min(255, g + 100), Math.min(255, b + 100)];
};

const getFilteredRgb = (r, g, b) => {
  // 1. invert(100%)
  const ir = 255 - r;
  const ig = 255 - g;
  const ib = 255 - b;

  // 2. hue-rotate(180deg) 
  // Matrix constants for exactly 180 degrees
  const outR = 0.143 * ir + 0.140 * ig + 0.717 * ib;
  const outG = 0.711 * ir + 0.140 * ig + 0.149 * ib;
  const outB = 0.143 * ir + 0.720 * ig + 0.137 * ib;

  return [
    Math.max(0, Math.min(255, Math.round(outR))),
    Math.max(0, Math.min(255, Math.round(outG))),
    Math.max(0, Math.min(255, Math.round(outB)))
  ];
};

const invertRgbColor = (r, g, b) => {
  const getL = (rs, gs, bs) => {
    const [R, G, B] = [rs, gs, bs].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B; //
  };

  const getRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  const bgL = getL(r, g, b);
  let outR = 255 - r, outG = 255 - g, outB = 255 - b;

  let safety = 0;
  const isLightBG = bgL > 0.179; 
  
  while (getRatio(bgL, getL(outR, outG, outB)) < 4.5 && safety < 100) {
    const shift = isLightBG ? -5 : 5; // Smaller steps for precision
    outR = Math.max(0, Math.min(255, outR + shift));
    outG = Math.max(0, Math.min(255, outG + shift));
    outB = Math.max(0, Math.min(255, outB + shift));
    safety++;
  }

  // FAIL-SAFE: If we still aren't at 4.5:1, go to the absolute extreme
  if (getRatio(bgL, getL(outR, outG, outB)) < 4.5) {
    console.warn("4.5:1 impossible with this hue. Forcing absolute extreme.");
    return isLightBG ? [0, 0, 0] : [255, 255, 255];
  }

  return [Math.round(outR), Math.round(outG), Math.round(outB)];
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
// for (let a = 0; a < Infinity; a++) {
//   counter = mod(counter + 1, counter_max);
//   for (let b = 0; b < counter; b++) {
//     ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`;
//     ctx.fillRect(getRandomInt(0,canvas.width), getRandomInt(0,canvas.height), getRandomInt(1,100), getRandomInt(1,100));
//   }
// await wait(getRandomInt(1,1));

// }

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
  const inv = getAccessibleInverted(bg_color[0], bg_color[1], bg_color[2]);
  ctx.fillStyle = `rgb(${inv[0]},${inv[1]},${inv[2]})`; 
  ctx.font = "bold 27px Arial";
  ctx.textBaseline = "top"; 
  ctx.fillText(`Pointer: x: ${mouseX}, y: ${mouseY}`, 15, 15);
  
  requestAnimationFrame(frame); 
}

requestAnimationFrame(frame);