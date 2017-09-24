// Resetting player variables.
function resetPlayers() {
	for (fI = 0; fI < 4; fI++) {
		resetPlayer(fI);
	}
}

// Seeing if the character has been selected.
function checkForChar(fChar) {
	for (fi = 0; fi < 4; fi++) {
		if (playerChar[fi] == fChar) return(true);
	}
	return(false);
}

// Seeing who selected a character.
function checkCharPlayer(fChar) {
	for (fi = 0; fi < 4; fi++) {
		if (playerChar[fi] == fChar) return(fi);
	}
	return(-1);
}

// Getting a random unselected character.
function getUnselectedChar() {
	tRe = -1;
	while (tRe == -1 || checkForChar(tRe)) tRe = Math.floor(Math.random() * spr_player.length);
	return(tRe);
}

// Negating too small numbers.
function smallNegate(fIn) {
	if (Math.abs(fIn) < .00000000000001) return(0);
	else return(fIn);
}

// Cosine.
function cos(fIn) {
	return(smallNegate(Math.cos(fIn * (Math.PI / 180))));
}

// Sine.
function sin(fIn) {
	return(smallNegate(Math.sin(fIn * (Math.PI / 180))));
}

// X length by direction.
function xDir(fLen, fDir) {
	return(cos(fDir) * fLen);
}

// Y length by direction.
function yDir(fLen, fDir) {
	return(-sin(fDir) * fLen);
}

// Getting a point in between two points.
function getBetween(fA, fB, fDis) {
	return(fA + ((fB - fA) * fDis));
}

// Getting a random whole number between 2 numbers (inclusive).
function randomRange(fA, fB) {
	return(fA + Math.round(Math.random() * (fB - fA)));
}

// Getting a random whole number with a maximum (inclusive).
function randomMax(fMax) {
	return(randomRange(0, fMax));
}

// Seeing if the middle value is between the outer values.
function valueBetween(fA, fMid, fB) {
	return(fMid >= fA && fMid <= fB);
}

// Calculating direction from point A to point B.
function calcDirection(xA, yA, xB, yB) {
	tRe = Math.atan2(yB - yA, xB - xA) * (180 / Math.PI);
	if (tRe < 0) tRe = Math.abs(tRe);
	else tRe = 360 - tRe;
	return(tRe);
}

// Calculating distance between point A to point B.
function calcDistance(xA, yA, xB, yB) {
	return(Math.sqrt(sqr(xB - xA) + sqr(yB - yA)));
}

// Squaring since apparently JavaScript doesn't have its own function for this.
function sqr(fIn) {
	return(fIn * fIn);
}

// Getting seconds.
function getSec(fIn) {
	return(Math.round(fIn * 60));
}

// Getting amount of players.
function getPlayers() {
	for(fI = 3; fI >= 0; fI--) {
		if (playerChar[fI] > -1) return(fI + 1);
	}
	return(0);
}

// Resetting one player.
function resetPlayer(fIn) {
	playerChar[fIn] = -1;
	playerAi[fIn] = false;
}

// Compiling string from key array.
function keyArrayString(fIn) {
	tRe = "";
	for(fi = 0; fi < fIn.length; fi++) tRe += gameLetterTable[fIn[fi] - 65];
	return(tRe);
}

// Getting character code.
function charCode(fCode) {
	switch(keyArrayString(fCode)) {
		// Mommy.
		case "MAMATOMO":
			return(12);
			
		// Memetchi.
		case "GURUGURU":
			return(13);
			
		// Invalid.
		default:
			return(-1);
	}
}