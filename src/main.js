const $resultados = document.getElementById("api-result");
const $botonConsultar = document.getElementById("boton-consultar");
const $fecha = document.getElementById("elegir-fecha");
const $monedaBase = document.getElementById("elegir-moneda");
const API_URL = "https://api.exchangerate.host/";
$botonConsultar.onclick = consultarAPI;

function consultarAPI() {
    const fecha = $fecha.value;
    const monedaBase = $monedaBase.value;

    fetch(`${API_URL}${fecha}?base=${monedaBase}`)
}