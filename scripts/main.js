var pocApp = angular.module('pocApp', []);
var data =[];

keysWhereValueTruthy = function(map){
		results=[];
		angular.forEach(map, function(value, key){
			if(value)results.push(key);
		})
		return results;
	};

pocApp.filter('keysWhereValueTruthy', function(){
	return keysWhereValueTruthy;
});

pocApp.controller('FilterCtrl', ['$scope', '$filter', function($scope){
	window.scope = $scope;
	$scope._ = _;
	$scope.categories = [['companies', 'company'], 
			['industries', 'industry'],
			['statements', 'statement'], 
			['concepts', 'concept']];
	var watchSelecteds = [];
	$scope.categories.forEach(function(e,i){
		$scope[e[0]]=[];//[e[1]+' one'];
		var selectedSetName = 'selected'+e[0] +'Set'
		$scope[selectedSetName] = {};
		watchSelecteds.push(selectedSetName);
		$scope['filtered'+e[0]] = [];
	});	
	angular.forEach(watchSelecteds, function(selected){ 
		//console.log('watching ' + selected);
		$scope.$watch(selected, function(){
			//console.log(selected + ' changed, so its watch is firing');

			drawChart();
		}, true); //
	});
	$scope.displayLimit = 3;

	$scope.displayLength = function(exp){
		a = $scope.displayLimit;
		//https://groups.google.com/forum/#!topic/angular/7WY_BmFzd3U
		b = $scope['filtered'+exp].length;

		return Math.min(a,b)
	}
	$scope.strip = function(_){ 
		result =  _.replace(/ /g, '');  
		return result; 
	};

	var fakeDataUrl = 'https://docs.google.com/spreadsheet/pub?key=0Alf4pwCG7soMdENIckJnYTVScllWcnI0UHoweWhTcnc&single=true&gid=0&output=html';

	$scope.data = [];

	Tabletop.init({
		key:fakeDataUrl,
		callback: drawChart,
		simpleSheet: true,
		parseNumbers:true
	});
	backupD = [{"industry":"Manufacturing","company":"Widget Co","statement":"Income Statement","concept":"Net Income","coverage":0.713031377135628,"rowNumber":1},{"industry":"Manufacturing","company":"Widget Co","statement":"Income Statement","concept":"EPS","coverage":0.597451778850614,"rowNumber":2},{"industry":"Manufacturing","company":"Widget Co","statement":"Income Statement","concept":"Taxes","coverage":0.885005082264962,"rowNumber":3},{"industry":"Manufacturing","company":"Widget Co","statement":"Balance Sheet","concept":"Current Assets","coverage":0.81427932338672,"rowNumber":4},{"industry":"Manufacturing","company":"Widget Co","statement":"Balance Sheet","concept":"Current Liabilities","coverage":0.668083141337554,"rowNumber":5},{"industry":"Manufacturing","company":"Widget Co","statement":"Balance Sheet","concept":"Equity","coverage":0.983872997733114,"rowNumber":6},{"industry":"Manufacturing","company":"Widget Co","statement":"Cash Flow","concept":"Ops Cash","coverage":0.503628941229156,"rowNumber":7},{"industry":"Manufacturing","company":"Widget Co","statement":"Cash Flow","concept":"Investing Cash","coverage":0.817928052048897,"rowNumber":8},{"industry":"Manufacturing","company":"Widget Co","statement":"Cash Flow","concept":"Finance Cash","coverage":0.731774453039535,"rowNumber":9},{"industry":"Manufacturing","company":"Item Co","statement":"Income Statement","concept":"Net Income","coverage":0.695116113563129,"rowNumber":10},{"industry":"Manufacturing","company":"Item Co","statement":"Income Statement","concept":"EPS","coverage":0.792040468580431,"rowNumber":11},{"industry":"Manufacturing","company":"Item Co","statement":"Income Statement","concept":"Taxes","coverage":0.549167299675418,"rowNumber":12},{"industry":"Manufacturing","company":"Item Co","statement":"Balance Sheet","concept":"Current Assets","coverage":0.856883543305656,"rowNumber":13},{"industry":"Manufacturing","company":"Item Co","statement":"Balance Sheet","concept":"Current Liabilities","coverage":0.899475143421655,"rowNumber":14},{"industry":"Manufacturing","company":"Item Co","statement":"Balance Sheet","concept":"Equity","coverage":0.798416816462766,"rowNumber":15},{"industry":"Manufacturing","company":"Item Co","statement":"Cash Flow","concept":"Ops Cash","coverage":0.782817453542204,"rowNumber":16},{"industry":"Manufacturing","company":"Item Co","statement":"Cash Flow","concept":"Investing Cash","coverage":0.636150193481172,"rowNumber":17},{"industry":"Manufacturing","company":"Item Co","statement":"Cash Flow","concept":"Finance Cash","coverage":0.578087188507602,"rowNumber":18},{"industry":"REIT","company":"Land and Trust Co","statement":"Income Statement","concept":"Net Income","coverage":0.818561134162758,"rowNumber":19},{"industry":"REIT","company":"Land and Trust Co","statement":"Income Statement","concept":"EPS","coverage":0.877542751292019,"rowNumber":20},{"industry":"REIT","company":"Land and Trust Co","statement":"Income Statement","concept":"Taxes","coverage":0.832643832539318,"rowNumber":21},{"industry":"REIT","company":"Land and Trust Co","statement":"Balance Sheet","concept":"Current Assets","coverage":0.716864603588446,"rowNumber":22},{"industry":"REIT","company":"Land and Trust Co","statement":"Balance Sheet","concept":"Current Liabilities","coverage":0.778232953825121,"rowNumber":23},{"industry":"REIT","company":"Land and Trust Co","statement":"Balance Sheet","concept":"Equity","coverage":0.849529008279435,"rowNumber":24},{"industry":"REIT","company":"Land and Trust Co","statement":"Cash Flow","concept":"Ops Cash","coverage":0.963738227581395,"rowNumber":25},{"industry":"REIT","company":"Land and Trust Co","statement":"Cash Flow","concept":"Investing Cash","coverage":0.829404045676151,"rowNumber":26},{"industry":"REIT","company":"Land and Trust Co","statement":"Cash Flow","concept":"Finance Cash","coverage":0.888773647432865,"rowNumber":27},{"industry":"REIT","company":"Property Co","statement":"Income Statement","concept":"Net Income","coverage":0.838196331949038,"rowNumber":28},{"industry":"REIT","company":"Property Co","statement":"Income Statement","concept":"EPS","coverage":0.749773541456699,"rowNumber":29},{"industry":"REIT","company":"Property Co","statement":"Income Statement","concept":"Taxes","coverage":0.874028686571025,"rowNumber":30},{"industry":"REIT","company":"Property Co","statement":"Balance Sheet","concept":"Current Assets","coverage":0.995750220970868,"rowNumber":31},{"industry":"REIT","company":"Property Co","statement":"Balance Sheet","concept":"Current Liabilities","coverage":0.665042403217228,"rowNumber":32},{"industry":"REIT","company":"Property Co","statement":"Balance Sheet","concept":"Equity","coverage":0.8424907146781,"rowNumber":33},{"industry":"REIT","company":"Property Co","statement":"Cash Flow","concept":"Ops Cash","coverage":0.82196726014814,"rowNumber":34},{"industry":"REIT","company":"Property Co","statement":"Cash Flow","concept":"Investing Cash","coverage":0.730282519581698,"rowNumber":35},{"industry":"REIT","company":"Property Co","statement":"Cash Flow","concept":"Finance Cash","coverage":0.528997121562994,"rowNumber":36}]

	function drawChart(d){
		//console.log(JSON.stringify(d));

		
		if (d) { //Fresh data
			console.log('fresh data');
			console.log(d);
			console.log('----');
			$scope.data = d;
			$scope.categories.forEach(function(e,i){
					$scope[e[0]] = d3.set(d.map(_.p(e[1]))).values();
				});

			angular.forEach($scope.concepts, function(_){
				$scope.selectedconceptsSet[_]=true;
			});

			$scope.coverages = d.map(_.p('coverage'));
			$scope.maxCoverage = d3.max($scope.coverages);
			$scope.minCoverage = d3.min($scope.coverages);

			$scope.colorScale = d3.scale.linear()
							.domain([$scope.minCoverage,$scope.maxCoverage])
							.range(['red', 'green']);
			//http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/#
			$scope.$apply(); //Updates the view
			//Only do this the first time, when data is passed (if (d))
			//$watches trigger this function the other times
		}
		//TODO:
		//1) DRY the "fieldset" and "legend" on view; just specify the field and ng-repeat the rest? But Industry may have special checkboxes
		//2) Alternative to d3.set().values() the unique 
		//3) A multiselect; 

		var width=600,
			height=600,
			margin= {left:20, right:20, top:20, bottom:200},
			blockHeight = (height-margin.top-margin.bottom) / keysWhereValueTruthy($scope.selectedconceptsSet).length,
			blockWidth = blockHeight,
			rowLabelWidth= 200,
			leftAligned = 1;

		if (d){

			var svg = d3.select('#chart svg')
						.attr('width', width)
						.attr('height', height);

			$scope.canvas =  svg.select('g')
					.append('g')
						.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
			//TODO:These shouldn't repeat even if there is new d
			$scope.canvas
				.append('desc')
					.text('idaciti coverage heatmap')
				.append('text')
					.attr('class', 'title')
					.attr('dy', '.71em');
				//.text('Concept Heat Map');

			$scope.byConceptThenCompany =  d3
										.nest()
										.key(_.p('concept'))
										.key(_.p('company')) //TODO: sort?
										.rollup(function(v){ //This is an array, even though I know there is only one value
											return v[0]/*d3.mean(v.map(_.p('coverage'))); */})
										.map($scope.data); //.entries(data);

		}
		if ($scope.canvas){

			var concepts = keysWhereValueTruthy($scope.selectedconceptsSet);

			console.log(concepts);
			var concepts = $scope.canvas
				.selectAll('g.concept')
				.data(keysWhereValueTruthy($scope.selectedconceptsSet), _.i)


			var enterConcepts = concepts
				.enter()
				.append('g')
				.attr('class','concept');

			var exitConcepts = concepts
				.exit()
				.remove();

			//ROW LABELS
			enterConcepts
				.append('text')
				.attr('class', 'label')
				.style('text-anchor', leftAligned ?  'start' : 'end') //right-alignment
				//.attr('textLength', rowLabelWidth) //Like letter-spacing;
				.attr('x', -5 -(leftAligned*rowLabelWidth))
				.attr('dy', 30)
				.text(_.i);

			concepts
				.transition()
				.attr('transform', function(d, i){ return 'translate('+rowLabelWidth+','+i*blockHeight+')'; });
				
			var selectedCompanies = keysWhereValueTruthy($scope.selectedcompaniesSet);
			console.log($scope.selectedcompaniesSet);
			console.log(selectedCompanies);

			var coverages = concepts
					.selectAll('g.coverage')
					.data(function(concept, i){ 
							return selectedCompanies
								.map(function(co){
									return {concept: concept, company:co};})}, 
							function(d){ k=(d.concept + d.company); console.log(k); return k; }); //function(coverageByConcept){ return coverageByConcept.values; })
			
			var enterCoverages = coverages.enter()
				.append('g')
				.attr('class','coverage')
				.attr('data-company', _.p('company'))
				.attr('data-concept', _.p('concept'));
				
			var exitCoverages = coverages
				.exit()
				.remove();

			coverages
				.attr('transform', function(d, i){ return 'translate('+i*blockWidth+',0)'; })
				.append('rect')
				.attr('width', blockHeight).attr('height', blockHeight)	//Squares
				.style('fill', function(coverage){ 
					var byCompany=$scope.byConceptThenCompany[coverage.concept];
					console.log(byCompany);
					var forCompany = byCompany[coverage.company];
					console.log(forCompany);
					console.log($scope.colorScale(forCompany.coverage));
					return $scope.colorScale(forCompany.coverage); 
				});

			coverages
				.append('rect')
				.attr('x', 2).attr('y',2)
				.attr('width', blockHeight-4).attr('height', blockHeight-4)
				.attr('class', 'gradient');

			var companyLabelYOffset=($scope.concepts.length)*blockHeight;

			var companyLabels = $scope.canvas
				.selectAll('text.company.label')
				.data(keysWhereValueTruthy($scope.selectedcompaniesSet), _.i);
			//console.log(coData);
			companyLabels
				.enter()
				.append('text')
				.attr('class', 'company label')
				.text(_.i)
				.attr('y', companyLabelYOffset)
				.attr('dy', 20)
				.attr('dx', 20)
				
			companyLabels
				.transition()
				.attr('transform', function(d,i){ return 'rotate(20 '+ (rowLabelWidth + i*blockWidth) + ' ' + companyLabelYOffset +')' })
				.attr('x', function(d,i){ console.log(d); console.log(i); return (rowLabelWidth + i*blockWidth) })
				

			companyLabels
				.exit()
				.transition()
				.attr('transform', function(d,i){ return 'rotate(0 '+ (rowLabelWidth + i*blockWidth) + ' ' + companyLabelYOffset +')' })
				.remove();
		}

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
 //But there is http://docs.angularjs.org/api/angular.identity
_.i = function(_){  return _; }
