var map;
function geoCode(locations) {
  var heatmapData = [];
  var geocoder = new google.maps.Geocoder();
  locations.forEach(function(address){
    geocoder.geocode({'address' : address}, function(results, status){
      if (status === "OK") {
        var coords = results[0].geometry.location;
        heatmapData.push(coords);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  });
  return heatmapData;
}

function getLocation (locations){
  var portland = {lat: 45.52, lng: -122.67};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: portland,
    mapTypeId: "terrain"
  });
  var geocoder = new google.maps.Geocoder();
  locations.forEach(function(address){
    geocoder.geocode({'address' : address}, function(results, status){
      if (status === "OK") {
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map
        });
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  });
};

function heatMap(locations){
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: geoCode(locations),
    dissipating: false,
    map: map
  });

}

$(document).ready(function(){
  $("form#search-form").submit(function(event){
    event.preventDefault();
    $("#display").empty();
    var manufacturer = $("#manufacturer").val();
    var color = $("#color").val();
    var distance = $("#distance").val();
    var location = $("#location").val();
    var stolenness = $("#stolenness").val();
    var Bikes = new Bike(manufacturer, color, location, distance, stolenness);

    Bikes.getBikeLocation(Bikes.Manufacturer, Bikes.Color, Bikes.Location, Bikes.Distance, Bikes.Stolenness, getLocation);
    $("#heatmap").click(function(){
      Bikes.displayHeatMap(Bikes.Manufacturer, Bikes.Color, Bikes.Location, Bikes.Distance, Bikes.Stolenness, heatMap)
    });
  });
});

//google maps functions
