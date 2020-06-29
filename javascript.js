
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

mapboxgl.accessToken = 'pk.eyJ1IjoibGVudmVyYmlqIiwiYSI6ImNrOTg5eXdyYzA0eDAzbXJvZm5nNjBrcmsifQ.juZSfJ9vUrnWsq7Sc-M8YQ';
				var map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/lenverbij/ckc0cgb1e0apb1imn2grrpuvr', 
				center: [4.591993, 52.170500], 
				zoom: 12 
				});
				
				var marker = new mapboxgl.Marker()
					.setLngLat( [4.591993, 52.170500])
					.addTo(map);
					
				var geocoder = new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				marker: {
				color: 'orange'
				},
				mapboxgl: mapboxgl
				});
				 
				map.addControl(geocoder);
								 
				
		