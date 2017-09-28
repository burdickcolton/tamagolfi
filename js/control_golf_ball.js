// Ball.
function CourseBall(fX, fY, fPlayer) {
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
		this.ballDir = fDir;
		this.ballGrav = -fLoft;
		//this.ballDrop = this.ballDropDefault * (7.5 / fLoft);
		this.ballSpeed = fDis / ((fLoft / this.ballDrop) * 2);
		this.shotSpin = fSpin;
		this.ballBounced = false;
		this.ballBounces = 0;
		playSound(snd_golf_hit);
		//console.log("Ball speed: " + this.ballSpeed + ". Ball drop: " + this.ballDrop + ".");
	}
	
	// Putting.
	
	// Moving.
	this.Move = function() {
		tPreX = this.x;
		tPreY = this.y + this.z;
		
		// Airborne.
		if (!this.Grounded()) {
			// Gravity.
			this.z += this.ballGrav;
			this.ballGrav += this.ballDrop;
			
			// Bouncing.
			if (this.z >= 0 && this.ballGrav >= 0) {
				/*if (!this.ballBounced) {
					console.log("First impact: " + (calcDistance(objControl.shotX, objControl.shotY, this.x, this.y) / 6) + " ft.");
					console.log("Apex: " + high + " with loft-apex ratio " + (loft/high) + ".");
					this.ballBounced = true;
				}*/
				playSound(snd_golf_bounce);
				this.ballBounces++;
				this.z = 0;
				this.ballLie = 1;
				this.ballGrav *= -(1/2.5) * gameLieBonus[this.ballLie];
				if (this.ballBounces >= 3) this.ballGrav = 0;
				//else this.ballSpeed *= ((1/3) + ((1/4.5) * this.shotSpin)) * gameLieBonus[this.ballLie];
				else this.ballSpeed *= ((2/3) + (.25 * this.shotSpin)) * gameLieBonus[this.ballLie];
			}
		}
		
		// Rolling.
		else {
			this.ballLie = 1;
			this.ballSpeed *= .98 * gameLieBonus[this.ballLie];
			if (Math.abs(this.ballSpeed) < .05) this.ballSpeed = 0;
		}
		
		// Coordinates.
		this.x += xDir(this.ballSpeed, this.ballDir);
		this.y += yDir(this.ballSpeed, this.ballDir);
		
		// Bouncing off of course walls. (X)
		if ((this.x - 1 < 0 || this.x + 1 > (objControl.objHole.holeSpr.width / 2)) && xDir(this.ballSpeed, this.ballDir) != 0) {
			this.x = median(2, this.x, (objControl.objHole.holeSpr.width / 2) - 2);
			this.ballDir = calcDirection(0, 0, -xDir(this.ballSpeed, this.ballDir) * .5, yDir(this.ballSpeed, this.ballDir));
			this.shotSpin *= -1;
			playSound(snd_golf_cup);
		}
		
		// Bouncing off of course walls. (Y)
		if ((this.y - 1 < 79 || this.y + 1 > 207) && yDir(this.ballSpeed, this.ballDir) != 0) {
			this.y = median(80, this.y, 205);
			this.ballDir = calcDirection(0, 0, xDir(this.ballSpeed, this.ballDir), -yDir(this.ballSpeed, this.ballDir) * .5);
			playSound(snd_golf_cup);
		}
		
		// Trail.
		tColor = 1 + ((this.shotSpin != 0) * Math.sign(this.shotSpin));
		objControl.objTrail.push(new CourseTrail(this.x, this.y + this.z, tColor));
		if (calcDistance(this.x, this.y + this.z, tPreX, tPreY) >= 3)
			objControl.objTrail.push(new CourseTrail(mean(this.x, tPreX), mean(this.y + this.z, tPreY), tColor));
		
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
		if (true) {
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
			
			// Trajectory.
			/*for(i = this.shotTick / 2; i < tDis; i += this.shotTickMax / 2) {
				tYD = this.y + yDir(i, tDir) - 2;
				if (!valueBetween(80, tYD, 208)) break;
				drawSprite(spr_golf_trajec, 1, 0, this.x + xDir(i, tDir) - fX, tYD);
				drawSprite(spr_golf_trajec, 0, 0, this.x + xDir(i, tDir) - fX, tYD + yDir(fLoft, (i / tDis) * 180));
			}*/
			
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