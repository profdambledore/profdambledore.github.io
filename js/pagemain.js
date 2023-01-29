// JavaScript source code

// Store IDs of main page elements
var aboutMeButton = document.getElementById('btn_aboutMe');
var projectsButton = document.getElementById('btn_projects');

var backCanvas = document.getElementById('cnv_main')

// About Me
aboutMeButton.onmouseover = function (e) {
    drawBackground(000000, aboutMeButton);
}

aboutMeButton.onmouseout = function (e) {
    clearBackground();
}

// Canvas
// Draw a random amount of 'cracks' on the canvas from the buttons location
function drawBackground(hex, btn) {
    // Get the buttons location on the webpage
    getOffset(btn);
}

// Clear the canvas
function clearBackground() {
    // Clear the canvas of any draw
   backCanvasContext.clearRect(0, 0, canvasctx.width, canvasctx.height);
}

// Get the offset of the element on the page
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

// Init
function init() {
    backCanvasContext = backCanvas.getContext('2d');
}

window.onload = init();