var preLoad = function(game) {
    console.log("Starting to preload!");
};

module.exports = preLoad;

preLoad.prototype = {

    preload: function() {
        var initial_state = this.game.cache.getJSON('initial_state');
        console.log(initial_state);
    },

    create: function() {

        var rows = 5;
        var cols = 5;

        var deviceRatio = 1/((window.innerWidth / window.innerHeight))*rows/2;

        var txtStyle = {
            font: '65px Arial',
            fill: '#ff0044',
            align: 'center'
        };
        var logo = [];
        var xOff, yOff;
        for(var i=0;i<cols+2;i++) {
            var row = [];
            for(var j=0;j<rows+2;j++) {
                yOff = 150;
                xOff = 50;
                if((j == 0 || i == 0  || j == (cols+1) || i == (rows+1))) {
                    if((i==0 && j==0) || (i==0 && j==rows+1) || (i==cols+1 && j==0) || (i==cols+1 && j==rows+1)) {
                        continue;
                    }
                    var text = this.game.add.text(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, '3', txtStyle);
                    text.scale.setTo(1/deviceRatio, 1/deviceRatio);
                    text.anchor.setTo(0, 0);
                } else {
                    var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, 'e');
                    sprite.scale.setTo(1 / deviceRatio, 1 / deviceRatio);
                    sprite.inputEnabled = true;
                    sprite.events.onInputDown.add(onDown, this);
                    row.push(sprite);
                }
            }
                logo.push(row);
        }

        function onDown(sprite, pointer) {
            if (sprite.key === 'e')
                sprite.loadTexture('z');
            else if (sprite.key === 'z')
                sprite.loadTexture('g');
            else if (sprite.key === 'g')
                sprite.loadTexture('v');
            else if (sprite.key === 'v')
                sprite.loadTexture('e');
        }

        //this.game.state.start("InitGame");
    }
};