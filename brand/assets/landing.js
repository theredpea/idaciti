// document.onload = function () {
// https://stackoverflow.com/a/807895/1175496

window.onload = function () {
    // Following point-along-path interpolation example
    // https://bl.ocks.org/mbostock/1705868
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

    var svg = d3.select("svg");

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

    var goddess_height = 3;
    var last_goddess_height = -goddess_height;

    var goddess = d3.select('#g9282')
        .attr('transform', 'translate(0,' + last_goddess_height + ')');

    goddessHover();

    function goddessHover() {
        goddess
            .transition()
            .duration(2000)
            .attrTween('transform', function () {
                return function (t) {
                    return 'translate(0, ' + (last_goddess_height - (last_goddess_height - goddess_height) * t) + ')';
                };
            })
            .on('end', function () {
                last_goddess_height = goddess_height;
                goddess_height = -goddess_height;
                goddessHover();
            })
    }

    var goddess_shadow_scale = goddess_height > 0 ? 0.5 : 1.5;
    var last_goddess_shadow_scale = -goddess_shadow_scale;

    var goddess_shadow_pulse_factor = 1.3;
    var last_factor = goddess_height > 0 ? goddess_shadow_pulse_factor : (1 / goddess_shadow_pulse_factor);

    var original_goddess_shadow_length = 20;
    var goddess_shadow_length = original_goddess_shadow_length;
    var last_goddess_shadow_length = original_goddess_shadow_length * last_factor;

    var original_goddess_shadow_height = 3.3;
    var goddess_shadow_height = original_goddess_shadow_height;
    var last_goddess_shadow_height = original_goddess_shadow_height * last_factor;

    var original_goddess_shadow_opacity = 0.2;
    var goddess_shadow_opacity = original_goddess_shadow_opacity;
    var last_goddess_shadow_opacity = original_goddess_shadow_opacity * last_factor;

    var goddess_shadow = d3.select('#path1854-9')
        .style('fill', 'grey')
        .attr('rx', original_goddess_shadow_length)
        .attr('ry', original_goddess_shadow_height)
        .style('fill-opacity', original_goddess_shadow_opacity)
        .attr('transform', 'scale(1 1)');

    goddessShadowPulse(2000);

    function goddessShadowPulse(delay) {
        goddess_shadow
            .transition()
            .delay(delay || 0)
            .duration(2000)
            .attrTween('rx', function () {
                return function (t) {
                    return (last_goddess_shadow_length - (last_goddess_shadow_length - goddess_shadow_length) * t);
                };
            })
            .attrTween('ry', function () {
                return function (t) {
                    return (last_goddess_shadow_height - (last_goddess_shadow_height - goddess_shadow_height) * t);
                };
            })
            .styleTween('fill-opacity', function () {
                return function (t) {
                    return (last_goddess_shadow_opacity - (last_goddess_shadow_opacity - goddess_shadow_opacity) * t);
                };
            })
            .on('end', function () {

                last_goddess_shadow_length = goddess_shadow_length;
                last_goddess_shadow_height = goddess_shadow_height;
                last_goddess_shadow_opacity = goddess_shadow_opacity;
                //                 goddess_shadow_length
                // goddess_shadow_height
                goddess_shadow_length = last_goddess_shadow_length > original_goddess_shadow_length
                    ? original_goddess_shadow_length / goddess_shadow_pulse_factor
                    : original_goddess_shadow_length * goddess_shadow_pulse_factor;


                goddess_shadow_height = last_goddess_shadow_height > original_goddess_shadow_height
                    ? original_goddess_shadow_height / goddess_shadow_pulse_factor
                    : original_goddess_shadow_height * goddess_shadow_pulse_factor;

                goddess_shadow_opacity = last_goddess_shadow_opacity > original_goddess_shadow_opacity
                    ? original_goddess_shadow_opacity / goddess_shadow_pulse_factor
                    : original_goddess_shadow_opacity * goddess_shadow_pulse_factor;

                goddessShadowPulse();
            })
    }

}