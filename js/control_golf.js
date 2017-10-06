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
	this.cameraX = (!gameDebug) * ((this.objHole.holeSpr.width / 2) - 320);
	this.cameraAuto = true;
	this.cameraSpeed = -1;
	this.cameraButton = 0;
	this.cameraGoal = this.cameraX;
	
	// Music.
	this.conMusic = msc_course_default;
	
	///////////////
	// FUNCTIONS //
	///////////////
	
	// Clicky.
	this.Click = function() {
		if (!this.cameraAuto && !this.shotHit && this.objActor.animOn == 5) {
			// Hitting.
			if (this.cameraButton == 0 && valueBetween(80, mouseY, 208)) {
				this.shotMax = GetMaxDistance(playerChar[this.shotPlayer], this.shotSpin, this.objBall[this.shotPlayer].ballLie);
				this.shotDis = GetFixDistance(this.cameraX, this.objBall[this.shotPlayer], this.shotMax);
				//this.objActor.clubType = (tDis < (this.shotDis * (2/3)));
				this.shotDir = GetFixDirection(this.cameraX, this.objBall[this.shotPlayer]);
				this.cameraX = median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x - 160);
				this.cameraGoal = this.cameraX;
				this.cameraButton = -1;
				this.objActor.Perform(6, undefined);
				this.objActor.animTick = 8;
				this.objActor.animSwingHold = (this.shotDis / this.shotMax);
				playSound(snd_menu_confirm);
				playSound(snd_voice_okay[playerChar[this.shotPlayer]]);
				playSound(snd_golf_backswing);
			}
			
			// Camera buttons.
			else if (MousePoint(210, 2, 226, 26)) this.Camera(Math.max(this.cameraX - 160, 0), 1);
			else if (MousePoint(227, 2, 251, 26)) this.Camera(median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x - 80), 2);
			else if (MousePoint(252, 2, 276, 26)) this.Camera(median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x + GetMaxDistance(playerChar[this.shotPlayer], this.shotSpin, this.objBall[this.shotPlayer].ballLie) - 160), 3);
			else if (MousePoint(277, 2, 301, 26)) this.Camera(median(0, (this.objHole.holeSpr.width / 2) - 320, this.objCup.x - 160), 4);
			else if (MousePoint(302, 2, 318, 26)) this.Camera(Math.min(this.cameraX + 160, (this.objHole.holeSpr.width / 2) - 320), 5);
			
			// Spin slider.
			else if (MousePoint(105, 16, 196, 25)) {
				if (mouseX >= 154) this.shotSpin = Math.min(Math.ceil(((mouseX - 154) / 40) * 5) / 5, 1);
				else if (mouseX < 146) this.shotSpin = Math.max(Math.floor(((mouseX - 146) / 40) * 5) / 5, -1);
				else this.shotSpin = 0;
				playSound(snd_menu_select);
			}
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		// Pause.
		if (fE == 27) {
			TransGo(new ControlMenuPause());
			playSound(snd_menu_confirm);
		}
		
		// Adjusting spin.
		/*else if (fE == 38 && !this.cameraAuto && this.shotSpin < 1 && !this.shotHit && this.objActor.animOn == 5) {
			this.shotSpin = Math.round(10 * (this.shotSpin + .2)) / 10;
			playSound(snd_menu_select);
		}
		else if (fE == 40 && !this.cameraAuto && this.shotSpin > -1 && !this.shotHit && this.objActor.animOn == 5) {
			this.shotSpin = Math.round(10 * (this.shotSpin - .2)) / 10;
			playSound(snd_menu_select);
		}*/
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
		this.cameraButton = 0;
		
		// Objects.
		if (this.playerFirst) this.objBall.push(new CourseBall(32, 144, this.shotPlayer));
		this.objActor = new Actor(spr_player[playerChar[this.shotPlayer]], playerColor[this.shotPlayer],
			this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y - 9);
		this.objActor.Club(playerChar[this.shotPlayer]);
		this.objActor.Perform(5, undefined);
		this.shotX = this.objBall[this.shotPlayer].x;
		this.shotY = this.objBall[this.shotPlayer].y;
		
		// Visuals.
		if (!this.cameraAuto) {
			this.cameraX = median(0, (this.objHole.holeSpr.width / 2) - 320, this.objBall[this.shotPlayer].x - 80);
		}
	}
	
	// Moving camera.
	this.Camera = function(fX, fBut) {
		if (this.cameraX == fX) playSound(snd_gen_wrong);
		else if (this.cameraGoal == fX) {
			this.cameraGoal = this.cameraX;
			this.cameraButton = 0;
			playSound(snd_menu_select);
		}
		else {
			this.cameraGoal = fX;
			this.cameraButton = fBut;
			playSound(snd_gen_camera);
			playSound(snd_menu_select);
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
			drawSprite(spr_hud_wind_title, 0, 0, 131, 225);
			if (this.objHole.windSpeed == 0) drawSprite(spr_hud_wind_title, 1, 0, 161, 225);
			else drawSprite(spr_hud_wind_direction, Math.round(this.objHole.windDir / 45), this.objHole.windSpeed - 1, 167, 219);
			
			// Lie.
			if (this.objBall[this.shotPlayer].Grounded()) tI = this.objBall[this.shotPlayer].ballLie + 1;
			else tI = 0;
			drawSprite(spr_hud_lie, tI, 0, 265, 197);
			
			// Distance to cup.
			tYd = Math.ceil(calcDistance(this.objBall[this.shotPlayer].x, this.objBall[this.shotPlayer].y, this.objCup.x, this.objCup.y));
			DrawYards(51, 17, tYd, 0);
			
			// Spin.
			drawSprite(spr_hud_spin_type, Math.sign(Math.round(this.shotSpin * 10)) + 1, 0, 122, 2);
			drawSprite(spr_hud_spin_bar, 0, 0, 104, 16);
			drawSprite(spr_hud_spin_ticker, 0, 0, 146 + (this.shotSpin * 40), 15);
			
			// Camera controls.
			drawSprite(spr_hud_camera_title, 0, 0, 242, 29);
			drawSprite(spr_hud_camera, 0, this.cameraButton + 1, 210, 2);
			
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
	this.holeArray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4]];
	this.holeSpr = spr_course_range;
	this.holePar = 3;
	this.windSpeed = randomMax(10);
	this.windDir = Math.round(randomMax(7) * 45);
	
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
		drawSprite(spr_golf_hole, this.cupFrame, 0, this.x - 4 - fX, this.y - 3);
	}
}