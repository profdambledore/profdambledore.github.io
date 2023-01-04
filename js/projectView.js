// JavaScript source code

// Store all of the project buttons for reference later
const projectButtonOne = document.getElementById('projectbuttonOne');
const projectButtonTwo = document.getElementById('projectbuttonTwo');
const projectContent = document.getElementById('projectContent')

// Set the project buttons images to the correct images
projectButtonOne.style.backgroundImage = "url('img/p1/p1h.png')"

// For each button (until I find a better way) this chunk of code must be added
// Add content move listener
projectButtonOne.addEventListener('mousemove', e => {
    projectContent.style.setProperty('--mouseX', e.clientX + 20 + "px");
    projectContent.style.setProperty('--mouseY', e.clientY - 50 + "px");
})

// Add hover functions for project one
projectButtonOne.onmouseenter = function showHoveredContent() {
    projectContent.style.visibility = 'visible';
    document.getElementById('hoverContentHeader').textContent = 'Pub Simulator Prototype';
    document.getElementById('hoverContentImage').style.backgroundImage = "url('img/catTestImage.jpg')";
    document.getElementById('hoverContentTags').textContent = 'Tags: Unreal Engine 4, C++';
}

projectButtonOne.onmouseleave = function hideHoveredContent() {
    projectContent.style.visibility = 'hidden';
}



projectButtonTwo.addEventListener('mousemove', e => {
    projectContent.style.setProperty('--mouseX', e.clientX + 20 + "px");
    projectContent.style.setProperty('--mouseY', e.clientY - 50 + "px");
})

// Add hover functions for project two
projectButtonTwo.onmouseenter = function showHoveredContent() {
    projectContent.style.visibility = 'visible';
    document.getElementById('hoverContentHeader').textContent = 'Physics Based Spaceship Experimentation';
    document.getElementById('hoverContentImage').style.backgroundImage = "url('img/catTestImageTwo.jpg')";
}

projectButtonTwo.onmouseleave = function hideHoveredContent() {
    projectContent.style.visibility = 'hidden';
}

