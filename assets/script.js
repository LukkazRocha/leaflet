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
        layer.on ('click', function onClick () {
            this.setStyle({
                'fillColor': '#fff618'
            })
        })		
    }
}).addTo(map) 

var layerJob = L.geoJSON(geojsonEmpresas, {
	onEachFeature: function (feature, layer) {
		/* var dados = feature.properties    

		layer.bindPopup('<h3 style = "text-align: center">Empresa </h3><p style = "color: #00F; font-weight: bold;">Name: ' + feature.properties[1].column_name + '<br>Value: ' + feature.properties[1].column_value + '</p>')	
			
		dados.forEach(function (dados, i) {
			console.log(dados, i)
		}) */

        var popupcontent = [];
        for (var prop in feature.properties) {
            popupcontent.push(feature.properties[prop].column_name + ": " + feature.properties[prop].column_value);
        }
        layer.bindPopup(popupcontent.join("<br />"));         
	}
}).addTo(map)