export let keyDownListener = new Set();


window.addEventListener('keydown', (e) => {
  //console.log("input from input.js: "+e.key);

  for(const fn of keyDownListener){
    fn(e);
  }


});