// Primary control.
function ControlGolf() {
	// Current shot statistics/settings.
	this.shotX = 0;
	this.shotY = 0;
	this.shotPlayer = -1;
	this.shotWait = 0;
	this.shotHit = false;
	this.shotEnd = true;
	this.shotSpin = 0;
	
	// Wind.
	this.windSpeed = 0;
	this.windDir = 0;
	
	// Scores.
	this.playerScore = [0, 0, 0, 0];
	this.playerFirst = true;
	
	// Objects.
	this.objHole = new CourseHole();
	this.objBall = [];
	this.objCup = new CourseCup((this.objHole.holeSpr.width / 2) - 64, 112 + randomMax(64));
	this.objActor = undefined;
	
	// Other variables.
	this.cameraX = (this.objHole.holeSpr.width / 2) - 320;
	this.cameraAuto = true;
	this.cameraSpeed = -2;
	
	// Music.
	this.conMusic = msc_course_default;
	
	///////////////
	// FUNCTIONS //
	///////////////
	
	// Clicky.
	this.Click = function() {
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
	}
	
	// Next turn.
	this.NextTurn = function() {
		// Determining who goes next.
		if (this.playerFirst && this.shotPlayer < getPlayers() - 1) this.shotPlayer++;
		else {
			this.playerFirst = false;
			if (this.shotPlayer < getPlayers() - 1) this.shotPlayer++; // Replace this with real rules later.
			else this.shotPlayer = 0; // Replace this with real rules later.
		}
		
		// Ending the hole.
		
		// Reset.
		this.shotX = 0;
		this.shotY = 0;
		this.shotHit = false;
		this.shotEnd = false;
		this.shotSpin = 0;
		
		// Objects.
		if (this.playerFirst) this.objBall.push(new CourseBall(32, 144, this.shotPlayer));
		if (!this.cameraAuto) this.cameraX = median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x - 160);
		this.objActor = new Actor(spr_player[playerChar[this.shotPlayer]], playerColor[this.shotPlayer],
			this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y - 9);
		this.objActor.Club(this.shotPlayer);
		this.objActor.Perform(5, undefined);
	}
	
	// Execution.
	this.Run = function() {
		// Turn handling.
		if (this.shotEnd) {
			if (this.shotWait > 0) this.shotWait--;
			else this.NextTurn();
		}
		
		// Moving camera.
		if (this.cameraAuto) {
			if (this.cameraX > 0) {
				if (this.cameraSpeed < 8) this.cameraSpeed += .05;
				this.cameraX -= Math.max(this.cameraSpeed, 0);
				if (this.cameraX < 0) this.cameraX = 0;
			}
			else this.cameraAuto = false;
		}
		else {
			if (keyState[37] && this.cameraX > 0) this.cameraX -= 8;
			if (keyState[39] && this.cameraX < this.objHole.holeSpr.sprWidth - 320) this.cameraX += 8;
		}
		
		// End.
	}
	
	// Drawing.
	this.Draw = function() {
		// Running.
		if (objTransition == undefined) ControlGolfRun(this);
		
		// Hole.
		this.objHole.Draw(this.cameraX);
		
		// Cup.
		this.objCup.Draw(this.cameraX);
		
		// Inactive golf balls.
		for(i = 0; i < this.objBall.length; i++) {
			if (this.shotPlayer != i) this.objBall[i].Draw(this.cameraX);
		}
		
		// Actor.
		if (this.objActor != undefined) this.objActor.Draw(-this.cameraX);
		
		// Active ball.
		if (this.shotPlayer > -1) this.objBall[this.shotPlayer].Draw(this.cameraX);
		
		// Shot stats.
		if (!this.cameraAuto && this.shotPlayer > -1) {
			// Trajectory.
			this.objBall[this.shotPlayer].Trajectory(this.cameraX,
				((160 + (charStat[playerChar[this.shotPlayer]][0] * 2)) * (1 + (.125 * this.playerFirst))) * 6,
				2.5 + (charStat[playerChar[this.shotPlayer]][1] * .1));
			
			// Player.
			drawSprite(spr_menu_char, playerChar[this.shotPlayer], playerColor[this.shotPlayer], 2, 2);
			drawSprite(spr_hud_shadow_char, 0, 0, 2, 2);
			drawSprite(spr_menu_player, this.shotPlayer, 1, 2, 38);
			
			// Stroke number.
			
			// Hole.
			
			// Wind.
			
			// Lie.
			
			// Distance to cup.
			tYd = Math.ceil(calcDistance(this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y, this.objCup.x, this.objCup.y) / 6);
			DrawYards(307 - (tYd.toString().length * 7), 2, tYd, 0);
			
			// Spin.
			drawSprite(spr_hud_spin_type, Math.sign(this.shotSpin) + 1, 0, 132, 2);
			drawSprite(spr_hud_spin_bar, 0, 0, 116, 16);
			drawSprite(spr_hud_spin_ticker, 0, 0, 156 + (this.shotSpin * 8), 16);
			
			// Stroke distance.
		}
	}
}

