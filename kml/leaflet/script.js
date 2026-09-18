const map = L.map('map').setView([59.437, 24.7536], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


const kmlLayer = omnivore.kml('map.kml')
    .on('ready', function () {
        map.fitBounds(kmlLayer.getBounds());
    })
    .on('error', function () {
        console.log('KML-faili laadimise viga');
    })
    .addTo(map);


// Функция 1 — показать весь KML
document.getElementById('showKml').addEventListener('click', function () {
    map.fitBounds(kmlLayer.getBounds());
});


// Функция 2 — показать координаты при нажатии на карту
map.on('click', function (event) {
    const lat = event.latlng.lat.toFixed(6);
    const lng = event.latlng.lng.toFixed(6);

    document.getElementById('coordinates').textContent =
        `Koordinaadid: ${lat}, ${lng}`;
});


setTimeout(() => {
    map.invalidateSize();
}, 100);