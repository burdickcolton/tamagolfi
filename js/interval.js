// Interval function.
function gameInterval() {
	// Drawing.
	drawInterval();
	
	// Transition.
	if (objTransition != undefined) objTransition.Act();
	
	// Holding mouse button.
	if (mouseState == 2) {
		mouseState = 1;
	}
	
	// Moving menu background.
	if (menuBackTick > 0) menuBackTick--;
	else {
		menuBackTick = 3;
		if (menuBackScroll > -24) menuBackScroll--;
		else menuBackScroll += 23;
	}
}

// Interval drawing function.
function drawInterval() {
	// Clearing canvas.
	env.clear();
	
	// Test cursor.
	//drawSprite(spr_test, mouseState, 0, mouseX, mouseY - 4);
	
	// Drawing from controller.
	objControl.Draw();
	
	// Drawing transition.
	if (objTransition != undefined) objTransition.Draw();
}