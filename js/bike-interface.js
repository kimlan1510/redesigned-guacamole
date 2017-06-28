var Bike = require('./../js/backend.js').bikeModule;
var displayInfo = function(title, serial, manufacturer_name){
  $("#display").append("<li>Title: " + title + "</li>" + "<li>Serial: " + serial + "</li>" + "<li>Manufacturer: " + manufacturer_name + "</li>" );
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

    Bikes.getBikes(Bikes.Manufacturer, Bikes.Color, Bikes.Location, Bikes.Distance, Bikes.Stolenness, displayInfo);
  });

});
