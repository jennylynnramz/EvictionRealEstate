// Store our API endpoint inside queryUrl
var queryUrl = "https://data.sfgov.org/resource/5cei-gny5.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);

});

function createFeatures(SFevictionData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the eviction
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> Eviction ID: " + feature.properties.eviction_id +
      "</h3><hr><p> SF Neighborhood: " + feature.properties.neighborhood + "</p>" + "<hr><p>Date of Notice: " + new Date(feature.properties.file_date) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the SF evictions object
  // Run the onEachFeature function once for each piece of data in the array
  var evictions = L.geoJSON(SFevictionData, {
    onEachFeature: onEachFeature
  });


  // Sending our evictions layer to the createMap function
  createMap(evictions);
}

function createMap(evictions) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Evictions: evictions
  };

  // Create our map, giving it the streetmap and eviction layers to display on load
  var myMap = L.map("map", {
    center: [
        37.7449, -122.4794
    ],
    zoom: 12,
    layers: [streetmap, evictions]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


 //close of createMap function


  ////////begin legend ////////////
// Create a legend to display information about our map
var info = L.control({
  position: "bottomleft"
});

  //create map placement in hmtl
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(myMap);


//where the count begins
d3.json(queryUrl, function(legendData) {
  console.log(legendData);

  var propertyData = legendData.features

  // console.log(propertyData.length)

//////create each variable
  var evictionCount = {
    breach: 0,
    capital_improvement: 0,
    condo_conversion: 0,
    demolition: 0,
    development: 0,
    ellis_act_withdrawal: 0,
    failure_to_sign_renewal: 0,
    good_samaritan_ends: 0,
    illegal_use: 0,
    late_payments: 0,
    lead_remediation: 0,
    non_payment: 0,
    nuisance: 0,
    other_cause: 0,
    owner_move_in: 0,
    roommate_same_unit: 0,
    substantial_rehab: 0,
    unapproved_subtenant: 0
  };

  for (var i = 0; i < propertyData.length; i++){

    if (propertyData[i].properties.breach === true) {
      evictionCount.breach++;
      // console.log("Eviction for breach");
    }
    else if (propertyData[i].properties.capital_improvement === true) {
      evictionCount.capital_improvement++;
      // console.log("Eviction for capital_improvement");
    }
    else if (propertyData[i].properties.condo_conversion === true) {
      evictionCount.condo_conversion++;
      // console.log("Eviction for condo_conversion");
    }
    else if (propertyData[i].properties.demolition === true) {
      evictionCount.demolition++;
      // console.log("Eviction for demolition");
    }
    else if (propertyData[i].properties.development === true) {
      evictionCount.development++;
      // console.log("Eviction for development");
    }
    else if (propertyData[i].properties.ellis_act_withdrawal === true) {
      evictionCount.ellis_act_withdrawal++;
      // console.log("Eviction for ellis_act_withdrawal");
    }
    else if (propertyData[i].properties.failure_to_sign_renewal === true) {
      evictionCount.failure_to_sign_renewal++;
      // console.log("Eviction for failure_to_sign_renewal");
    }
    else if (propertyData[i].properties.good_samaritan_ends === true) {
      evictionCount.good_samaritan_ends++;
      // console.log("Eviction for good_samaritan_ends");
    }
    else if (propertyData[i].properties.illegal_use === true) {
      evictionCount.illegal_use++;
      // console.log("Eviction for illegal_use");
    }
    else if (propertyData[i].properties.late_payments === true) {
      evictionCount.late_payments++;
      // console.log("Eviction for late_payments");
    }
    else if (propertyData[i].properties.lead_remediation === true) {
      evictionCount.lead_remediation++;
      // console.log("Eviction for lead_remediation");
    }
    else if (propertyData[i].properties.non_payment === true) {
      evictionCount.non_payment++;
      // console.log("Eviction for non_payment");
    }
    else if (propertyData[i].properties.nuisance === true) {
      evictionCount.nuisance++;
      // console.log("Eviction for nuisance");
    }
    else if (propertyData[i].properties.other_cause === true) {
      evictionCount.other_cause++;
      // console.log("Eviction for other_cause");
    }
    else if (propertyData[i].properties.owner_move_in === true) {
      evictionCount.owner_move_in++;
      // console.log("Eviction for owner_move_in");
    }
    else if (propertyData[i].properties.roommate_same_unit === true) {
      evictionCount.roommate_same_unit++;
      // console.log("Eviction for roommate_same_unit");
    }
    else if (propertyData[i].properties.substantial_rehab === true) {
      evictionCount.substantial_rehab++;
      // console.log("Eviction for substantial_rehab");
    }
    else {
      evictionCount.unapproved_subtenant++;
      // console.log("Eviction for unapproved_subtenant");
    }
  } //end count for loop

// Call the updateLegend function, which will... update the legend
  updateLegend(evictionCount);

  var neighborhoodList = [];

  for (var i = 0; i < propertyData.length; i++){
    console.log(propertyData[i].properties.neighborhood)

    var potato = propertyData[i].properties.neighborhood;

    // neighborhoodList.map(hood => hood.neighborhood)
    //   .filter((value, index, self) => self.indexOf(value) === index)

    // if ((potato in neighborhoodList) === false) {
      neighborhoodList.push(potato)
    // }

  } //end neighborhood for loop
  // console.log(neighborhoodList)

  var distinctList = [...new Set(neighborhoodList)]

  console.log(distinctList)

});


// Update the legend's innerHTML with the last updated time and station count
function updateLegend(evictionCount) {
  document.querySelector(".legend").innerHTML = [
 "<h3><u>Eviction Rational City Totals</u></h3>",  
 "<p>Breach: " + evictionCount.breach +"</p>",
 "<p>Capital Improvement: " + evictionCount.capital_improvement +"</p>",
 "<p>Condo Conversion: " + evictionCount.condo_conversion +"</p>",
 "<p>Demolition: " + evictionCount.demolition +"</p>",
 "<p>Development: " + evictionCount.development +"</p>",
 "<p>Ellis Act Withdrawal: " + evictionCount.ellis_act_withdrawal +"</p>",
 "<p>Failure To Sign Renewal: " + evictionCount.failure_to_sign_renewal +"</p>",
 "<p>Good Samaritan Ends: " + evictionCount.good_samaritan_ends +"</p>",
 "<p>Illegal Use: " + evictionCount.illegal_use +"</p>",
 "<p>Late Payments: " + evictionCount.late_payments +"</p>",
 "<p>Lead Remediation: " + evictionCount.lead_remediation +"</p>",
 "<p>Non Payment: " + evictionCount.non_payment +"</p>",
 "<p>Nuisance: " + evictionCount.nuisance +"</p>",
 "<p>Other Cause: " + evictionCount.other_cause +"</p>",
 "<p>Owner Move In: " + evictionCount.owner_move_in +"</p>",
 "<p>Roommate Same Unit: " + evictionCount.roommate_same_unit +"</p>",
 "<p>Substantial Rehab: " + evictionCount.substantial_rehab +"</p>",
 "<p>Unapproved Subtenant: " + evictionCount.unapproved_subtenant +"</p>"
    
  ].join("");
}

}