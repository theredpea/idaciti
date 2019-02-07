// document.onload = function () {
// https://stackoverflow.com/a/807895/1175496

var animate_loading_ike = function () {
    // Following point-along-path interpolation example
    // https://bl.ocks.org/mbostock/1705868

    var perfect_circle = (function () {
        var points = [
            [-20, 0],
            [-14, -14],
            [0, -20],
            [14, -14],
            [20, 0],
            [14, 14],
            [0, 20],
            [-14, 14]
        ].map(_ => {

            _[0] *= 1.8;
            _[1] *= 1.8;
            // Center (?) 
            _[0] += 27;
            _[1] += 28;
            return _;
        });

        points.push(points.shift());
        return points;

    })();

    var points = perfect_circle;

    var svg = d3.select("svg#svg1415");

    var path = svg.append("path")
        .attr('fill', 'transparent')
        // 2px solid #3b3b3b')
        .classed('catmull-rom-curve', true)
        .data([points])
        .attr("d", d3.line().curve(d3.curveCatmullRomClosed.alpha(0.5)));


    points.forEach(function (point, i) {

        var dotty_circle = svg.append("circle")
            .classed('dotty', true)
            // The enhanced-secnodar-color
            .attr('fill', '#3b3b3b')
            .attr('data-dotty-index', i)
            .attr("r", 4)
            .attr('transform', 'translate(' + point[0] + ',' + point[1] + ')')

        // dotty_circle.append('text')
        //     .text(i)
        // .attr("transform", "translate(" + points[1] + ")");

        // No delay
        transition(dotty_circle, 0, i / points.length);
    });


    function transition(circle, delay, frac) {
        circle.transition()//(1))
            .delay(delay || 0)
            .duration(3600)
            // Maybe easing doesnt happen
            // .ease(d3.easeQuadOut)
            .ease(d3.easeLinear)
            .attrTween("transform", translateAlong(path.node(), frac))
            .on("end", function () {
                return transition(circle, delay, frac)
            });
    }

    // Returns an attrTween for translating along the specified path element.
    function translateAlong(path, frac) {
        var l = path.getTotalLength(); // * (frac || 1);
        return function (d, i, a) {
            return function (t) {
                // var p = path.getPointAtLength(Math.abs(t - frac || 0) * l);
                var progress = t - frac || 0;
                // (t - frac < 0 ) ? 
                progress = progress < 0 ? (progress + 1) : progress;
                // if (progress<0)
                var p = path.getPointAtLength(progress * l);
                return "translate(" + p.x + "," + p.y + ")";
            };
        };
    }


}

window.onload = animate_loading_ike;