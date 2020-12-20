d3.csv("../static/data/cacao_clean_withbean.csv").then(function(tableData){
  //console.log(tableData);
  // Loop Through `data` and console.log object
  var countries = {};
  var names= [];
  var locations = [];
  var avgRating = [];
  tableData.forEach(function(chocCompany) {
      Object.entries(chocCompany).forEach(function([key, value]) {
      //console.log(key, value);
      
      });
  });
  var filteredData = tableData.filter(({ company_location}) => company_location == 'France'),
    avg = filteredData.reduce((r, c) => r + c.rating, 0) / filteredData.length;         
  console.log(avg);
});

queryUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/France.json?access_token=pk.eyJ1IjoibWFya2d1NzEzIiwiYSI6ImNraTg2OGh5ODAycHgyc3M1Y3k0dG9hd2EifQ.ngKenmSz6J60TtrahG4M_A"
d3.json(queryUrl, function(data) {
  console.log(data.features[0]['geometry'].coordinates);
});

// Create a map object
var myMap = L.map("mapid", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Country data
var countries = [
  {
    name: "Brazil",
    location: [-14.2350, -51.9253],
    points: 227
  },
  {
    name: "Germany",
    location: [51.1657, 10.4515],
    points: 218
  },
  {
    name: "Italy",
    location: [41.8719, 12.5675],
    points: 156
  },
  {
    name: "Argentina",
    location: [-38.4161, -63.6167],
    points: 140
  },
  {
    name: "Spain",
    location: [40.4637, -3.7492],
    points: 99
  },
  {
    name: "England",
    location: [52.355, 1.1743],
    points: 98
  },
  {
    name: "France",
    location: [46.2276, 2.2137],
    points: 96
  },
  {
    name: "Netherlands",
    location: [52.1326, 5.2913],
    points: 93
  },
  {
    name: "Uruguay",
    location: [-32.4228, -55.7658],
    points: 72
  },
  {
    name: "Sweden",
    location: [60.1282, 18.6435],
    points: 61
  }
];


// Loop through the cities array and create one marker for each city object
for (var i = 0; i < countries.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (countries[i].points > 200) {
    color = "yellow";
  }
  else if (countries[i].points > 100) {
    color = "blue";
  }
  else if (countries[i].points > 90) {
    color = "green";
  }
  else {
    color = "red";
  }

  // Add circles to map
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: countries[i].points * 1500
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
}