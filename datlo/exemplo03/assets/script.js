import listaCamadas from '../json/Lista_de_camadas.json' assert {type: 'json'}
import dadosCamadas from '../json/Dados_das_camadas.json' assert {type: 'json'}

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
    // const dataLayer = dadosCamadas.data.layers.find(function(data) {
    //     return data.id === layer.id;
    //   });

      const dataLayer = dadosCamadas.data.layers.find(data => data.id === layer.id);
      console.log(dataLayer);

    //   var geoLayer = L.geoJSON(dataLayer)
    //   overMaps[layer.name] = geoLayer;

    //  const dataLayer = dadosCamadas.data.layers.find(isLayer, layer.id);
    //  console.log(dataLayer);
});

function isLayer(data) {
  return data.id === '6334855da45eef8880bfa3d1'
}

function checkLayer(data, layerId) {
    return data.id === layerId; 
}

/* dadosCamadas.data.layers.forEach(function (layer) {   

    var geoLayer = L.geoJSON(layer.features)
    console.log(layer)   

}); */

L.control.layers(baseMaps, overMaps).addTo(map)
