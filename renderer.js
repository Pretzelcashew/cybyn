//start of renderer.js

import * as util from "./util.js";

let numbers_sprite_sheet = new Image();
numbers_sprite_sheet.src = './numbers.png'


export let render = (objects, context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (const [key, value] of objects) {
        const render = value.get('render');
        render(objects.get(key), context);
    }
};

export let prefab = new Map([
    ['random_number_sprite', (self_ref, context) => {
        const position = self_ref.get('position');
        const x = position.get('x');
        const y = position.get('y');
        const scale = self_ref.get('scale');
        const scale_x = scale.get('x');
        const scale_y = scale.get('y');
        context.fillStyle = "rgb(70, 23, 146)";
        const row = util.getRandomInt(0, 3) * 64;
        const col = util.getRandomInt(0, 3) * 64;
        context.drawImage(numbers_sprite_sheet, row, col, 64, 64, x, y, 64 * scale_x, 64 * scale_y);
    }],
    ['rect_sprite', (self_ref, context) => {
        const position = self_ref.get('position');
        const x = position.get('x');
        const y = position.get('y');
        const scale = self_ref.get('scale');
        const scale_x = scale.get('x');
        const scale_y = scale.get('y');
        context.strokeStyle = "rgb(0, 255, 13)";
        context.lineWidth = 1;
        context.strokeRect(x,y,64,64);
    }],

]);
