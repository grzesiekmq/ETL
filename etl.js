angular.module('myApp', ['ngResource'])
.controller('IndexController', ['$scope', '$http', function($scope, $http) {
	

	// ETL w postaci pierwszej zgodnie z 5 pkt. zad.
	$scope.etl = function(){

			
		var urlKTF = /^Komputery|Telefony i akcesoria|Telefony|Fotografia\/[0-9]{7,9}$/;	
		
		
		// kod produktu jako parametr np. www.ceneo.pl/{nazwa kategorii}/{id} 
			// nazwa kategorii: Komputery, Telefony_i_akcesoria, Fotografia
			// id: kod produktu
		$scope.str = $('#url').val();

			if ( urlKTF.test($scope.str) ){
		
				corsCeneo = "http://www.ceneo.pl/";
				urlCatLimit = corsCeneo + $scope.str + '/opinie-';



				// pobranie od pierwszej strony do 10-tej 
				for (x = 1; x <= 10; x++){
			
					encodeURIComponent([x]);
				
					fullUrl = urlCatLimit + encodeURIComponent([x]);
				
					

					$http.get(fullUrl).then(function(response){
						var abc = response.data;
						
						
						
						gt = $(abc).find('li.product-review.js_product-review').html();
						
						
							findCons = $(gt).find('span.cons-cell').find('ul').text();

							// alert(findCons);
							findPros = $(gt).find('span.pros-cell').find('ul').text();
							// alert(findPros);

							findSumUp = $(gt).find('.product-review-body').text();
							// alert(findSumUp)

							findStars = $(gt).find('.review-score-count').text();
							// alert(findStars);

							findReviewer = $(gt).find('div.product-reviewer').text();
							// alert(findReviewer);				
						
							if ( findReviewer == null ){

								findReviewer.append('anonim');
							};
						
						var findReviewDate = $(gt).find("[datetime]").attr('datetime');
						var findRecOrNot = $(gt).find('em.product-recommended').text();	
						var liczby = $(gt).find('.product-review-usefulness-stats span');
						var findRecUseful = liczby.eq(1).text();
						var findRecUsefulness = liczby.eq(2).text();
						
						var obj = {wady: findCons.trim(), 
							zalety: findPros.trim(), 
							podsumowanie: findSumUp.trim(),
							liczba_gwiazdek: findStars.trim(), 
							autor: findReviewer.trim(), 
							data_opinii: findReviewDate.trim(), 
							POLECAM_NIE_POLECAM: findRecOrNot.trim(), 
							opinia_przydatna: findRecUseful.trim(),
							przydatność_opinii: findRecUsefulness.trim()};

						json = angular.toJson(obj, true);


						
						


						
						
						json = json.replace(/\n/g, ' ');
						
						// alert(json);
						
						jparse = JSON.parse(json);
						
						
						// alert(jparse.wady);
						// alert(jparse.zalety);
						// alert(jparse.podsumowanie);
						// alert(jparse.liczba_gwiazdek);
						// alert(jparse.autor);
						// alert(jparse.data_opinii);
						// alert(jparse.POLECAM_NIE_POLECAM);
						// alert(jparse.opinia_przydatna);
						// alert(jparse.przydatność_opinii);
						
						

						$.ajax({type: 'POST',
								url: 'review.php',
								contentType:'application/json',
								data: JSON.stringify(obj),
								dataType: 'json'
							});
						
						
						



						
						
						

						
						
						// tekstowa forma
						// var reviewText = [findCons, findPros, findSumUp, findStars, findReviewer];

						
												
						
						

						


						var table = makeTable(json);

						
						$(table).appendTo('#produkt');

						// stwórz tabelę
						 
						function makeTable(json){
							var table = $('<table border="1px">');
							var tR = "<tr>";
							var reviewsDesc = ["wady", "zalety", "podsumowanie", "liczba_gwiazdek", "autor", "data_opinii",
							 "POLECAM_NIE_POLECAM", "opinia_przydatna", "przydatność_opinii"];
							
							for (var k in reviewsDesc) tR += "<th>" + reviewsDesc[k] + "</th>";
								tR += "</tr>";
								$(tR).appendTo(table);
							
								var tableRow = "<tr>";
							
							    tableRow += "<td>" + jparse.wady + "</td>";
							    tableRow += "<td>" + jparse.zalety + "</td>";
							    tableRow += "<td>" + jparse.podsumowanie + "</td>";
							    tableRow += "<td>" + jparse.liczba_gwiazdek + "</td>";
							    tableRow += "<td>" + jparse.autor + "</td>";
							    tableRow += "<td>" + jparse.data_opinii + "</td>";
								tableRow += "<td>" + jparse.POLECAM_NIE_POLECAM + "</td>";
							    tableRow += "<td>" + jparse.opinia_przydatna + "</td>";
							    tableRow += "<td>" + jparse.przydatność_opinii + "</td>";

								tableRow += "</tr>";
								$(table).append(tableRow);

								
								return ($(table));
						};
						

						
					});

};
				


	
	// Transform

	// wzorzec który szuka zdania lub niedokończonego zdania z opinii
		// pattSumUp = /^(.+((\.\s)|(\!\s){1}))|(.+([a-z]\n){1})$/m;
		// sumUpExec = pattSumUp.exec(findSumUp);
		
		// alert(sumUpExec);

		// pattRecOrNot = /Polecam|Nie Polecam/g;
		// recOrNotExec = pattRecOrNot.exec(findRecOrNot);
		
		
		// alert(recOrNotExec);

		// pattStars = /(\d|(\d\,\d))\/\d/g;
		// starsExec = pattStars.exec(findStars);
		
		// alert(starsExec);

		// pattUseful = /(\d\s){1}z(\s\d){1}/g;
		// usefulExec = pattUseful.exec(findRecUseful);
		
		// alert(usefulExec);

		// pattReviewer = /.+/g;
		// reviewerExec = pattReviewer.exec(gs);
		
		// alert(reviewerExec);

		
		// alert(consExec);

		
		
		// alert(prosExec);

		// pattDate = /\d{4}\-\d{2}\-\d{2}/g; 
		// dateExec = pattDate.exec(findReviewDate);
		
		


		// trimming review
		// consTrim = findCons.trim();
		// prosTrim = findPros.trim();
		// sumUpTrim = findSumUp.trim();
		// starsTrim = findStars.trim();
		// reviewerTrim = findReviewer.trim();
		// // reviewDateTrim = findReviewDate.trim();
		// recOrNotTrim = findRecOrNot.trim();
		// recUsefulTrim = findRecUseful.trim();


		


		

		

		
	


	


	




	
	

				alert('Produkt należy do kategorii. Wczytywanie 10 opinii.');
				return true;

}
else{
					alert('Produkt z poza kategorii!');
					return false;
				};





	function exportToCSV($rows, filename) {

        var $rows = $(table).find('tr:has(td)'),

            
            
            tmpColDelim = String.fromCharCode(11), 
            tmpRowDelim = String.fromCharCode(0), 

            
            colDelim = '","',
            rowDelim = '"\r\n"',

            
            csv = '"' + $rows.map(function (i, row) {
                var $row = $(row),
                    $cols = $row.find('td');

                return $cols.map(function (j, col) {
                    var $col = $(col),
                        text = $col.text();

                    return text.replace(/"/g, '""'); 

                }).get().join(tmpColDelim);

            }).get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim) + '"',

            
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    };

    $('.c').on('click', function(event){
    	exportToCSV.apply(this, [$(table), 'export.csv']);
    	});


};    

    
    



	// Load
	function L(){

	};

	$scope.addReview = function(){
		$http.get('/review.php').then(function(response){
			$scope.reviewAdd = response.data;
		});
	};



	
	// ETL jako poszczególne części czyli E, T, L
	$scope.extract = function(){
		$('#t').prop('disabled', false);
			
		var urlKTF = /^Komputery|Telefony i akcesoria|Telefony|Fotografia\/[0-9]{7,9}$/;	
		
		
		// kod produktu jako parametr np. www.ceneo.pl/{nazwa kategorii}/{id} 
			// nazwa kategorii: Komputery, Telefony_i_akcesoria, Fotografia
			// id: kod produktu
		$scope.str = $('#url').val();

			if ( urlKTF.test($scope.str) ){
		
				corsCeneo = "http://www.ceneo.pl/";
				urlCatLimit = corsCeneo + $scope.str + '/opinie-';



				// pobranie od pierwszej strony do 10-tej 
				for (x = 1; x <= 10; x++){
			
					encodeURIComponent([x]);
					fullUrl = urlCatLimit + encodeURIComponent([x]);
					

					$http.get(fullUrl).then(function(response){
						var abc = response.data;
						

						var parentOfulCons = $(abc).find('.cons-cell');
						var parentOfulPros = $(abc).find('.pros-cell');


						var findCons = $(parentOfulCons).find('ul').text();
						var findPros = $(parentOfulPros).find('ul').text();
						var findSumUp = $(abc).find('.product-review-body').text();
						var findStars = $(abc).find('.review-score-count').text();
						var findReviewer = $(abc).find('.product-reviewer').text();
						
						
							if ( findReviewer == null ){

								findReviewer.append('anonim');
							};
						
						bar = $(abc).find('li.product-review.js_product-review div.show-review-content.content-wide div.content-wide-col div span.review-time');

						var findReviewDate = $(abc).find("[datetime]").attr('datetime');
						overall = $(abc).find('li.product-review.js_product-review').text();
						

						
						
						
						var findRecOrNot = $(abc).find('em.product-recommended').text();	
						var findRecUseful = $(abc).find('span.product-review-usefulness-stats').text();
						
						
						
	
						var reviewText = [findCons, findPros, findSumUp, findStars, findReviewer, findReviewDate, findRecOrNot, findRecUseful];
												
					});


	};

};


};


	$scope.transform = function(){
		$('#l').prop('disabled', false);
		alert('t ok');
		
	};

	$scope.load = function(){
		alert('load ok');
	};

	
}]);

	
	
	


