var map = L.map('map').setView([-20.1438, -44.1301], 15);

// Criando as camadas base (basemaps)
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var basetopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/WMTS/tile/1.0.0/USGSTopo/default/default028mm/{z}/{y}/{x}.png', {});
var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});

// Criando as camadas de sobreposição
var marker = L.marker([-20.1438, -44.1301], {
    title: 'Janeiro 25, 2019 Desastre de Brumadinho'
})
marker.bindPopup('Janeiro 25, 2019 Desastre de Brumadinho')

var thetrail = L.geoJSON(trail, {
    color: '#800000',
    weigth: 3,
    dashArray: '12 8 12'
}).addTo(map)
thetrail.bindTooltip('Trilha de Brumadinho')

// Adicionando as camadas ao mapa
var baselayers = {
    'shaded Relief': baserelief,
    'National Map topo': basetopo,
    'OpenStreetMap': osm,
}

var overlays = {
    'Trilha': thetrail,
    'Brumadinho': marker
}

L.control.layers(baselayers, overlays).addTo(map)

// Adicionando a barra de escala
var scale = L.control.scale().addTo(map)

map.attributionControl.addAttribution('National Map Topo')
map.attributionControl.addAttribution('OpenTopoMap')
map.attributionControl.addAttribution('OpenStreetMap')