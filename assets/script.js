var map = L.map('map').setView([-23.417510791934347, -51.941398188500806], 11)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

var circle = L.circle([-23.403808603949706, -51.93971503965945], {
    color: '#000000',
    fillColor: '#294F6D',
    fillOpacity: 0.5,
    radius: 750
}).addTo(map);

var layer = L.geoJSON(geojsonCidades, {           
    fillOpacity: 0.5,
    weight: 2,
    onEachFeature: function (feature, layer) {
        var name = feature.properties.name
        layer.bindPopup(name)        
        layer.on ('mouseover', function () {
            layer.openPopup()
            this.setStyle({
                'fillColor': '#fff618'
            })
        })
        layer.on ('mouseout', function () {
            layer.closePopup()
            this.setStyle({
                'fillColor': null
            })
        })
        layer.on ('click', function onClick () {
            this.setStyle({
                'fillColor': '#fff618'
            })
        })
    }
}).addTo(map) 

var layerJob = L.geoJSON(geojsonEmpresas).addTo(map)