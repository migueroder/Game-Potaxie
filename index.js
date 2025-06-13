document.addEventListener('DOMContentLoaded', function () {
    const botonHistoria = document.getElementById('btn-historia');
    const audioHistoria = document.getElementById('audio-historia');

    botonHistoria.addEventListener('click', function () {
        audioHistoria.play();
    });
});