/*global document, Reveal, Chart*/
;(function(Reveal){
    'use strict';

    var events = {
        'art-of-mathematics': function(){
            document.body.addEventListener('keydown', (function(){
                var h1 = document.getElementById('title');
                var elements = ['art', 'mathematics'].map(function(word){
                    return '.' + word;
                }).map(function(aClass){
                    return h1.querySelector(aClass);
                });
                var index = 0;
                var handler = function(event){
                    if (event.keyCode === 65) { /* a */
                        if (index < elements.length) {
                            elements[index++].classList.add('wave');
                        }
                        if (index === elements.length) {
                            this.removeEventListener(event.type, handler);
                        }
                    }
                };
                return handler;
            })());
        },
        'self-similar-square': function(){
            var divide = (function(){
                var canvas = document.getElementById('self-similar-square');
                var context = canvas.getContext('2d');
                context.fillStyle = 'gold';
                context.strokeStyle = 'black';
                context.lineWidth = 5;
                return function divide(n) {
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    var size = canvas.width/n;
                    for (var i = 0; i < n; i++){
                        for (var j = 0; j < n; j++){
                            context.strokeRect(i * size, j * size, size, size);
                        }
                    }
                };
            })();
            document.body.addEventListener('keydown', (function(){
                var n = 1;
                var handler = function(event){
                    if (event.keyCode === 65) { /* a */
                        divide(++n);
                        if (n === 5) {
                            this.removeEventListener(event.type, handler);
                        }
                    }
                };
                return handler;
            })());
            divide(1);
        },
        'square-chart': function(){
            var canvas = document.getElementById('square-chart');
            var context = canvas.getContext('2d');
            var chart = new Chart(context);
            var data = {
                'labels': [1, 2, 3, 4, 5],
                'datasets': [
                    {
                        'label': 'Subsquares',
                        'data': [1, 4, 9, 16, 25]
                    }
                ]
            };
            chart.Line(data);
        }
    };
    var revealListener = (function(){
        var visited = {};
        return function revealListener(event){
            if (!(event.type in visited) && (event.type in events)) {
                events[event.type].call(undefined, event);
                visited[event.type] = true;
            }
        };
    })();

    for (var type in events) {
        Reveal.addEventListener(type, revealListener);
    }
})(Reveal, Chart);
