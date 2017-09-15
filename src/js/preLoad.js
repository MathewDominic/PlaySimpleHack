var preload = function(game) {
    console.log("Starting to preload!");
};

preload.prototype = {

    preload: function() {

        var initial_state = game.Cache.getJSON('initial_state');

        var logo = [];
        var xOff, yOff;
        for(var i=0;i<5;i++) {
            var row = [];
            for(var j=0;j<5;j++) {
                yOff = 70;
                xOff = 50;
                if(j == 0 || i == 0) {
                    var text;
                    if(j == 0) {
                        text = game.add.text(15, 75 + (i * 138), '3', txtStyle);
                    }
                    if(i == 0) {
                        text = game.add.text(75 + (j * 138), 10, '3', txtStyle);
                    }
                    text.anchor.setTo(0, 0);
                }
                else {
                    var sprite = game.add.sprite(138 * (i-1) + xOff, 138 * (j-1) + yOff, 'e');
                    sprite.inputEnabled = true;
                    sprite.events.onInputDown.add(onDown, this);
                    row.push(sprite);
                }
            }
            logo.push(row);
        }
    },

    create: function() {
        this.game.state.start("InitGame");
    }
};