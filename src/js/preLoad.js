var preLoad = function(game) {
    console.log("Starting to preload!");
};

module.exports = preLoad;

preLoad.prototype = {

    preload: function() {
        initial_state = this.game.cache.getJSON('initial_state');
        level = this.game.cache['level'];
        if(level){
            this.game.cache['level'] += 1
        } else {
            this.game.cache['level'] = 1
        }
        console.log("sdf",level);
        gameLogic.init(initial_state[this.game.cache['level']]["grid"]);
    },

    create: function() {
        console.log("asd",initial_state);
        var rows = initial_state[this.game.cache['level']]["no_of_rows"];
        var cols = initial_state[this.game.cache['level']]["no_of_cols"];

        var deviceRatio = 1/((window.innerWidth / window.innerHeight))*rows/2;

        var txtStyle = {
            font: '65px Arial',
            fill: '#ff0044',
            align: 'center'
        };
        var logo = [];
        var xOff, yOff;
        var inputMatrix = initial_state[this.game.cache['level']]["grid"];
        for(var i=0;i<inputMatrix.length;i++) {
            for(var j=0;j<inputMatrix[i].length;j++) {
                if(!((inputMatrix[i][j] == '/') || (inputMatrix[i][j] == '\\')))
                    inputMatrix[i][j]='B';
            }
        }
        console.log("asf",inputMatrix);
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
                    if(initial_state[this.game.cache['level']]["grid"][j-1][i-1] == '/') {
                        var text = this.game.add.text(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, '/', txtStyle);
                        text.scale.setTo(1/deviceRatio, 1/deviceRatio);
                        text.anchor.setTo(0, 0);
                    } else if(initial_state[this.game.cache['level']]["grid"][j-1][i-1] == '\\') {
                        var text = this.game.add.text(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, '\\', txtStyle);
                        text.scale.setTo(1/deviceRatio, 1/deviceRatio);
                        text.anchor.setTo(0, 0);
                    } else {
                        var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, 'e');
                        sprite.scale.setTo(1 / deviceRatio, 1 / deviceRatio);
                        sprite.inputEnabled = true;
                        sprite.events.onInputDown.add(onDown.bind(this,j,i,inputMatrix), this);
                        row.push(sprite);
                    }
                }
            }
            console.log(gameLogic.getCount());
//                logo.push(row);
        }

        function onDown(i,j,inputMatrix,sprite, pointer) {
            console.log(i,j);

            if (sprite.key === 'e') {
                sprite.loadTexture('z');
                inputMatrix[i-1][j-1] = 'Z'
            }
            else if (sprite.key === 'z') {
                sprite.loadTexture('g');
                inputMatrix[i-1][j-1] = 'G'
            }
            else if (sprite.key === 'g') {
                sprite.loadTexture('v');
                inputMatrix[i-1][j-1] = 'V'
            }
            else if (sprite.key === 'v') {
                sprite.loadTexture('e');
                inputMatrix[i-1][j-1] = 'B'
            }
            if(gameLogic.isWin(inputMatrix)){
                this.game.state.start("Preload")
            }
        }

        //this.game.state.start("InitGame");
    }
};