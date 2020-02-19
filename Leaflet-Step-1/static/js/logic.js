// Create a map object
var myMap = L.map("map", {
  center: [35.5994, -100.6731],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",  
  maxZoom: 15,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

// Loop through the array and create circle. 
function addPopup(feature, layer) {
  layer.bindPopup(`<h1>${feature.properties.place}</h1> <hr> <h3>Magnitude: ${feature.properties.mag}</h3>`);
}

var earthquakes = L.geoJSON(data.features, {
  pointToLayer: function(edata, latlng) {
    var color = "";

    if (edata.properties.mag < 1){
      color = "#ffffb2"
    }
    else if (edata.properties.mag < 2){
      color = "#fed976";
    }
    else if (edata.properties.mag < 3){
      color = "#feb24c";
    }
    else if (edata.properties.mag < 4){
      color = "#fd8d3c";
    }
    else if (edata.properties.mag < 5){
      color = "#fc4e2a";
    } else {
      color = "#b10026";
    }
       console.log(edata);
    return L.circle(latlng, {

      radius: (edata.properties.mag * 10000),
      color:  color,
      stroke: "green",
      strokeopacity: "0.7",
      fillOpacity: 1,
      });
  },
  onEachFeature : addPopup
});

earthquakes.addTo(myMap);
})


var legend = L.control({position: 'bottomright'});
  legend.onAdd = function(myMap) {

    var div = L.DomUtil.create('div', 'legend');
    div.class = 'legend';
    var labels = [" "]; //['<strong>Categories</strong>'];
    var categories = ['0 - 1', '1 - 2', '2 - 3', '3 - 4', '4 - 5', ' 5 + &nbsp;'];
    var colors = ['#ffffb2', ' #fed976', '#feb24c','#fd8d3c', '#fc4e2a', ' #b10026'];
    
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML += 
        labels.push(
        '<span class="dot" style="background:' + colors[i] + '">'+categories[i] +'</span><br>' );
    
    }
    div.innerHTML = labels.join('');
    return div;
    };
legend.addTo(myMap);



