var map = L.map('map').setView([19.310878,-99.1463838], 14);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoibHVpc2pvc2U1IiwiYSI6ImNsMDc0dDVtMjAza3gzanM4d3J0ZnMzbzgifQ.NfkxFbGmErrf6AayBjmuXg'
}).addTo(map);

$.ajax({
    dataType: "json",
    url: "/api/tiendas",
    success: function(result){
        result.tiendas.forEach(function(tienda){
            L.marker([parseFloat(tienda.lat),parseFloat(tienda.lon)], title=tienda.nombre).addTo(map);
        });
    }
})