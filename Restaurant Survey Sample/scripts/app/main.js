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
    var el = new Everlive({
        apiKey: 'eVKxNui85A6TopjR'
    });
    
    $('form').on('submit', function(event) {
        event.preventDefault();
        var data = {
            location: $(this.location).val(),
            appetizer: $(this.appetizer).val() == "yes",
            rating: $(this.rating).val()
        };
        
        $.mobile.loading('show', { text: 'Processing...', textVisible: true });

        $.ajax({
            type: "POST",
            url: 'https://api.everlive.com/v1/eVKxNui85A6TopjR/Ratings',
            headers: { "Authorization" : "Bearer ${AccessToken}" },
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(data){
                $.mobile.loading('hide');
                $.mobile.changePage('#success');
            },
            error: function(error){
                alert('Sorry, an error occurred processing your survey. Please try again later.');
            }
        });

        return false;
    });
}());