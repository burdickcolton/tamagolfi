// Directory variable for easier loading strings.
var loadTempDir = "";

// Function for more convenient sprite loading.
function loadSpr(file, fCol, fRow) {
	this.tempRe = new Image();
	this.tempRe.src = "spr/" + file + ".png";
	this.tempRe.sprCol = fCol;
	this.tempRe.sprRow = fRow;
	this.tempRe.sprWidth = 0;
	this.tempRe.sprHeight = 0;
	return (tempRe);
}

// Loading course sprites.
function loadCourseSpr(fLen, fName) {
	fr = [];
	for(fi = 0; fi < fLen; fi++) {
		if (fi < 10) tN = "0" + fi;
		else tN = fi;
		fr.push(loadSpr("course_" + fName + "_" + tN, 1, 1));
	}
	return(fr);
}

// Transition.
var spr_transition = loadSpr("transition", 1, 1);

// Menu sprites.
var spr_menu_title = loadSpr("menu_title", 1, 1);
var spr_menu_back = loadSpr("menu_background", 1, 1);
var spr_menu_button_main = loadSpr("menu_buttons_main", 1, 1);
var spr_menu_player = loadSpr("menu_player", 4, 2);
var spr_menu_player_mini = loadSpr("menu_player_mini", 4, 1);
var spr_menu_ai = loadSpr("menu_ai", 4, 1);
var spr_menu_flag = loadSpr("menu_flag", 2, 1);
var spr_menu_stats = loadSpr("menu_stats", 1, 1);
var spr_menu_bar = loadSpr("menu_bar", 1, 1);
var spr_menu_bar_over = loadSpr("menu_bar_over", 1, 1);
var spr_menu_bar_over_more = loadSpr("menu_bar_over_more", 1, 1);
var spr_menu_char = loadSpr("menu_char", charStat.length, 4);
var spr_menu_name = loadSpr("menu_name", 1, charStat.length);
var spr_menu_locked = loadSpr("menu_locked", 1, 1);
var spr_menu_button_char = loadSpr("menu_buttons_char", 1, 2);
var spr_menu_button_pause = loadSpr("menu_buttons_pause", 1, 1);
var spr_menu_button_scorecard = loadSpr("menu_buttons_scorecard", 1, 2);
var spr_menu_scorecard = loadSpr("menu_scorecard", 4, 2);
var spr_menu_button_result = loadSpr("menu_buttons_result", 1, 1);
var spr_menu_result_rank = loadSpr("menu_result_rank", 1, 4);
var spr_menu_result_multi = loadSpr("menu_result_multi", 1, 1);

// Golf sprites.
var spr_golf_cursor = loadSpr("golf_cursor", 1, 1);
var spr_golf_trajec = loadSpr("golf_trajectory", 2, 1);
var spr_golf_ball = loadSpr("golf_ball", 5, 1);
var spr_golf_ball_shadow = loadSpr("golf_ball_shadow", 2, 1);
var spr_golf_hole = loadSpr("golf_hole", 6, 1);
var spr_golf_trail = loadSpr("golf_trail", 4, 3);
var spr_golf_medal = loadSpr("golf_medal", 3, 1);
var spr_golf_mushroom = loadSpr("golf_mushroom", 3, 1);

// HUD sprites.
var spr_hud_shadow_char = loadSpr("hud_shadow_char", 1, 1);
var spr_hud_number = loadSpr("hud_number", 10, 4);
var spr_hud_yards = loadSpr("hud_yards", 4, 1);
var spr_hud_spin_type = loadSpr("hud_spin_type", 3, 1);
var spr_hud_spin_bar = loadSpr("hud_spin_bar", 1, 1);
var spr_hud_spin_ticker = loadSpr("hud_spin_ticker", 1, 1);
var spr_hud_max_drive = loadSpr("hud_max_drive", 1, 1);
var spr_hud_lie = loadSpr("hud_lie", gameLieBonus.length + 2, 1);
var spr_hud_wind_title = loadSpr("hud_wind_title", 2, 1);
var spr_hud_wind_direction = loadSpr("hud_wind_direction", 8, 10);
var spr_hud_camera = loadSpr("hud_camera", 1, 7);
var spr_hud_camera_title = loadSpr("hud_camera_title", 1, 1);
var spr_hud_score = loadSpr("hud_score", 1, 11);
var spr_hud_sign = loadSpr("hud_sign", 2, 1);
var spr_hud_par = loadSpr("hud_par", 1, 1);
var spr_hud_hole = loadSpr("hud_hole", 1, 18);

// Player sprites.
var spr_player_shadow = loadSpr("player_shadow", 1, 1);
var spr_player_particle = loadSpr("player_particle", charStat.length, 2);
var spr_player = [];
for(i = 0; i < charStat.length; i++) {
	if (i < 10) tN = "0" + i;
	else tN = i;
	spr_player.push(loadSpr("player_" + tN, 9, 4));
}

// Club sprites.
var spr_club = [];
for(i = 0; i < charStat.length; i++) {
	if (i < 10) tN = "0" + i;
	else tN = i;
	spr_club.push(loadSpr("club_" + tN, 7, 1));
}

// Course sprites.
var spr_course_range = loadSpr("course_range", 1, 1);
var spr_course_tamatown = loadCourseSpr(6, "tamatown");