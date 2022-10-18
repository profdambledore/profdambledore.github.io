// JavaScript source code

const projectButtonOne = document.getElementById('projectbuttonOne');
const projectButtonTwo = document.getElementById('projectbuttonTwo');
const projectContent = document.getElementById('projectContent')

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
    document.getElementById('hoverPointEngine').style.backgroundImage = "url('icon/UnrealIcon.png')"
    document.getElementById('hoverPointLanguage').style.backgroundImage = "url('icon/CPPIcon.png')"
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
    document.getElementById('hoverPointEngine').style.backgroundImage = "url('icon/UnrealIcon.png')"
    document.getElementById('hoverPointLanguage').style.backgroundImage = "url('icon/CPPIcon.png')"
}

projectButtonTwo.onmouseleave = function hideHoveredContent() {
    projectContent.style.visibility = 'hidden';
}