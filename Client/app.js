function onPageLoad() {
    console.log( "document loaded" );
    // CRITICAL: Replace the URL below with your actual Render service URL.
    var BASE_API_URL = "https://banglore-house-prices-prediction.onrender.com"; 

    var url = BASE_API_URL + "/get_location_names"; 

    $.get(url, function(data, status) {
        console.log("got response for get_location_names");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Clear any existing options
            
            // Re-add the default option first
            $('#uiLocations').append(new Option("Choose a Location", "", true, true));

            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });

    // NOTE: The UI initialization below is for a different type of UI (buttons with classes).
    // Since the HTML uses standard radio buttons, these lines are not needed and should be commented out or removed.
    // var bhk = document.getElementById("uiBHK");
    // bhk.querySelector('button[data-bhk="2"]').click();

    // var bath = document.getElementById("uiBath");
    // bath.querySelector('button[data-bath="2"]').click();

}

// Helper function for the Estimate Price button
function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue(); // Now correctly finds the checked radio value
    var bath = getBathValue(); // Now correctly finds the checked radio value
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    // CRITICAL: Replace the URL below with your actual Render service URL.
    var BASE_API_URL = "https://banglore-house-prices-prediction.onrender.com"; 
    var url = BASE_API_URL + "/predict_home_price"; 

    if (!location || location === "Choose a Location") {
        estPrice.innerHTML = "<h2>Please select a location.</h2>";
        return;
    }
    
    // Use $.post to send data to the robust server endpoint
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location
    },function(data, status) {
        // Successful response from the server (if estimated_price is present)
        if (data.estimated_price) {
            estPrice.innerHTML = "<h2>Estimated Price: " + data.estimated_price.toString() + " Lakh</h2>";
        } else {
            // Handle case where server returns success but no price (e.g., error message)
             estPrice.innerHTML = "<h2>Calculation Error. Please check input values.</h2>";
        }
        console.log("Price estimation successful.", status);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // This runs if the network call or server returns a 4xx/5xx error
        console.error("Price estimation network failure:", textStatus, errorThrown, jqXHR.responseText);
        // Show the detailed error from the server if available
        var errorDetail = jqXHR.responseJSON ? jqXHR.responseJSON.error : "Server did not respond correctly.";
        estPrice.innerHTML = "<h2>Error: " + errorDetail + "</h2>";
    });
}


// --- FIXED FUNCTIONS ---

/**
 * FIXED: Finds the value of the currently checked BHK radio button.
 * The input elements have name="uiBHK".
 * @returns {number} The selected BHK count.
 */
function getBHKValue() {
    // Selects the radio input with name='uiBHK' that is currently checked, and returns its value.
    var bhkValue = $('input[name="uiBHK"]:checked').val();
    return bhkValue ? parseInt(bhkValue) : 1; // Default to 1 if nothing is selected
}

/**
 * FIXED: Finds the value of the currently checked Bath radio button.
 * The input elements have name="uiBathrooms".
 * @returns {number} The selected Bath count.
 */
function getBathValue() {
    // Selects the radio input with name='uiBathrooms' that is currently checked, and returns its value.
    var bathValue = $('input[name="uiBathrooms"]:checked').val();
    return bathValue ? parseInt(bathValue) : 1; // Default to 1 if nothing is selected
}

// Attach event listeners after the DOM is fully loaded
// Changed from window.onload to jQuery's document ready for robustness
$(document).ready(onPageLoad);
