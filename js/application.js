/*global document, Reveal, Chart, monger*/
;(function(Reveal, Chart, monger){
    'use strict';

    Chart.defaults.global = {
        // Boolean - Whether to animate the chart
        animation: true,

        // Number - Number of animation steps
        animationSteps: 60,

        // String - Animation easing effect
        // Possible effects are:
        // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
        //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
        //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
        //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
        //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
        //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
        //  easeOutElastic, easeInCubic]
        animationEasing: 'easeOutQuart',

        // Boolean - If we should show the scale at all
        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,

        // String - Colour of the scale line
        scaleLineColor: 'rgba(255,215,0,1)',

        // Number - Pixel width of the scale line
        scaleLineWidth: 1,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        // Interpolated JS string - can access value
        scaleLabel: '<%=value%>',

        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,

        // String - Scale label font declaration for the scale label
        scaleFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',

        // Number - Scale label font size in pixels
        scaleFontSize: 12,

        // String - Scale label font weight style
        scaleFontStyle: 'normal',

        // String - Scale label font colour
        scaleFontColor: 'rgba(255,215,0,1)',

        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: false,

        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
        customTooltips: false,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ['mousemove', 'touchstart', 'touchmove'],

        // String - Tooltip background colour
        tooltipFillColor: 'rgba(125,125,125,0.8)',

        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',

        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,

        // String - Tooltip font weight style
        tooltipFontStyle: 'normal',

        // String - Tooltip label font colour
        tooltipFontColor: '#fff',

        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',

        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,

        // String - Tooltip title font weight style
        tooltipTitleFontStyle: 'bold',

        // String - Tooltip title font colour
        tooltipTitleFontColor: '#fff',

        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,

        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,

        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,

        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 6,

        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,

        // String - Template string for single tooltips
        tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>',

        // String - Template string for multiple tooltips
        multiTooltipTemplate: '<%= value %>',

        // Function - Will fire on animation progression.
        onAnimationProgress: function(){},

        // Function - Will fire on animation completion.
        onAnimationComplete: function(){}
    };

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
                var n = 0;
                var handler = function(event){
                    if (event.keyCode === 65) { /* a */
                        divide(Math.pow(3,++n));
                        if (n === 3) {
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
            var points = [0, 1, 2, 3, 4];
            var data = {
                'labels': points,
                'datasets': [
                    {
                        'label': 'Subsquares',
                        'fillColor': 'rgba(255,215,0,0.8)',
                        'strokeColor': 'rgba(255,215,0,1)',
                        'pointColor': 'rgba(255,215,0,1)',
                        'pointHighlightFill': 'rgba(255,245,0,1)',
                        'pointHighlightStroke': 'rgba(255,245,0,1)',
                        'data': points.map(function(n){ return Math.pow(9,n); })
                    }
                ]
            };
            chart.Line(data);
        },
        'square-log-chart': function(){
            var canvas = document.getElementById('square-log-chart');
            var context = canvas.getContext('2d');
            var chart = new Chart(context);
            var points = [0, 1, 2, 3, 4].map(function(n){ return Math.pow(3, n); }).reverse();
            var labels = points.map(function(n){ return 'log(1/' + n + ')'; });
            var data = {
                'labels': labels,
                'datasets': [
                    {
                        'label': 'log-log',
                        'fillColor': 'rgba(255,215,0,0.8)',
                        'strokeColor': 'rgba(255,215,0,1)',
                        'pointColor': 'rgba(255,215,0,1)',
                        'pointHighlightFill': 'rgba(255,245,0,1)',
                        'pointHighlightStroke': 'rgba(255,245,0,1)',
                        'data': points.map(function(n){ return Math.log(Math.pow(n, 2)); })
                    }
                ]
            };
            chart.Line(data);
        },
        'monger-sponge': function(){
            var canvas = document.getElementById('monger-sponge');
            var sponge = new monger.Sponge(canvas);
            document.body.addEventListener('keydown', (function(){
                var n = 0;
                var handler = function(event){
                    if (event.keyCode === 65) { /* a */
                        sponge.setLevel(++n);
                        if (n === 5) {
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
})(Reveal, Chart, monger);
