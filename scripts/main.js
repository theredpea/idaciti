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

	document.body.innerText=JSON.stringify(data,undefined, true);

}