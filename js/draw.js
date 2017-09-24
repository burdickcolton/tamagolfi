// Base drawing function.
function drawSpriteFull(fSpr, fLeft, fTop, fWidth, fHeight, fX, fY) {
	env.context.drawImage(fSpr, fLeft, fTop, fWidth, fHeight, fX, fY, fWidth, fHeight);
}

// Simple drawing function.
function drawSprite(fSpr, fCol, fRow, fX, fY) {
	// Unset dimensions.
	if (fSpr.sprWidth == 0 || fSpr.sprHeight == 0) {
		fSpr.sprWidth = Math.round((fSpr.width / fSpr.sprCol) / 2);
		fSpr.sprHeight = Math.round((fSpr.height / fSpr.sprRow) / 2);
	}
	
	// Calling function.
	drawSpriteFull(fSpr, (fCol * fSpr.sprWidth) * 2, (fRow * fSpr.sprHeight) * 2, fSpr.sprWidth * 2, fSpr.sprHeight * 2, Math.round(fX) * 2, Math.round(fY) * 2);
}

// Partial sprite drawing.
function drawSpritePart(fSpr, fW, fH, fX, fY) {
	drawSpriteFull(fSpr, 0, 0, Math.round(fW) * 2, Math.round(fH) * 2, Math.round(fX) * 2, Math.round(fY) * 2);
}