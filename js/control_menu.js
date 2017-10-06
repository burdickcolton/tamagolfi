// Template controller.
function ControlTemplate() {
	// Music.
	this.conMusic = msc_silence;
	
	// Clicky.
	this.Click = function() {
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
	}
	
	// Drawing.
	this.Draw = function() {
	}
}

// Main menu controller.
function ControlMenuMain() {
	// Reset.
	resetPlayers();
	
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		// Tamamatch.
		if (MousePoint(0, 100, 171, 126)) {
			TransGo(new ControlMenuChar());
			playSound(snd_menu_confirm);
			gameMode = 0;
		}
		
		// Friendly game.
		else if (MousePoint(0, 132, 171, 158)) {
			TransGo(new ControlMenuChar());
			playSound(snd_menu_confirm);
			gameMode = 1;
		}
		
		// Tournament.
		
		// Replays.
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		// Nothing.
	}
	
	// Drawing.
	this.Draw = function() {
		// Background.
		drawSprite(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
		
		// Title.
		drawSprite(spr_menu_title, 0, 0, 160 - (spr_menu_title.sprWidth / 2), 8);
		
		// Buttons.
		drawSprite(spr_menu_button_main, 0, 0, 0, 100);
	}
}

// Character select controller.
function ControlMenuChar() {
	// Reset.
	resetPlayers();
	
	// Setup variables.
	this.setChar = [-1, -1, -1, -1];
	this.setSelect = -1;
	this.setCode = [];
	this.setColor = 0;
	this.setActor = undefined;
	this.setActorWait = [undefined, undefined, undefined, undefined];
	
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		// Back.
		if (MousePoint(0, 4, 171, 30)) {
			// Sound.
			snd_menu_cancel.Play();
			
			// Cancel.
			if (getPlayers() == 0) TransGo(new ControlMenuMain());
			
			// Previous player.
			else {
				this.setChar[getPlayers()] = -1;
				resetPlayer(getPlayers() - 1);
				this.setColor = 0;
				this.setActorWait[getPlayers()] = undefined;
			}
		}
		
		// Continue.
		else if (MousePoint(0, 36, 171, 62)) {
			if (getPlayers() > 0)  {
				playSound(snd_menu_confirm);
				TransGo(new ControlGolf());
			}
		}
		
		// Selecting.
		else if (this.setSelect > -1) {
			// Tama-Match.
			if (gameMode == 0) {
				playSound(snd_menu_confirm);
				playSound(snd_voice_good[this.setSelect]);
				playerColor[getPlayers()] = selectColor(this.setSelect, this.setColor);
				this.setActorWait[getPlayers()] = new Actor(spr_player[this.setSelect], playerColor[getPlayers()], 0, 0);
				playerChar[getPlayers()] = this.setSelect;
				playSound(snd_menu_confirm);
				TransGo(new ControlGolf());
			}
			
			// Free play.
			else {
				playSound(snd_menu_confirm);
				playSound(snd_voice_good[this.setSelect]);
				playerColor[getPlayers()] = selectColor(this.setSelect, this.setColor);
				this.setActorWait[getPlayers()] = new Actor(spr_player[this.setSelect], playerColor[getPlayers()], 0, 0);
				playerChar[getPlayers()] = this.setSelect;
				this.setColor = 0;
			}
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		if (getPlayers() < 4) {
			// Code.
			if (fE >= 65 && fE <= 90) {
				// Array.
				if (this.setCode.length >= 8) this.setCode.splice(0, 1);
				this.setCode.push(fE);
				
				// Checking code.
				tC = charCode(this.setCode);
				if (tC > -1 && !this.CheckLocked(tC)) {
					playSound(snd_gen_correct);
					this.setChar[getPlayers()] = tC;
				}
			}
			
			// Color.
			else {
				if (fE == 38) this.setColor = 0;
				else if (fE == 37) this.setColor = 1;
				else if (fE == 40) this.setColor = 2;
				else if (fE == 39) this.setColor = 3;
			}
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Background.
		drawSprite(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
		
		// Character prep.
		tX = 169;
		tY = 66;
		this.setSelect = -1;
		
		// Unlocked characters.
		for (j = 0; j < 4; j++) {
			for (i = 0; i < 3; i++) {
				drawSprite(spr_menu_char, i + (j * 3), selectColor(i + (j * 3), this.setColor), tX + (i * 51), tY + (j * 44));
				if (MousePoint(tX + (i * 51), tY + (j * 44), tX + (i * 51) + 47, tY + (j * 44) + 38) && getPlayers() < modePlayers[gameMode]) this.setSelect = i + (j * 3);
			}
		}
		
		// Locked characters.
		for (i = 0; i < 4; i++) {
			if (this.setChar[i] > -1) {
				drawSprite(spr_menu_char, this.setChar[i], selectColor(this.setChar[i], this.setColor), tX - 51, tY + (i * 44));
				if (MousePoint(tX - 51, tY + (i * 44), tX - 4, tY + (i * 44) + 38) && getPlayers() < modePlayers[gameMode]) this.setSelect = this.setChar[i];
			}
		}
		
		// Actor.
		if (this.setSelect > -1 && this.setActor == undefined) {
			this.setActor = new Actor(spr_player[this.setSelect], this.setColor, 67, 147);
			this.setActor.Perform(2, undefined);
			this.setActor.actorShadow = false;
			this.setActor.jumpSpeed = 35;
			this.setActor.animTick = this.setActor.jumpSpeed;
		}
		else if (this.setSelect == -1) this.setActor = undefined;
		if (this.setActor != undefined) {
			this.setActor.SetSprite(spr_player[this.setSelect], selectColor(this.setSelect, this.setColor));
			this.setActor.Draw(0);
		}
		
		// Buttons.
		drawSprite(spr_menu_button_char, 0, (getPlayers() > 0 && gameMode != 0), 0, 4);
		
		// Current player.
		if (getPlayers() < modePlayers[gameMode]) drawSprite(spr_menu_player, getPlayers(), 0, 2, 124);
		
		// Stats.
		if (this.setSelect > -1) {
			// Name.
			drawSprite(spr_menu_name, 0, this.setSelect, 2, 147);
			
			// Stats.
			drawSprite(spr_menu_stats, 0, 0, 2, 177);
			for(i = 0; i < 4; i++) {
				drawSpritePart(spr_menu_bar, charStat[this.setSelect][i] * 2, 7, 40, 185 + (i * 11));
				if (charStat[this.setSelect][i] > 25)
					drawSpritePart(spr_menu_bar_over, 1 + ((charStat[this.setSelect][i] - 25) * 2) + (charStat[this.setSelect][i] >= 50), 9, 39, 184 + (i * 11));
				if (charStat[this.setSelect][i] > 50)
					drawSpritePart(spr_menu_bar_over_more, 1 + ((charStat[this.setSelect][i] - 50) * 2) + (charStat[this.setSelect][i] >= 75), 9, 39, 184 + (i * 11));
			}
		}
		
		// Selected characters.
		this.DrawSelect(1, 232, 48);
		this.DrawSelect(3, 296, 48);
		this.DrawSelect(0, 200, 56);
		this.DrawSelect(2, 264, 56);
	}
	
	// Drawing a selected character.
	this.DrawSelect = function(fP, fX, fY) {
		if (this.setActorWait[fP] != undefined) {
			this.setActorWait[fP].Set(fX, fY);
			this.setActorWait[fP].Draw(0);
			drawSprite(spr_menu_player_mini, fP, 0, fX - 4, fY);
		}
	}
	
	// Making sure a locked character has not already been unlocked.
	this.CheckLocked = function(fIn) {
		for(fi = 0; fi < 4; fi++) {
			if (this.setChar[fi] == fIn) return(true);
		}
		return(false);
	}
}

// Pause menu controller.
function ControlMenuPause() {
	// Stuff.
	this.conGolf = objControl;
	this.conMusic = objControl.conMusic;
	
	// Clicky.
	this.Click = function() {
		// Continue.
		if (MousePoint(0, 100, 171, 126)) {
			TransGo(this.conGolf);
			playSound(snd_menu_confirm);
		}
		
		// Quit.
		else if (MousePoint(0, 132, 171, 158)) {
			TransGo(new ControlMenuMain());
			playSound(snd_menu_cancel);
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
		// Unause.
		if (fE == 27) {
			TransGo(this.conGolf);
			playSound(snd_menu_confirm);
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Background.
		drawSprite(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
		
		// Title.
		drawSprite(spr_menu_title, 0, 0, 160 - (spr_menu_title.sprWidth / 2), 8);
		
		// Buttons.
		drawSprite(spr_menu_button_pause, 0, 0, 0, 100);
	}
}