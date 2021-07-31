const url = 'http://localhost:3000/DetalleOrden/';
const urlaux = 'http://localhost:3000/Servicio/';
const conector = '/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const nro_consecutivo= document.getElementById('nro_consecutivo');
const cod_servicio= document.getElementById('cod_servicio');
const costomanoobra = document.getElementById('costomanoobra');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    nro_consecutivo.value = '';
    cod_servicio.value = '';
    costomanoobra.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.nro_consecutivo}</td>
                            <td>${linea.cod_servicio}</td>
                            <td>${linea.costomanoobra}</td>
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
        fetch(urlaux+idauxx+conector+'Actividad/'+idaux, {
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

    const costomanoobraForm = fila.children[2].innerHTML;

    nro_consecutivo.value = idForm;
    cod_servicio.value = id2Form;
    costomanoobra.value = costomanoobraForm;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
    const filanro = fila.children[0].children[1].value;
    const filacod = fila.children[1].children[1].value;

    if(opcion=='editar'){
       
        fetch(urlaux+id2Form+conector+'Actividad/'+idForm, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                nro_consecutivo: nro_consecutivo.value,
                cod_servicio: cod_servicio.value,
                costomanoobra: costomanoobra.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       
       fetch(urlaux+filacod+conector+'Actividad'+conector+filanro, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                nro_consecutivo: nro_consecutivo.value,
                cod_servicio: cod_servicio.value,
                costomanoobra: costomanoobra.value
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