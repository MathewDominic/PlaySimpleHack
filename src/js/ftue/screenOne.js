var screenOne = function(game) {
    console.log("FTUE - I");
};

module.exports = screenOne;

screenOne.prototype = {

    preload: function() {
        console.log("FTUE I loaded!");
    },

    create: function() {
        var deviceRatio = 1/((window.innerWidth / window.innerHeight));
        var sprite = this.game.add.sprite(0, 0, 'ftue_1');
        sprite.scale.setTo(window.innerWidth/1440, window.innerHeight/2560);
        var next_button = this.game.add.button(0, 0, 'next_ftue', this.nextScreen);
        next_button.alignIn(sprite, Phaser.BOTTOM_CENTER, 0, 100);
        // next_button.scale.setTo(1/deviceRatio, 1/deviceRatio);
    },

    nextScreen: function() {
        this.game.state.start("ScreenTwo");
    }
};

