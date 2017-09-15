var screenFour = function(game) {
    console.log("FTUE - IV");
};

module.exports = screenFour;

screenFour.prototype = {

    preload: function() {
        console.log("FTUE IV loaded!");
    },

    create: function() {
        var sprite = this.game.add.sprite(0, 0, 'ftue_4');
        var next_button = this.game.add.button(0, 0, 'next_ftue', this.nextScreen);
        next_button.alignIn(sprite, Phaser.BOTTOM_CENTER, 0, 100);
    },

    nextScreen: function() {
        this.game.state.start("Preload");
    }
};

