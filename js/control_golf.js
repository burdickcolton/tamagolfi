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
	this.shotDis = 0;
	this.shotMax = 0;
	this.shotDir = 0;
	
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
	this.objTrail = [];
	
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
		// Hitting.
		if (!this.cameraAuto && !this.shotHit && this.objActor.animOn == 5) {
			this.objActor.Perform(6, undefined);
			this.objActor.animTick = 8;
			this.shotMax = GetMaxDistance(playerChar[this.shotPlayer], this.shotSpin, this.objBall[this.shotPlayer].ballLie);
			this.shotDis = GetFixDistance(this.cameraX, this.objBall[this.shotPlayer], this.shotMax);
			//this.objActor.clubType = (tDis < (this.shotDis * (2/3)));
			this.shotDir = GetFixDirection(this.cameraX, this.objBall[this.shotPlayer]);
			this.cameraX = median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x - 160);
			playSound(snd_menu_confirm);
			playSound(snd_voice_okay[playerChar[this.shotPlayer]]);
			playSound(snd_golf_backswing);
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		// Adjusting spin.
		if (fE == 38 && !this.cameraAuto && this.shotSpin < 1 && !this.shotHit && this.objActor.animOn == 5) {
			this.shotSpin = Math.round(10 * (this.shotSpin + .2)) / 10;
			playSound(snd_menu_select);
		}
		else if (fE == 40 && !this.cameraAuto && this.shotSpin > -1 && !this.shotHit && this.objActor.animOn == 5) {
			this.shotSpin = Math.round(10 * (this.shotSpin - .2)) / 10;
			playSound(snd_menu_select);
		}
		
		// Pause.
		else if (fE == 27) {
			TransGo(new ControlMenuPause());
			playSound(snd_menu_confirm);
		}
	}
	
	// Next turn.
	this.NextTurn = function() {
		// Determining who goes next.
		if (this.playerFirst && this.shotPlayer < getPlayers() - 1) this.shotPlayer++;
		else {
			this.playerFirst = false;
			this.shotPlayer = -1;
			for(i = 0; i < this.objBall.length; i++) {
				if (this.shotPlayer == -1) this.shotPlayer = i;
				else if (calcDistance(this.objBall[i].x, this.objBall[i].y, this.objCup.x, this.objCup.y) >
					calcDistance(this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y, this.objCup.x, this.objCup.y))
					this.shotPlayer = i;
			}
		}
		
		// Ending the hole.
		
		// Reset.
		this.shotHit = false;
		this.shotEnd = false;
		this.shotSpin = 0;
		
		// Objects.
		if (this.playerFirst) this.objBall.push(new CourseBall(32, 144, this.shotPlayer));
		this.objActor = new Actor(spr_player[playerChar[this.shotPlayer]], playerColor[this.shotPlayer],
			this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y - 9);
		this.objActor.Club(this.shotPlayer);
		this.objActor.Perform(5, undefined);
		this.shotX = this.objBall[this.shotPlayer].x;
		this.shotY = this.objBall[this.shotPlayer].y;
		
		// Visuals.
		if (!this.cameraAuto) {
			this.cameraX = median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x - 80);
		}
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
		else if (!this.shotHit) {
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
		for(i = 0; i < this.objTrail.length; i++) {
			this.objTrail[i].Draw(this.cameraX, this.objTrail);
		}
		if (this.shotPlayer > -1) this.objBall[this.shotPlayer].Draw(this.cameraX);
		
		// Shot stats.
		if (!this.cameraAuto && this.shotPlayer > -1) {
			// Trajectory.
			if (!this.shotHit && this.objActor.animOn == 5) {
				tMax = GetMaxDistance(playerChar[this.shotPlayer], this.shotSpin, this.objBall[this.shotPlayer].ballLie);
				tDis = GetFixDistance(this.cameraX, this.objBall[this.shotPlayer], tMax);
				this.objBall[this.shotPlayer].Trajectory(this.cameraX, tMax,
					GetLoft(playerChar[this.shotPlayer], this.shotSpin, this.objBall[this.shotPlayer].ballLie, tDis / tMax));
			}
			
			// Player.
			drawSprite(spr_menu_char, playerChar[this.shotPlayer], playerColor[this.shotPlayer], 2, 2);
			drawSprite(spr_hud_shadow_char, 0, 0, 2, 2);
			drawSprite(spr_menu_player, this.shotPlayer, 1, 2, 38);
			
			// Stroke number.
			DrawNumber(51, 2, this.playerScore[this.shotPlayer], 0);
			
			// Hole.
			
			// Wind.
			
			// Lie.
			if (this.objBall[this.shotPlayer].Grounded()) tI = this.objBall[this.shotPlayer].ballLie + 1;
			else tI = 0;
			drawSprite(spr_hud_lie, tI, 0, 265, 197);
			
			// Distance to cup.
			tYd = Math.ceil(calcDistance(this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y, this.objCup.x, this.objCup.y));
			DrawYards(307 - (Math.ceil(tYd / 6).toString().length * 7), 2, tYd, 0);
			
			// Spin.
			drawSprite(spr_hud_spin_type, Math.sign(Math.round(this.shotSpin * 10)) + 1, 0, 132, 2);
			drawSprite(spr_hud_spin_bar, 0, 0, 116, 16);
			drawSprite(spr_hud_spin_ticker, 0, 0, 156 + (this.shotSpin * 40), 16);
			
			// Stroke distance.
			if (!this.shotHit) {
				drawSprite(spr_hud_max_drive, 0, 0, 2, 225);
				DrawYards(32, 225, GetMaxDistance(playerChar[this.shotPlayer], this.shotSpin, this.objBall[this.shotPlayer].ballLie), 2);
			}
			else {
				DrawYards(2, 225, calcDistance(this.shotX, this.shotY, this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y), 1);
				if ((this.objBall[this.shotPlayer].y + this.objBall[this.shotPlayer].z) <= 28) {
					DrawYards(155 - ((Math.ceil(Math.abs(this.objBall[this.shotPlayer].z) / 6).toString().length * 7) / 2), 26, Math.abs(this.objBall[this.shotPlayer].z), 3); 
				}
			}
				
			// End.
		}
	}
}



//////////
// HOLE //
//////////
function CourseHole() {
	// Variables.
	this.holeSpr = spr_course_range;
	this.holePar = 3;
	
	// Drawing.
	this.Draw = function(fX) {
		drawSprite(this.holeSpr, 0, 0, -fX, 0);
	}
}



/////////
// CUP //
/////////
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