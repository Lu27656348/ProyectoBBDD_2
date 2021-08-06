const url = 'http://localhost:3000/Cliente/';
const urlaux = 'http://localhost:3000/Vehiculo/';
let cedulaclienteaux;
const contenedor = document.getElementById('tbody1');
const contenedor2 = document.getElementById('tbody2');
let resultados = '';
let resultados2 = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cedula_cliente= document.getElementById('cedula_cliente');
const nombrecliente = document.getElementById('nombre');
const email = document.getElementById('emailC');
const frecuente = document.getElementById('frecuente');
const cantidadservicios = document.getElementById('cantidadservicios');

const cod_vehiculo= document.getElementById('cod_vehiculo');
const modelo = document.getElementById('modelo');
const capacidad_tanque = document.getElementById('capacidad_tanque');
const placa = document.getElementById('placa');
const tiempouso = document.getElementById('tiempo_de_uso');
const kilometraje = document.getElementById('kilometraje');
const fecha_adquisicion = document.getElementById('fecha_adq');
const cod_tipovehiculo = document.getElementById('cod_tipovehiculo');
const cedula_cliente2 = document.getElementById('cedula_cliente2');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    email.value = '';
    cedula_cliente.value = '';
    nombrecliente.value = '';
    frecuente.value = '';
    cantidadservicios.value = '';
    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cedula_cliente}</td>
                            <td>${linea.nombrecliente}</td>
                            <td>${linea.email}</td>
                            <td>${linea.frecuente}</td>
                            <td>${linea.cantidadservicios}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">EDITAR</a><a class="btnBorrar btn btn-danger">BORRAR</a></td>
                            <td class="text-center"><a class="btnVehiculo btn btn-success">VEH</a>
                        </tr>`;
    });

    contenedor.innerHTML = resultados;
    
};

const mostrar2 = (l2) => {
    l2.forEach(linea2 => {
        resultados2 += ` <tr>
                            <td>${linea2.cod_vehiculo}</td>
                            <td>${linea2.modelo}</td>
                            <td>${linea2.capacidad_tanque}</td>
                            <td>${linea2.placa}</td>
                            <td>${linea2.tiempouso}</td>
                            <td>${linea2.kilometraje}</td>
                            <td>${linea2.fecha_adquisicion}</td>
                            <td>${linea2.cod_tipovehiculo}</td>
                            <td>${linea2.cedula_cliente}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">EDITAR</a><a class="btnBorrar btn btn-danger">BORRAR</a></td>
                        </tr>`;
    });
    contenedor2.innerHTML = resultados2;
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
    const nombreclienteForm = fila.children[1].innerHTML;
    const emailForm = fila.children[2].innerHTML;
    const frecuenteForm = fila.children[3].innerHTML;
    const cantidadserviciosForm = fila.children[4].innerHTML;

    cedula_cliente.value = idForm;
    nombrecliente.value = nombreclienteForm;
    email.value = emailForm;
    frecuente.value = frecuenteForm;

    cantidadservicios.value = cantidadserviciosForm;
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
                nombrecliente: nombrecliente.value,
                email: email.value,
                frecuente: frecuente.value,
                cantidadservicios: cantidadservicios.value,
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
            nombrecliente: nombrecliente.value,
            email: email.value,
            frecuente: frecuente.value,
            cantidadservicios: cantidadservicios.value,
            cedula_cliente: cedula_cliente.value
           })
       })
       .then((response) => response.json())
       .then((data )=>{
           const nuevaLinea = [];
           nuevaLinea.push(data);
           mostrar(nuevaLinea);
       }).then((response) => location.reload());
    }
    modalLinea.hide();
});

on(document, 'click','.btnVehiculo', (e)=>{
    resultados2 = '';
    const fila = e.target.parentNode.parentNode;
    cedulaclienteaux = fila.firstElementChild.innerHTML;
    console.log(cedulaclienteaux);
    fetch (url+cedulaclienteaux+'/Vehiculo/')
    .then(  (response) => response.json() )
    .then((data) => mostrar2(data))
    .catch( (error) => console.log(error));
        
});//FIN DE FUNCION ON(); PARA BORRADO DE LINEA

const funcionExport = ()=>{
    return cedulaclienteaux;
};


fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));
