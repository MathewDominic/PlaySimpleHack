var levelOptions = function() {
    console.log("Choose level and proceed!");
};

module.exports = levelOptions;

levelOptions.prototype = {

    preload: function() {
        this.game.load.image('back_min', 'img/levels/Back-min.png');
        this.game.load.image('holy_potion', 'img/levels/HolyPotion-min.png');
        this.game.load.image('l1', 'img/levels/L1-min.png');
        this.game.load.image('l2', 'img/levels/L2-min.png');
        this.game.load.image('l3', 'img/levels/L3-min.png');
        this.game.load.image('l4', 'img/levels/L4-min.png');
        this.game.load.image('quests', 'img/levels/quests-min.png');
        this.game.load.image('reference', 'img/levels/reference-min.png');
        this.game.load.image('backdrop', 'img/levels/BG-min.jpg');
    },

    create: function() {

        var deviceRatio = 1/((window.innerWidth / window.innerHeight));
        var sprite = this.game.add.sprite(0,0, 'backdrop');
        sprite.scale.setTo(window.innerWidth/1440, window.innerHeight/2560);

        var back = this.game.add.sprite(0, 0, 'back_min');
        back.alignIn(sprite, Phaser.TOP_LEFT, -20, -20);
        back.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio), 0, 0);

        var quests = this.game.add.sprite(0, 0, 'quests');
        quests.alignIn(sprite, Phaser.TOP_CENTER, 30, -20);
        quests.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio), 0, 0);

        var holy_potion = this.game.add.sprite(0, 0, 'holy_potion');
        holy_potion.alignIn(sprite, Phaser.TOP_RIGHT, 0, -10);
        holy_potion.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio), 0, 0);


        var l1 = this.game.add.button(0, 0, 'l1', this.navigateToFtue);
        l1.alignTo(quests, Phaser.BOTTOM_CENTER, 0, 100);
        l1.scale.setTo(1.5/deviceRatio, 1.5/deviceRatio);

        var l2 = this.game.add.button(0,0, 'l2', this.navigateToPuzzle);
        l2.scale.setTo(1.5/deviceRatio, 1.5/deviceRatio);
        l2.alignTo(l1, Phaser.BOTTOM_CENTER);

        var l3 = this.game.add.button(0, 0, 'l3', this.navigateToPuzzle);
        l3.scale.setTo(1.5/deviceRatio, 1.5/deviceRatio);
        l3.alignTo(l2, Phaser.BOTTOM_CENTER);

        var l4 = this.game.add.button(0, 0, 'l4', this.navigateToPuzzle);
        l4.scale.setTo(1.5/deviceRatio, 1.5/deviceRatio);
        l4.alignTo(l3, Phaser.BOTTOM_CENTER);
    },

    navigateToFtue: function() {
        this.game.state.start("ScreenOne");
    },

    navigateToPuzzle: function() {
        this.game.state.start("Preload");
    }
};