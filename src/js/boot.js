var boot = function(game){
    console.log("Booting Highway to Hell!");
};

module.exports = boot;

boot.prototype = {

    preload: function() {
        this.game.load.image('z', 'img/Zombie_m.png');
        this.game.load.image('g', 'img/Ghost_m.png');
        this.game.load.image('v', 'img/Vampire_m.png');
        this.game.load.image('e', 'img/Block.png');
        this.game.load.image('f', 'img/Mirror_m.png');
        this.game.load.image('b', 'img/Mirror_reverse_m.png');
        this.game.load.image('bg', 'img/bp.jpg');
        this.game.load.image('play-button','img/play.png');

        this.game.load.json('initial_state', 'states/initialState.json');
    },

    create: function() {
        var button = this.game.add.button(this.game.world.centerX, 400, 'play-button', this.playTheGame, this, 2, 1, 0);
        button.anchor.set(0.5);
    },

    playTheGame: function(){
        this.game.state.start("Preload");
    }
};
