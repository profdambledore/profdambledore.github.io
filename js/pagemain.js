// JavaScript source code

// Variables
// Store IDs of main page elements
var aboutMeButton = document.getElementById('btnAboutMe');
var projectsButton = document.getElementById('btn_projects');
var backCanvas = document.getElementById('cnv_main')

backCanvas.style.left = "0px";
backCanvas.style.top = "0px";
backCanvas.style.width = "100%";
backCanvas.style.height = "100%";
backCanvas.width = backCanvas.offsetWidth;
backCanvas.height = backCanvas.offsetHeight;

const backCanvasContext = backCanvas.getContext('2d');

// Draw Properties
var maxLeafsPerNode = 3;
var maxBranchLength = 4;
var minPointBounds = 100;
var maxPointBounds = 250;

// Tree Point Class
class treePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

backTree = null;

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

    get amountChildren() {
        return this.children.length;
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
    backTree = new Tree(1, new treePoint(btnX, btnY));

    // Next, calculate how many nodes we need to create
    totalNodes = maxBranchLength * maxLeafsPerNode;

    // Then add them
    var currNode = 1; //
    var bNode = false; // True when a open node 'slot' is found, false when not
    for (let i = 0; i < totalNodes; i++) {
        bNode = false;
        while (!bNode) {
            // First, check if the current node has spaces for children
            if (backTree.find(currNode).amountChildren < maxLeafsPerNode) {
                bNode = true;
            }
            // Then check if we have reached the max branch length.  If so, move back a key (111 -> 11) and progress the last character by one (11 -> 12)
            // But only do this if a node hasen't been found
            else if (!bNode && (String(backTree.find(currNode).key).length + 1) >= maxBranchLength) {
                currNode = String(+(String(currNode).substring(0, currNode.length)) +1);
                console.log(currNode);
            }
            // Finally, move up a key (11 -> 111)
            else if (!bNode && backTree.find(currNode).amountChildren >= maxLeafsPerNode) {
                currNode = (String(currNode) + 1);
                console.log(currNode);
            }
        }

        // Add the node to the location
        // First, get new point loc
        nX = getRandLocation(backTree.find(currNode).value.x); nY = getRandLocation(backTree.find(currNode).value.y)
        backTree.insert(backTree.find(currNode).key, makeNodeID(backTree.find(currNode).key, backTree.find(currNode).amountChildren), new treePoint(nX, nY));

        // Now draw the lines between the nodes
        backCanvasContext.beginPath();
        backCanvasContext.moveTo(backTree.find(currNode).value.x, backTree.find(currNode).value.y);
        backCanvasContext.lineTo(nX, nY);
        backCanvasContext.strokeStyle = hex;
        backCanvasContext.lineWidth = 5;
        backCanvasContext.stroke();
    }
    console.log(backTree);


}

// Clear the canvas
function clearBackground() {
    // Clear the canvas of any draw
    backCanvasContext.clearRect(0, 0, backCanvas.width, backCanvas.height);

    // Clear the backTree
    backTree = null;
    console.log(backTree);
}

// Get the offset of the element on the page
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2
    };
}

// Get a random point on one axis between the bounds
function getRandLocation(value) {
    var out = Math.floor(Math.random() * (maxPointBounds - minPointBounds + 1) + minPointBounds);
    bool = Math.random() < 0.5
    if (bool == true) {
        console.log(out * -1);
        return (out * -1) + value;
    }
    return out + value;
}

function makeNodeID(parentID, amountOfChildren) {
    return String(parentID) + (amountOfChildren + 1);
}

// Init
function init() {

}

window.onload = init();