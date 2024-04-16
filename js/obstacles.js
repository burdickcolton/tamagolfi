// Collision with obstacles.
function ObsCollision(fBall) {
	for(fi = 0; fi < objControl.objHole.holeObs.length; fi++) {
		if (objControl.objHole.holeObs[fi].Hit(fBall)) return(true);
	}
	return(false);
}

///////////////
// MUSHROOMS //
///////////////
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
		if (valueBetween(this.x, fBall.x, this.x + 32) && valueBetween(this.y, fBall.y, this.y + 32) && fBall.z >= -24 && this.shroomTick <= 0) {
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
		drawSprite(spr_golf_mushroom, this.shroomType, gameCourse, this.x - fX, this.y - 16);
		if (this.shroomTick > 0) this.shroomTick--;
	}
}

//////////////////
// KABODEBITCHI //
//////////////////
function ObsKabodebitchi(fX, fY) {
	// Variables.
	this.x = fX * 32;
	this.y = 80 + (fY * 32);
	this.kaboBlink = true;
	this.kaboIdle = 60;
	this.kaboHit = 0;
	
	// Interaction.
	this.Hit = function(fBall) {
		if (!fBall.Stopped() && fBall.obsKabo != this && valueBetween(this.x + 4, fBall.x, this.x + 28) && valueBetween(this.y + 4, fBall.y, this.y + 28) && fBall.z >= -44) {
			this.kaboHit = getSec(2.5);
			fBall.obsKabo = this;
			fBall.ballSpeed /= 2;
			fBall.ballDrop = fBall.ballDropDefault / 2;
			fBall.ballGrav = 0;
			fBall.shotSpin = -1;
			fBall.obsTrail = 1;
			playSound(snd_golf_kabodebitchi);
			return(true);
		}
		else return(false);
	}
	
	// Drawing.
	this.Draw = function(fX) {
		// Sprite.
		if (this.kaboBlink) {
			drawSprite(spr_player_shadow, 0, 0, this.x + 5 - fX, this.y + 14);
			drawSprite(spr_golf_kabodebitchi, 0, 0, this.x + 2 - fX, this.y - 28 + (this.kaboIdle <= 30));
		}
		this.kaboBlink = (!this.kaboBlink || this.kaboHit <= 0);
		
		// Idle.
		if (this.kaboIdle > 0) this.kaboIdle--;
		else this.kaboIdle = 60;
		if (this.kaboHit > 0) this.kaboHit--;
	}
}

////////////////
// GHOST CLUB //
////////////////
function ObsGhost(fX, fY, fDir) {
	// Variables.
	this.x = fX * 32;
	this.y = 80 + (fY * 32);
	this.ghostDir = fDir;
	this.ghostBlink = true;
	this.ghostTick = 0;
	this.ghostFrame = -1;
	this.ghostX = 0;
	this.ghostY = 0;
	this.ghostBall = undefined;
	
	// Acting.
	this.Act = function() {
		if (this.ghostTick > 0) this.ghostTick--;
		else {
			if (this.ghostFrame < 5) this.ghostFrame++;
			switch(this.ghostFrame) {
				case 0:
					this.ghostTick = 4;
					playSound(snd_golf_backswing);
					break;
				
				case 1:
					this.ghostTick = 15;
					break;
				
				case 2:
					this.ghostTick = 1;
					snd_golf_backswing.Stop();
					playSound(snd_golf_foreswing);
					break;
				
				case 3:
					this.ghostTick = 1;
					this.ghostBall.Stroke(calcDistance(this.ghostBall.x, this.ghostBall.y, this.x + 144, this.y + 16 + (-96 + (96 * this.ghostDir)) - 2.5),
						calcDirection(this.ghostBall.x, this.ghostBall.y, this.x + 144, this.y + 16 + (-96 + (96 * this.ghostDir))), 4, -2.5);
					this.ghostBall.shotWind = false;
					this.ghostBall.obsTrail = 1;
					//this.ghostBall.ballBounces = 3;
					playSound(snd_golf_spooked);
					break;
				
				case 4:
					this.ghostTick = 1;
					break;
				
				default:
					// Nothing.
			}
			// End.
		}
	}
	
	// Interaction.
	this.Hit = function(fBall) {
		if (fBall.Stopped() && !fBall.ballStall && valueBetween(this.x, fBall.x, this.x + 32) && valueBetween(this.y, fBall.y, this.y + 32)) {
			fBall.ballStall = true;
			this.ghostFrame = -1;
			this.ghostTick = 15;
			this.ghostBall = fBall;
			this.ghostX = fBall.x - 14;
			this.ghostY = fBall.y - 22;
			return(true);
		}
		else return(false);
	}
	
	// Drawing.
	this.Draw = function(fX) {
		// Pad.
		if (this.ghostBlink) drawSprite(spr_golf_ghost_pad, this.ghostDir, 0, this.x - fX, this.y);
		this.ghostBlink = (!this.ghostBlink);
		
		// Club.
		if (this.ghostFrame > -1) {
			drawSprite(spr_golf_ghost_shadow, this.ghostFrame, 0, this.ghostX - fX, this.ghostY + 21);
			drawSprite(spr_golf_ghost_club, this.ghostFrame, 0, this.ghostX - fX, this.ghostY);
		}
		
		// Acting.
		if (!objControl.shotHit) {
			this.ghostTick = 0;
			this.ghostFrame = -1;
			this.ghostBall = undefined;
		}
		else if (this.ghostFrame < 5 && this.ghostBall != undefined) this.Act();
	}
}