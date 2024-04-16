/////////////////
// SOLO PLAYER //
/////////////////
function ControlResultSolo() {
	// Variables.
	tL = courseObj[gameCourse].courseData.length;
	this.backSpr = courseObj[gameCourse].courseSpr[tL - 1];
	this.playerMedal = (playerScore[0] > courseObj[gameCourse].courseRec) + (playerScore[0] > -.75 * tL) + (playerScore[0] > 0);
	this.resultStart = false;
	this.rankY = -32;
	this.rankGrav = 0;
	
	// Actors.
	this.actPlayer = new Actor(spr_player[playerChar[0]], playerColor[0], 160, 160);
	this.actCrowd = [];
	
	// Direction array.
	this.tileArr = [];
	for(j = 0; j < 3; j++) {
		for(i = 0; i < 7 + (!getEven(j)); i++) {
			if (j < 2 || (i != 3 && i != 4)) this.tileArr.push([32 + (i * 32) + (16 * (!getEven(j))), 96 + (j * 24)]);
		}
	}
	
	// Populating crowd.
	this.crowdArr = [];
	for(i = 0; i < charStat.length; i++) {
		if (playerChar[0] != i) this.crowdArr.push(i);
	}
	tW = Math.min(23, this.crowdArr.length, Math.ceil((-playerScore[0] / tL) * 5));
	for(i = 0; i < tW; i++) {
		tA = randomMax(this.crowdArr.length - 1);
		tT = randomMax(this.tileArr.length - 1);
		tDis = randomMax(104);
		this.actCrowd.push(new Actor(spr_player[this.crowdArr[tA]], 0, this.tileArr[tT][0] + 16 + randomRange(-4, 4), this.tileArr[tT][1] - randomMax(6)));
		if (this.playerMedal == 0 && randomMax(2) == 0) this.actCrowd[this.actCrowd.length - 1].Perform(2, undefined);
		else this.actCrowd[this.actCrowd.length - 1].Perform(1, undefined);
		this.actCrowd[this.actCrowd.length - 1].animTick = randomMax(30);
		this.actCrowd[this.actCrowd.length - 1].actorMute = true;
		this.crowdArr.splice(tA, 1);
		this.tileArr.splice(tT, 1);
	}
	depthSort(this.actCrowd);
	
	// Music.
	this.conMusic = msc_silence;
	
	// Adjusting to score.
	if (this.playerMedal < 2) {
		this.conMusic = msc_result_good;
		this.actPlayer.Perform(2, undefined);
	}
	else if (this.playerMedal == 2) {
		this.conMusic = msc_result_okay;
		this.actPlayer.Perform(1, undefined);
	}
	else {
		this.conMusic = msc_result_bad;
		this.actPlayer.Perform(3, undefined);
	}
	
	// Clicky.
	this.Click = function() {
		if (MousePoint(0, 8, 171, 34)) {
			playSound(snd_menu_confirm);
			TransGo(new ControlMenuMain());
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		// Nothing.
	}
	
	// Start things.
	this.Start = function() {
		this.resultStart = true;
		if (this.playerMedal < 2) {
			if (this.playerMedal == 0) {playSound(snd_gen_great); playSound(snd_voice_great[playerChar[0]]);}
			else {playSound(snd_gen_good); playSound(snd_voice_good[playerChar[0]]);}
		}
		else if (this.playerMedal == 2) {
			playSound(snd_gen_okay);
			playSound(snd_voice_okay[playerChar[0]]);
		}
		else {
			playSound(snd_gen_bad);
			playSound(snd_voice_bad[playerChar[0]]);
		}
	}
	
	// Score bouncing.
	this.Bounce = function() {
		this.rankY += this.rankGrav;
		if (this.rankY < 208) this.rankGrav += .25;
		else if (this.rankY >= 208 && this.rankGrav > 0) {
			if (this.rankGrav >= 1) this.rankGrav *= -.5;
			else this.rankGrav = 0;
			this.rankY = 208;
			playSound(snd_gen_bounce);
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Starting.
		if (!this.resultStart && !exists(objTransition)) this.Start();
		
		// Bouncing.
		if (!exists(objTransition)) this.Bounce();
		
		// Background.
		drawSprite(this.backSpr, 0, 0, 160 - Math.ceil(this.backSpr.width / 4), 0);
		
		// Crowd.
		for(i = 0; i < this.actCrowd.length; i++) {
			this.actCrowd[i].Draw(0);
		}
		
		// Player.
		this.actPlayer.Draw(0);
		drawSprite(spr_golf_medal, this.playerMedal, 0, this.actPlayer.x + 6, this.actPlayer.y - 13 + this.actPlayer.animY);
		
		// Score.
		tS = playerScore[0];
		tXN = 160 - Math.floor((getNumWidth(Math.abs(tS)) + (7 * (tS != 0)) ) / 2);
		drawSprite(spr_menu_scorecard, 0, 1, 137, this.actPlayer.y + 16);
		if (tS != 0) drawSprite(spr_hud_sign, (tS < 0), 0, tXN, this.actPlayer.y + 21);
		DrawNumber(tXN + (7 * (tS != 0)), this.actPlayer.y + 21, Math.abs(tS), ((tS < 1) * 2) + (tS < 0));
		
		// Rank.
		drawSprite(spr_menu_result_rank, 0, this.playerMedal, 73, this.rankY);
		
		// Button.
		drawSprite(spr_menu_button_result, 0, 0, 0, 8);
	}
}



/////////////////
// MULTIPLAYER //
/////////////////
function ControlResultMulti() {
	// Variables.
	this.backSpr = courseObj[gameCourse].courseSpr[courseObj[gameCourse].courseData.length - 1];
	this.resultStart = false;
	this.rankY = -32;
	this.rankGrav = 0;
	
	// Determining winner.
	this.playerWin = [];
	for(i = 0; i < getPlayers(); i++) {
		if (this.playerWin.length == 0) this.playerWin.push(i);
		else if (playerScore[this.playerWin[0]] == playerScore[i]) this.playerWin.push(i);
		else if (playerScore[this.playerWin[0]] > playerScore[i]) this.playerWin = [i];
	}
	
	// Creating actors.
	this.actorWin = [];
	this.actorLose = [];
	for(i = 0; i < getPlayers(); i++) {
		// Winner.
		if (this.playerWin.indexOf(i) > -1) {
			this.actorWin.push(new Actor(spr_player[playerChar[i]], playerColor[i], 160 - ((getPlayers() - 1) * 40) + (i * 80), 160));
			this.actorWin[this.actorWin.length - 1].Perform(2 - (this.playerWin.length > 1), undefined);
			this.actorWin[this.actorWin.length - 1].animTick = randomMax(30);
		}
		
		// Loser.
		else {
			this.actorLose.push(new Actor(spr_player[playerChar[i]], playerColor[i], 160 - ((getPlayers() - 1) * 40) + (i * 80), 112));
			this.actorLose[this.actorLose.length - 1].Perform(3, undefined);
			this.actorLose[this.actorLose.length - 1].animTick = randomMax(30);
			this.actorLose[this.actorLose.length - 1].actorMute = true;
		}
	}
	
	// Music.
	if (this.playerWin.length == 1) this.conMusic = msc_result_good;
	else this.conMusic = msc_result_okay;
	
	// Clicky.
	this.Click = function() {
		if (MousePoint(0, 8, 171, 34)) {
			playSound(snd_menu_confirm);
			TransGo(new ControlMenuMain());
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		// Nothing.
	}
	
	// Start things.
	this.Start = function() {
		this.resultStart = true;
		if (this.playerWin.length == 1) playSound(snd_gen_great);
		else playSound(snd_gen_good);
		for(i = 0; i < this.playerWin.length; i++) {
			if (this.playerWin.length == 1) playSound(snd_voice_great[playerChar[this.playerWin[i]]]);
			else playSound(snd_voice_good[playerChar[this.playerWin[i]]]);
		}
	}
	
	// Score bouncing.
	this.Bounce = function() {
		this.rankY += this.rankGrav;
		if (this.rankY < 208) this.rankGrav += .25;
		else if (this.rankY >= 208 && this.rankGrav > 0) {
			if (this.rankGrav >= 1) this.rankGrav *= -.5;
			else this.rankGrav = 0;
			this.rankY = 208;
			playSound(snd_gen_bounce);
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Starting.
		if (!this.resultStart && !exists(objTransition)) this.Start();
		
		// Bouncing.
		if (!exists(objTransition)) this.Bounce();
		
		// Background.
		drawSprite(this.backSpr, 0, 0, 160 - Math.ceil(this.backSpr.width / 4), 0);
		
		// Loser(s).
		for(i = 0; i < this.actorLose.length; i++) {
			this.actorLose[i].Draw(0);
		}
		
		// Winner(s).
		for(i = 0; i < this.actorWin.length; i++) {
			this.actorWin[i].Draw(0);
			drawSprite(spr_golf_medal, 1 + (this.actorWin.length > 1), 0, this.actorWin[i].x + 6, this.actorWin[i].y - 13 + this.actorWin[i].animY);
		}
		
		// Scores.
		tX = 160 - ((getPlayers() - 1) * 40) - 23;
		for(i = 0; i < getPlayers(); i++) {
			tS = playerScore[i];
			tXN = tX + (i * 80) + 23 - Math.floor((getNumWidth(Math.abs(tS)) + (7 * (tS != 0)) ) / 2);
			drawSprite(spr_menu_scorecard, i, 1, tX + (i * 80), 176);
			if (tS != 0) drawSprite(spr_hud_sign, (tS < 0), 0, tXN, 181);
			DrawNumber(tXN + (7 * (tS != 0)), 181, Math.abs(tS), ((tS < 1) * 2) + (tS < 0));
		}
		
		// Rank.
		drawSprite(spr_menu_result_multi, 0, 0, 99, this.rankY);
		
		// Button.
		drawSprite(spr_menu_button_result, 0, 0, 0, 8);
	}
}