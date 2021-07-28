const url = 'http://localhost:3000/Vehiculo/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_vehiculo= document.getElementById('cod_vehiculo');
const modelo = document.getElementById('modelo');
const capacidad_tanque = document.getElementById('capacidad_tanque');
const placa = document.getElementById('placa');
const tiempouso = document.getElementById('tiempo_de_uso');
const kilometraje = document.getElementById('kilometraje');
const fecha_adquisicion = document.getElementById('fecha_adq');
const cod_tipovehiculo = document.getElementById('cod_tipovehiculo');
const cedula_cliente = document.getElementById('cedula_cliente');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_vehiculo.value = '';
    modelo.value = '';
    capacidad_tanque.value = '';
    placa.value = '';
    tiempouso.value = '';
    kilometraje.value = '';
    fecha_adquisicion.value = '';
    cod_tipovehiculo.value = '';
    cedula_cliente.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_vehiculo}</td>
                            <td>${linea.modelo}</td>
                            <td>${linea.capacidad_tanque}</td>
                            <td>${linea.placa}</td>
                            <td>${linea.tiempouso}</td>
                            <td>${linea.kilometraje}</td>
                            <td>${linea.fecha_adquisicion}</td>
                            <td>${linea.cod_tipovehiculo}</td>
                            <td>${linea.cedula_cliente}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">EDITAR</a><a class="btnBorrar btn btn-danger">BORRAR</a></td>
                        </tr>`;
    });
    contenedor.innerHTML = resultados;
    
};

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e)=>{
        if(e.target.closest(selector)){
            handler(e);
        }
    });
};
//PROCEDIMIENTO PARA BORRAR EN LA BASE DE DATOS
on(document, 'click','.btnBorrar', (e)=>{
    const fila = e.target.parentNode.parentNode;
    const idaux = fila.firstElementChild.innerHTML;
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(url+idaux, {
            method: 'DELETE'
        })
        .then(  (response) => response.json() )
        .then(() => location.reload())
        alertify.success('BORRADO CON EXITO');
    },
    function(){
            alertify.error('BORRADO CANCELADO');
  }); //FIN DE FUNCION DE ALERTIFY PARA MOSTRAR RECUADRO
});//FIN DE FUNCION ON(); PARA BORRADO DE LINEA

//PROCEDIMIENTO EDITAR DATOS DE LA BASE DE DATOS
let idForm = 0;
on(document, 'click','.btnEditar', (e)=>{
    const fila = e.target.parentNode.parentNode;

    idForm = fila.children[0].innerHTML;
    const cod_vehiculoForm = fila.children[1].innerHTML;
    const modeloForm = fila.children[2].innerHTML;
    const capacidad_tanqueForm = fila.children[3].innerHTML;
    const placaForm = fila.children[4].innerHTML;
    const tiempousoForm = fila.children[5].innerHTML;
    const kilometrajeForm = fila.children[6].innerHTML;
    const fecha_adquisicionForm = fila.children[7].innerHTML;
    const cod_tipovehiculoForm = fila.children[8].innerHTML;
    const cedula_clienteForm = fila.children[9].innerHTML;

    cod_vehiculo.value = cod_vehiculoForm;
    modelo.value = modeloForm;
    capacidad_tanque.value = capacidad_tanqueForm;
    placa.value = placaForm;
    tiempouso.value = tiempousoForm;
    kilometraje.value = kilometrajeForm;
    fecha_adquisicion.value = fecha_adquisicionForm;
    cod_tipovehiculo.value = cod_tipovehiculoForm;
    cedula_cliente.value = cedula_clienteForm;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(opcion=='editar'){
        fetch(url+idForm, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cod_vehiculo: cod_vehiculo.value,
                modelo: modelo.value,
                capacidad_tanque: capacidad_tanque.value,
                placa: placa.value,
                tiempouso: tiempouso.value,
                kilometraje: kilometraje.value,
                fecha_adquisicion: fecha_adquisicion.value,
                cod_tipovehiculo: cod_tipovehiculo.value,
                cedula_cliente: cedula_cliente.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       fetch(url, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cod_vehiculo: cod_vehiculo.value,
                modelo: modelo.value,
                capacidad_tanque: capacidad_tanque.value,
                placa: placa.value,
                tiempouso: tiempouso.value,
                kilometraje: kilometraje.value,
                fecha_adquisicion: fecha_adquisicion.value,
                cod_tipovehiculo: cod_tipovehiculo.value,
                cedula_cliente: cedula_cliente.value
           })
       })
       .then((response) => response.json())
       .then((data )=>{
           const nuevaLinea = [];
           nuevaLinea.push(data);
           mostrar(nuevaLinea);
       })
       .then((response) => location.reload())
    }
    modalLinea.hide();
});

fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));