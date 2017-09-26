// Mouse variables.
mouseX = 0;
mouseY = 0;
mouseState = 0;

// Keyboard array.
keyState = [];

// Getting mouse position.
function getMousePos(e) {
	tempBound = env.canvas.getBoundingClientRect();
	tempDom = document.documentElement;
    mouseX = Math.round((e.clientX - tempBound.left - 4) / 2);
    mouseY = Math.round((e.clientY - tempBound.top - 4) / 2);
}

// Mouse point.
function MousePoint(fXA, fYA, fXB, fYB) {
	return(mouseX >= fXA && mouseY >= fYA && mouseX < fXB && mouseY < fYB);
}

// Clicking.
function MouseClick() {
	// State.
	mouseState = 2;
	
	// Control.
	if (objTransition == undefined && MousePoint(0, 0, 320, 240)) objControl.Click();
}