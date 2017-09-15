/**
 * Created by prashant on 15/09/17.
 */

// States designed for the Game.
var boot = require('./states/boot');
var levelOptions = require('./states/levelOptions');
var preLoad = require('./states/preLoad');
var initGame = require('./states/initGame');

// Screens required for FTUE.
var screenOne = require('./ftue/screenOne');
var screenTwo = require('./ftue/screenTwo');
var screenThree = require('./ftue/screenThree');
var screenFour = require('./ftue/screenFour');


window.onload = function() {

    var game = new Phaser.Game(window.innerWidth, window.innerHeight , Phaser.AUTO, 'HighwayToHell');

    console.log("Registering");

    game.state.add("Boot", boot);
    game.state.add("LevelOptions", levelOptions);
    game.state.add("Preload", preLoad);
    game.state.add("InitGame",initGame);

    game.state.add("ScreenOne", screenOne);
    game.state.add("ScreenTwo", screenTwo);
    game.state.add("ScreenThree", screenThree);
    game.state.add("ScreenFour", screenFour);

    game.state.start("Boot");
};