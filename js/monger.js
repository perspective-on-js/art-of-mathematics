/*global window*/
;(function($){
    'use strict';

    var Sponge = $.Sponge = function(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.level = 0;
        this.initialize();
        this.update();
    };
    Sponge.prototype.initialize = function(){
        this.context.fillStyle = 'gold';
        this.originalSize = Math.min(this.canvas.width, this.canvas.height);
    };
    Sponge.prototype.update = function(){
        var context = this.context;
        context.clearRect(0, 0, this.originalSize, this.originalSize);
        MONGER: for (var index = 0; index < Math.pow(9, this.level); index++){
            var x = 0;
            var y = 0;
            var address = index;
            var size = this.originalSize;
            for (var currentLevel = this.level; currentLevel >= 0; currentLevel--){
                size /= 3;
                var r = address % 9;
                address = Math.floor(address/9);
                x += (r % 3) * size;
                y += Math.floor(r / 3) * size;
                if (r === 4){
                    continue MONGER;
                }
            }
            context.fillRect(x, y, 3*size, 3*size);
        }
    };
    Sponge.prototype.setLevel = function(level){
        this.level = level;
        this.update();
    };
})(window.monger = window.monger || {});
