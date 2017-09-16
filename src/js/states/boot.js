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
        this.game.load.image('x', 'img/x.png');
        this.game.load.image('bg', 'img/bp.jpg');
        this.game.load.image('play-button','img/play.png');

        this.game.load.image('ftue_1', 'img/ftue/1a.jpg');
        this.game.load.image('ftue_2', 'img/ftue/2a.jpg');
        this.game.load.image('ftue_3', 'img/ftue/3a.jpg');
        this.game.load.image('ftue_4', 'img/ftue/4a.jpg');
        this.game.load.image('ftue_1b', 'img/ftue/1b.jpg');
        this.game.load.image('ftue_2b', 'img/ftue/2b.jpg');
        this.game.load.image('ftue_3b', 'img/ftue/3b.jpg');
        this.game.load.image('ftue_4b', 'img/ftue/4b.jpg');
        this.game.load.image('ftue_5', 'img/ftue/5a.jpg');
        this.game.load.image('ftue_6', 'img/ftue/6a.jpg');
        this.game.load.image('ftue_7', 'img/ftue/7a.jpg');
        this.game.load.image('ftue_1c', 'img/ftue/1c.jpg');
        this.game.load.image('ftue_2c', 'img/ftue/2c.jpg');
        this.game.load.image('next_ftue', 'img/ftue/next-min.png');

        this.game.load.image('bg_min', 'img/ftue/BG-min.jpg');
        this.game.load.image('proceed-button', 'img/ftue/proceed-min.png');
        this.game.load.image('spash_min', 'img/ftue/splash-min.jpg');
        this.game.load.image('hth_title', 'img/ftue/title-min.png');

		this.game.load.image('vampire','img/Vampire.png');
        this.game.load.image('zombie','img/Zombie.png');
        this.game.load.image('ghost','img/Ghost.png');

        this.game.load.image('se','img/show_error.png');
        this.game.load.image('sm','img/show_monster.png');
        this.game.load.image('tm','img/turn_mirror.png');

        this.game.load.image('back','img/Back.png');
        this.game.load.image('holpos','img/holy_options.png');
        this.game.load.image('timer','img/Timer.png');
        this.game.load.image('congrats','img/Congrats.jpg');

        this.game.load.image('0','img/0.png');
        this.game.load.image('1','img/1.png');
        this.game.load.image('2','img/2.png');
        this.game.load.image('3','img/3.png');
        this.game.load.image('4','img/4.png');
        this.game.load.image('5','img/5.png');

        this.game.load.image('bd','img/bd.png');
        this.game.load.image('bl','img/bl.png');
        this.game.load.image('br','img/br.png');
        this.game.load.image('bu','img/bu.png');
        this.game.load.image('fl','img/fl.png');
        this.game.load.image('fr','img/fr.png');
        this.game.load.image('fd','img/fd.png');
        this.game.load.image('fu','img/fu.png');
        this.game.load.image('up','img/up.png');
        this.game.load.image('left','img/left.png');
        this.game.load.image('right','img/right.png');
        this.game.load.image('down','img/down.png');

        this.game.load.json('initial_state', 'states/initialState.json');
        // this.game.load.audio('music', ['img/music.mp3']);
        this.game.load.audio('music', ['img/music.mp3']);
    },

    create: function() {

        var deviceRatio = 1/((window.innerWidth / window.innerHeight));
        var sprite = this.game.add.button(0,0, 'spash_min',this.playTheGame);
        sprite.scale.setTo(window.innerWidth/1440, window.innerHeight/2560);

        // var title = this.game.add.sprite(0,0, 'hth_title');
        // title.scale.setTo(1/4*deviceRatio, 1/4*deviceRatio);
        // title.alignIn(sprite, Phaser.CENTER);
        //
        // var next_button = this.game.add.button((this.game.world.width)/3, (2*this.game.world.height)/3, 'proceed-button', this.playTheGame);
        // next_button.scale.setTo(1/4*deviceRatio, 1/4*deviceRatio);
        //var button = this.game.add.button(this.game.world.centerX, 400, 'play-button', this.playTheGame, this, 2, 1, 0);
        //button.anchor.set(0.5);
    },

    playTheGame: function(){
        // this.game.state.start("Preload");
        this.game.state.start("LevelOptions");
    }
};
