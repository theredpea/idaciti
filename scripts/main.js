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

_={};
_.p=function(propName){
	return function(obj){
		return obj[propName];
	}
};
_.i = function(_){ return _; } //Identity function for nested

function showInfo(data, tabletop){
	var width=400,
		height=400,
		margin= {left:20, right:20, top:20, bottom:20},
		concepts = d3.set(data.map(function(d){return d.concept})).values(),
		blockHeight = (height-margin.top-margin.bottom) / concepts.length,
		coverages = data.map(function(d){return d.coverage}),
		maxCoverage = d3.max(coverages),
		minCoverage = d3.min(coverages),
		colorScale = d3.scale.linear()
						.domain([minCoverage, maxCoverage])
						.range(['red', 'green']);




	//TODO: Hook up concepts to a select>options
	console.log(concepts);



	window.data=data; //For playing in console
	
	var svg= d3.select('#chart svg g')
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var title = svg.append('text')
				.attr('class', 'title')
				.attr('dy', '.71em');
				//.text('Concept Heat Map');

	var byConceptThenCompany = d3
								.nest()
								.key(_.p('concept'))
								.key(_.p('company')) //TODO: sort?
								.rollup(function(v){ //This is an array, even though I know there is only one value
									return v[0]/*d3.mean(v.map(_.p('coverage'))); */})
								.entries(data);
	svg.append('desc').text('idaciti coverage heatmap');

	var concepts = svg.selectAll('g.concept')
		.data(byConceptThenCompany) //TODO: Provide a keyfunction so it is bound
		.enter()
		.append('g')
		.classed('concept', true)
		.attr('transform', function(d, i){ return 'translate(0,'+i*blockHeight+')'; })
		.selectAll('g.coverage')
			.data(function(coverageByConcept){ return coverageByConcept.values; })
			.enter()
			.append('g')
			.attr('class','coverage')
			.attr('transform', function(d, i){ return 'translate('+i*blockHeight+',0)'; })
			.attr('data-company', function(d){ return d.values.company; })
			.attr('data-concept',  function(d){ return d.values.concept; })
	concepts
			.append('rect')
			.attr('width', blockHeight).attr('height', blockHeight)	//Squares
			.style('fill', function(d){ console.log(d); return colorScale(d.values.coverage); });
	concepts
		.append('rect')
		.attr('x', 2).attr('y',2)
		.attr('width', blockHeight-4).attr('height', blockHeight-4)
		.attr('class', 'gradient');

			/*

	svg.selectAll('text.coverage')
		.data(conceptAverage)//TODO: Provide a keyfunction so it is bound
		.enter()
		.append('text')
		.attr('y', function(d, i){ return i*blockHeight })
		.attr('x', 0)
		.attr('dy', '1em')
		.attr('class', 'coverage')
		.text(function(d){ return Math.round(d.values*100) +'%'; })
		.style('fill', 'white')
		.style('font-family', 'sans-serif');

	svg.selectAll('text.label')
		.data(conceptAverage)//TODO: Provide a keyfunction
		.enter()
		.append('text')
		.attr('y', function(d, i){ return i*blockHeight })
		.attr('x', blockHeight)
		.attr('dy', '1em')
		.attr('class', 'label')
		.text(function(d){ return d.key })
		.style('font-family', 'sans-serif');

*/
}