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
	return((((87.5 + (charStat[fChar][0] * .5)) * gameLieBonus[fLie]) * tSpin) * 6);
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
	return(((7.5 + (charStat[fChar][1] * .1)) * tSpin) * fDis);
}

// Getting a valid distance.
function GetFixDistance(fX, fBall, fMax) {
	return(median(48, calcDistance(fBall.x - fX, fBall.y, mouseX, mouseY) * (mouseX > (fBall.x - fX)), fMax));
}

// Getting a valid direction.
function GetFixDirection(fX, fBall) {
	tDir = calcDirection(Math.min(fBall.x - fX, mouseX), fBall.y, Math.max(fBall.x - fX, mouseX), mouseY);
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
	tStr = Math.ceil(fN / 6).toString();
	for(fi = 0; fi < tStr.length; fi++) {
		drawSprite(spr_hud_number, Number(tStr[fi]), fCol, fX + (7 * fi), fY);
	}
}