var preLoad = function(game) {
    console.log("Starting to preload!");
};

module.exports = preLoad;
var gameLogic = require('./gameLogic.js');
preLoad.prototype = {

    preload: function() {
        initial_state = this.game.cache.getJSON('initial_state');
        gameLogic.init([["Z", "/", "B"], ["\\", "/", "\\"],["Z", "B", "B"]]);
    },

    create: function() {
        console.log("asd",initial_state);
        var rows = initial_state[1]["no_of_rows"];
        var cols = initial_state[1]["no_of_cols"];

        var deviceRatio = 1/((window.innerWidth / window.innerHeight))*rows/2;

        var txtStyle = {
            font: '65px Arial',
            fill: '#ff0044',
            align: 'center'
        };
        var logo = [];
        var xOff, yOff;
        var countsArr = gameLogic.getCount();
        for(var i=0;i<cols+2;i++) {
            var row = [];
            for(var j=0;j<rows+2;j++) {
                yOff = window.innerHeight/4;
                xOff = 150;
                if((j == 0 || i == 0  || j == (cols+1) || i == (rows+1))) {
                    if((i==0 && j==0) || (i==0 && j==rows+1) || (i==cols+1 && j==0) || (i==cols+1 && j==rows+1)) {
                        continue;
                    }
                    var count;
                    if(i == 0) {
                        count = countsArr["left"][j-1];
                    } else if(j == 0) {
                        count = countsArr["down"][i-1];
                    } else if(j == cols+1) {
                        count = countsArr["up"][i-1];
                    } else if(i == rows+1) {
                        count = countsArr["right"][j-1];
                    }
                    var text = this.game.add.text(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, count.toString(), txtStyle);
                    text.scale.setTo(1/deviceRatio, 1/deviceRatio);
                    text.anchor.setTo(0, 0);
                } else {
                    var cellSprite;
                    if(initial_state[1]["grid"][i+1][j+1] == '/') {
                        var text = this.game.add.text(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, '/', txtStyle);
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
            }
            console.log(gameLogic.getCount());
//                logo.push(row);
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