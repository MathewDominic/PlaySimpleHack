/**
 * Created by prashant on 15/09/17.
 */

var boot = require('./boot.js');
var preLoad = require('./preLoad');
var initGame = require('./initGame');

window.onload = function() {

    var rows = 5;
    var cols = 5;
    var deviceRatio = 1/((window.innerWidth / window.innerHeight))*rows/2;

    var newWidth = window.innerWidth * deviceRatio;
    var newHeight = window.innerHeight * deviceRatio;
    var game = new Phaser.Game(window.innerWidth, window.innerHeight , Phaser.AUTO, 'HighwayToHell');

    console.log("Registering");

    game.state.add("Boot", boot);
    game.state.add("Preload", preLoad);
    game.state.add("InitGame",initGame);
    game.state.start("Boot");


    function onDown(sprite, pointer) {
        if (sprite.key === 'e')
            sprite.loadTexture('z');
        else if (sprite.key === 'z')
            sprite.loadTexture('g');
        else if (sprite.key === 'g')
            sprite.loadTexture('v');
        else if (sprite.key === 'v')
            sprite.loadTexture('e');
    }
};