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
var gameLieBonus = [1.125, 1, .9, .7, .5, 1];

// Game setup.
var playerChar = [];
var playerAi = [];
var playerColor = [];
var playerDiff = 0;
resetPlayers();

// Character stats.
var charStat = [
	[13, 13, 12, 12], // Melodytchi
	[10, 8, 25, 7], // Makiko
	[19, 22, 7, 2], // Anemoriritchi
	[5, 10, 18, 17], // Kiramotchi
	[4, 13, 17, 16], // Chamametchi
	[5, 25, 1, 19], // Watawatatchi
	[14, 9, 16, 11], // Pianitchi
	[18, 2, 19, 11], // Gozarutchi
	[6, 9, 22, 13], // Imotchi
	[11, 16, 9, 14], // Uwasatchi
	[9, 15, 25, 1], // Nyorotchi
	[7, 15, 16, 12], // Neotchi
	[21, 9, 9, 11], // Mamametchi
	[12, 7, 23, 8], // Memetchi
	//[50, 0, 0, 0], // Nightmare Mamametchi
];