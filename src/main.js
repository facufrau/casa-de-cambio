const $resultados = document.getElementById("api-result");
const $botonConsultar = document.getElementById("boton-consultar");
const $fecha = document.getElementById("elegir-fecha");
const $monedaBase = document.getElementById("elegir-moneda");

$botonConsultar.onclick = enviarFormulario;

function enviarFormulario() {
    console.log($fecha.value);
    console.log($monedaBase.value);
}