

export let keyDownListenerMap = new Map([
  ['a', new Map([
    ['evil', () => {console.log("evil things are happening!")}]
  ])]
]);

export let keyUpListenerMap = new Map([
  ['a', new Map([
    ['evil', () => {console.log("evil things are happening!")}]
  ])]
]);



window.addEventListener('keydown', (e) => {

  const actions = keyDownListenerMap.get(e.key);

  if (actions) {
    for (const fn of actions.values()){
      fn();
    }
  }

});

window.addEventListener('keyup', (e) => {

  const actions = keyUpListenerMap.get(e.key);

  if (actions) {
    for (const fn of actions.values()){
      fn();
    }
  }

});