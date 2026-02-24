const wait = ms => new Promise(res => setTimeout(res, ms));
const mod = (n, m) => ((n % m) + m) % m;
/**range excludes max number*/
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


document.getElementById("left-stack").insertAdjacentHTML('afterbegin', '<div>Welcome to Cybyn</div>');

let mouseX;
let mouseY;
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
  console.log(`Pointer: x: ${mouseX}, y: ${mouseX}`);
};