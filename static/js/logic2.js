console.log("logic2.js is locked and loaded");
//  Fetch data
var evictionUrl = "https://data.sfgov.org/resource/5cei-gny5.geojson";
var neighborhoodsData = "Resources/SF Find Neighborhoods.geojson";
//https://data.sfgov.org/resource/xfcw-9evu.json

function createEvictions(SFevictionData) {
  // console.log(SFevictionData);

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the eviction
  function onEachFeature(feature, layer) {

    for (const prop in feature.properties) {
      // console.log("prop: " + prop)
      if (is_eviction_cause(prop)) {
        // console.log("True prop: " + prop)
        if (feature.properties[prop] === true) {
          // console.log("Double True: " + feature.properties[prop])
          var popupEviction = prop.replace(/_/g, ' ')
        } //for const
      } //if is eviction
    } //if feature_true
    // console.log(popupEviction)
    

    layer.bindPopup("<b>Eviction ID:</b> " + feature.properties.eviction_id +
      "<br><b>Neighborhood:</b> " + feature.properties.neighborhood + 
      "<br><b>Eviction Reason:</b> " + popupEviction  + 
      "<br><b>Date of Notice: </b>" + new Date(feature.properties.file_date).toDateString());
  
  }
  // Create a GeoJSON layer containing the features array on the SF evictions object
  // Run the onEachFeature function once for each piece of data in the array
  var evictions = L.geoJSON(SFevictionData, {
    onEachFeature: onEachFeature
  });

  return evictions;
};

function createNeighborhoods(neighborhoodFeatures) {
    var neighborhoods = L.geoJson(neighborhoodFeatures, {
        // Style each feature 
        style: function(feature) {
          return {
            color: "black",
            fillColor: "gray",
            fillOpacity: 0,
            weight: 1.5
          };
        },
        // Called on each feature
        onEachFeature: function(feature, layer) {
          // Set mouse events to change map styling
          layer.on({
            // Highlight mouse over section
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            // revert back to original 
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0
              });
            },
            // Enlarge section when clicked
            // click: function(event) {
            //   // console.log(event.target.feature.geometry.coordinates)
            //   bounds = event.target.getBounds();
            //   myMap.fitBounds(bounds)
            // }
          });
        }
      });
    return neighborhoods;

  
};




function createMap(evictions, neighborhoods) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    scrollWheelZoom: false,
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
    Evictions: evictions,
    Neighborhoods: neighborhoods
  };

  // Create our map, giving it the streetmap and eviction & neighborhood layers to display on load
  var myMap = L.map("map", {
    center: [
        37.7449, -122.4794
    ],
    zoom: 12,
    layers: [streetmap, evictions, neighborhoods]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  createLegend(myMap);
};
//////////


///////////

// Use d3.queue to wait for both JSON files to load
d3.queue()
  .defer(d3.json, evictionUrl)
  .defer(d3.json, neighborhoodsData)
  .await(analyze);

function analyze(error, evictionsResponse, neighborhoodResponse) {
    if(error) { console.log(error); }
    var evictions = createEvictions(evictionsResponse);
    var neighborhoods = createNeighborhoods(neighborhoodResponse);
    createMap(evictions, neighborhoods);
};  


 //close of createMap function


  ////////begin legend ////////////
// Create a legend to display information about our map
function createLegend(myMap) {
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
  
}
var magicUrl = "https://data.sfgov.org/resource/5cei-gny5.geojson";
  //where the count begins
d3.json(magicUrl, function(legendData) {
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
      // console.log(propertyData[i].properties.neighborhood)

      var potato = propertyData[i].properties.neighborhood;

      // neighborhoodList.map(hood => hood.neighborhood)
      //   .filter((value, index, self) => self.indexOf(value) === index)

      // if ((potato in neighborhoodList) === false) {
        neighborhoodList.push(potato)
      // }

    
    } //end neighborhood for loop
    console.log(neighborhoodList)

    var distinctList = [...new Set(neighborhoodList)]

  //   console.log(distinctList)

  });


  // Update the legend's innerHTML with the last updated time and station count
  function updateLegend(evictionCount) {
    document.querySelector(".legend").innerHTML = [
  "<h5><u>Eviction Rational<br>City Totals:</u></h5>",  
  "Breach: " + evictionCount.breach +"<br>",
  "Capital Improvement: " + evictionCount.capital_improvement +"<br>",
  "Condo Conversion: " + evictionCount.condo_conversion +"<br>",
  "Demolition: " + evictionCount.demolition +"<br>",
  "Development: " + evictionCount.development +"<br>",
  "Ellis Act Withdrawal: " + evictionCount.ellis_act_withdrawal +"<br>",
  "Failure To Sign Renewal: " + evictionCount.failure_to_sign_renewal +"<br>",
  "Good Samaritan Ends: " + evictionCount.good_samaritan_ends +"<br>",
  "Illegal Use: " + evictionCount.illegal_use +"<br>",
  "Late Payments: " + evictionCount.late_payments +"<br>",
  "Lead Remediation: " + evictionCount.lead_remediation +"<br>",
  "Non Payment: " + evictionCount.non_payment +"<br>",
  "Nuisance: " + evictionCount.nuisance +"<br>",
  "Other Cause: " + evictionCount.other_cause +"<br>",
  "Owner Move In: " + evictionCount.owner_move_in +"<br>",
  "Roommate Same Unit: " + evictionCount.roommate_same_unit +"<br>",
  "Substantial Rehab: " + evictionCount.substantial_rehab +"<br>",
  "Unapproved Subtenant: " + evictionCount.unapproved_subtenant +"<br>"
      
    ].join("");
  };
;


////is_eviction_cause is related to filtering the data
function is_eviction_cause(prop) {
  //list of all possible eviction reasons, the function returns true if the current legendData.features[i].properties matches something in this list. Used to exclude extra information such as "eviction id", "zip code", etc
  if(["breach", "capital_improvement", "condo_conversion", "demolition", "development", "ellis_act_withdrawal", 
  "failure_to_sign_renewal", "good_samaritan_ends", "illegal_use", "late_payments", "lead_remediation",
   "non_payment", "nuisance", "other_cause", "owner_move_in", "roommate_same_unit", "substantial_rehab", 
   "unapproved_subtenant"].includes(prop)) {
    return true
  }
  //if the properties isn't in the above list, return false so we can skip to the next one
  return false
}



console.log("end")