/*global document, Reveal*/
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
})(Reveal);
