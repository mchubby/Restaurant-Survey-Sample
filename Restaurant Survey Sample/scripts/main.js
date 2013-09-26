(function () {
    'use strict';

    /******************************************************************/
    // global error handling
    /******************************************************************/
    window.addEventListener('error', function (e) {
        e.preventDefault();
        var message = e.message + "' from " + e.filename + ":" + e.lineno;
        alert('Error occured: ' + message);
        return true;
    });


    // initialize Everlive SDK
    new Everlive({ apiKey: 'eVKxNui85A6TopjR' });
    
    $('form').on('submit', function(event) {
        event.preventDefault();
        var data = {
            location: $(this.location).filter(':checked').val(),
            appetizer: $(this.appetizer).val() == "yes",
            rating: $(this.rating).val()
        };
        
        $.mobile.loading('show', { text: 'Processing...', textVisible: true });
		Everlive.$.data('Ratings').create(data,
            function(data){
                $.mobile.loading('hide');
                $.mobile.changePage('#success');
            },
            function(error){
                alert('Sorry, an error occurred processing your survey. Please try again later.');
            }                         
		);

        return false;
    });
    
    function displayResults(data) {
        var results = {
            location: { north: 0, south: 0, west: 0 },
            appetizer: { yes: 0, no: 0 },
            rating: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
        };

        data.result.forEach(function(result) {
            results.location[result.location]++;
            results.appetizer[(result.appetizer ? 'yes' : 'no')]++;
            results.rating[result.rating]++;
        });

		$('#results-north').text(results.location.north);
		$('#results-south').text(results.location.south);
		$('#results-west').text(results.location.west);
        $('#results-yes').text(results.appetizer.yes);
        $('#results-no').text(results.appetizer.no);
        $('#results-1').text(results.rating['1']);
        $('#results-2').text(results.rating['2']);
        $('#results-3').text(results.rating['3']);
        $('#results-4').text(results.rating['4']);
        $('#results-5').text(results.rating['5']);
        
        $.mobile.loading('hide');
    };
    
    $('#results').on('pageshow', function() {
        $.mobile.loading('show', { text: 'Loading results...', textVisible: true });
        Everlive.$.data('Ratings')
        	.get()
            .then(displayResults,
				function(error) {
                	'Sorry, loading the survey results failed.';
	            });
    });
}());