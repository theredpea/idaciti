window.onload = function(){

	//When I republished All sheets, I got stale results,  nonsense column titles, and fewer rows than I added
	//I limit it to the fake data sheets; on republish, I got the new results
		//A: Returns even hidden columns
		//A: Returns data as it appears in formula bar, not as formatted in cell
	var fakeDataUrl = 'https://docs.google.com/spreadsheet/pub?key=0Alf4pwCG7soMdENIckJnYTVScllWcnI0UHoweWhTcnc&single=true&gid=0&output=html';

	Tabletop.init({
		key:fakeDataUrl,
		callback: showInfo,
		simpleSheet: true,
		parseNumbers:true
	});

};

function showInfo(data, tabletop){
	var width=400,
		height=400,
		margin= {left:20, right:20, top:20, bottom:20},
		concepts = d3.set(data.map(function(d){return d.concept})).values(),
		blockHeight = height / concepts.length,
		coverages = data.map(function(d){return d.coverage}),
		maxCoverage = d3.max(coverages),
		minCoverage = d3.min(coverages),
		colorScale = d3.scale.linear()
						.domain([minCoverage, maxCoverage])
						.range(['red', 'green']);




	//TODO: Hook up concepts to a select>options
	console.log(concepts);



	window.data=data; //For playing in console
	
	var svg= d3.select('body')
		.append('svg')
			.attr('width', 400)
			.attr('height', 400)
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var title = svg.append('text')
				.attr('class', 'title')
				.attr('dy', '.71em')
				.text('Concept Heat Map');

	var nestConcepts = d3
								.nest()
								.key(function(r){return r.concept}),
								//.key(function(r){ return r.company}),

		conceptAverage = nestConcepts
								.rollup(function(a){return d3.mean(a.map(function(c){return c.coverage}))})
								.entries(data); 
								//entries returns array {key:{keyValue}, values:{value(s)}}, vs map which returns {{keyValue}:{value(s)}}
								//The former maintains an order
		coverages=conceptAverage.map(function(_){return _.values});
		colorScale.domain([d3.min(coverages), d3.max(coverages)]);

	svg.selectAll('rect.coverage')
		.data(conceptAverage) //key is the concept, value is the average coverage
		.enter()
		.append('rect')
		.attr('class','coverage')
		.attr('y', function(d, i){ return i*blockHeight })
		.attr('x', 0)
		.attr('width', blockHeight).attr('height', blockHeight)
		.style('fill', function(d){ return colorScale(d.values); });

}