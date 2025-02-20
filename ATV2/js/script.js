const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

function formatNum(numero) {
    return numero < 10 ? `0${numero}` : `${numero}`;
}

function attHora() {
    const data = new Date();
    const hora = formatNum(data.getHours());
    const minuto = formatNum(data.getMinutes());
    const segundo = formatNum(data.getSeconds());

    horas.textContent = hora;
    minutos.textContent = minuto;
    segundos.textContent = segundo;
}

setInterval(attHora, 1000);

attHora();