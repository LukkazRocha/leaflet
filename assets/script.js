var map = L.map('map').setView([-23.417510791934347, -51.941398188500806], 11)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

var Marker = L.marker([-23.417510791934347, -51.941398188500806], {title: 'Datlo'})

// Marker.bindPopup("Trabalho")

Marker.addTo(map);

var circle = L.circle([-23.403808603949706, -51.93971503965945], {
    color: '#000000',
    fillColor: '#294F6D',
    fillOpacity: 0.5,
    radius: 750
}).addTo(map);

/* L.geoJSON(geojsonFeature, {
    color: '#000000',
    fillColor: 'rgb(255, 246, 24)',
    fillOpacity: 0.5,

}).addTo(map); */

var layer = new L.GeoJSON(geojsonFeature, {
    fillOpacity: 0.5,
    fillColor: '#00f',
    weight: '2',
    color: '#000',
    onEachFeature: function (feature, layer) {
      layer.on('mouseover', function () {
        this.setStyle({            
            'fillColor': '#FFF618',
        });
      });
      layer.on('mouseout', function () {
        this.setStyle({
            'fillColor': '#fff'
        });
      });
      layer.on('click', function () {
        // Let's say you've got a property called url in your geojsonfeature:
        console.log(feature)
        layer.bindPopup("Popup de teste")
      });      
    }
  }).addTo(map);