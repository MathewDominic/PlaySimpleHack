/**
 * Created by prashant on 15/09/17.
 */
var test = require('./test.js')
window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var game = new Phaser.Game(1134, 750, Phaser.AUTO, '', { preload: preload, create: create });
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
        for(var i=0;i<4;i++) {
            var row = [];
            for(var j=0;j<4;j++) {
                yOff = 50
                xOff = 50
                // debugger;
                sprite = game.add.sprite((138*i+xOff),138*j+yOff, 'e');
                sprite.inputEnabled = true;
                sprite.events.onInputDown.add(onDown, this);
                row.push(sprite);
            }
            logo.push(row);
        }

    }
    function onDown(sprite, pointer) {
        if (sprite.key === 'e')
            sprite.loadTexture('z')
        else if (sprite.key === 'z')
            sprite.loadTexture('g')
        else if (sprite.key === 'g')
            sprite.loadTexture('v')
        else if (sprite.key === 'v')
            sprite.loadTexture('e')
    }



};