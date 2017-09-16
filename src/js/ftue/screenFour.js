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
        sprite.scale.setTo(window.innerWidth/1440, window.innerHeight/2560);
        var next_button = this.game.add.button(0, 0, 'next_ftue', this.nextScreen);
        sprite.scale.setTo(0.5, 0.5);
        next_button.alignTo(sprite, Phaser.BOTTOM_CENTER, 0, 0);
    },

    nextScreen: function() {
        this.game.state.start("Preload");
    }
};

