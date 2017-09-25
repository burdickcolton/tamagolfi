// Actor.
function Actor(fSpr, fCol, fX, fY) {
	// Variables.
	this.actorSpr = fSpr;
	this.actorColor = fCol;
	this.actorShadow = true;
	this.jumpSpeed = 15;
	this.x = fX;
	this.y = fY;
	this.animFrame = 0;
	this.animOn = 0;
	this.animTick = 0;
	this.animX = 0;
	this.animY = 0;
	this.animGrav = 0;
	this.animTime = undefined;
	
	// Setting sprite info.
	this.SetSprite = function(fSpr, fCol) {
		this.actorSpr = fSpr;
		this.actorColor = fCol;
	}
	
	// Setting position.
	this.Set = function(fX, fY) {
		this.x = fX;
		this.y = fY;
	}
	
	// Animation.
	this.Animation = function() {
		// Performing.
		switch(this.animOn) {
			// Idle.
			case 0:
				if (this.animTick > 0) this.animTick--;
				else {
					this.animY = 0 - (this.animY == 0);
					this.animTick = 40;
				}
				break;
			
			// Happy (minor).
			case 1:
				if (this.animTick > 0) this.animTick--;
				else {
					this.animFrame = 4 * (this.animFrame == 0);
					if (this.animFrame == 4) snd_gen_happy.Play();
					this.animTick = 35;
				}
				break;
			
			// Happy (jumping).
			case 2:
				if (this.animFrame == 0) {
					if (this.animTick > 0) this.animTick--;
					else {
						this.animFrame = 4;
						this.animGrav = -(10 / 3);
						snd_gen_happy.Play();
						snd_gen_hop.Play();
					}
				}
				else if (this.Fall()) {
					this.animFrame = 0;
					this.animTick = this.jumpSpeed;
				}
				break;
			
			// Upset.
			case 3:
				if (this.animTick > 0) this.animTick--;
				else {
					this.animFrame = 5 + (this.animFrame == 5);
					if (this.animFrame == 3) snd_gen_sad.Play();
					this.animTick = 35;
				}
				break;
			
			// Hop.
			case 4:
				if (this.Fall()) this.Perform(0, undefined);
				break;
			
			// Completely still.
			default:
				this.animFrame = 0;
		}
		
		// Timed animation.
		if (this.animTime != undefined) {
			if (this.animTime > 0) this.animTime--;
			else this.Perform(0, undefined);
		}
	}
	
	// Starting an animation.
	this.Perform = function(fAnim, fTime) {
		// Reset.
		this.animOn = fAnim;
		this.animTick = 15 * (fAnim != 2);
		this.animX = 0;
		this.animY = 0;
		this.animGrav = 0;
		this.animTime = fTime;
		
		// Initial frame.
		if (fAnim >= 0 && fAnim <= 2) this.animFrame = 0;
		else if (fAnim == 3) this.animFrame = 2;
		else this.animFrame = 0;
	}
	
	// Hopping.
	this.Hop = function(fHop) {
		this.animGrav = -fHop;
		this.animOn = 6;
		this.animFrame = 1;
		this.animTick = 0;
		this.animX = 0;
		this.animY = 0;
		snd_gen_hop.Play();
	}
	
	// Gravity.
	this.Fall = function() {
		if ((this.animY < 0 || this.animGrav != 0)) {
			this.animY += this.animGrav;
			if (this.animY > 0) {
				this.animY = 0;
				this.animGrav = 0;
			}
			else this.animGrav += .2;
		}
		return (this.animY == 0 && this.animGrav == 0);
	}
	
	// Drawing.
	this.Draw = function() {
		// Animating.
		this.Animation();
		
		// Shadow.
		if (this.actorShadow) drawSprite(spr_player_shadow, 0, 0, this.x + this.animX - 12, this.y - 2);
		
		// Player sprite.
		drawSprite(this.actorSpr, this.animFrame, this.actorColor,
			this.x + this.animX - Math.ceil(this.actorSpr.sprWidth / 2),
			this.y + this.animY + 1 - this.actorSpr.sprHeight);
	}
}