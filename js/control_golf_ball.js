// Ball.
function CourseBall(fX, fY, fPlayer, fCup) {
	// Variables.
	this.x = fX;
	this.y = fY;
	this.z = 0;
	this.ballColor = (getPlayers() > 1) * (fPlayer + 1);
	this.ballSpeed = 0;
	this.ballDir = 0;
	this.ballGrav = 0;
	this.ballDropDefault = .1;
	this.ballDrop = this.ballDropDefault;
	this.ballLie = 0;
	this.ballBounced = false;
	this.ballSpin = 0;
	this.ballBounces = 0;
	this.ballPlayer = fPlayer;
	this.ballTrackMaxDis = 0;
	this.ballWindMult = 1;
	this.ballSave = charStat[playerChar[fPlayer]][3];
	this.ballSkipped = false;
	this.ballTrail = true;
	this.ballCupBounce = 10;
	this.cupObj = fCup;
	
	// Stats applied to shot.
	this.shotSpin = 0;
	this.shotTick = 0;
	this.shotTickMax = 20;
	this.shotTickSpeed = .1;
	
	// Checking if the ball is grounded.
	this.Grounded = function() {
		return(this.ballGrav == 0 && this.z == 0);
	}
	
	// Checking if the ball is stopped.
	this.Stopped = function() {
		return(this.Grounded() && this.ballSpeed == 0);
	}
	
	// Stroke.
	this.Stroke = function(fDis, fDir, fLoft, fSpin) {
		this.ballTrackMaxDis = fDis;
		this.ballDir = fDir;
		this.ballGrav = -fLoft;
		this.ballSpeed = fDis / (((fLoft / this.ballDrop) + ((fLoft * this.ballDrop) / 2)) * 2);
		this.shotSpin = fSpin;
		this.ballBounced = false;
		this.ballBounces = 0;
		this.ballSkipped = false;
		this.ballTrail = true;
		playSound(snd_golf_hit);
		if (gameDebug) {
			console.clear();
			console.log("STROKE\n   Dis: " + shortDecimal(this.ballTrackMaxDis / 6, 4) + " ft.\n   Spd: " + shortDecimal(this.ballSpeed / 6, 4) + " ft/f\n   Dir: " + shortDecimal(this.ballDir, 2));
		}
	}
	
	// Getting lie.
	this.Lie = function() {
		return(objControl.objHole.holeArray[Math.floor(this.x / 32)][Math.floor((this.y - 80) / 32)] + 1);
	}
	
	// Getting lie multiplier.
	this.LieEffect = function() {
		tR = gameLieBonus[this.ballLie];
		if (tR < 1) tR = getBetween(tR, 1, this.ballSave / 50);
		return(tR);
	}
	
	// Bouncing (from obstacles).
	this.Bounce = function(fSpd, fDir, fGrav) {
		this.ballDir = fDir;
		this.ballGrav = fGrav;
		this.ballSpeed = fSpd;
		this.ballBounced = false;
		this.ballBounces = 0;
		this.ballSkipped = false;
	}
	
	// Setting position.
	this.Set = function(fX, fY, fZ) {
		this.x = fX;
		this.y = fY;
		this.z = fZ;
	}
	
	// Moving.
	this.Move = function() {
		tPreX = this.x;
		tPreY = this.y + this.z;
		
		// Obstacles.
		if (ObsCollision(this)) {
			// Nothing haha. This was just put in after everything else so it's a lazy way of making sure the other movements don't happen.
		}
		
		// Airborne.
		else if (!this.Grounded()) {
			// Wind.
			tWindDir = objControl.objHole.windDir;
			tWindSpeed = objControl.objHole.windSpeed / 7500;
			if (xDir(tWindSpeed, tWindDir) > 0) tX = xDir(tWindSpeed, tWindDir) * (charStat[playerChar[this.ballPlayer]][1] / 50);
			else tX = xDir(tWindSpeed, tWindDir) * ((50 - charStat[playerChar[this.ballPlayer]][1]) / 50);
			tY = yDir(tWindSpeed, tWindDir) * ((50 - charStat[playerChar[this.ballPlayer]][1]) / 50);
			this.ballSpeed = calcDistance(0, 0, xDir(this.ballSpeed, this.ballDir) + tX, yDir(this.ballSpeed, this.ballDir) + tY);
			this.ballDir = calcDirection(0, 0, xDir(this.ballSpeed, this.ballDir) + tX, yDir(this.ballSpeed, this.ballDir) + tY);
			
			// Gravity.
			this.z += this.ballGrav;
			this.ballGrav += this.ballDrop;
			
			// Bouncing.
			if (this.z >= 0 && this.ballGrav >= 0) {
				// First impact.
				if (!this.ballBounced) {
					if (gameDebug) console.log("IMPACT\n   Dis: " + shortDecimal(calcDistance(objControl.shotX, objControl.shotY, this.x, this.y) / 6, 4) + " ft.\n   Dev: " + shortDecimal((calcDistance(objControl.shotX, objControl.shotY, this.x, this.y) - this.ballTrackMaxDis) / 6, 4) + " ft.\n   Spd: " + shortDecimal(this.ballSpeed / 6, 4) + " ft/f\n   Dir: " + shortDecimal(this.ballDir, 2));
					this.ballBounced = true;
				}
				
				// Physics.
				this.ballLie = this.Lie();
				this.ballBounces++;
				this.z = 0;
				if (this.ballLie == 5) {
					this.ballGrav = 0;
					if (!this.ballSkipped) playSound(snd_golf_backswing);
				}
				else this.ballGrav *= -((1/2.5) + (.2 * (charStat[playerChar[this.ballPlayer]][1] / 50))) * this.LieEffect();
				if (this.ballBounces >= 3) this.ballGrav = 0;
				else this.ballSpeed *= ((2/3) + (.25 * this.shotSpin)) * this.LieEffect();
				
				// Sound.
				if (!this.ballSkipped) {
					if (this.ballLie == 2 || this.ballLie == 3) playSound(snd_golf_bounce_rough);
					else playSound(snd_golf_bounce);
				}
			}
		}
		
		// Grounded.
		else {
			// Cup interaction.
			if (valueBetween(this.cupObj.x - 5, this.x, this.cupObj.x + 5) && valueBetween(this.cupObj.y - 3, this.y, this.cupObj.y + 3)) {
				// Thing.
				if (!this.ballSkipped) {
					this.ballSkipped = true;
					this.ballBounces = 0;
				}
				
				// Skipping.
				if (this.ballSpeed > .75) {
					this.ballGrav = -Math.sqrt(this.ballSpeed) * 1.5;
					this.ballSpeed *= .5;
					playSound(snd_golf_cup);
				}
				
				// Bouncing.
				else if (this.ballSpeed > .05 || calcDistance(this.x, this.y, this.cupObj.x, this.cupObj.y + 2) > .05 || this.ballBounces < this.ballCupBounce) {
					this.ballTrail = false;
					this.ballGrav = -((((this.ballCupBounce + 1) - this.ballBounces) / this.ballCupBounce) * .75);
					this.ballDir = calcDirection(this.x, this.y, this.cupObj.x, this.cupObj.y + 2);
					this.ballSpeed = calcDistance(this.x, this.y, this.cupObj.x, this.cupObj.y + 2) / ((Math.abs(this.ballGrav) * 2) / this.ballDrop);
					playSound(snd_golf_cup);
					this.ballBounces++;
				}
				
				// Sinking.
				else {
					objControl.objBall[this.ballPlayer] = undefined;
					fCup.cupFrame = this.ballColor + 1;
					playSound(snd_golf_sink);
				}
			}
			
			// Rolling.
			else {
				this.ballLie = this.Lie();
				this.ballSpeed *= .98 * this.LieEffect();
				if (Math.abs(this.ballSpeed) < .05) this.ballSpeed = 0;
			}
		}
		
		// Coordinates.
		this.x += xDir(this.ballSpeed, this.ballDir);
		this.y += yDir(this.ballSpeed, this.ballDir);
		
		// Bouncing off of course walls. (X)
		if ((this.x - 1 < 0 || this.x + 1 > (objControl.objHole.holeSpr.width / 2)) && xDir(this.ballSpeed, this.ballDir) != 0) {
			tSp = this.ballSpeed;
			this.x = median(2, this.x, (objControl.objHole.holeSpr.width / 2) - 2);
			this.ballSpeed = calcDistance(0, 0, -xDir(tSp, this.ballDir) * .5, yDir(tSp, this.ballDir));
			this.ballDir = calcDirection(0, 0, -xDir(tSp, this.ballDir) * .5, yDir(tSp, this.ballDir));
			this.shotSpin *= -1;
			playSound(snd_golf_cup);
		}
		
		// Bouncing off of course walls. (Y)
		if ((this.y - 1 < 79 || this.y + 1 > 207) && yDir(this.ballSpeed, this.ballDir) != 0) {
			tSp = this.ballSpeed;
			this.y = median(80, this.y, 205);
			this.ballSpeed = calcDistance(0, 0, xDir(tSp, this.ballDir), -yDir(tSp, this.ballDir) * .5);
			this.ballDir = calcDirection(0, 0, xDir(tSp, this.ballDir), -yDir(tSp, this.ballDir) * .5);
			playSound(snd_golf_cup);
		}
		
		// Trail.
		if (this.ballTrail) {
			tColor = 1 + ((this.shotSpin != 0) * Math.sign(this.shotSpin));
			objControl.objTrail.push(new CourseTrail(this.x, this.y + this.z, tColor));
			if (calcDistance(this.x, this.y + this.z, tPreX, tPreY) >= 3)
				objControl.objTrail.push(new CourseTrail(mean(this.x, tPreX), mean(this.y + this.z, tPreY), tColor));
		}
		
		// End.
	}
	
	// Drawing.
	this.Draw = function(fX) {
		// Moving.
		if (!this.Stopped() && objTransition == undefined) this.Move();
		
		// Shadow.
		drawSprite(spr_golf_ball_shadow, (this.z < -64), 0, this.x - 2 - fX, this.y - 1);
		
		// Ball.
		drawSprite(spr_golf_ball, this.ballColor, 0, this.x - 2 - fX, this.y + this.z - 3);
	}
	
	// Drawing trajectory.
	this.Trajectory = function(fX, fMax, fLoft) {
		// Ticking.
		if (this.shotTick < this.shotTickMax) this.shotTick++;
		else this.shotTick = 0;
		
		// Only certain directions.
		tDis = GetFixDistance(fX, this, fMax);
		tDir = GetFixDirection(fX, this);
		tSpeed = tDis / ((fLoft / this.ballDrop) * 2);
		if (valueBetween(80, mouseY, 208)) {
			// Coordinates.
			tX = this.x;
			tY = this.y;
			tZ = 0;
			tGrav = -fLoft;
			tTick = this.shotTick;
			
			// Trajectory.
			while(tZ < 0 || tGrav < 0) {
				tZ += tGrav * this.shotTickSpeed;
				tGrav += this.ballDrop * this.shotTickSpeed;
				tX += xDir(tSpeed, tDir) * this.shotTickSpeed;
				tY += yDir(tSpeed, tDir) * this.shotTickSpeed;
				if ((tZ >= 0 && tGrav >= 0) || !valueBetween(80, tY, 208)) break;
				else if (tTick > 0) tTick--;
				else {
					tTick = this.shotTickMax;
					drawSprite(spr_golf_trajec, 1, 0, tX - fX - 1, tY - 2);
					drawSprite(spr_golf_trajec, 0, 0, tX - fX - 1, tY + tZ - 2);
				}
			}
			
			// Cursor.
			drawSprite(spr_golf_cursor, 0, 0, this.x - 7 - fX + xDir(tDis, tDir), median(80, this.y + yDir(tDis, tDir), 208) - 12);
			
			// Distance.
			tYd = Math.ceil(tDis);
			DrawYards(this.x - fX + xDir(tDis, tDir) - Math.round(((Math.ceil(tYd / 6).toString().length * 7) + 10) / 2), median(80, this.y + yDir(tDis, tDir), 208) - 26, tYd, 0);
		}
		
		// Returning trajectory.
		return(tDis);
	}
}



///////////
// TRAIL //
///////////
function CourseTrail(fX, fY, fColor) {
	// Variables.
	this.x = fX;
	this.y = fY;
	this.animTick = 16;
	this.animFrame = 0;
	this.animColor = fColor;
	
	// Drawing.
	this.Draw = function(fX, fArr) {
		// Drawing.
		drawSprite(spr_golf_trail, this.animFrame, this.animColor, this.x - 2 - fX, this.y - 3);
		
		// Animation.
		if (objTransition == undefined) {
			if (this.animTick > 0) this.animTick--;
			else {
				this.animTick = 15;
				if (this.animFrame < 3) this.animFrame++;
				else fArr.splice(fArr.indexOf(this), 1);
			}
		}
	}
}