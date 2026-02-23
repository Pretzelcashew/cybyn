const wait = ms => new Promise(res => setTimeout(res, ms));


document.body.insertAdjacentHTML('afterbegin', '<div>I am guaranteed to appear, and I changed, again 9.2!</div>');





let options = ['minerals', 'halogen', 'gelatin'];
let random_num = getRandomInt(0,options.length);
document.querySelector('.main-text').textContent = options[random_num];

let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');


ctx.fillStyle = "rgb(182, 255, 203)";
ctx.fillRect(0,0,canvas.width,canvas.height);
for (let a = 0; a < 500000; a++) {
  for (let b = 0; b < 1; b++) {
ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`;
ctx.fillRect(getRandomInt(0,canvas.width), getRandomInt(0,canvas.height), getRandomInt(1,100), getRandomInt(1,100));
  }
await wait(1);

}





/**range excludes max number*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

