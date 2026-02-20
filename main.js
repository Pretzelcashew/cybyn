let options = ['minerals', 'halogen', 'gelatin'];
random_num = getRandomInt(0,options.length);
document.querySelector('.main-text').textContent = options[random_num];

let ctx = document.getElementById('main-canvas');


/**range excludes max number*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}