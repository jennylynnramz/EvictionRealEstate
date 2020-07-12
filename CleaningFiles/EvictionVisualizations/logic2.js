var queryUrl = "https://data.sfgov.org/resource/5cei-gny5.geojson";



d3.json(queryUrl, function(legendData) {

  //dictionary to hold all wanted data 
  evictionByRationale = {}

  for(i=0; i < legendData.features.length; i++) {
      // console.log(legendData.features[i].properties)
      for (const propertieskey in legendData.features[i].properties) {
          // console.log(propertieskey);
          if (is_eviction_cause(propertieskey)) {
              // console.log("yes " + propertieskey)
              evictionByRationale[propertieskey] = {}    
          } //if       
      } //for
  } //for
 
  for (const listKey in evictionByRationale) {
    for (i=0; i < legendData.features.length; i++) {
    evictionByRationale[listKey][legendData.features[i].properties.neighborhood] = 0
  }

  // console.log(evictionByRationale)
  
  for (i=0; i < legendData.features.length; i++) {
    for (const listkey in evictionByRationale) {

      // console.log(listkey) //prints the eviction rationl from the new list
      for (const jsonkey in legendData.features[i].properties) {
        // console.log(jsonkey) //prints all of the properties of the original data
        if (is_eviction_cause(jsonkey)) {
          if((legendData.features[i].properties[jsonkey] === true)) {
          // console.log(jsonkey) //prints the eviction rational from the original data that matches the control list.
            if (jsonkey === listkey) {
              for (const neighKey in evictionByRationale[listKey]){
                var jsonNeighborhood = legendData.features[i].properties.neighborhood
                // console.log("json neighborhood: " + jsonNeighborhood)
                if (neighKey === jsonNeighborhood && jsonkey === listkey) {
                  // console.log("eviction rational: " + jsonkey + " " + listkey)
                  // console.log("Neighborhood: " + neighKey + " " + jsonNeighborhood)
                  evictionByRationale[listkey][neighKey]++
                } //if
                else {
                  continue
                } //else
              } //for
            } //if
          } //if
        } //if
      } //for
    } //for
  } //for
  } //for
  console.log(evictionByRationale)

  //////neighborhood dropdown BEGIN  
      ///Populates the dropdown with the neighborhood names
      var select = document.getElementById("eviction-select");
      for(key in evictionByRationale) {
        // console.log(key)
        select.options[select.options.length] = new Option(key.replace(/_/g, ' '));
      }
    //////neighborhood dropdown END
  

});// end of d3




function is_eviction_cause(key) {
  //list of all possible eviction reasons, the function returns true if the current legendData.features[i].properties matches something in this list. Used to exclude extra information such as "eviction id", "zip code", etc
  if(["breach", "capital_improvement", "condo_conversion", "demolition", "development", "ellis_act_withdrawal", "failure_to_sign_renewal", "good_samaritan_ends", "illegal_use", "late_payments", "lead_remediation", "non_payment", "nuisance", "other_cause", "owner_move_in", "roommate_same_unit", "substantial_rehab", "unapproved_subtenant"].includes(key)) {
    return true
  }
  //if the properties isn't in the above list, return false so we can skip to the next one
  return false
} //end is_eviction_cause



function optionEvictionChanged(){
  var e = document.getElementById("eviction-select");
  var result = (e.options[e.selectedIndex].text).replace(/ /g, '_');
  console.log(result)
  
  var resultNeighborhoodCounts = Object.values(evictionByRationale[result])
  console.log(resultNeighborhoodCounts)

  var resultNeighborhoodLabels = Object.keys(evictionByRationale[result]);
  console.log(resultNeighborhoodLabels)

  var resultByNeighborhoodEvictionLabels = Object.keys(evictionByRationale)
  console.log(resultByNeighborhoodEvictionLabels)

  // removing _ from labels so they look nicer
  var cleanByNeighborhoodEvictionLabels = []
  for (u = 0; u < resultByNeighborhoodEvictionLabels.length; u++) {
    // resultByNeighborhoodEvictionLabels[u].replace(/_/g, ' ');
    cleanByNeighborhoodEvictionLabels.push(resultByNeighborhoodEvictionLabels[u].replace(/_/g, ' '))
  }

  console.log(cleanByNeighborhoodEvictionLabels)

  var totalNeighborhoodEviction = 0
  // console.log(resultEvictionCounts.length)
  for (i = 0; i < resultNeighborhoodCounts.length; i++) {
    totalNeighborhoodEviction += resultNeighborhoodCounts[i]
  }
  console.log("Total Evictions for " + result + ":" + totalNeighborhoodEviction)

  ///begin plotly by EVICTION REASON ////

  var data = [
    {
      x: cleanByNeighborhoodEvictionLabels,
      y: resultNeighborhoodCounts,
      type: 'bar'
    }
  ];

  var layout = {
    title: ('Evictions for ' + result.replace(/_/g, ' ')).toUpperCase(),
    subtitle: 'Total Evictions: ' + totalNeighborhoodEviction
  };
  
  Plotly.newPlot('bar', data, layout);




} //end optionChanged

