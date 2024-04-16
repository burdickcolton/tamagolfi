// Current music.
var musicCurrentlyPlaying;

// Sound class.
function Sound(src) {
	// Initialization.
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	
	// Playing sound.
	this.Play = function() {
		this.sound.currentTime = 0;
		this.sound.volume = gameVolume;
		this.sound.play();
	}
	
	// Stopping sound.
	this.Stop = function() {
		this.sound.currentTime = 0;
		this.sound.pause();
	}
}

// Music class.
function Music(src) {
	// Initialization.
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	
	// Loop listener.
	this.sound.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	
	// Playing music.
	this.Play = function() {
		this.sound.currentTime = 0;
		this.sound.volume = gameVolume;
		this.sound.play();
	}
	
	// Stopping music.
	this.Stop = function() {
		this.sound.currentTime = 0;
		this.sound.pause();
	}
}

// Playing new music.
function playMusic(newMusic) {
	if (newMusic != musicCurrentlyPlaying) {
		if (musicCurrentlyPlaying !== undefined) {musicCurrentlyPlaying.Stop();}
		musicCurrentlyPlaying = newMusic;
		if (musicCurrentlyPlaying !== undefined) {musicCurrentlyPlaying.Play();}
	}
}

// Playing a sound.
function playSound(fSnd) {
	//if (fSnd != undefined) fSnd.Play();
	fSnd.Play();
}

// Changing volume.
function newVolume(fVol) {
	gameVolume = fVol;
	if (musicCurrentlyPlaying !== undefined) musicCurrentlyPlaying.sound.volume = fVol;
}