/**
 * Created by prashant on 15/09/17.
 */
var test = require('./test.js')
window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var game = new Phaser.Game(1440, 1920, Phaser.AUTO, '', { preload: preload, create: create });
    txtStyle = {
        font: '65px Arial',
        fill: '#ff0044',
        align: 'center'
    };
    var logo = [];
    function preload () {
        game.load.image('z', 'img/z.png');
        game.load.image('g', 'img/g.png');
        game.load.image('v', 'img/v.png');
        game.load.image('e', 'img/emptyCell.png');
        game.load.image('f', 'img/forwardslash.png');
        game.load.image('b', 'img/backslash.png');

        // game.input.onTap.add(onTap, this);
    }

    function create () {
        var xOff, yOff;
        for(var i=0;i<5;i++) {
            var row = [];
            for(var j=0;j<5;j++) {
                yOff = 70;
                xOff = 50;
                if(j == 0 || i == 0) {
                    if(j == 0) {
                        var text = game.add.text(15, 75 + (i * 138), '3', txtStyle);
                        text.anchor.setTo(0, 0);
                    }
                    if(i == 0) {
                        var text = game.add.text(75 + (j * 138), 10, '3', txtStyle);
                        text.anchor.setTo(0, 0);
                    }
                }
                else {
                    var sprite = game.add.sprite(138 * (i-1) + xOff, 138 * (j-1) + yOff, 'e');
                    sprite.inputEnabled = true;
                    sprite.events.onInputDown.add(onDown, this);
                    row.push(sprite);
                }
            }
            logo.push(row);
        }


    }
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