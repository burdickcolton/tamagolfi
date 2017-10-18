// Collision with obstacles.
function ObsCollision(fBall) {
	for(fi = 0; fi < objControl.objHole.holeObs.length; fi++) {
		if (objControl.objHole.holeObs[fi].Hit(fBall)) return(true);
	}
	return(false);
}

// Mushroom.
function ObsMushroom(fX, fY, fType) {
	// Variables.
	this.x = fX * 32;
	this.y = 80 + (fY * 32);
	this.shroomType = fType;
	this.shroomTick = 0;
	
	// Interaction.
	this.Hit = function(fBall) {
		tD = calcDistance(this.x + 16, this.y + 16, fBall.x, fBall.y);
		tR = calcDirection(this.x + 16, this.y + 16, fBall.x, fBall.y);
		if (tD <= 16 && fBall.z >= -24 && this.shroomTick <= 0) {
			if (tD >= 16 - (fBall.ballSpeed + .5)) fBall.Set((this.x + 16) + xDir(15, tR), (this.y + 16) + yDir(15, tR), fBall.z);
			else fBall.Set(fBall.x, fBall.y, -25);
			if (this.shroomType == 1) fBall.Bounce(2.5, 180, -2.5);
			else if (this.shroomType == 2) fBall.Bounce(2.5, 0, -2.5);
			else fBall.Bounce(1, calcDirection(0, 0, fBall.x - (this.x + 16), 0), -2.5);
			playSound(snd_gen_bounce);
			this.shroomTick = 30;
			return(true);
		}
		else return(false);
	}
	
	// Drawing.
	this.Draw = function(fX) {
		drawSprite(spr_golf_mushroom, this.shroomType, 0, this.x - fX, this.y - 16);
		if (this.shroomTick > 0) this.shroomTick--;
	}
}