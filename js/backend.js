function Bike(manufacturer, color , location, distance, stolenness){
  if(manufacturer == "undefined"){
    this.Manufacturer = null;
    console.log(this.Manufacturer);
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
  console.log(typeof(manufacturer));
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
    console.log("https://bikeindex.org:443/api/v3/search?page=1&per_page=25" + stringManu + manufacturer + stringColor + color + stringLoc + location + stringDist + distance + "&stolenness=" + stolenness + "&access_token=bike");
  })
  .fail(function(error){
    $("#display").text("No such thing");
    console.log("https://bikeindex.org:443/api/v3/search?page=1&per_page=25" + stringManu + manufacturer + stringColor + color + stringLoc + location + stringDist + distance + "&stolenness=" + stolenness + "&access_token=bike");
  });
};

exports.bikeModule = Bike;
