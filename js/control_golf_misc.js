// Yard drawing function.
function DrawYards(fX, fY, fYd, fCol) {
	tStr = Math.ceil(fYd / 6).toString();
	for(fi = 0; fi < tStr.length; fi++) {
		drawSprite(spr_hud_number, Number(tStr[fi]), fCol, fX + (7 * fi), fY);
	}
	drawSprite(spr_hud_yards, fCol, 0, fX + (7 * tStr.length), fY + 5);
}

// Getting maximum distance.
function GetMaxDistance(fChar, fSpin, fLie) {
	if (fSpin < 0) tSpin = 1 - ((fSpin * (charStat[fChar][2] / 25)) / 16);
	else tSpin = 1 - ((fSpin * ((26 - charStat[fChar][2]) / 25)) / 16);
	return((((87.5 + (charStat[fChar][0] * .5)) * LieEffect(fLie, charStat[fChar][3])) * tSpin) * 6);
}

// Getting loft. (old)
/*function GetLoft(fChar, fSpin, fLie) {
	if (fSpin < 0) tSpin = 1 - ((fSpin * (charStat[fChar][2] / 25)) * .2);
	else tSpin = 1 - ((fSpin * ((26 - charStat[fChar][2]) / 25)) * .2);
	return((5 + (charStat[fChar][1] * .4)) * tSpin);
}*/

// Getting loft.
function GetLoft(fChar, fSpin, fLie, fDis) {
	if (fSpin < 0) tSpin = 1 - ((fSpin * (charStat[fChar][2] / 25)) * .2);
	else tSpin = 1 - ((fSpin * ((26 - charStat[fChar][2]) / 25)) * .2);
	//return(((7.5 + (charStat[fChar][1] * .1)) * tSpin) * fDis);
	return((((9 + sqr((charStat[fChar][1] / 50) * 1)) * LieEffect(fLie, charStat[fChar][3])) * tSpin) * fDis);
}

// Getting a valid distance.
function GetFixDistance(fX, fBall, fMax) {
	return(median(24, calcDistance(fBall.x - fX, fBall.y, mouseX, mouseY) * (mouseX > (fBall.x - fX)), fMax));
}

// Getting a valid direction.
function GetFixDirection(fX, fBall) {
	tDir = calcDirection(Math.min(fBall.x - fX, mouseX), fBall.y, Math.max(fBall.x - fX, mouseX), mouseY - 1);
	if (tDir > 45 && tDir < 135) tDir = 45;
	else if (tDir < 315 && tDir > 225) tDir = 315;
	return(tDir);
}

// Getting spin strength.
function GetSpin(fChar, fSpin) {
	return(fSpin * mean(1, charStat[fChar][2] / 25));
}

// Number drawing function.
function DrawNumber(fX, fY, fN, fCol) {
	tStr = Math.round(fN).toString();
	for(fi = 0; fi < tStr.length; fi++) {
		drawSprite(spr_hud_number, Number(tStr[fi]), fCol, fX + (7 * fi), fY);
	}
}

// Getting lie multiplier.
function LieEffect(fLie, fSave) {
	tR = gameLieBonus[fLie];
	if (tR < 1) tR = getBetween(tR, 1, fSave / 50);
	return(tR);
}

// Seeing if the ball is sunk.
function BallDone(fBall) {
	if (fBall == undefined) return(true);
	else return(fBall.ballLie == 5);
}

// Celebrating after finishing.
function Celebrate(fO) {
	// Getting stuff.
	tP = fO.objHole.holePar;
	tS = fO.playerScore[fO.shotPlayer] + exists(fO.objBall[fO.shotPlayer]);
	if (exists(fO.objBall[fO.shotPlayer])) {
		if (fO.objBall[fO.shotPlayer].ballLie != 5) tS++;
	}
	
	// HUD.
	if (tS == 1) fO.scoreIndex = 0;
	else fO.scoreIndex = 5 + (tS - tP);
	
	// Sounds.
	if (tS > tP) {playSound(snd_gen_bad); playSound(snd_voice_bad[playerChar[fO.shotPlayer]]);}
	else if (tS == tP) {playSound(snd_gen_okay); playSound(snd_voice_okay[playerChar[fO.shotPlayer]]);}
	else if (tS == tP - 1) {playSound(snd_gen_good); playSound(snd_voice_good[playerChar[fO.shotPlayer]]);}
	else {playSound(snd_gen_great); playSound(snd_voice_great[playerChar[fO.shotPlayer]]);}
	
	// Misc.
	fO.objActor.clubOn = false;
	fO.objActor.Perform(2 - (tS == tP) + (tS > tP), undefined);
	if (tS - tP < -1) fO.objActor.animPart = playerChar[fO.shotPlayer];
	fO.cameraX = median(0, (fO.objHole.holeSpr.width / 2) - 320, fO.objActor.x - 160);
	fO.shotWait = getSec(4);
	playerScore[fO.shotPlayer] += tS - tP;
}

// Checking the lie of a coordinate.
function CheckLie(fX, fY, fHole) {
	return(fHole.holeArray[Math.floor(fX / 32)][Math.floor((fY - 80) / 32)] + 1);
}