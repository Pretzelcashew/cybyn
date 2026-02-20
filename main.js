let options = ['minerals', 'halogen', 'gelatin'];
let random_num = Math.floor(Math.random() * options.length);
document.querySelector('.main-text').textContent = options[random_num];

function getRandomInt(min, max) {
  // +1 makes it "inclusive" (so it can actually hit the max number)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}