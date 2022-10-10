var map = L.map('map').setView([-23.41816854639006, -51.930692295266034], 12)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([-23.397333028010355, -51.90119259676696]).addTo(map)
marker.bindPopup('My House')

marker = L.marker([-23.417712489389565, -51.94137139700124]).addTo(map)
marker.bindPopup('Internship')

var layer = L.geoJSON(geojsonCidades).addTo(map)

var layerJob = L.geoJSON(geojsonEmpresas).addTo(map)