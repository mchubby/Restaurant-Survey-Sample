(function () {
    'use strict';

    /******************************************************************/
    // global error handling
    /******************************************************************/
    var showAlert = function(message, title, callback) {
        navigator.notification.alert(message, callback || function () {
        }, title, 'OK');
    };
    var showError = function(message) {
        showAlert(message, 'Error occured');
    };
    window.addEventListener('error', function (e) {
        e.preventDefault();
        var message = e.message + "' from " + e.filename + ":" + e.lineno;
        showAlert(message, 'Error occured');
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
        
        $.ajax({
            type: "POST",
            url: 'https://api.everlive.com/v1/eVKxNui85A6TopjR/Ratings',
            headers: { "Authorization" : "Bearer ${AccessToken}" },
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(data){
                alert(JSON.stringify(data));
            },
            error: function(error){
                alert('Sorry, an error occurred processing your survey. Please try again later.');
            }
        })
    });
}());