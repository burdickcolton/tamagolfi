// Function for more convenient sound loading.
function loadSnd(file, ismusic) {
	if (ismusic) {this.tempRe = new Music("msc/" + file + ".ogg");}
	else {this.tempRe = new Sound("snd/" + file + ".ogg");}
	return (tempRe);
}

// Voice loading function.
function voiceLoad(fChar) {
	if (fChar < 10) tN = "0" + fChar;
	else tN = fChar;
	snd_voice_great[fChar] = (loadSnd("voices/great_" + tN, false));
	snd_voice_good[fChar] = (loadSnd("voices/good_" + tN, false));
	snd_voice_okay[fChar] = (loadSnd("voices/okay_" + tN, false));
	snd_voice_bad[fChar] = (loadSnd("voices/bad_" + tN, false));
	snd_voice_swing[fChar] = (loadSnd("voices/swing_" + tN, false));
}

// An array of silence.
function silenceArray(fLen) {
	tr = [];
	while(tr.length < fLen) {
		tr.push(msc_silence);
	}
	return(tr);
}

// Music.
var msc_silence = loadSnd("silence", true);
var msc_menu = loadSnd("menu", true);
var msc_scorecard = loadSnd("scorecard", true);
var msc_result_good = loadSnd("result_good", true);
var msc_result_okay = loadSnd("result_okay", true);
var msc_result_bad = loadSnd("result_bad", true);
var msc_course_default = loadSnd("course_default", true);

// Menu.
var snd_menu_confirm = loadSnd("menu_confirm", false);
var snd_menu_select = loadSnd("menu_select", false);
var snd_menu_cancel = loadSnd("menu_cancel", false);

// General.
var snd_silence = loadSnd("silence", true);
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
var snd_gen_camera = loadSnd("general_camera", false);

// Golf sounds.
var snd_golf_hit = loadSnd("golf_hit", false);
var snd_golf_bounce = loadSnd("golf_bounce", false);
var snd_golf_bounce_rough = loadSnd("golf_bounce_rough", false);
var snd_golf_cup = loadSnd("golf_cup", false);
var snd_golf_sink = loadSnd("golf_sink", false);
var snd_golf_backswing = loadSnd("golf_backswing", false);
var snd_golf_foreswing = loadSnd("golf_foreswing", false);

// Voice instantiation.
var snd_voice_great = silenceArray(charStat.length);
var snd_voice_good = silenceArray(charStat.length);
var snd_voice_okay = silenceArray(charStat.length);
var snd_voice_bad = silenceArray(charStat.length);
var snd_voice_swing = silenceArray(charStat.length);

// Loading available voices.
voiceLoad(0);
voiceLoad(1);
snd_voice_great[2] = loadSnd("voices/great_02", false);
snd_voice_swing[2] = loadSnd("voices/swing_02", false);
snd_voice_okay[2] = loadSnd("voices/okay_02", false);
voiceLoad(4);
voiceLoad(5);
voiceLoad(7);
//snd_voice_okay[9] = loadSnd("voices/okay_09", false);
snd_voice_bad[9] = loadSnd("voices/bad_09", false);
snd_voice_good[9] = loadSnd("voices/good_09", false);
snd_voice_swing[9] = loadSnd("voices/swing_09", false);
snd_voice_great[12] = loadSnd("voices/great_12", false);
voiceLoad(13);