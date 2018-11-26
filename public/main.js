import Cube from "../src";


const el = document.querySelector("#cube");
if (!el) throw new Error("#cube element not found!")

const cube = new Cube(el, {
    top: "images/cubes/02/top.jpg",
    bottom: "images/cubes/02/bottom.jpg",
    front: "images/cubes/02/front.jpg",
    back: "images/cubes/02/back.jpg",
    left: "images/cubes/02/left.jpg",
    right: "images/cubes/02/right.jpg",
});

console.log(cube)
