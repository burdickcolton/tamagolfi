// Run function.
function ControlGolfRun(fO) {
	// Turn handling.
	if (fO.shotEnd) {
		if (fO.shotWait > 0) fO.shotWait--;
		else fO.NextTurn();
	}
	
	// Moving camera.
	if (fO.cameraAuto) {
		if (fO.cameraX > 0) {
			if (fO.cameraSpeed < 8) fO.cameraSpeed += .05;
			fO.cameraX -= Math.max(fO.cameraSpeed, 0);
			if (fO.cameraX < 0) fO.cameraX = 0;
		}
		else fO.cameraAuto = false;
	}
	else {
		if (keyState[37] && fO.cameraX > 0) fO.cameraX -= 8;
		if (keyState[39] && fO.cameraX < fO.objHole.holeSpr.sprWidth - 320) fO.cameraX += 8;
	}
	
	// End.
}