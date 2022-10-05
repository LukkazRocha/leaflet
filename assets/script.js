var map = L.map('map').setView([-23.417510791934347, -51.941398188500806], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

var Marker = L.marker([-23.417510791934347, -51.941398188500806], {title: 'Datlo'})

Marker.bindPopup("Trabalho")

Marker.addTo(map);

var circle = L.circle([-23.403808603949706, -51.93971503965945], {
    color: '#000000',
    fillColor: '#294F6D',
    fillOpacity: 0.5,
    radius: 750
}).addTo(map);

L.geoJSON(geojsonFeature, {
    color: '#000000',
    fillColor: 'rgb(255, 246, 24)',
    fillOpacity: 0.5,

}).addTo(map);


