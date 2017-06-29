
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
