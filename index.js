'use strict'
document.addEventListener('DOMContentLoaded', start);
let selectedColor = "";
function start() {
    console.log('Connection between the DOM and the Script was successfull! Nice 😎');
    fecthLego();
    fecthColors();
    document.querySelector(".reset").addEventListener("click", resetColors);
    resetColors();
}

function hightlight() {
   let el = this.childNodes;
    el.forEach(el => el.style.stroke = "red");
    el.forEach(el => el.style.strokeWidth = "2px");
}

function hightlightOff() {
     let el = this.childNodes;
     el.forEach(el => el.style.stroke = "#000");
     el.forEach(el => el.style.strokeWidth = ".5px");
 }

async function fecthLego() {
        let svgData = await fetch("lego_guy.svg");
        let svg = await svgData.text();
        document.querySelector("#svg-container").innerHTML = svg;
        console.log(document.querySelector("#svg-container"));
        addEventListeners();
}

async function fecthColors() {
    let svgData = await fetch("colors.svg");
    let svg = await svgData.text();
    document.querySelector("#colors").innerHTML = svg;
    addEventListeners();
}

function addEventListeners() {
    const groups = document.querySelectorAll("g");
    const outlines = document.querySelector("#outlines");
    groups.forEach(group => group.addEventListener("click", clicked));
    outlines.removeEventListener("click", clicked);
    document.querySelector("#Layer_1").addEventListener("click", selectColor);
    groups.forEach(group => group.addEventListener("mouseover", hightlight));
    outlines.removeEventListener("mouseover", hightlight);
    groups.forEach(group => group.addEventListener("mouseout", hightlightOff));
    outlines.removeEventListener("mouseout", hightlightOff);
}

function clicked() {
console.log(this.childNodes);
if (selectedColor == '')
{
    alert("You haven't selected a color - Please select a color to fill this field");
} else {
const el = this.childNodes;
el.forEach(child => child.style.fill = selectedColor);
}
}

function selectColor(e) {
const el = e.target;
selectedColor = el.getAttribute("fill");
}

function resetColors() {
    const paths = document.querySelectorAll("path");
    const outlines = document.querySelector("#outlines").childNodes;
    const eyesOutlines = document.querySelector("#eyes2").childNodes;
    paths.forEach(path => path.style.fill = "#fff");
    outlines.forEach(outline => outline.style.fill = "#000");
    eyesOutlines.forEach(eye => eye.style.fill = "#000");
    document.querySelector("#chinesesymbol").style.fill = "#000";
}
