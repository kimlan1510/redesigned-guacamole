var getLocation = function(location){
  var portland = {lat: 45.52, lng: -122.67};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: portland,
    mapTypeId: "terrain"
  });
  var geocoder = new google.maps.Geocoder();
  location.forEach(function(address){
    console.log(address);
    geocoder.geocode({'address' : address}, function(results, status){
      if (status =="OK") {
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
  });
});

//google maps functions
