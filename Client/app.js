function onPageLoad() {
    console.log( "document loaded" );
    // CRITICAL: Replace the URL below with your actual Render service URL.
    // Use the variable name BASE_API_URL so it's easy to read.
    var BASE_API_URL = "https://banglore-house-prices-prediction.onrender.com"; // CONFIRMED RENDER URL

    var url = BASE_API_URL + "/get_location_names"; // Correctly construct the API call URL

    $.get(url, function(data, status) {
        console.log("got response for get_location_names");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Clear any existing options
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });

    // Initialize BHK and Bath buttons to be selected
    var bhk = document.getElementById("uiBHK");
    bhk.querySelector('button[data-bhk="2"]').click();

    var bath = document.getElementById("uiBath");
    bath.querySelector('button[data-bath="2"]').click();

}

// Helper function for the Estimate Price button
function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    // CRITICAL: Replace the URL below with your actual Render service URL.
    var BASE_API_URL = "https://banglore-house-prices-prediction.onrender.com"; // CONFIRMED RENDER URL
    var url = BASE_API_URL + "/predict_home_price"; // Correctly construct the API call URL

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location
    },function(data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Add failure logging to see why price calculation might fail
        console.error("Price estimation failed:", textStatus, errorThrown, jqXHR.responseText);
        estPrice.innerHTML = "<h2>Error calculating price. Check server logs.</h2>";
    });
}


function getBathValue() {
    var uiBath = document.getElementsByName("uiBath");
    for(var i in uiBath) {
        if(uiBath[i].classList.contains("selected")) {
            return parseInt(i)+1;
        }
    }
    return -1 // Default to 1 (if nothing is selected)
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].classList.contains("selected")) {
            return parseInt(i)+1;
        }
    }
    return -1 // Default to 1 (if nothing is selected)
}

// Attach event listeners after the DOM is fully loaded
// Changed from window.onload to jQuery's document ready for robustness
$(document).ready(onPageLoad);
