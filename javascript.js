mapboxgl.accessToken = 'pk.eyJ1IjoibGVudmVyYmlqIiwiYSI6ImNrOTg5eXdyYzA0eDAzbXJvZm5nNjBrcmsifQ.juZSfJ9vUrnWsq7Sc-M8YQ';


// De weergave van de map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [4.5822,52.1692],
  zoom: 13
});


// Route planner
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'top-right'
);





//checken of de browser geolocation ondersteunt
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser does not support  Geolocation </p>";
}

//gebruikers positie
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

}

// laat error zien
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message} </p>`;
}

//aantal kilometer
 
var distanceContainer = document.getElementById('distance');
 
// GeoJSON object meet functie
var geojson = {
'type': 'FeatureCollection',
'features': []
};
 
// Lijn trekken tussen de punten
var linestring = {
'type': 'Feature',
'geometry': {
'type': 'LineString',
'coordinates': []
}
};
 
map.on('load', function() {
map.addSource('geojson', {
'type': 'geojson',
'data': geojson
});
 
// styles van de map
map.addLayer({
id: 'measure-points',
type: 'circle',
source: 'geojson',
paint: {
'circle-radius': 5,
'circle-color': '#000'
},
filter: ['in', '$type', 'Point']
});
map.addLayer({
id: 'measure-lines',
type: 'line',
source: 'geojson',
layout: {
'line-cap': 'round',
'line-join': 'round'
},
paint: {
'line-color': '#000',
'line-width': 2.5
},
filter: ['in', '$type', 'LineString']
});
 
map.on('click', function(e) {
var features = map.queryRenderedFeatures(e.point, {
layers: ['measure-points']
});
 


if (geojson.features.length > 1) geojson.features.pop();
 

distanceContainer.innerHTML = '';
 
// On klik wanneer punt word veranderd
if (features.length) {
var id = features[0].properties.id;
geojson.features = geojson.features.filter(function(point) {
return point.properties.id !== id;
});
} else {
var point = {
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [e.lngLat.lng, e.lngLat.lat]
},
'properties': {
'id': String(new Date().getTime())
}
};
 
geojson.features.push(point);
}
 
if (geojson.features.length > 1) {
linestring.geometry.coordinates = geojson.features.map(function(
point
) {
return point.geometry.coordinates;
});
 
geojson.features.push(linestring);
 

var value = document.createElement('pre');
value.textContent =
'Afstand van A naar B: ' +
turf.length(linestring).toLocaleString() +
'km';
distanceContainer.appendChild(value);
}
 
map.getSource('geojson').setData(geojson);
});
});
 
map.on('mousemove', function(e) {
var features = map.queryRenderedFeatures(e.point, {
layers: ['measure-points']
});
// klikken of hover attributen laten zien
map.getCanvas().style.cursor = features.length
? 'pointer'
: 'crosshair';
});

//Javascript voor het weer
var input = document.querySelector(".inputTekst");
var knop = document.querySelector(".knop");
var temperatuur = document.querySelector(".temperatuur");
var beschrijving = document.querySelector(".beschrijving");
var locatie = document.querySelector(".locatie");
var icoon = document.querySelector(".icoon");

knop.addEventListener('click',function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=4adf2786b6929e1e0fb543cad99b0395')
    .then(response => response.json())
    .then(data => {
        var locatieValue = data['name'];
        var temperatuurValue = data['main']['temp'];
        var beschrijvingValue = data['weather'][0]['description'];
        var icoonValue = data['weather'][0]['icon'];
    
        locatie.innerHTML = locatieValue;
        temperatuur.innerHTML = Math.round(temperatuurValue - 272.15) + " -° C";
        beschrijving.innerHTML = beschrijvingValue;
        icoon.innerHTML = `<img src="icons/${icoonValue}.png"/>`;
    
    })

    .catch(err => alert("Stad niet herkend."))

})
