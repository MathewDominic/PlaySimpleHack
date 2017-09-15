var boot = function(game){
    console.log("Booting Highway to Hell!");
};

module.exports = boot;

boot.prototype = {

    preload: function() {
        this.game.load.image('z', 'img/z.png');
        this.game.load.image('g', 'img/g.png');
        this.game.load.image('v', 'img/v.png');
        this.game.load.image('e', 'img/emptyCell.png');
        this.game.load.image('f', 'img/forwardslash.png');
        this.game.load.image('b', 'img/backslash.png');

        this.game.load.json('initial_state', 'states/initialState.json');
    },

    create: function() {
        this.game.state.start("Preload");
    }
};