// Hole.
function CourseHole() {
	// Variables.
	this.holeSpr = spr_course_range;
	
	// Drawing.
	this.Draw = function(fX) {
		drawSprite(this.holeSpr, 0, 0, -fX, 0);
	}
}

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
	this.ballDrop = .05;
	this.ballLie = 0;
	
	// Stats applied to shot.
	this.shotSpin = 0;
	this.shotBounce = 0;
	this.shotRoll = 0;
	this.shotTick = 0;
	this.shotTickMax = 16;
	
	// Checking if the ball is grounded.
	this.Grounded = function() {
		return(this.ballGrav == 0 && this.z == 0);
	}
	
	// Checking if the ball is stopped.
	this.Stopped = function() {
		return(this.Grounded() && this.ballSpeed == 0);
	}
	
	// Stroke.
	this.Stroke = function(fDis, fDir, fLoft, fSpin, fBounce, fRoll) {
	}
	
	// Putting.
	
	// Moving.
	this.Move = function() {
	}
	
	// Drawing.
	this.Draw = function(fX) {
		// Moving.
		if (!this.Stopped()) this.Move();
		
		// Shadow.
		drawSprite(spr_golf_ball_shadow, (this.z < -24), 0, this.x - 2 - fX, this.y - 1);
		
		// Ball.
		drawSprite(spr_golf_ball, this.ballColor, 0, this.x - 2 - fX, this.y + this.z - 3);
	}
	
	// Drawing trajectory.
	this.Trajectory = function(fX, fMax, fLoft) {
		// Ticking.
		//if (this.shotTick < this.shotTickMax + .5) this.shotTick += .5;
		if (this.shotTick < this.shotTickMax) this.shotTick++;
		else this.shotTick = 0;
		
		// Only certain directions.
		tDis = median(24, calcDistance(this.x - fX, this.y, mouseX, mouseY), fMax);
		tDir = calcDirection(Math.min(this.x - fX, mouseX), this.y, Math.max(this.x - fX, mouseX), mouseY);
		if (tDir > 45 && tDir < 135) tDir = 45;
		else if (tDir < 315 && tDir > 225) tDir = 315;
		if (valueBetween(80, mouseY, 208)) {
			// Coordinates.
			tX = xDir(tDis, tDir);
			tY = yDir(tDis, tDir);
			
			// Trajectory.
			for(i = this.shotTick / 2; i < tDis; i += this.shotTickMax / 2) {
				drawSprite(spr_golf_trajec, 1, 0, this.x + xDir(i, tDir) - fX, this.y + yDir(i, tDir) - 2);
				drawSprite(spr_golf_trajec, 0, 0, this.x + xDir(i, tDir) - fX, this.y + yDir(i, tDir) - 2 + yDir((fLoft * 2) / this.ballDrop, (i / tDis) * 180));
			}
			
			// Cursor.
			drawSprite(spr_golf_cursor, 0, 0, this.x - 7 - fX + tX, this.y - 12 + tY);
			
			// Distance.
			tYd = Math.ceil(tDis / 6);
			DrawYards(this.x - fX + tX - Math.round(((tYd.toString().length * 7) + 10) / 2), this.y - 26 + tY, tYd, 0);
		}
		
		// Returning trajectory.
		return(tDis);
	}
}

// Cup.
function CourseCup(fX, fY) {
	// Variables.
	this.x = fX;
	this.y = fY;
	this.cupFrame = 0;
	
	// Drawing.
	this.Draw = function(fX) {
		drawSprite(spr_golf_hole, this.cupFrame, 0, this.x - 3 - fX, this.y - 3);
	}
}

// Yard drawing function.
function DrawYards(fX, fY, fYd, fCol) {
	tStr = fYd.toString();
	for(fi = 0; fi < tStr.length; fi++) {
		drawSprite(spr_hud_number, Number(tStr[fi]), fCol, fX + (7 * fi), fY);
	}
	drawSprite(spr_hud_yards, fCol, 0, fX + (7 * tStr.length), fY + 5);
}