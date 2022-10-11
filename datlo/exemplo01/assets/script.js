import municipios from '../json/Municipios.json' assert {type: 'json'}
import empresas from '../json/Empresas.json' assert {type: 'json'}
import camadas from '../json/Lista_de_camadas.json' assert {type: 'json'}
import dadosCamadas from '../json/Dados_das_camadas.json' assert {type: 'json'}

const lat = 23.444144770940913
const lng = 51.873606412896784
const map = L.map('map').setView([-lat, -lng], 11)

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {})

map.on('click', function(e) {
    const markerPlace = document.querySelector(".marker-position")
    markerPlace.textContent = e.latlng
})

var circle = L.circle([-23.403808603949706, -51.93971503965945], {
	color: '#000000',
    fillColor: '#294F6D',
    fillOpacity: 0.5
}).addTo(map)
circle.bindPopup('<h4>UEM</h4>')

var layer = L.geoJSON(municipios, {           
    fillOpacity: 0.5,
    weight: 2,
    onEachFeature: function (feature, layer) {
        var name = feature.properties.name
        layer.bindPopup('<h2>' + name)        
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
        layer.on ('click', function () {
            this.setStyle({
                'fillColor': '#fff618'
            })
        })		
    }
})

var layerJob = L.geoJSON(empresas, {
	onEachFeature: function (feature, layer) {
        var popupcontent = [];
        for (var prop in feature.properties) {
            popupcontent.push(feature.properties[prop].column_name + ": " + feature.properties[prop].column_value);
        }
        layer.bindPopup(popupcontent.join("<br />"));               
	}
})

var baseMaps = {
    'OpenStreetMap': osm,
    'Shaded Relief': baserelief,
};

var overMaps = {
    'Municípios': layer,
    'Empresas': layerJob,
    'Circle': circle,

}

L.control.layers(baseMaps, overMaps).addTo(map)