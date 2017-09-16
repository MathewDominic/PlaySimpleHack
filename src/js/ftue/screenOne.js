var screenOne = function(game) {
    console.log("FTUE - I");
};

module.exports = screenOne;

screenOne.prototype = {

    preload: function() {
        console.log("FTUE I loaded!");
    },

    create: function() {
        var sprite = this.game.add.sprite(0, 0, 'ftue_1');
        var next_button = this.game.add.button(0, 0, 'next_ftue', this.nextScreen);
        sprite.scale.setTo(0.5,0.5)
        next_button.alignIn(sprite, Phaser.BOTTOM_CENTER, 0, 100);
    },

    nextScreen: function() {
        this.game.state.start("ScreenTwo");
    }
};

