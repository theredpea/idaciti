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

	function drawChart(d){
		if (d) { //Fresh data

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
			rowLabelWidth= 200;

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

			var concepts = $scope.canvas.selectAll('g.concept')
				.data(keysWhereValueTruthy($scope.selectedconceptsSet), _.i);

			concepts
				.enter()
				.append('g')
				.attr('class','concept')
				.attr('transform', function(d, i){ return 'translate('+rowLabelWidth+','+i*blockHeight+')'; });

			concepts
				.exit()
				.remove();
			
			var leftAligned = 1;
			//ROW LABELS
			concepts
				.append('text')
				.attr('class', 'label')
				.style('text-anchor', leftAligned ?  'start' : 'end') //right-alignment
				//.attr('textLength', rowLabelWidth) //Like letter-spacing;
				.attr('dy', 30)
				.attr('x', -5 -(leftAligned*rowLabelWidth))
				.text(function(concept){ 
					console.log(concept);
					return concept; });

			var coverages = concepts
					.selectAll('g.coverage')
					.data(function(concept, i){ 
						return keysWhereValueTruthy($scope.selectedcompaniesSet).map(function(co){
							return {concept: concept, company:co};})}, _.i); //function(coverageByConcept){ return coverageByConcept.values; })
			
			coverages.enter()
				.append('g')
				.attr('class','coverage')
				.attr('transform', function(d, i){ return 'translate('+i*blockWidth+',0)'; })
				.attr('data-company', _.p('company'))
				.attr('data-concept', _.p('concept'));
				
			coverages
				.exit()
				.remove();

			coverages
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
