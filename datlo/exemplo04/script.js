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

// const empresas = dadosCamadas.data.layers.find(function (data) {
//     return data.id === "6334855da45eef8880bfa3d1"
// }); 

listaCamadas.data.layers.forEach(function (layer) {

    const dataLayer = dadosCamadas.data.layers.find(function (data) {
        return data.id === layer.id
    });      

    let styleLayer = layer.customSettings.symbology
    console.log(styleLayer)
    // console.log(styleLayer.colorScale)
    // console.log(styleLayer.colorScale[0])

    // for (let color in styleLayer.colorScale) {
    //     console.log(styleLayer.colorScale[color])
    // }


    var geoLayer = L.geoJSON(dataLayer, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<h3>' + feature.properties.name)
            layer.on ('mouseover', function () {
                this.setStyle({
                    'fillColor': '#006837'
                })
            })
            layer.on ('mouseout', function () {
                this.setStyle({
                    'fillColor': styleLayer.colorScale[0]
                })
            })

            var popupcontent = [];
            for (var prop in feature.properties) {
                if (feature.properties[prop].column_name !== undefined) {
                    popupcontent.push('<strong>' + feature.properties[prop].column_name + ":</strong> " + '<em>' + feature.properties[prop].column_value + '</em>');
                    layer.bindPopup(popupcontent.join("<br />"));
                }
            }
        }
    })

    function styles (features) {
        
        if (layer.type === "POLYGON") {
            features.setStyle({
                'fillColor': styleLayer.colorScale[0]
            })
        }        
    }  

    geoLayer.eachLayer(styles);

    overMaps[layer.name] = geoLayer
    
});

L.control.layers(baseMaps, overMaps).addTo(map)