const url = 'http://localhost:3000/Mantenimiento/';
const urlaux = 'http://localhost:3000/Vehiculo/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_vehiculo = document.getElementById('cod_vehiculo');
const fecha_mantenimiento= document.getElementById('fecha_mantenimiento');
const descripcion= document.getElementById('descripcion');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_vehiculo.value = '';
    fecha_mantenimiento.value = '';
    descripcion.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_vehiculo}</td>
                            <td>${linea.fecha_mantenimiento}</td>
                            <td>${linea.descripcion}</td>
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
    const idauxx = fila.children[1].innerHTML;

    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idaux+'/Mantenimiento/'+idauxx, {
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
let idForm;
let id2Form;

on(document, 'click','.btnEditar', (e)=>{
    const fila = e.target.parentNode.parentNode;

    idForm = fila.children[0].innerHTML;
    id2Form = fila.children[1].innerHTML;
    const nombreForm = fila.children[2].innerHTML;
    
    cod_vehiculo.value = idForm;
    fecha_mantenimiento.value = id2Form;
    descripcion.value = nombreForm;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
 
    const filacod_s = fila.children[1].children[1].value;
    const filanum = fila.children[0].children[1].value;

    if(opcion=='editar'){
        fetch(urlaux+idForm+'/Mantenimiento/'+id2Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cod_vehiculo: cod_vehiculo.value,
                fecha_mantenimiento: fecha_mantenimiento.value,
                descripcion: descripcion.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       
       fetch(urlaux+filanum+'/Mantenimiento/'+filacod_s, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cod_vehiculo: cod_vehiculo.value,
                fecha_mantenimiento: fecha_mantenimiento.value,
                descripcion: descripcion.value
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