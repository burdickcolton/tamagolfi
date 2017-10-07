// Global objects.
var objTransition = undefined;
var objControl;

// Global variables.
var gameLetterTable = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var menuLanguageEnable = false;
var menuLanguage = 0;
var menuBackScroll = 0;
var menuBackTick = 1;
var gameVolume = (1/3);
var gameMode = 0;
var gameLieBonus = [1.125, 1, 0.875, .75, .5, 1];
var gameDebug = false;
var gameMission = 0;
var gameCourse = 0;
var gameHole = 0;

// Mode settings.
var modePlayers = [1, 4];

// Game setup.
var playerChar = [];
var playerAi = [];
var playerColor = [];
var playerDiff = 0;
resetPlayers();

// Character stats.
var charStat = [
	[15, 15, 15, 15], // Melodytchi
	[13, 11, 25, 11], // Makiko
	[20, 22, 14, 4], // Anemoriritchi
	[7, 12, 21, 20], // Kiramotchi
	[6, 14, 19, 21], // Chamametchi
	[5, 25, 5, 25], // Watawatatchi
	[17, 11, 19, 13], // Pianitchi
	[21, 4, 22, 13], // Gozarutchi
	[8, 13, 23, 16], // Imotchi
	[14, 16, 11, 19], // Uwasatchi
	[11, 23, 25, 1], // Nyorotchi
	[8, 18, 19, 15], // Neotchi
	[21, 12, 13, 14], // Mamametchi
	[14, 10, 23, 13], // Memetchi
	//[50, 5, 4, 1], // Nightmare Mamametchi
];