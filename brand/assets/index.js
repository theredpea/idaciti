// document.onload = function () {
// https://stackoverflow.com/a/807895/1175496

window.onload = function () {
    // Following point-along-path interpolation example
    // https://bl.ocks.org/mbostock/1705868

    var perfect_circle_points = (function () {

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

            // _[0] *= 1.8;
            // _[1] *= 1.8;
            // Center (?) 
            _[0] += 85;
            _[1] += 28;
            return _;
        });

        points.push(points.shift());
        return points;

    })();


    var story_points = [
        [181.3065, -154.06628],
        [181.29469, -149.9558],
        [182.36955, -148.97542],
        [187.38956, -148.93997],
        [188.44081, -150.12115],
        [188.36993, -154.04266],
        [187.42499, -155.10571],
        [182.44043, -155.11752]
    ].map(_ => {

        _[0] -= 185;
        _[1] += 150;

        _[0] *= 5;
        _[1] *= 5;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 95;
        _[1] += 28;
        return _;
    });

    var link_points = [
        [-7.0954428, -18.655664],
        [4.9903383, -18.714716],
        [9.8922281, -13.340417],
        [10.069458, 11.759604],
        [4.1635399, 17.015875],
        [-6.9773397, 16.661489],
        [-12.292588, 11.936759],
        [-12.351639, -12.986032],
    ].map(_ => {

        _[0] *= 1.1;
        _[1] *= 1.1;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 85;
        _[1] += 28;

        return _;
    });



    var marker_points = [
        [-6.8949904, -12.107561],
        [6.0594163, -11.231169],
        [19.981653, -2.1150968],
        [20.025248, 0.80155379],
        [6.2348785, 10.668223],
        [-6.2423487, 11.917456],
        [-13.428484, 5.3886557],
        [-13.487535, -5.5693021],
    ].map(_ => {

        _[0] *= 1.3;
        _[1] *= 1.3;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 87;
        _[1] += 23;

        return _;
    });


    var light_points = [
        [8.3393726, -15.44843],
        [18.019728, -7.6230302],
        [17.77668, 6.8384323],
        [8.866745, 14.69957],
        [-0.24640751, 8.5968847],
        [-10.785931, 6.7725177],
        [-10.622154, -7.707551],
        [-0.19087647, -9.1774406]
    ].map(_ => {

        _[0] *= 1.3;
        _[1] *= 1.3;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 87;
        _[1] += 23;

        return _;
    });


    var cycle_index = 0;

    // var slides_cycle = [
    //     {points:}
    // ]
    var slides_cycle = [
        {
            points: perfect_circle_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-touch_app-24px.svg'
        },
        {
            points: story_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-book-24px.svg'
        },
        {
            points: link_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-link-24px.svg'
        },
        {
            points: marker_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-where_to_vote-24px.svg'
        },
        {
            points: light_points,
            //TODO: the light is upside down; adjust starting points so the peak speed is at the long end of the light, not the crooked end
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-highlight-24px.svg'
        },
    ];

    var points = slides_cycle[cycle_index].points;
    // var points = story_points;


    var svg = d3.select("svg");

    var path = svg.append("path")
        .attr('fill', 'transparent')
        .attr('stroke', '#3b3b3b')
        .attr('stroke-width', '1px')
        // 2px solid #3b3b3b')
        .classed('catmull-rom-curve', true)
        .data([points])
        .attr("d", d3.line().curve(d3.curveCatmullRomClosed.alpha(0.5)));


    var icon_img = svg.append("image")
        .attr('xlink:href', slides_cycle[cycle_index].icon)
        .attr('width', '30px')
        .attr('height', '30px')
        .attr('x', 69)
        .attr('y', 14)

    setInterval(function () {

        var current_index = (++cycle_index) % slides_cycle.length;
        points = slides_cycle[current_index].points;
        // (points === story_points) ? perfect_circle_points : story_points;

        path
            // Same number of points no worries about transition
            .data([points])
            .transition()
            // .delay(delay || 0)
            .duration(2000)
            .attr("d", d3.line().curve(d3.curveCatmullRomClosed.alpha(0.5)));

        icon_img.attr('href', slides_cycle[current_index].icon);

    }, 6000);

    points.forEach(function (point, i) {


        var dotty_circle = svg.append("circle")
            .classed('dotty', true)
            // The enhanced-secnodar-color
            .attr('fill', '#3b3b3b')
            .attr('data-dotty-index', i)
            .attr("r", 3)
            .attr("transform", "translate(" + points[1] + ")");

        transition(dotty_circle, 400 * i);
    });


    function transition(circle, delay) {
        circle.transition()
            .delay(delay || 0)
            .duration(3000)
            .attrTween("transform", translateAlong(path.node()))
            .on("end", function () {
                return transition(circle)
            });
    }

    // Returns an attrTween for translating along the specified path element.
    function translateAlong(path) {
        var l = path.getTotalLength();
        return function (d, i, a) {
            return function (t) {
                var p = path.getPointAtLength(t * l);
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