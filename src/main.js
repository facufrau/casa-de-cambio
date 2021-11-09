const $cotizaciones = document.getElementById("lista-cotizaciones");
const $botonConsultar = document.getElementById("boton-consultar");
const $fecha = document.getElementById("elegir-fecha");
const $monedaBase = document.getElementById("elegir-moneda");
const $botonSeleccionarTodos = document.getElementById("seleccionar-todos");
const $botonDesmarcarTodos = document.getElementById("desmarcar-todos");
const $botonFiltrar = document.getElementById("filtrar");

const API_URL = "https://api.exchangerate.host/";
$botonConsultar.onclick = mostrarCotizacion;

$botonSeleccionarTodos.onclick = seleccionarTodos;
$botonDesmarcarTodos.onclick = desmarcarTodos;
$botonFiltrar.onclick = filtrarResultados; 

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
            filtrarResultados();
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

function seleccionarTodos() {
    const listaCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    listaCheckboxes.forEach(item => {item.checked = true});
}

function desmarcarTodos() {
    const listaCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    listaCheckboxes.forEach(item => {item.checked = false});
}

function obtenerCotizacionesSeleccionadas() {
    const listaCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const monedasElegidas = [];
    listaCheckboxes.forEach(item => {
        if (item.checked) {
            monedasElegidas.push(item.value);
        }
    });
    
    return monedasElegidas;
}

function filtrarResultados(){
    const monedasElegidas = obtenerCotizacionesSeleccionadas();
    const elementosMostrados = document.querySelectorAll("li");
    elementosMostrados.forEach(elemento => {
        let simbolo = elemento.textContent.slice(0,3);
        if (!(monedasElegidas.includes(simbolo))) {
            elemento.classList.add("oculto");
        }
        else {
            elemento.classList.remove("oculto");
        }
    })
}