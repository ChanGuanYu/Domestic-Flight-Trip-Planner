"use strict"

mapboxgl.accessToken = "pk.eyJ1IjoiY3lhcDAwMTciLCJhIjoiY2tmeTNwbnhjMHM5MDJ4bm9xcXZqbnBwcyJ9.bwnL2tmAHevYP0ZDzTP52g";
let map = new  mapboxgl.Map({
	 container: 'map',
	center: [133.9648731,-28.8182711],
	zoom: 3.5,
	style: 'mapbox://styles/mapbox/streets-v9'
});
