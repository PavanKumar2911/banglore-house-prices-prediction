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
}

// Helper function for the Estimate Price button
function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue(); 
    var bath = getBathValue(); 
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    // CRITICAL: Replace the URL below with your actual Render service URL.
    var BASE_API_URL = "https://banglore-house-prices-prediction.onrender.com"; 
    var url = BASE_API_URL + "/predict_home_price"; 

    if (!location || location === "Choose a Location") {
        estPrice.innerHTML = "<h2>Please select a location.</h2>";
        return;
    }

    // Data payload to be sent as JSON
    var dataPayload = {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location
    };
    
    
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json', 
        data: JSON.stringify(dataPayload), 
        dataType: 'json',
        success: function(data, status) {
            
            if (data.estimated_price) {
                var price = parseFloat(data.estimated_price).toFixed(2);
                estPrice.innerHTML = "<h2>" + price.toString() + " Lakh</h2>";
            } else {
                 estPrice.innerHTML = "<h2>Calculation Error. Please check input values.</h2>";
            }
            console.log("Price estimation successful.", status);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Price estimation network failure:", textStatus, errorThrown, jqXHR.responseText);
            
            var errorDetail = "Server did not respond correctly. Check network or server status.";
            try {
                var responseJson = JSON.parse(jqXHR.responseText);
                errorDetail = responseJson.error || errorDetail;
            } catch (e) {
                if (jqXHR.status === 415) {
                    errorDetail = "Error 415: Server rejected the data format.";
                }
            }
            estPrice.innerHTML = "<h2>Error: " + errorDetail + "</h2>";
        }
    });
}


/**
 * Finds the value of the currently checked BHK radio button.
 * @returns {number} The selected BHK count.
 */
function getBHKValue() {
    var bhkValue = $('input[name="uiBHK"]:checked').val();
    return bhkValue ? parseInt(bhkValue) : 1; 
}

/**
 * Finds the value of the currently checked Bath radio button.
 * @returns {number} The selected Bath count.
 */
function getBathValue() {
    var bathValue = $('input[name="uiBathrooms"]:checked').val();
    return bathValue ? parseInt(bathValue) : 1; 
}

// Attach event listeners after the DOM is fully loaded
$(document).ready(onPageLoad);