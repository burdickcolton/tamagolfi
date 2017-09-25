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

// Transition.
var spr_transition = loadSpr("transition", 1, 1);

// Menu sprites.
var spr_menu_title = loadSpr("menu_title", 1, 1);
var spr_menu_back = loadSpr("menu_background", 1, 1);
var spr_menu_button_main = loadSpr("menu_buttons_main", 1, 1);
var spr_menu_player = loadSpr("menu_player", 4, 1);
var spr_menu_player_mini = loadSpr("menu_player_mini", 4, 1);
var spr_menu_ai = loadSpr("menu_ai", 4, 1);
var spr_menu_flag = loadSpr("menu_flag", 2, 1);
var spr_menu_stats = loadSpr("menu_stats", 1, 1);
var spr_menu_bar = loadSpr("menu_bar", 1, 1);
var spr_menu_char = loadSpr("menu_char", charStat.length, 4);
var spr_menu_name = loadSpr("menu_name", 1, charStat.length);
var spr_menu_locked = loadSpr("menu_locked", 1, 1);
var spr_menu_button_char = loadSpr("menu_buttons_char", 1, 2);

// Golf sprites.

// Player sprites.
var spr_player_shadow = loadSpr("player_shadow", 1, 1);
var spr_player = [];
for(i = 0; i < charStat.length; i++) {
	if (i < 10) tN = "0" + i;
	else tN = i;
	spr_player.push(loadSpr("player_" + tN, 7, 4));
}

// Club sprites.