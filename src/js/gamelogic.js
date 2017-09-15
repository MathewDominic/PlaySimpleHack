/**
 * Created by prashant on 15/09/17.
 */
module.exports = function () {
    return {
        init : function (gridpayload) {
            this.gridPayload = JSON.parse(JSON.stringify(gridpayload))
            this.calculateTuples()
            this.leftCount = this.calculateCountforDirection(this.left, this.gridPayload)
            this.rightCount = this.calculateCountforDirection(this.right, this.gridPayload)
            this.upCount = this.calculateCountforDirection(this.up, this.gridPayload)
            this.downCount = this.calculateCountforDirection(this.down, this.gridPayload)
        },
        gridPayload : [],
        left : [],
        right : [],
        up : [],
        down : [],
        leftCount : [],
        rightCount : [],
        upCount : [],
        downCount : [],
        calculateTuples : function () {
            gridpayload = this.gridPayload
            var maxX = gridpayload.length
            var maxY = gridpayload[0].length
            var left = []
            for (var i = 0; i < maxY; i++) {
                left.push(this.getTuple(i, 0, 0, gridpayload, 0))
            }
            this.left = left
            var right = []
            for (var i = 0; i < maxY; i++) {
                right.push(this.getTuple(i, maxY - 1, 1, gridpayload, 0))
            }
            this.right = right
            var up = []
            for (var i = 0; i < maxX; i++) {
                up.push(this.getTuple(maxX - 1, i, 2, gridpayload, 0))
            }
            this.up = up
            var down = []
            for (var i = 0; i < maxX; i++) {
                down.push(this.getTuple(0, i, 3, gridpayload, 0))
            }
            this.down = down
        },
        calculateCountforDirection: function (directionTuple, gridPayload) {
            var directionCount = []
            for(var i=0; i<directionTuple.length; i++){
                var count = this.calculateCount(directionTuple[i], gridPayload)
                directionCount.push(count)
            }
            return directionCount
        },
        calculateCount : function (tuples, gridPayload) {
            var count = 0
            for( var i = 0;i < tuples.length; i++){
                var x = tuples[i][0]
                var y = tuples[i][1]
                var isReflected = tuples[i][2]
                count += this.checkVisiblity(isReflected, gridPayload[x][y])
            }
            return count
        },
        checkVisiblity: function (reflect, monster) {
            return this.visibleMap["" + reflect + monster] ? 1 : 0
        },
        getCount : function () {
            return {
                left : this.leftCount,
                right : this.rightCount,
                up : this.upCount,
                down : this.downCount
            }
        },
        transformMap : {
            "00": 3,
            "01": 2,
            "10": 2,
            "11": 3,
            "20": 1,
            "21": 0,
            "30": 0,
            "31": 1
        },
        visibleMap : {
            "0Z": 1,
            "1Z": 1,
            "0G": 0,
            "1G": 1,
            "0V": 1,
            "1V": 0
        },
        transformDirection : function (direction, transformFunction) {
            return this.transformMap["" + direction + transformFunction]
        },

        getNewX : function (currentX, direction) {
            var nexX = currentX
            if (direction == 3) {
                nexX += 1
            } else if (direction == 2) {
                nexX -= 1
            }
            return nexX
        },

        getNewY : function (currentY, direction) {
            var nexY = currentY
            if (direction == 0) {
                nexY += 1
            } else if (direction == 1) {
                nexY -= 1
            }
            return nexY
        },
        getTuple : function (currentX, currentY, direction, gridpayload, reflected) {
            var maxX = gridpayload.length
            var maxY = gridpayload[0].length

            if (maxX <= currentX || maxY <= currentY || 0 > currentX || 0 > currentY) {
                return null
            }
            var _direction = direction
            var _reflected = reflected
            if (gridpayload[currentX][currentY] == '\\') {
                _direction = this.transformDirection(direction, 0)
                _reflected = 1
            } else if (gridpayload[currentX][currentY] == '/') {
                _direction = this.transformDirection(direction, 1)
                _reflected = 1
            }

            var newX = this.getNewX(currentX, _direction);
            var newY = this.getNewY(currentY, _direction);
            var child = this.getTuple(newX, newY, _direction, gridpayload, _reflected)
            var tuple = [[currentX, currentY, reflected]]
            if (child) {
                tuple = tuple.concat(child)
            }
            return tuple
        },
        checkArrayEquality : function (array1, array2) {
            var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
                    return element === array2[index];
                });
            return is_same
        },
        isWin: function (payload) {
            var leftCount = this.calculateCountforDirection(this.left, payload)
            var rightCount = this.calculateCountforDirection(this.right, payload)
            var upCount = this.calculateCountforDirection(this.up, payload)
            var downCount = this.calculateCountforDirection(this.down, payload)
            if (this.checkArrayEquality(leftCount, this.leftCount) &&
                this.checkArrayEquality(rightCount, this.rightCount) &&
                this.checkArrayEquality(upCount, this.upCount) &&
                this.checkArrayEquality(downCount, this.downCount))
            {
                return true
            }
            return false
        }
    }
}();