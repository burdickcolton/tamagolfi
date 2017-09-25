// Function for more convenient sound loading.
function loadSnd(file, ismusic) {
	if (ismusic) {this.tempRe = new Music("msc/" + file + ".ogg");}
	else {this.tempRe = new Sound("snd/" + file + ".ogg");}
	return (tempRe);
}

// Music.
var msc_silence = loadSnd("silence", true);
var msc_menu = loadSnd("menu", true);
var msc_mini_golf = loadSnd("mini_golf", true);

// Menu.
var snd_menu_confirm = loadSnd("menu_confirm", false);
var snd_menu_select = loadSnd("menu_select", false);
var snd_menu_cancel = loadSnd("menu_cancel", false);

// General.
var snd_gen_great = loadSnd("general_great", false);
var snd_gen_good = loadSnd("general_good", false);
var snd_gen_okay = loadSnd("general_okay", false);
var snd_gen_bad = loadSnd("general_bad", false);
var snd_gen_correct = loadSnd("general_correct", false);
var snd_gen_wrong = loadSnd("general_wrong", false);
var snd_gen_bounce = loadSnd("general_bounce", false);
var snd_gen_happy = loadSnd("general_happy", false);
var snd_gen_sad = loadSnd("general_sad", false);
var snd_gen_hop = loadSnd("general_hop", false);

// Golf sounds.
var snd_golf_hit = loadSnd("golf_hit", false);
var snd_golf_bounce = loadSnd("golf_bounce", false);
var snd_golf_cup = loadSnd("golf_cup", false);
var snd_golf_sink = loadSnd("golf_sink", false);

// Voice: Very Happy

// Voice: Happy

// Voice: Okay

// Voice: Sad

// Voice: Stroke