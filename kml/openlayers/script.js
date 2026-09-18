const vectorSource = new ol.source.Vector({
    url: 'map.kml',
    format: new ol.format.KML()
});


const vectorLayer = new ol.layer.Vector({
    source: vectorSource
});


const map = new ol.Map({
    target: 'map',

    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),

        vectorLayer
    ],

    view: new ol.View({
        center: [0, 0],
        zoom: 2
    })
});


// Показываем весь KML после загрузки
vectorSource.once('change', function () {
    if (vectorSource.getState() === 'ready') {
        map.getView().fit(vectorSource.getExtent(), {
            padding: [50, 50, 50, 50]
        });
    }
});


// Функция 1 — показать весь KML
document.getElementById('showKml').addEventListener('click', function () {
    map.getView().fit(vectorSource.getExtent(), {
        padding: [50, 50, 50, 50]
    });
});


// Функция 2 — показать координаты при клике
map.on('click', function (event) {

    const coordinates = ol.proj.toLonLat(event.coordinate);

    const longitude = coordinates[0].toFixed(6);
    const latitude = coordinates[1].toFixed(6);

    document.getElementById('coordinates').textContent =
        `Koordinaadid: ${latitude}, ${longitude}`;
});