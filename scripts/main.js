var pocApp = angular.module('pocApp', []);
var data =[];

pocApp.controller('FilterCtrl', ['$scope', function($scope){

	$scope.categories = [['companies', 'company'], 
			['industries', 'industry'],
			['statements', 'statement'], 
			['concepts', 'concept']];
	$scope.categories.forEach(function(e,i){
		$scope[e[0]]=[e[1]+' one'];
		$scope['selected'+e[1]] = undefined;
	});

	$scope.strip = function(_){ 
		result =  _.replace(/ /g, '');  
		return result; 
	};

	var fakeDataUrl = 'https://docs.google.com/spreadsheet/pub?key=0Alf4pwCG7soMdENIckJnYTVScllWcnI0UHoweWhTcnc&single=true&gid=0&output=html';


	Tabletop.init({
		key:fakeDataUrl,
		callback: drawChart,
		simpleSheet: true,
		parseNumbers:true
	});

	function drawChart(d){
		data = d;
		$scope.categories.forEach(function(e,i){
				$scope[e[0]] = d3.set(d.map(_.p(e[1]))).values();
			});

		//http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/#
		$scope.$apply(); //Updates the view

		//TODO:
		//1) DRY the "fieldset" and "legend" on view; just specify the field and ng-repeat the rest? But Industry may have special checkboxes
		//2) Alternative to d3.set().values() the unique 
		//3) A multiselect; 

		var width=600,
			height=600,
			margin= {left:20, right:20, top:20, bottom:200},
			concepts = d3.set(data.map(function(d){return d.concept})).values(),
			blockHeight = (height-margin.top-margin.bottom) / concepts.length,
			blockWidth = blockHeight,
			coverages = data.map(_.p('coverage')),
			maxCoverage = d3.max(coverages),
			minCoverage = d3.min(coverages),
			colorScale = d3.scale.linear()
							.domain([minCoverage, maxCoverage])
							.range(['red', 'green']),
			rowLabelWidth= 200;

		var svg = d3.select('#chart svg')
					.attr('width', width)
					.attr('height', height);

		var canvas= svg.select('g')
				.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		var title = canvas.append('text')
					.attr('class', 'title')
					.attr('dy', '.71em');
					//.text('Concept Heat Map');

		var byConceptThenCompany = d3
									.nest()
									.key(_.p('concept'))
									.key(_.p('company')) //TODO: sort?
									.rollup(function(v){ //This is an array, even though I know there is only one value
										return v[0]/*d3.mean(v.map(_.p('coverage'))); */})
									.map(data); //.entries(data);
		canvas
			.append('desc')
			.text('idaciti coverage heatmap');

		var concepts = canvas.selectAll('g.concept')
			.data($scope.concepts) //TODO: Provide a keyfunction so it is bound
			.enter()
			.append('g')
			.attr('class','concept')
			.attr('transform', function(d, i){ return 'translate('+rowLabelWidth+','+i*blockHeight+')'; });
		
		var leftAligned = 1;
		//ROW LABELS
		concepts
			.append('text')
			.attr('class', 'label')
			.style('text-anchor', leftAligned ?  'start' : 'end') //right-alignment
			//.attr('textLength', rowLabelWidth) //Like letter-spacing;
			.attr('dy', 30)
			.attr('x', -5 -(leftAligned*rowLabelWidth))
			.text(function(concept){ return concept; });

		var coverage = concepts
			.selectAll('g.coverage')
				.data(function(concept, i){ return $scope.companies.map(function(co){return {concept: concept, company:co};})}) //function(coverageByConcept){ return coverageByConcept.values; })
				.enter()
				.append('g')
				.attr('class','coverage')
				.attr('transform', function(d, i){ return 'translate('+i*blockWidth+',0)'; })
				.attr('data-company', _.p('company'))
				.attr('data-concept', _.p('concept'));


		coverage
				.append('rect')
				.attr('width', blockHeight).attr('height', blockHeight)	//Squares
				.style('fill', function(coverage){ return colorScale(byConceptThenCompany[coverage.concept][coverage.company].coverage); });
		coverage
			.append('rect')
			.attr('x', 2).attr('y',2)
			.attr('width', blockHeight-4).attr('height', blockHeight-4)
			.attr('class', 'gradient');

		var companyLabelYOffset=($scope.concepts.length)*blockHeight;
		canvas
			.selectAll('text.company.label')
			.data($scope.companies)
			.enter()
			.append('text')
			.attr('class', 'company label')
			.attr('x', function(d,i){ return (rowLabelWidth + i*blockWidth) })
			.attr('y', companyLabelYOffset)
			.attr('dy', 20)
			.attr('dx', 20)
			.attr('transform', function(d,i){ return 'rotate(20 '+ (rowLabelWidth + i*blockWidth) + ' ' + companyLabelYOffset +')' })
			.text(function(co){return co;});

	};


}]);


/*Utility functions*/
_={};

//Property function for grouping
_.p=function(propName){
	return function(obj){
		return obj[propName];
	}
};
 //Identity function
_.i = function(_){ return _; }
