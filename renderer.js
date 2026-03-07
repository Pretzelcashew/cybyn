//renderer.js

import * as util from "./util.js";

let numbers_sprite_sheet = new Image();
numbers_sprite_sheet.src = './numbers.png'





export let render = (objects, context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (const [key, value] of Object.entries(objects)) {
        const render = value.render;
        render(objects[key], context);
    }
};

export let prefab = {
    random_number_sprite: (self_ref, context) => {
        const position = self_ref.position;
        const x = position.x;
        const y = position.y;
        const scale = self_ref.scale;
        const scale_x = scale.x;
        const scale_y = scale.y;
        context.fillStyle = "rgb(70, 23, 146)";
        const row = util.getRandomInt(0, 3) * 64;
        const col = util.getRandomInt(0, 3) * 64;
        context.drawImage(numbers_sprite_sheet, row, col, 64, 64, x, y, 64 * scale_x, 64 * scale_y);
    },
    rect_sprite: (self_ref, context) => {
        const position = self_ref.position;
        const x = position.x;
        const y = position.y;
        const scale = self_ref.scale;
        const scale_x = scale.x;
        const scale_y = scale.y;
        context.strokeStyle = "rgb(0, 255, 13)";
        context.lineWidth = 1;
        context.strokeRect(x, y, 64, 64);
    },
    aabb_sprite: (self_ref, context) => {
        const position = self_ref.position;
        const x = position.x;
        const y = position.y;
        const aabb = self_ref.aabb;
        const x1 = aabb.x1;
        const y1 = aabb.y1;
        const w = aabb.x2 - x1;
        const h = aabb.y2 - y1;
        const scale = self_ref.scale;
        const scale_x = scale.x;
        const scale_y = scale.y;
        context.strokeStyle = "rgb(255, 0, 0)";
        context.lineWidth = 1;
        context.strokeRect(x1, y1, w, h);
    }


};
