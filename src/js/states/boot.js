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

        this.game.load.image('ftue_1', 'img/ftue/1a-min.jpg');
        this.game.load.image('ftue_2', 'img/ftue/2-min.png');
        this.game.load.image('ftue_3', 'img/ftue/3-min.png');
        this.game.load.image('ftue_4', 'img/ftue/4-min.png');
        this.game.load.image('next_ftue', 'img/ftue/next-min.png');

		this.game.load.image('vampire','img/Vampire.png');
        this.game.load.image('zombie','img/Zombie.png');
        this.game.load.image('ghost','img/Ghost.png');

        this.game.load.image('0','img/0.png');
        this.game.load.image('1','img/1.png');
        this.game.load.image('2','img/2.png');
        this.game.load.image('3','img/3.png');
        this.game.load.image('4','img/4.png');
        this.game.load.image('5','img/5.png');


        this.game.load.json('initial_state', 'states/initialState.json');
    },

    create: function() {
        var button = this.game.add.button(this.game.world.centerX, 400, 'play-button', this.playTheGame, this, 2, 1, 0);
        button.anchor.set(0.5);
    },

    playTheGame: function(){
        this.game.state.start("Preload");
        // this.game.state.start("ScreenOne");
    }
};
