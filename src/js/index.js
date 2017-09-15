/**
 * Created by prashant on 15/09/17.
 */
var test = require('./test.js')
window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var game = new Phaser.Game(1440, 1920, Phaser.AUTO, '', { preload: preload, create: create });

    game.state.add("Boot", boot);
    game.state.add("Preload", preLoad);
    game.state.add("InitGame",initGame);
    game.state.start("Boot");

    txtStyle = {
        font: '65px Arial',
        fill: '#ff0044',
        align: 'center'
    };

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