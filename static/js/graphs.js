console.log("graphs.js is locked and loaded")
/////////EVICTION VISUALIZATIONS
var queryUrl = "https://data.sfgov.org/resource/5cei-gny5.geojson";


// Perform a GET request to the query URL
d3.json(queryUrl, function(legendData) {
  //dictionary to hold all wanted data 
    neighborhoodEvictionRationale = {}
    //for the length of legendData.features, add neighborhood names to the list
    for(var i=0;i<legendData.features.length;i++) {
      neighborhoodEvictionRationale[legendData.features[i].properties.neighborhood] = {}
    }
      //looping through each neighborhood name in neighborhoodEvictionRationale for all data below
      for (const neighborhoodName in neighborhoodEvictionRationale) {
      //creating dictionary to hold inner arrays
      neighborhoodEvictionCauseDict = {}
      // neighborhoodEvictionCauseDict = {"breach":10, "nuisance": 2}
        // looping though legendData.features.length...
        for(var i=0; i<legendData.features.length; i++) {
          //if the neighborhood name is NOT undefined AND matched the name we are looking at, continue
          if(legendData.features[i].properties.neighborhood != undefined && legendData.features[i].properties.neighborhood == neighborhoodName) {
            //looping through each individual item in the properties section..
            for (const propertieskey in legendData.features[i].properties) {
              //pushing the current properties section value inth the is_eviction_cause function..
              if(is_eviction_cause(propertieskey)) {
                //if the current propertieskey returns from the is_eviction_cause function with TRUE..
                if((legendData.features[i].properties[propertieskey] == true)) {
                  //if it returns true and also isn't already in the dictionary..
                  if(neighborhoodEvictionCauseDict[propertieskey] == undefined) {
                    //add it to the dictionary and set its initial value to 1
                    neighborhoodEvictionCauseDict[propertieskey] = 1
                  } else {
                   //if it IS in the dictionary already, add 1 to the counter
                    neighborhoodEvictionCauseDict[propertieskey]++
                  } //else
                } //if
              } //if
            } //for
          } //if
        } //for
      
        //push the eviction counters for each completed neighborhood to the overall dictionary
        neighborhoodEvictionRationale[neighborhoodName] = neighborhoodEvictionCauseDict
      }
      //print the beezy and hope everything is accurate and spelled correctly
    // console.log(neighborhoodEvictionRationale)

////////
///////
////////


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
  // console.log("moo")
  // console.log(evictionByRationale)
 
  for (const listKey in evictionByRationale) {
    for (i=0; i < legendData.features.length; i++) {
    evictionByRationale[listKey][legendData.features[i].properties.neighborhood] = 0
    } //for
  } //for

//////////////////////////////////////////

  // console.log(evictionByRationale)
  for (i=0; i < legendData.features.length; i++) {
    var jsonNeighborhood = legendData.features[i].properties.neighborhood

    for (const listkey in evictionByRationale) {

      // console.log(listkey) //prints the eviction rationl from the new list
      for (const jsonkey in legendData.features[i].properties) {

        // console.log(jsonkey) //prints all of the properties of the original data
        if (is_eviction_cause(jsonkey)) {
          if((legendData.features[i].properties[jsonkey] == true)) {
          // console.log(jsonkey) //prints the eviction rational from the original data that matches the control list.
            if (jsonkey === listkey) {
              // console.log("eviction rational: " + jsonkey + " " + listkey + i)
              for (const neighKey in evictionByRationale[listkey]){
                // console.log("json neighborhood: " + jsonNeighborhood + i)
                if (neighKey === jsonNeighborhood && jsonkey === listkey) {
                  // console.log("eviction rational: " + jsonkey + " " + listkey)
                  // console.log("Neighborhood: " + neighKey + " " + jsonNeighborhood)
                  evictionByRationale[listkey][neighKey]++
                } //if
                // else {
                //   continue
                // } //else
              } //for
            } //if
          } //if
        } //if
      } //for
    } //for
  } //for

  // console.log("quack")
  // console.log(evictionByRationale)


  //////neighborhood dropdown BEGIN  
      ///Populates the dropdown with the neighborhood names
      var select = document.getElementById("eviction-select");
      for(key in evictionByRationale) {
        // console.log(key)
        select.options[select.options.length] = new Option(key.replace(/_/g, ' '));
      }
  //////neighborhood dropdown END



    //////neighborhood dropdown BEGIN  
      ///Populates the dropdown with the neighborhood names
      var select = document.getElementById("neighborhood-select");
      for(key in neighborhoodEvictionRationale) {
        // console.log(key)
        select.options[select.options.length] = new Option(key);
      }
    //////neighborhood dropdown END




});// end of d3


