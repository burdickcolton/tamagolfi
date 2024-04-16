// Actor.
function Actor(fSpr, fCol, fX, fY) {
	// Variables.
	this.actorSpr = fSpr;
	this.actorColor = fCol;
	this.actorShadow = true;
	this.actorMute = false;
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
	this.animSwingHold = 0;
	this.animPart = -1;
	this.animPartSpeed = 2.5;
	this.animPartRot = 0;
	this.animPartDis = 8;
	this.animPartObj = [];
	
	// Club.
	this.clubOn = false;
	this.clubSpr = 0;
	this.clubFrame = 0;
	this.clubType = 0;
	
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
	
	// Enablding club.
	this.Club = function(fSpr) {
		this.clubOn = true;
		this.clubSpr = spr_club[fSpr];
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
					if (this.animFrame == 4 && !this.actorMute) snd_gen_happy.Play();
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
						if (!this.actorMute) {snd_gen_happy.Play(); snd_gen_hop.Play();}
						if (this.animPart > -1) for(ti = 0; ti < 6; ti++) {
							tD = randomMax(30);
							this.animPartObj.push(new ActorPart(this.animPart, this,
								xDir(16, (180 + tD) + (ti * ((360 - (180 + tD)) / 5))),
								yDir(16, (180 + tD) + (ti * ((360 - (180 + tD)) / 5))) ));
						}
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
					if (this.animFrame == 6 && !this.actorMute) snd_gen_sad.Play();
					this.animTick = 35;
				}
				break;
			
			// Hop.
			case 4:
				if (this.Fall()) this.Perform(0, undefined);
				break;
				
			// Aiming.
			case 5:
				this.animFrame = 1;
				this.clubFrame = 0;
				break;
				
			// Waiting before swing.
			case 6:
				this.SwingAnim(1, 0, Math.ceil(this.animSwingHold * 8));
				break;
				
			// Backswing 1.
			case 7:
				this.SwingAnim(2, 1, Math.ceil(this.animSwingHold * 30));
				break;
				
			// Backswing 2.
			case 8:
				this.SwingAnim(7, 2, 1);
				if (this.animOn == 9) {
					if (this.animSwingHold < .25) snd_golf_backswing.Stop();
					playSound(snd_golf_foreswing);
				}
				break;
				
			// Foreswing 1.
			case 9:
				this.SwingAnim(2, 3, 1);
				break;
				
			// Foreswing 2.
			case 10:
				this.SwingAnim(3, 4, 1);
				break;
				
			// Foreswing 3.
			case 11:
				this.SwingAnim(3, 5, 0);
				break;
				
			// Swing ended.
			case 12:
				this.animFrame = 8;
				this.clubFrame = 6;
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
		else if (fAnim == 3) this.animFrame = 5;
		//else this.animFrame = 0;
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
	
	// Swing animation thing.
	this.SwingAnim = function(fFrame, fClub, fTick) {
		this.animFrame = fFrame;
		this.clubFrame = fClub;
		if (this.animTick > 0) {
			if (objTransition == undefined) this.animTick--;
		}
		else if (objTransition == undefined) {
			this.Perform(this.animOn + 1, undefined);
			this.animTick = fTick;
		}
	}
	
	// Drawing.
	this.Draw = function(fX) {
		// Thing.
		initSpriteDimensions(this.actorSpr);
		tW = this.actorSpr.sprWidth;
		tWH = Math.floor(tW / 2);
		
		// Animating.
		this.Animation();
		
		// Shadow.
		if (this.actorShadow) drawSprite(spr_player_shadow, 0, 0, this.x + this.animX - 11 + fX, this.y - 2);
		
		// Player sprite.
		drawSprite(this.actorSpr, this.animFrame, this.actorColor, this.x + this.animX - tWH + fX, this.y + this.animY + 1 - this.actorSpr.sprHeight);
		
		// Particles.
		for(acti = 0; acti < this.animPartObj.length; acti++) {
			this.animPartObj[acti].Draw(fX);
		}
		
		// Club sprite.
		if (this.clubOn) {
			initSpriteDimensions(this.clubSpr);
			drawSprite(this.clubSpr, this.clubFrame, 0,
				this.x + this.animX - Math.floor(this.clubSpr.sprWidth / 2) + fX,
				this.y + this.animY + 1 - this.actorSpr.sprHeight);
		}
	}
}

// Particle.
function ActorPart(fSpr, fActor, fX, fY) {
	// Variables.
	//this.x = fActor.x + randomRange(-8, 8);
	//this.y = fActor.y + randomMax(8);
	this.x = fActor.x + fX;
	this.y = fActor.y + fY;
	this.z = -(fActor.actorSpr.sprHeight / 2);
	this.speed = randomRange(1, 2.5);
	this.dir = calcDirection(fActor.x, fActor.y, this.x, this.y);
	this.grav = randomRange(-3.5, -5);
	this.actor = fActor;
	this.animBounce = false;
	this.animBlink = true;
	this.animSpr = fSpr;
	this.animInd = randomMax(1);
	
	// Drawing.
	this.Draw = function(fX) {
		// Physics.
		if (this.animBounce) this.animBlink = !this.animBlink;
		this.x = median(8, this.x + xDir(this.speed, this.dir), (objControl.objHole.holeSpr.width / 2) - 8);
		this.y = Math.min(this.y + yDir(this.speed, this.dir), 200);
		this.grav += .1;
		this.z += this.grav;
		
		// Bouncing.
		if (this.z >= 0 && this.grav > 0) {
			this.z = 0;
			this.grav *= -.75;
			this.speed *= randomRange(.25, 1);
			if (!this.animBounce) this.animBounce = true;
			else this.actor.animPartObj.splice(this.actor.animPartObj.indexOf(this), 1);
		}
		
		// Sprite.
		if (this.animBlink) {
			drawSprite(spr_golf_ball_shadow, 0, 0, this.x + fX - 2, this.y - 2);
			drawSprite(spr_player_particle, this.animSpr, this.animInd, this.x + fX - 8, this.y + this.z - 17);
		}
	}
}