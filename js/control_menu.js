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
			//
		}
		
		// Friendly game.
		else if (MousePoint(0, 132, 171, 158)) {
			TransGo(new ControlMenuChar());
			playSound(snd_menu_confirm);
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
	
	// Music.
	this.conMusic = msc_silence;
	
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
			}
		}
		
		// Continue.
		
		// AI.
		
		// Selecting.
		else if (this.setSelect > -1) {
			snd_menu_confirm.Play();
			playerChar[getPlayers()] = this.setSelect;
		}
	}
	
	// Keyboard.
	this.Keyboard = function(fE) {
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
	}
	
	// Drawing.
	this.Draw = function() {
		// Background.
		drawSprite(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
		
		// Buttons.
		drawSprite(spr_menu_button_char, 0, (getPlayers() > 0), 0, 4);
		
		// Current player.
		if (getPlayers() < 4) drawSprite(spr_menu_player, getPlayers(), 0, 2, 124);
		
		// Character prep.
		tX = 169;
		tY = 66;
		this.setSelect = -1;
		
		// Unlocked characters.
		for (j = 0; j < 4; j++) {
			for (i = 0; i < 3; i++) {
				drawSprite(spr_menu_char, i + (j * 3), 0, tX + (i * 51), tY + (j * 44));
				if (checkForChar(i + (j * 3))) {
					tP = checkCharPlayer(i + (j * 3));
					if (playerAi[tP]) drawSprite(spr_menu_ai, tP, 0, tX + (i * 51) + 5, tY + (j * 44) + 10);
					else drawSprite(spr_menu_player, tP, 0, tX + (i * 51) + 11, tY + (j * 44) + 10);
				}
				else if (MousePoint(tX + (i * 51), tY + (j * 44), tX + (i * 51) + 47, tY + (j * 44) + 38) && getPlayers() < 4) this.setSelect = i + (j * 3);
			}
		}
		
		// Locked characters.
		for (i = 0; i < 4; i++) {
			if (this.setChar[i] > -1) {
				drawSprite(spr_menu_char, this.setChar[i], 0, tX - 51, tY + (i * 44));
				if (checkForChar(this.setChar[i])) {
					tP = checkCharPlayer(this.setChar[i]);
					if (playerAi[tP]) drawSprite(spr_menu_ai, tP, 0, tX - 46, tY + (i * 44) + 10);
					else drawSprite(spr_menu_player, tP, 0, tX - 40, tY + (i * 44) + 10);
				}
				else if (MousePoint(tX - 51, tY + (i * 44), tX - 4, tY + (i * 44) + 38) && getPlayers() < 4) this.setSelect = this.setChar[i];
			}
		}
		
		// Stats.
		if (this.setSelect > -1) {
			// Name.
			drawSprite(spr_menu_name, 0, this.setSelect, 2, 147);
			
			// Stats.
			drawSprite(spr_menu_stats, 0, 0, 2, 177);
			drawSpritePart(spr_menu_bar, charStat[this.setSelect][0], 5, 40, 185);
			drawSpritePart(spr_menu_bar, charStat[this.setSelect][1], 5, 40, 194);
			drawSpritePart(spr_menu_bar, charStat[this.setSelect][2], 5, 40, 203);
			drawSpritePart(spr_menu_bar, charStat[this.setSelect][3], 5, 40, 212);
			drawSpritePart(spr_menu_bar, charStat[this.setSelect][4], 5, 40, 221);
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