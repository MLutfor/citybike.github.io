//let newYorkCoords = [40.73, -74.0059];
//let mapZoomLevel = 12;

// Create the createMap function.


  // Create the tile layer that will be the background of our map.


  // Create a baseMaps object to hold the lightmap layer.


  // Create an overlayMaps object to hold the bikeStations layer.


  // Create the map object with options.


  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.

// Create the createMarkers function.

  // Pull the "stations" property from response.data.

  // Initialize an array to hold the bike markers.

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.

    // Add the marker to the bikeMarkers array.

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.


// Constants for New York Coordinates and Map Zoom Level
const newYorkCoords = [40.73, -74.0059];
const mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {
  // Create the tile layer that will be the background of our map.
  const streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer.
  const baseMaps = {
    "Street Map": streetmap
  };

  // Create the map object with options.
  const map = L.map('map', {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetmap]
  });

  // Create a layer control, and pass it baseMaps. Add the layer control to the map.
  L.control.layers(baseMaps).addTo(map);

  // Call the function to create markers and pass the bikeStations data.
  createMarkers(bikeStations, map);
}

// Create the createMarkers function.
function createMarkers(response, map) {
  // Pull the "stations" property from response.data.
  const stations = response.data.stations;

  // Initialize a layer group to hold bike markers.
  const bikeMarkers = L.layerGroup();

  // Loop through the stations array.
  stations.forEach(station => {
    // For each station, create a marker, and bind a popup with the station's name and capacity.
    const bikeMarker = L.marker([station.lat, station.lon])
      .bindPopup(`Station Name: ${station.name}<br>Capacity: ${station.capacity}`)
      .addTo(bikeMarkers);

    // Add the marker to the bikeMarkers layer group.
    bikeMarkers.addLayer(bikeMarker);
  });

  // Add the bikeMarkers layer group to the map.
  bikeMarkers.addTo(map);
}

// Use D3 to retrieve JSON data from the Citi Bike station information endpoint.
d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
  .then(function(response) {
    // Call the createMap function and pass the station data to create the map with markers.
    createMap(response);
  })
  .catch(function(error) {
    console.log(error);
  });
