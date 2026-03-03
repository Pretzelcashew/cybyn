export let keyDownListenerMap = new Map([
  ['a', new Map([
    ['evil', () => {console.log("evil things are happening!")}]
  ])]
]);

window.addEventListener('keydown', (e) => {

  const actions = keyDownListenerMap.get(e.key);

  if (actions) {
    for (const [name, fn] of actions){
      fn();
    }
  }

});