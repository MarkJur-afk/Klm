const map = document.getElementById('map');

const status = document.getElementById('status');

document.getElementById('showMap').addEventListener('click', function () {
    map.style.display = 'block';

    status.textContent = 'Kaart on kuvatud';
});