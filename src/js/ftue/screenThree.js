var screenThree = function(game) {
    console.log("FTUE - III");
};

module.exports = screenThree;

screenThree.prototype = {

    preload: function() {
        console.log("FTUE III loaded!");
    },

    create: function() {
        var sprite = this.game.add.sprite(0, 0, 'ftue_3');
        var next_button = this.game.add.button(0, 0, 'next_ftue', this.nextScreen);
        next_button.alignIn(sprite, Phaser.BOTTOM_CENTER, 0, 100);
    },

    nextScreen: function() {
        this.game.state.start("ScreenFour");
    }
};

