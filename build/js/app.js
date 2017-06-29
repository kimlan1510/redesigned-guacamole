(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function Bike(manufacturer, color , location, distance, stolenness){
  if(manufacturer == "undefined"){
    this.Manufacturer = null;
  } else if(color == "undefined"){
    this.Color = null;
  } else if(location == "undefined"){
    this.Location = null;
  } else if(distance == "undefined"){
    this.Distance = null;
  } else{
    this.Manufacturer = manufacturer;
    this.Color = color;
    this.Location = location;
    this.Distance = distance;
    this.Stolenness = stolenness;
  }

}




Bike.prototype.getBikes = function(manufacturer, color, location, distance, stolenness, displayInfo) {
  var stringManu = "&manufacturer=";
  var stringColor = "&colors=";
  var stringLoc = "&location=";
  var stringDist = "&distance=";
  if(manufacturer == ""){
    stringManu = "";
  } if(color == ""){
    stringColor = "";
  } if(location == ""){
    stringLoc = "";
  } if(distance == ""){
    stringDist = "";
  }

  $.get("https://bikeindex.org:443/api/v3/search?page=1&per_page=5" + stringManu + manufacturer + stringColor + color + stringLoc + location + stringDist + distance + "&stolenness=" + stolenness + "&access_token=bike")
  .then(function(response){
    var bikes = response.bikes;
    bikes.forEach(function(element){
      displayInfo(element.title, element.serial, element.manufacturer_name);

    });
  })
  .fail(function(error){
    $("#display").text("No such thing");
  });
};

Bike.prototype.getBikeLocation = function(manufacturer, color, location, distance, stolenness, getLocation) {
  var stringManu = "&manufacturer=";
  var stringColor = "&colors=";
  var stringLoc = "&location=";
  var stringDist = "&distance=";
  if(manufacturer == ""){
    stringManu = "";
  } if(color == ""){
    stringColor = "";
  } if(location == ""){
    stringLoc = "";
  } if(distance == ""){
    stringDist = "";
  }

  $.get("https://bikeindex.org:443/api/v3/search?page=1&per_page=25" + stringManu + manufacturer + stringColor + color + stringLoc + location + stringDist + distance + "&stolenness=stolen" + "&access_token=bike")
  .then(function(response){
    var bikes = response.bikes;
    var locations = [];
    bikes.forEach(function(element){
      locations.push(element.stolen_location);
    });
    getLocation(locations);
  })
  .fail(function(error){
    $("#display").text("No such thing");
  });
};

exports.bikeModule = Bike;

},{}],2:[function(require,module,exports){
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

    // var location = Bikes.getBikeLocation(Bikes.Manufacturer, Bikes.Color, Bikes.Location, Bikes.Distance, Bikes.Stolenness, getLocation);
  });


});

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

},{"./../js/backend.js":1}]},{},[2]);
