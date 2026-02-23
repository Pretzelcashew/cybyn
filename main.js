let options = ['minerals', 'halogen', 'gelatin'];
let random_num = getRandomInt(0,options.length);
document.querySelector('.main-text').textContent = options[random_num];

let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 400;

ctx.fillStyle = "rgb(182, 255, 203)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random()})`;
ctx.fillRect(getRandomInt(0,canvas.width), getRandomInt(0,canvas.height), getRandomInt(1,100), getRandomInt(1,100));


document.body.insertAdjacentHTML('beforeend', '<div>I am guaranteed to appear!</div>');

/**range excludes max number*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}