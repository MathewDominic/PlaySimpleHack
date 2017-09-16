var preLoad = function(game) {
    console.log("Starting to preload!");
};

module.exports = preLoad;
var gameLogic = require('./gamelogic.js');

preLoad.prototype = {

    preload: function() {
        initial_state = this.game.cache.getJSON('initial_state');
        level = this.game.cache['level'];
        if(level){
            this.game.cache['level'] += 1
        } else {
            this.game.cache['level'] = 1
        }
        cash = this.game.cache['cash']
        if(!cash && cash != 0){
            this.game.cache['cash'] = 1000
        }
        this.inputMatrix = null
        console.log("sdf",level);
        gameLogic.init(initial_state[this.game.cache['level']]["grid"]);
    },

    inputMatrix: null,

    create: function() {
        console.log("json",initial_state[this.game.cache['level']]);
        // var zombieCount = initial_state[this.game.cache['level']]['mummies'];
        // var ghostCount = initial_state[this.game.cache['level']]['ghosts'];
        // var VampireCount = initial_state[this.game.cache['level']]['vamps'];
        var rows = initial_state[this.game.cache['level']]["no_of_rows"];
        var cols = initial_state[this.game.cache['level']]["no_of_cols"];
        var los = [];

        var deviceRatio = 1/((window.innerWidth / window.innerHeight))*rows/2;
        var sprite = this.game.add.sprite(0,0, 'bg');
        sprite.scale.setTo(window.innerWidth/1440, window.innerHeight/2560);

        var back = this.game.add.sprite(0, 0, 'back');
        back.alignIn(sprite, Phaser.TOP_LEFT);
        back.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio));

        // var back = this.game.add.sprite(window.innerWidth/12,window.innerHeight/16, 'back');
        // back.scale.setTo(1 / (deviceRatio/rows*3) , 1 / (deviceRatio/rows*3));

        var holpos = this.game.add.sprite(0, 0, 'holpos');
        holpos.alignIn(sprite, Phaser.TOP_CENTER);
        holpos.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio));

        var style = {align: "center"};

        var holpostext = this.game.add.text(0, 0, this.game.cache['cash'], style);
        holpostext.alignIn(holpos, Phaser.CENTER, 10, 10);
        holpostext.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio));

        // var holpostext = this.game.add.text(window.innerWidth/7+window.innerWidth/4,window.innerHeight/10, this.game.cache['cash'], {});
        // holpostext.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));

        // var holpos = this.game.add.sprite(window.innerWidth/12+window.innerWidth/4,window.innerHeight/18, 'holpos');
        // holpos.scale.setTo(1 / ((deviceRatio/rows*3)*3), 1 / ((deviceRatio/rows*3)*3));

        //var timer = this.game.add.sprite(window.innerWidth/12+ window.innerWidth/4 + window.innerWidth/4,window.innerHeight/16, 'timer');
        //timer.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));

        var timer = this.game.add.sprite(0, 0, 'timer');
        timer.alignIn(sprite, Phaser.TOP_RIGHT);
        timer.scale.setTo(1 / (deviceRatio) , 1 / (deviceRatio), 0, 0);


		var music = new Phaser.Sound(this.game,'music',1,true);
        music.play();

        var zombie = this.game.add.sprite(window.innerWidth/4,window.innerHeight/12, 'zombie');
        zombie.scale.setTo(1 / (deviceRatio/rows*3) , 1 / (deviceRatio/rows*3));
        var ghost = this.game.add.sprite(window.innerWidth/4+window.innerWidth/6,window.innerHeight/12, 'ghost');
        ghost.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));
        var vampire = this.game.add.sprite(window.innerWidth/4+ window.innerWidth/6 + window.innerWidth/6,window.innerHeight/12, 'vampire');
        vampire.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));

        var zombieCount = this.game.add.sprite(window.innerWidth/4,window.innerHeight/6, initial_state[this.game.cache['level']]['mummies'].toString());
        zombieCount.scale.setTo(1 / (deviceRatio/rows*3) , 1 / (deviceRatio/rows*3));
        var ghostCount = this.game.add.sprite(window.innerWidth/4+window.innerWidth/6,window.innerHeight/6, initial_state[this.game.cache['level']]['ghosts'].toString());
        ghostCount.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));
        var vampireCount = this.game.add.sprite(window.innerWidth/4+ window.innerWidth/6 + window.innerWidth/6,window.innerHeight/6, initial_state[this.game.cache['level']]['vamps'].toString());
        vampireCount.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));
        // var vampire = this.game.add.sprite(window.innerWidth/4,window.innerHeight/8, 'vampire');
        // vampire.scale.setTo(1 / deviceRatio , 1 / deviceRatio);
        // var zombie = this.game.add.sprite(window.innerWidth/4+window.innerWidth/6,window.innerHeight/8, 'zombie');
        // zombie.scale.setTo(1 / deviceRatio, 1 / deviceRatio);

        var txtStyle = {
            font: '65px Arial',
            fill: '#ffffff',
            align: 'center'
        };
        var logo = [];
        var xOff, yOff;
        var inputMatrix = JSON.parse(JSON.stringify(initial_state[this.game.cache['level']]["grid"]));
        for(var i=0;i<inputMatrix.length;i++) {
            for(var j=0;j<inputMatrix[i].length;j++) {
                if(!((inputMatrix[i][j] == '/') || (inputMatrix[i][j] == '\\')))
                    inputMatrix[i][j]=this.inputMatrix ? this.inputMatrix[i][j] : 'E'
            }
        }
        if(!this.inputMatrix){
            this.inputMatrix = inputMatrix
        }
        this.isRotateEnabled = false
        console.log("asf",inputMatrix);
        var countsArr = gameLogic.getCount();
        for(var i=0;i<cols+2;i++) {
            var row = [];
            for(var j=0;j<rows+2;j++) {
                yOff = window.innerHeight/2.5;
                xOff = window.innerWidth/4;
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
                    text.inputEnabled = true;
                    text.events.onInputDown.add(onDownCount.bind(this,j,i,inputMatrix,rows,cols), this);
                    text.anchor.setTo(0, 0);
                } else {
                    var cellSprite;
                    if(this.showCorrect && this.showCorrect[0] == j-1 && this.showCorrect[1] == i-1){
                        var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, initial_state[this.game.cache['level']]["grid"][j-1][i-1].toLowerCase());
                        sprite.scale.setTo(1/deviceRatio, 1/deviceRatio);
                        sprite.inputEnabled = true;
                        sprite.events.onInputDown.add(onDown.bind(this,j,i,inputMatrix), this);
                        sprite.anchor.setTo(0, 0);
                        this.inputMatrix[j-1][i-1] = initial_state[this.game.cache['level']]["grid"][j-1][i-1]
                        inputMatrix[j-1][i-1] = initial_state[this.game.cache['level']]["grid"][j-1][i-1]
                        if(gameLogic.isWin(inputMatrix)){
                            music.stop();
                            this.game.state.start("Preload")
                        }
                        this.showCorrect = null
                    } else if(this.showWrong && this.showWrong[0] == j-1 && this.showWrong[1] == i-1){
                        var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, 'back');
                        sprite.scale.setTo(1/deviceRatio, 1/deviceRatio);
                        sprite.inputEnabled = true;
                        sprite.events.onInputDown.add(onDown.bind(this,j,i,inputMatrix), this);
                        sprite.anchor.setTo(0, 0);
                        this.showWrong = null
                    } else if(initial_state[this.game.cache['level']]["grid"][j-1][i-1] == '/') {
                        var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, 'f');
                        sprite.scale.setTo(1/deviceRatio, 1/deviceRatio);
                        sprite.inputEnabled = true;
                        sprite.events.onInputDown.add(rotate.bind(this,j,i,initial_state[this.game.cache['level']]["grid"]), this);
                        sprite.anchor.setTo(0, 0);
                    } else if(initial_state[this.game.cache['level']]["grid"][j-1][i-1] == '\\') {
                        var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, 'b');
                        sprite.scale.setTo(1/deviceRatio, 1/deviceRatio);
                        sprite.inputEnabled = true;
                        sprite.anchor.setTo(0, 0);
                        sprite.events.onInputDown.add(rotate.bind(this,j,i,initial_state[this.game.cache['level']]["grid"]), this);
                    } else {
                        var sprite = this.game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, inputMatrix[j-1][i-1].toLowerCase());
                        sprite.scale.setTo(1 / deviceRatio, 1 / deviceRatio);
                        sprite.inputEnabled = true;
                        sprite.events.onInputDown.add(onDown.bind(this,j,i,inputMatrix), this);
                        row.push(sprite);
                    }
                }
            }
        }

        var show_error = this.game.add.sprite(window.innerWidth/4,7*window.innerHeight/8, 'se');
        show_error.scale.setTo(1 / (deviceRatio/rows*3) , 1 / (deviceRatio/rows*3));
        show_error.inputEnabled = true;
        show_error.events.onInputDown.add(showError, this);

        var show_monster = this.game.add.sprite(window.innerWidth/4+window.innerWidth/6,7*window.innerHeight/8, 'sm');
        show_monster.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));
        show_monster.inputEnabled = true;
        show_monster.events.onInputDown.add(showMonster, this);

        var turn_mirror = this.game.add.sprite(window.innerWidth/4+ window.innerWidth/6 + window.innerWidth/6,7*window.innerHeight/8, 'tm');
        turn_mirror.scale.setTo(1 / (deviceRatio/rows*3), 1 / (deviceRatio/rows*3));
        turn_mirror.inputEnabled = true;
        turn_mirror.events.onInputDown.add(turnMiror, this);
        
        function turnMiror(sprite, pointer) {
            this.isRotateEnabled = true
        }
        function showMonster(sprite, pointer){
            if(this.game.cache['cash'] < 50){
                return
            }
            this.game.cache['cash'] -= 50
            var origin = gameLogic.gridPayload
            for (var i=0; i<this.inputMatrix.length; i++){
                for (var j=0; j<this.inputMatrix[i].length; j++){
                    if((origin[i][j] == 'Z' || origin[i][j] == 'V' || origin[i][j] == 'G') && (origin[i][j] != this.inputMatrix[i][j])){
                        this.showCorrect = [i,j]
                        break
                    }
                }
            }
            this.create()
        }
        function showError(sprite, pointer){
            if(this.game.cache['cash'] < 50){
                return
            }
            this.game.cache['cash'] -= 50
            var wrongs = gameLogic.getWrong(this.inputMatrix)
            var limit = wrongs.length
            var ele = Math.floor((Math.random() * 100) + 1) % limit
            this.showWrong = wrongs[ele]
            this.create()
        }
        function rotate(i,j,inputMatrix,sprite, pointer) {
            if(!this.isRotateEnabled){
                return
            }
            if(this.game.cache['cash'] < 50){
                return
            }
            this.game.cache['cash'] -= 50
            if(inputMatrix[i-1][j-1] == '\\'){
                inputMatrix[i-1][j-1] = '/'
                sprite.loadTexture('f')
            } else if(inputMatrix[i-1][j-1] == '/'){
                inputMatrix[i-1][j-1] = '\\'
                sprite.loadTexture('b')
            }
            this.isRotateEnabled = false
            // this.isEnabled = false
            gameLogic.init(inputMatrix)
            this.create()
        }

        function onDown(i,j,inputMatrix,sprite, pointer) {
            console.log(i,j);
            this.isRotateEnabled = false
            if (sprite.key === 'e') {
                sprite.loadTexture('z');
                inputMatrix[i-1][j-1] = 'Z'
                this.inputMatrix[i-1][j-1] = 'Z'
            }
            else if (sprite.key === 'z') {
                if(initial_state[this.game.cache['level']]["ghosts"] == 0 && initial_state[this.game.cache['level']]["vamps"] == 0) {
                    sprite.loadTexture('e');
                    inputMatrix[i-1][j-1] = 'E';
                    this.inputMatrix[i-1][j-1] = 'E';
                } else {
                    sprite.loadTexture('g');
                    inputMatrix[i - 1][j - 1] = 'G'
                    this.inputMatrix[i - 1][j - 1] = 'G'
                }
            }
            else if (sprite.key === 'g') {
                sprite.loadTexture('v');
                inputMatrix[i-1][j-1] = 'V'
                this.inputMatrix[i-1][j-1] = 'V'
            }
            else if (sprite.key === 'v') {
                sprite.loadTexture('e');
                inputMatrix[i-1][j-1] = 'E'
                this.inputMatrix[i-1][j-1] = 'E'
            } else{
                sprite.loadTexture('e');
                inputMatrix[i-1][j-1] = 'E'
                this.inputMatrix[i-1][j-1] = 'E'
            }
            if(gameLogic.isWin(inputMatrix)){
                music.stop();
                this.game.state.start("Preload")
            }
        }
        function onDownCount(i,j,inputMatrix, rows, cols, sprite, pointer) {
            // console.log("matrix",inputMatrix);
            var direction;
            if(i == rows + 1) {
                direction = "up";
                i--;
            } else if(i == 0) {
                direction = "down";
                i++;
            } else if(j == 0) {
                direction = "right";
                j++;
            } else if(j == cols+1) {
                direction = "left";
                j--;
            }
            los = [];
            lineOfSight(i,j,direction,inputMatrix,rows,cols,this.game);
            var sprite2 = [];
            for(var k = 0; k < los.length; k++) {
                // debugger;
                var img = 'e';
                if(los[k][3] == 'E') {
                    img = los[k][2];
                } else if(los[k][3] == '/') {
                    img = 'f' + los[k][2][0];
                }
                else if(los[k][3] == '\\') {
                    img = 'b' + los[k][2][0];
                }
                var spriteTemp = this.game.add.sprite(los[k][0], los[k][1], img);
                spriteTemp.scale.setTo(1 / deviceRatio, 1 / deviceRatio);
                sprite2.push(spriteTemp);
                this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                    for(var m=0; m < sprite2.length; m++) {
                        sprite2[m].kill();
                    }
                }, this);
            }
        }
        function lineOfSight(i,j,direction,inputMatrix,rows,cols,game) {
            if((j == 0 || i == 0  || j == (cols+1) || i == (rows+1))) {
                return;
            }
            console.log("this",game,inputMatrix);
            console.log("current",i,j, direction);
            los.push([138 / deviceRatio * (j - 1) + xOff, 138 / deviceRatio * (i - 1) + yOff,direction,inputMatrix[i-1][j-1]]);
            // var sprite = game.add.sprite(138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff, 'b');
            // console.log("cordiates",138 / deviceRatio * (i - 1) + xOff, 138 / deviceRatio * (j - 1) + yOff);
            // sprite.scale.setTo(1 / deviceRatio, 1 / deviceRatio);
            if(inputMatrix[i-1][j-1] == '/') {
                if(direction == "up") {
                    direction = "right";
                    lineOfSight(i,j+1,direction,inputMatrix,rows,cols,game)
                } else if(direction == "down") {
                    direction = "left";
                    lineOfSight(i,j-1,direction,inputMatrix,rows,cols,game)
                } else if(direction == "left") {
                    direction = "down";
                    lineOfSight(i+1,j,direction,inputMatrix,rows,cols,game)
                } else if(direction == "right") {
                    direction = "up";
                    lineOfSight(i-1,j,direction,inputMatrix,rows,cols,game)
                }
            }
            if(inputMatrix[i-1][j-1] == '\\') {
                if(direction == "up") {
                    direction = "left";
                    lineOfSight(i,j-1,direction,inputMatrix,rows,cols)
                } else if(direction == "down") {
                    direction = "right";
                    lineOfSight(i,j+1,direction,inputMatrix,rows,cols)
                } else if(direction == "left") {
                    direction = "up";
                    lineOfSight(i-1,j,direction,inputMatrix,rows,cols)
                } else if(direction == "right") {
                    direction = "down";
                    lineOfSight(i+1,j,direction,inputMatrix,rows,cols)
                }
            }

            if(direction == "up") {
                if(i == 1) {
                    return;
                }
                // console.log(i-1,j);
                lineOfSight(i-1,j,direction,inputMatrix,rows,cols)
            } else if(direction == "down") {
                if(i == rows) {
                    return;
                }
                // console.log(i + 1, j);
                lineOfSight(i+1,j,direction,inputMatrix,rows,cols)
            } else if(direction == "right") {
                if(j == cols) {
                    return;
                }
                // console.log(i,j+1);
                lineOfSight(i,j+1,direction,inputMatrix,rows,cols)
            } else if(direction == "left") {
                if(j == 0) {
                    return;
                }
                // console.log(i, j-1);
                lineOfSight(i,j-1,direction,inputMatrix,rows,cols)
            }
            // } else if(direction == "up") {
            //     console.log(i-1,j);
            // }
        }
        //this.game.state.start("InitGame");
    }
};