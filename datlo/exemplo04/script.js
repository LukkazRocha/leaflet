import listaCamadas from '../exemplo04/json/Lista_de_camadas.json' assert {type: 'json'}
import dadosCamadas from '../exemplo04/json/Dados_das_camadas.json' assert {type: 'json'}

const map = L.map('map').setView([-23.444144770940913, -51.873606412896784], 11)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var baseMaps = {};
var overMaps = {};

listaCamadas.data.layers.forEach(function (layer) {
    const styleLayer = layer.customSettings.symbology;

    const dataLayer = dadosCamadas.data.layers.find(function (data) {
        return data.id === layer.id
    });     

    if (layer.type === "POINT") {
        let markers = L.markerClusterGroup();
        // for (let i = 0; i < dataLayer.features.length; i++) {           
            // let coordinates = dataLayer.features[i].geometry.coordinates;
            // // console.log(coordinates)

            // const [lat, lng] = coordinates
            // let marker = L.marker(new L.LatLng(lng, lat));
            // markers.addLayer(marker);
            // overMaps[layer.name] = markers
            // // map.addLayer(markers);
            const layerGeoJson = L.geoJSON(dataLayer, {
                pointToLayer: function (feature, latlng) {
                    let marker = L.marker(latlng);
                    markers.addLayer(marker);
                    return markers
                }
            })
            overMaps[layer.name] = layerGeoJson

        // }

    } else if (layer.type === "POLYGON") {
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
            }
        })
        geoLayer.eachLayer(styles);
        overMaps[layer.name] = geoLayer
    }

    

    function styles (features) {
        
        if (styleLayer.colorScale !== undefined) {
            features.setStyle({
                'fillColor': styleLayer.colorScale[0]
            })
        }        
    }  
    
});

// Mostrar coordenadas na tela ao clicar
map.on('click', function (e) {
    const markerPlace = document.querySelector(".marker-position");
    markerPlace.textContent = e.latlng
})

L.control.layers(baseMaps, overMaps).addTo(map)