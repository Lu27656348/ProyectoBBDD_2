const url = 'http://localhost:3000/Consume/';
const urlaux = 'http://localhost:3000/Personal/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cedula_personal= document.getElementById('cedula_personal');
const cod_producto= document.getElementById('cod_producto');
const nro_consecutivo= document.getElementById('nro_consecutivo');
const cod_servicio= document.getElementById('cod_servicio');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cedula_personal.value = '';
    cod_producto.value = '';
    nro_consecutivo.value = '';
    cod_servicio.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cedula_personal}</td>
                            <td>${linea.cod_producto}</td>
                            <td>${linea.nro_consecutivo}</td>
                            <td>${linea.cod_servicio}</td>
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
    console.log('Click en borrar');
    const fila = e.target.parentNode.parentNode;
    const idaux = fila.firstElementChild.innerHTML;
    const idauxx = fila.children[1].innerHTML;
    const idauxxx = fila.children[2].innerHTML;
    const idauxxxx = fila.children[3].innerHTML;
    
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idaux+'/Producto/'+idauxx+'/Actividad/'+idauxxx+'/Servicio/'+idauxxxx, {
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
let id3Form;
let id4Form;

on(document, 'click','.btnEditar', (e)=>{
    const fila = e.target.parentNode.parentNode;
    
    idForm = fila.children[0].innerHTML;
    id2Form = fila.children[1].innerHTML;
    id3Form = fila.children[2].innerHTML;
    id4Form = fila.children[3].innerHTML;

    cedula_personal.value = idForm;
    cod_producto.value = id2Form;
    nro_consecutivo.value = id3Form;
    cod_servicio.value = id4Form;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();

    const fila = e.target;
    const filaced = fila.children[0].children[1].value;
    const filacod_p = fila.children[1].children[1].value;
    const filanro = fila.children[2].children[1].value;
    const filacod_s = fila.children[3].children[1].value;

    if(opcion=='editar'){
 
        fetch(urlaux+idForm+'/Producto/'+id2Form+'/Actividad/'+id3Form+'/Servicio/'+id4Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cedula_personal: cedula_personal.value,
                cod_producto: cod_producto.value,
                nro_consecutivo: nro_consecutivo.value,
                cod_servicio: cod_servicio.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
     
       fetch(urlaux+filaced+'/Producto/'+filacod_p+'/Actividad/'+filanro+'/Servicio/'+filacod_s, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cedula_personal: cedula_personal.value,
                cod_producto: cod_producto.value,
                nro_consecutivo: nro_consecutivo.value,
                cod_servicio: cod_servicio.value
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
    console.log('Creación de Actividad exitosa!');
});

fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));