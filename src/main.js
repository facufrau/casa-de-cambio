const $cotizaciones = document.getElementById("lista-cotizaciones");
const $botonConsultar = document.getElementById("boton-consultar");
const $fecha = document.getElementById("elegir-fecha");
const $monedaBase = document.getElementById("elegir-moneda");

const API_URL = "https://api.exchangerate.host/";
$botonConsultar.onclick = mostrarCotizacion;

function mostrarCotizacion() {
    limpiarCotizacionAnterior($cotizaciones);
    consultarAPI();
}


function consultarAPI() {
    const fecha = $fecha.value;
    const monedaBase = $monedaBase.value;

    fetch(`${API_URL}${fecha}?base=${monedaBase}`)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => { 
            Object.keys(respuestaJSON.rates).forEach(moneda => 
            {   
                agregarElementoLista(moneda, respuestaJSON.rates[moneda]);
            })
        })
        .catch(error => console.error("Error consultando la API: ", error));
}


function agregarElementoLista(moneda, cotizacion) {
    const elementoLista = document.createElement("li");
    const nodoTexto = document.createTextNode(`${moneda}: ${cotizacion}`);
    elementoLista.appendChild(nodoTexto);
    $cotizaciones.appendChild(elementoLista);
}


function limpiarCotizacionAnterior(nodoCotizaciones) {
    while (nodoCotizaciones.firstChild) {
        nodoCotizaciones.removeChild(nodoCotizaciones.firstChild);
    }
 }
 