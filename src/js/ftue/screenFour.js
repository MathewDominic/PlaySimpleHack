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
        sprite.alignIn(this.game.world.bounds, Phaser.TOP_CENTER);
        var next_button = this.game.add.button((this.game.world.width)/4, (2.3*this.game.world.height)/3, 'next_ftue', this.nextScreen);
    },

    nextScreen: function() {
        this.game.state.start("Preload");
    }
};