import listaCamadas from '../exemplo04/json/Lista_de_camadas.json' assert {type: 'json'}
import dadosCamadas from '../exemplo04/json/Dados_das_camadas.json' assert {type: 'json'}

const lat = 23.444144770940913
const lng = 51.873606412896784
const map = L.map('map').setView([-lat, -lng], 11)

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var baseMaps = {};
var overMaps = {};

listaCamadas.data.layers.forEach(function (layer) {

    const dataLayer = dadosCamadas.data.layers.find(function (data) {
        return data.id === layer.id
    });    

    console.log(dataLayer);

    var geoLayer = L.geoJSON(dataLayer)
    overMaps[layer.name] = geoLayer
})

L.control.layers(baseMaps, overMaps).addTo(map)