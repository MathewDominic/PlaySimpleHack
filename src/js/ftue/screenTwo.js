var screenTwo = function(game) {
    console.log("FTUE - II");
};

module.exports = screenTwo;

screenTwo.prototype = {

    preload: function() {
        console.log("FTUE II loaded!");
    },

    create: function() {
        var sprite = this.game.add.sprite(0, 0, 'ftue_2');
        var next_button = this.game.add.button(0, 0, 'next_ftue', this.nextScreen);
        next_button.alignIn(sprite, Phaser.BOTTOM_CENTER, 0, 100);
    },

    nextScreen: function() {
        this.game.state.start("ScreenThree");
    }
};

