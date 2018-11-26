import Cube from "../src";

const el = document.querySelector("#cube");
if (!el) throw new Error("#cube element not found!")

const cube = new Cube(el, {
    top: "./images/cubes/02/top.jpg",
    bottom: "public/images/cubes/02/bottom.jpg",
    front: "public/images/cubes/02/front.jpg",
    back: "public/images/cubes/02/back.jpg",
    left: "public/images/cubes/02/left.jpg",
    right: "public/images/cubes/02/right.jpg",
});



// console.log(cube)


async function f() {}

f()