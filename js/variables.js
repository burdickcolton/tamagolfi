// Global objects.
var objTransition = undefined;
var objControl;

// Global variables.
var gameLetterTable = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var menuLanguageEnable = false;
var menuLanguage = 0;
var menuBackScroll = 0;
var menuBackTick = 1;
var gameVolume = .25;
var gameMode = 0;

// Game setup.
var playerChar = [];
var playerAi = [];
var playerDiff = 0;
resetPlayers();

// Character stats.
var charStat = [
	[13, 13, 12, 12, 12], // Melodytchi
	[10, 8, 25, 17, 2], // Makiko
	[19, 22, 7, 7, 7], // Anemoriritchi
	[5, 10, 17, 17, 13], // Kiramotchi
	[2, 11, 19, 19, 11], // Chamametchi
	[5, 25, 1, 11, 20], // Watawatatchi
	[15, 11, 15, 9, 12], // Pianitchi
	[18, 3, 19, 6, 16], // Gozarutchi
	[4, 11, 18, 21, 8], // Imotchi
	[11, 15, 10, 14, 12], // Uwasatchi
	[9, 2, 25, 25, 1], // Nyorotchi
	[7, 15, 16, 14, 10], // Neotchi
	[20, 10, 10, 10, 12], // Mamametchi
	[11, 6, 16, 25, 4], // Memetchi
];