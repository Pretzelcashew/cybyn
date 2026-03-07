//start of bvh.js

export let create = (x1 = 0, y1 = 0, x2 = 0, y2 = 0, parent = null, children = [], link = null) => {
    let bvh = {
        aabb: {x1: x1, y1: y1, x2: x2, y2: y2},
        parent: parent,
        children: children,
        link: link
    }
    return bvh;
};

export let insert = (bvh, leaf) => {

};

export let compare = (a,b) => {

}