import municipios from '../json/Municipios.json' assert {type: 'json'}
import empresas from '../json/Empresas.json' assert {type: 'json'}
import data from '../json/Lista_de_camadas.json' assert {type: 'json'}
import dadosCamadas from '../json/Dados_das_camadas.json' assert {type: 'json'}

const lat = 23.444144770940913
const lng = 51.873606412896784
const map = L.map('map').setView([-lat, -lng], 11)

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)



/* for(let index in data.data.layers) {
    console.log(data.data.layers[index])
}
 */
// data.data.layers.forEach(function (layer) {
//     console.log(layer)
//     console.log(layer.name)
// });
/* 
for(let i = 0; i < data.data.layers.length; i++) {
    console.log(data.data.layers[i])
} */

var baseMaps = {
    'OpenStreetMap': osm,    
};

var overMaps = {}

data.data.layers.forEach(function (layer) {

    var geoLayer = L.geoJSON(municipios, {           
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

    overMaps[layer.name] = geoLayer;
});


L.control.layers(baseMaps, overMaps).addTo(map)