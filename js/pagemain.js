// JavaScript source code

// Variables
// Store IDs of main page elements
var aboutMeButton = document.getElementById('btn_aboutMe');
var projectsButton = document.getElementById('btn_projects');

var backCanvas = document.getElementById('cnv_main')

// Draw Properties
var maxLeafsPerNode = 2;
var maxBranchLength = 3;
var minPointBounds = 10;
var maxPointBounds = 100;

const treePoint = { x: 0, y: 0 }
const backTree = null;


// Functions
// Tree class and functions @ https://www.30secondsofcode.org/articles/s/js-data-structures-tree
class TreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class Tree {
    constructor(key, value = key) {
        this.root = new TreeNode(key, value); // When a blank tree is created, create a root
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    *postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }

    insert(parentNodeKey, key, value = key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                node.children.push(new TreeNode(key, value, node));
                return true;
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key);
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}

// Button Functions
// About Me
aboutMeButton.onmouseover = function (e) {
    drawBackground(000000, aboutMeButton);
}

aboutMeButton.onmouseout = function (e) {
    clearBackground();
}

// Canvas Functions
// Draw a random amount of 'cracks' on the canvas from the buttons location
function drawBackground(hex, btn) {
    // Get the buttons location on the webpage
    btnX = getOffset(btn).left;
    btnY = getOffset(btn).top;

    // Create a new tree to store points, named backTree
    backTree = new Tree(1, treePoint(btnX, btnY));
}

// Clear the canvas
function clearBackground() {
    // Clear the canvas of any draw
    backCanvasContext.clearRect(0, 0, canvasctx.width, canvasctx.height);

    // Clear the backTree
    backTree = null;
}

// Get the offset of the element on the page
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function getRandLocation(value) {
    return Math.floor(Math.random() * (maxPointBounds - minPointBounds + 1) + minPointBounds);
}

// Init
function init() {
    backCanvasContext = backCanvas.getContext('2d');
}

window.onload = init();