////is_eviction_cause is related to filtering the data
function is_eviction_cause(key) {
  //list of all possible eviction reasons, the function returns true if the current legendData.features[i].properties matches something in this list. Used to exclude extra information such as "eviction id", "zip code", etc
  if(["breach", "capital_improvement", "condo_conversion", "demolition", "development", "ellis_act_withdrawal", "failure_to_sign_renewal", "good_samaritan_ends", "illegal_use", "late_payments", "lead_remediation", "non_payment", "nuisance", "other_cause", "owner_move_in", "roommate_same_unit", "substantial_rehab", "unapproved_subtenant"].includes(key)) {
    return true
  }
  //if the properties isn't in the above list, return false so we can skip to the next one
  return false
} //end is_eviction_cause


//where we grab to use the item selected in the dropdown
function optionNeighborhoodChanged(){
  var e = document.getElementById("neighborhood-select");
  var result = e.options[e.selectedIndex].text;
  // console.log(result)
  
  var resultEvictionCounts = Object.values(neighborhoodEvictionRationale[result])
  // console.log(resultEvictionCounts)
  

  var resultEvictionLabels = Object.keys(neighborhoodEvictionRationale[result]);
  // console.log(resultEvictionLabels)

  //removing _ from labels so they look nicer
  var cleanEvictionLabels = []
  for (u = 0; u < resultEvictionLabels.length; u++) {
    // resultEvictionLabels[u].replace(/_/g, ' ');
    cleanEvictionLabels.push(resultEvictionLabels[u].replace(/_/g, ' '))
  }

  // console.log(cleanEvictionLabels)

  var totalEvictionNeighborhood = 0
  // console.log(resultEvictionCounts.length)
  for (i = 0; i < resultEvictionCounts.length; i++) {
    totalEvictionNeighborhood += resultEvictionCounts[i]
  }
  // console.log(totalEvictionNeighborhood)
  // console.log("Total evictions in " + result + ": " + totalEvictionNeighborhood)

  /////begin NEIGHBORHOOD plotly/////
  ////pie
  var data = [{
    values: resultEvictionCounts,
    labels: cleanEvictionLabels,
    hole: .5,
    type: 'pie'
  }];
  
  var layout = {
    title: 'Evictions By Reason in ' + result,
    height: 400,
    width: 500,
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: "Total:<br>" + totalEvictionNeighborhood,
        x: 0.5,
        y: 0.5
      }],
  };
  
  Plotly.newPlot('pie', data, layout);
  ///end pie. beautiful pie.

/////end NEIGHBORHOODplotly////

} //end optionChanged


function optionEvictionChanged(){
  var e = document.getElementById("eviction-select");
  var result = (e.options[e.selectedIndex].text).replace(/ /g, '_');
  // console.log(result)
  
  var resultNeighborhoodCounts = Object.values(evictionByRationale[result])
  // console.log(resultNeighborhoodCounts)

  var resultNeighborhoodLabels = Object.keys(evictionByRationale[result]);
  // console.log(resultNeighborhoodLabels)

  var resultByNeighborhoodEvictionLabels = Object.keys(evictionByRationale)
  // console.log(resultByNeighborhoodEvictionLabels)

  // removing _ from labels so they look nicer
  var cleanByNeighborhoodEvictionLabels = []
  for (u = 0; u < resultByNeighborhoodEvictionLabels.length; u++) {
    // resultByNeighborhoodEvictionLabels[u].replace(/_/g, ' ');
    cleanByNeighborhoodEvictionLabels.push(resultByNeighborhoodEvictionLabels[u].replace(/_/g, ' '))
  }

  // console.log(cleanByNeighborhoodEvictionLabels)

  var totalNeighborhoodEviction = 0
  // console.log(resultEvictionCounts.length)
  for (i = 0; i < resultNeighborhoodCounts.length; i++) {
    totalNeighborhoodEviction += resultNeighborhoodCounts[i]
  }
  // console.log("Total Evictions for " + result + ":" + totalNeighborhoodEviction)

  ///begin plotly by EVICTION REASON ////

  var data = [
    {
      x: resultNeighborhoodLabels,
      y: resultNeighborhoodCounts,
      type: 'bar'
    }
  ];

  var layout = {
    title: ('Evictions for ' + result.replace(/_/g, ' ')).toUpperCase() + "<br>Total Evictions: " + totalNeighborhoodEviction,
    height: 600,
    width: 1000,
    subtitle: 'Total Evictions: ' + totalNeighborhoodEviction
  };
  
  Plotly.newPlot('bar', data, layout);




} //end optionChanged






/////////END EVICTION VISUALIZATIONS




