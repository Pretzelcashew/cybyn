//start of renderer.js

export let render = (objects, context) => {
    for (const [key, value] of objects){
        const render = value.get('render');
        render(objects.get(key),context);
    }
};