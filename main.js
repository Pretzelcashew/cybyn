let options = ['minerals', 'halogen', 'gelatin'];
random_num = getRandomInt(0,options.length);
document.querySelector('.main-text').textContent = options[random_num];

/**range excludes max number*/
function getRandomInt(min, max) {
  // +1 makes it "inclusive" (so it can actually hit the max number)
  return Math.floor(Math.random() * (max - min)) + min;
}