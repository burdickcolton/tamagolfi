// Run function.
function ControlGolfRun(fO) {
	// Turn handling.
	if (fO.shotEnd) {
		if (fO.shotWait > 0) fO.shotWait--;
		else if (fO.shotPlayer > -1 && (BallDone(fO.objBall[fO.shotPlayer]) || fO.playerScore[fO.shotPlayer] >= fO.objHole.holePar + 3) && fO.scoreIndex == -1) Celebrate(fO);
		else fO.NextTurn();
	}
	
	// Automatic camera movement.
	if (fO.shotHit && fO.scoreIndex == -1) {
		if (exists(fO.objBall[fO.shotPlayer])) fO.cameraX = median(0, (fO.objHole.holeSpr.width / 2) - 320, fO.objBall[fO.shotPlayer].x - 160);
	}
	else if (fO.cameraAuto) {
		if (fO.cameraX > 0) {
			if (fO.cameraSpeed < 16) fO.cameraSpeed += .05;
			fO.cameraX -= Math.max(fO.cameraSpeed, 0);
			if (fO.cameraX < 0) fO.cameraX = 0;
		}
		else fO.cameraAuto = false;
	}
	
	// Manual camera movements.
	else if (fO.cameraButton > 0) {
		if (Math.abs(fO.cameraX - fO.cameraGoal) < 16) {
			fO.cameraX = fO.cameraGoal;
			fO.cameraButton = 0;
		}
		else fO.cameraX += Math.sign(fO.cameraGoal - fO.cameraX) * 16;
	}
	
	// Arrow keys. (temporary)
	/*else if (fO.objActor.animOn == 5) {
		if (keyState[37]) {
			if (fO.cameraX > 8) fO.cameraX -= 8;
			else fO.cameraX = 0;
		}
		if (keyState[39]) {
			if (fO.cameraX < (fO.objHole.holeSpr.width / 2) - 328) fO.cameraX += 8;
			else fO.cameraX = (fO.objHole.holeSpr.width / 2) - 320;
		}
	}*/
	
	// Shot tracking.
	if (fO.shotHit) {
		if (!exists(fO.objBall[fO.shotPlayer])) fO.shotEnd = true;
		else if (fO.objBall[fO.shotPlayer].Stopped()) fO.shotEnd = true;
		else {
			fO.shotEnd = false;
			fO.shotWait = getSec(1);
		}
	}
	else if (fO.objActor.animOn == 10) {
		playSound(snd_voice_swing[playerChar[fO.shotPlayer]]);
		fO.objBall[fO.shotPlayer].Stroke(fO.shotDis,
			fO.shotDir,
			GetLoft(playerChar[fO.shotPlayer], fO.shotSpin, fO.objBall[fO.shotPlayer].ballLie, fO.shotDis / fO.shotMax),
			GetSpin(playerChar[fO.shotPlayer], fO.shotSpin));
		fO.shotHit = true;
		fO.shotWait = getSec(1);
		fO.playerScore[fO.shotPlayer]++;
	}
	
	// Score bouncing.
	if (fO.scoreIndex > -1) {
		fO.scoreY += fO.scoreGrav;
		if (fO.scoreY < 208) fO.scoreGrav += .25;
		else if (fO.scoreY >= 208 && fO.scoreGrav > 0) {
			if (fO.scoreGrav >= 1) fO.scoreGrav *= -.5;
			else fO.scoreGrav = 0;
			fO.scoreY = 208;
			playSound(snd_gen_bounce);
		}
	}
	
	// End.
}