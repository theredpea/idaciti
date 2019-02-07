// document.onload = function () {
// https://stackoverflow.com/a/807895/1175496
// document.onload = function () {
// https://stackoverflow.com/a/807895/1175496

window.onload = function () {
    // Following point-along-path interpolation example
    // https://bl.ocks.org/mbostock/1705868

    var perfect_circle_points = (function () {

        var points = [
            [20, 0],
            [14, 14],
            [0, 20],
            [-14, 14],
            [-20, 0],
            [-14, -14],
            [0, -20],
            [14, -14],
        ].map(_ => {

            // _[0] *= 1.8;
            // _[1] *= 1.8;
            // Center (?) 
            _[0] += 85;
            _[1] += 27;
            return _;
        });

        points.push(points.shift());
        return points;

    })();


    var story_points = [
        [187.38956, -148.93997],
        [188.44081, -150.12115],
        [188.36993, -154.04266],
        [187.42499, -155.10571],
        [182.44043, -155.11752],
        [181.3065, -154.06628],
        [181.29469, -149.9558],
        [182.36955, -148.97542],
    ].map(_ => {

        _[0] -= 185;
        _[1] += 150;

        _[0] *= 5;
        _[1] *= 5;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 95.5;
        _[1] += 27;
        return _;
    });

    var link_points = [
        [-6.9773397, 16.661489],
        [-12.292588, 11.936759],
        [-12.351639, -12.986032],
        [-7.0954428, -18.655664],
        [4.9903383, -18.714716],
        [9.8922281, -13.340417],
        [10.069458, 11.759604],
        [4.1635399, 17.015875],
    ].map(_ => {

        _[0] *= 1.1;
        _[1] *= 1.1;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 86.5;
        _[1] += 27;

        return _;
    }).reverse();



    var marker_points = [
        [-6.2423487, 11.917456],
        [-13.428484, 5.3886557],
        [-13.487535, -5.5693021],
        [-6.8949904, -12.107561],
        [6.0594163, -11.231169],
        [19.981653, -2.1150968],
        [20.025248, 0.80155379],
        [6.2348785, 10.668223],
    ].map(_ => {

        _[0] *= 1.3;
        _[1] *= 1.3;

        var s = _[0];
        _[0] = _[1];
        _[1] = s;


        _[0] += 87;
        _[1] += 22;

        return _;
    })
        .reverse();


    var light_points = [
        [-10.785931, 6.7725177],
        [-10.622154, -7.707551],
        [-0.19087647, -9.1774406],
        [8.3393726, -15.44843],
        [18.019728, -7.6230302],
        [17.77668, 6.8384323],
        [8.866745, 14.69957],
        [-0.24640751, 8.5968847],
    ].map(_ => {

        // This "rotates" 90 degrees
        // var s = _[0];
        // _[0] = _[1];
        // _[1] = s;
        var s = _[0];
        _[0] = _[1];
        _[1] = s;

        _[1] = -_[1];


        _[0] *= 1.3;
        _[1] *= 1.3;



        _[0] += 87;
        _[1] += 30;

        return _;
    })
    // .reverse();


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
            icon: 'baseline-touch_app-24px.svg',
            headline_html: '<span> Meet </span>\
            <img src="./idaciti_logo_white_type.svg">',
            sub_headline_html: 'The <span class="highlight">easiest way</span> to access &amp; analyze financial and non-financial data',
            detail_html: 'Rather than scrape financial and non-financial data the old-fashioned way, idaciti parses public filings every 15 minutes. That means you and your team have access to the richest and most accurate data-library on the market.',

            path_id: 'path953'
        },
        {
            points: story_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-book-24px.svg',
            headline_html: 'Create Impactful Financial Stories',
            sub_headline_html: 'Create a financial narrative that makes an impact',
            detail_html: '<p>As a financial professional, it can be difficult to create a narrative around your findings and recommendations. idaciti helps you turn important data into compelling stories that drive decisions thanks to Storyboard.</p>\
            <p>With Storyboard, financial professionals have the ability to collaborate, share and annotate cards that are updated in real-time with the latest data.</p>',
            path_id: 'path933'
        },
        {
            points: link_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-link-24px.svg',
            headline_html: 'Link Financial &amp; Non-Financial Data',
            sub_headline_html: 'Financial data can only tell you so much. That\'s why idaciti provides both financial and non-financial data',
            detail_html: 'idaciti makes it possible to discover rich insights about the companies that you are interested.',

            path_id: 'path997'
        },
        {
            points: marker_points,
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-where_to_vote-24px.svg',
            headline_html: 'Dive into Every Data Point',
            sub_headline_html: 'When you absolutely need the right data, idaciti is here to help.',
            detail_html: 'When you absolutely need the right data, idaciti is here to help. \
            Because of the way idaciti is built, we empower you to trace any data source directly to the original filing information.\
            Unlike other platforms, idaciti helps you to do this with a few clicks of a button.',

            path_id: 'path963'
        },
        {
            points: light_points,
            //TODO: the light is upside down; adjust starting points so the peak speed is at the long end of the light, not the crooked end
            header: '',
            subheader: '',
            description: '',
            icon: 'baseline-highlight-24px.svg',
            headline_html: 'Uncover Information Like Never Before',
            sub_headline_html: 'idaciti helps you save time and surface information that would have been missed.',
            detail_html: 'Our robust platform eliminates the need for financial analysts and reporters to conduct \
            countless search engine queries or to sift through filings on the SEC website. Instead, idaciti\'s powerful \
            internal text analytics system makes it simple to surface the information you\'re searching for and even \
            helps you find data you didn\'t know existed.',
            path_id: 'path985'
        },
    ];

    // Gotta go 36  else the bounce may still be visible
    var icon_path_drop_to = -45;
    var active_icon_path_class = 'active-icon-path';
    d3.selectAll(slides_cycle
        // Dont do this to the first
        // Actually hide all of them; 
        // .filter((_, i) => i > 0)
        .map(function (_) { return '#' + _.path_id }).join(', '))
        .attr('transform', 'translate(0, ' + icon_path_drop_to + ')');

    d3.select('#' + slides_cycle[0].path_id)
        .classed(active_icon_path_class, true);

    var points = slides_cycle[cycle_index].points;
    // var points = story_points;


    var svg = d3.select('svg#svg3337');
    // ('[docname="goddess_of_fintech.svg"]');

    var path = svg.append("path")
        .attr('fill', 'transparent')
        .attr('stroke', '#3b3b3b')
        .attr('stroke-width', '1px')
        // 2px solid #3b3b3b')
        .classed('catmull-rom-curve', true)
        .data([points])
        .attr("d", d3.line().curve(d3.curveCatmullRomClosed.alpha(0.5)));

    slides_cycle[cycle_index].path_id;

    setInterval(function () {



        var current_index = (++cycle_index) % slides_cycle.length;
        var current_slide = slides_cycle[current_index];

        var cycle_text = function () {

            //Clean up off-screen bottoms from last time
            d3
                .selectAll('.off-screen-bottom')
                .remove();

            //Animate what is active, down to the bottom
            var new_meet_paragraph = d3
                .select('.meet-paragraph-container')
                .append('p')
                //Gotta give it the right class
                .classed('font-display meet-paragraph', true)
                .classed('off-screen-top', true)
                // https://github.com/d3/d3-selection/blob/master/README.md#selection_html
                .html(current_slide.headline_html);


            var new_intro_paragraph = d3
                .select('.intro-paragraph-container')
                .append('p')
                // intro-paragraph active off-screen-bottom
                .classed('font-light secondary-enhanced-color intro-paragraph', true)
                .classed('off-screen-top', true)
                .html(current_slide.sub_headline_html);

            d3
                .selectAll('.meet-paragraph.active, .intro-paragraph.active')
                .classed('off-screen-bottom', true);

            // Only after animating the off-screen-bottom away
            setTimeout(function () {

                new_meet_paragraph.classed('active', true);
                new_intro_paragraph.classed('active', true);
            }, 1000);

        }

        points = current_slide.points;
        // (points === story_points) ? perfect_circle_points : story_points;

        path
            // Same number of points no worries about transition
            .data([points])
            .transition()
            .delay(500)// || 0)
            .duration(2000)
            .attr("d", d3.line().curve(d3.curveCatmullRomClosed.alpha(0.5)));

        // https://stackoverflow.com/a/15798636/1175496
        // > The transition is attached to the svg element and chained from there.

        var cycle_icon = function () {

            var icon_disappear = svg
                .transition()
                .ease(d3.easeBounce)
                .duration(750);

            icon_disappear
                .delay(500)
                .selectAll('.' + active_icon_path_class)
                .attr('transform', 'translate(0, ' + -icon_path_drop_to + ')');

            d3.select('.' + active_icon_path_class)
                .classed(active_icon_path_class, false);

            d3.select('#' + current_slide.path_id)
                .classed(active_icon_path_class, true)
                .attr('transform', 'translate(0, ' + icon_path_drop_to + ')');

            icon_disappear.transition()
                // .ease(d3.easeElastic)
                .duration(750)
                .selectAll('#' + current_slide.path_id)
                .attr('transform', 'translate(0, 0)');
        }


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

    var scroll_callback = function (event) {
        var scroll = this.scrollY;
        // console.log(scroll)
        d3.selectAll('.header, .highlight-notification-strip').classed('fixed', this.scrollY !== 0)
        // d3.select('.header').toggleClass('fixed', this.scrollY === 0)
        // if (this.scrollY === 0) {
        // } else {

        // }
    };

    window.addEventListener("scroll", scroll_callback);
    scroll_callback();

    // document.getElementsByClassName('sign-in')[0].
    d3.select('.sign-in')
        .on('click', function () {

            //Undoing the ike "chase scene"
            d3.select('.loading-ike-container g')
                .attr('transform', 'translate(0, 0)')

            d3.selectAll('body, .loading-ike-container')//loading-curtain-drop')
                .classed('loading', true);
            // alert('hi');
            loading_ike.exit_timeout && clearTimeout(loading_ike.exit_timeout);
            loading_ike.exit_timeout = setTimeout(function () {

                d3.select('.loading-ike-container')
                    .classed('loading', false);

                module_menu.animate_entrance();

            }, 3000);
            // loading_ike.animate_exit_chase();
        })

    d3.select('.loading-curtain-drop')
        .on('click', function () {

            loading_ike.exit_timeout && clearTimeout(loading_ike.exit_timeout);
            
            d3.selectAll('body, .loading-ike-container')
                .classed('loading', false);

            module_menu.exit();

        })

    loading_ike.animate_entrance();
}

loading_ike = {
    animate_entrance: function () {
        loading_ike.exit_chase_timeout && clearTimeout(loading_ike.exit_chase_timeout);

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

            var dotty_circle = svg
                .append("circle")
                .classed('dotty', true)
                .attr('fill', '#3b3b3b')
                .attr('data-dotty-index', i)
                .attr("r", 4)
                .attr('transform', 'translate(' + point[0] + ',' + point[1] + ')')


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


    },
    animate_exit_chase: function () {
        loading_ike.exit_chase_timeout && clearTimeout(loading_ike.exit_chase_timeout);

        loading_ike.exit_chase_timeout = setTimeout(function () {

            d3.select('.loading-ike-container g')
                .attr('transform', 'translate(0, 0)')
                .transition()
                //Not the usual .2s
                .duration(500)

                //Lovely chase scene.
                .ease(d3.easeBack)
                // .ease(d3.easeBounce)
                // .ease(d3.easeLinear)
                .attr('transform', 'translate(0, 200)');

            // d3.select

        }, 3000);
    }
};

module_menu = {
    menu_items: [
        {},
        {},
        {},
        {},
        {},
        {},
    ],
    animate_entrance: function () {
        var menu_container_svg = d3.select('.idaciti-module-menu-container svg');
        /* Starting with one "from scratch" */
        menu_container_svg.selectAll('*').remove();


        var mark_width = 40;
        var menu_container_append_to = menu_container_svg
            .append('g')
            .attr('transform', 'translate(' + ((mark_width / 2) + 10) + ', 10)');

        var mark_translate_y = 20;
        var mark_translate = 'translate(' + -mark_width / 2 + ', ' + mark_translate_y + ')';

        var module_groups_line_func = d3.line()
            .x(function (d) { return 0 }) //x(d.date); })
            .y(function (d, i) { return mark_width / 2 }) //i * (mark_translate_y + (mark_width * .5)) }); //y(d.value); });

        var module_groups_line_stretched_func = d3.line()
            .x(function (d) { return 0 }) //x(d.date); })
            .y(function (d, i) { return i === 0 ? mark_width / 2 : (i * ((module_menu.menu_items.length + 1) * 100)) - mark_width });

        // return (mark_translate_y + (mark_width * .5)) }); //y(d.value); });

        var module_groups_line = menu_container_append_to
            .append('path')
            // .data([{}, {}])
            .attr('d', module_groups_line_func([{}, {}]))
            .attr('stroke', '#3b3b3b')
            .attr('stroke-width', 2);

        var module_groups = menu_container_append_to
            .selectAll('.module-group')
            .data(module_menu.menu_items)
            .enter()
            .append('g')
            .classed('module-group', true)

            // so they are hidden /occluded by the  mark because they are behind it:
            .attr('transform', 'translate(0, ' + (mark_translate_y + (mark_width * .5)) + ')');

        module_groups
            .append('circle')
            .attr('r', '0')
            // The grey of "dotties" 
            .attr('fill', '#3b3b3b');
        // .attr('fill', 'black');
        // Animate the transform, dont start with it...
        // .attr('transform', function (d, i) { return 'translate(0, ' + i * 5 + ')'; })
        //Can't use px or percentages 
        var menu_container_idaciti_mark = menu_container_append_to
            .append('image');

        /*(menu_container_idaciti_mark
            .node()
            .getBoundingClientRect() || {})
            .width;
*/
        // .attr('width')
        menu_container_idaciti_mark
            .attr('xlink:href', './idaciti_mark.svg')
            .attr('width', mark_width)
            // .attr('height', 'auto')
            //unexpected end of attribute
            .attr('transform', 'translate(' + -mark_width / 2 + ', -100)');

        menu_container_idaciti_mark
            .transition()
            .duration(400)
            // So it bounces when it lands
            // .ease(d3.easeBounce)
            .ease(d3.easeBack)
            .attr('transform', mark_translate);


        module_groups
            // .select('circle')
            .transition()
            .delay(400)
            .select('circle')
            .attr('r', 6);

        module_groups_line
            .transition()
            .duration(1500)
            .attr('d', module_groups_line_stretched_func([{}, {}]));

        module_groups
            // .select('circle')
            .transition()
            // .dela
            .duration(1500)
            .delay(function (d, i) {
                // TODO: fractional delay
                return i * 200;
            })
            // Then move it back "up" the chain by mark_width which is ~ height
            .attr('transform', function (d, i, data) { return 'translate(0, ' + (((data.length - i) + 1) * 100 - mark_width) + ')'; })
            .transition()
            .duration(800)
            .select('circle')
            .attr('r', 30)
        // <image xlink: href="./idaciti_mark.svg"></image>

    },
    exit: function () {
        d3.selectAll('.idaciti-module-menu-container svg *').remove();

    }
}
