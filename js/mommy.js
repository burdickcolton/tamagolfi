// View tamatomo menu controller.
function Mommy(fDesc) {
	// Variables.
	this.descSpr = fDesc;
	this.descCol = 0;
	this.descRow = 0;
	this.descFinish = false;
	this.mommyFace = 0;
	this.mommyTalk = 0;
	
	// Talking.
	this.Talk = function() {
		// Finishing line.
		if (this.descCol < 242) {
			this.descCol += 11;
		}
		
		// Moving to next line.
		else if (this.descRow + 1 < tempSpr.sprRow) {
			this.descRow++;
			this.descCol = 0;
		}
		
		// Finishing.
		else {
			if (this.mommyFace < 2) this.mommyFace = 0;
			this.descFinish = true;
		}
		
		// Animation.
		if (!this.descFinish && this.mommyFace < 2) this.TalkAnim();
	}
	
	// Talk animation.
	this.TalkAnim = function() {
		if (this.mommyTalk > 0) this.mommyTalk--;
		else {
			this.mommyTalk = 4;
			this.mommyFace = !(this.mommyFace);
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Mommy.
		drawSpriteNormal(spr_mini_mommy, this.mommyFace, 0, 264, 181);
		
		// Talking.
		if (menuLanguage == 0) tempSpr = spr_description_eng[this.descSpr];
		else if (menuLanguage == 1) tempSpr = spr_description_jap[this.descSpr];
		if (!this.descFinish && objTransition == undefined) this.Talk();
		
		// Description.
		drawSpriteNormal(spr_mini_speech, 0, 0, 0, 157);
		for (i = 0; i <= this.descRow; i++) {
			if (i < this.descRow || this.descFinish) tempCol = 242;
			else tempCol = this.descCol;
			drawSpriteFull(tempSpr, 0, (i * 14) * 2, tempCol * 2, 14 * 2, 8 * 2, (160 + (i * 14)) * 2);
		}
	}
}