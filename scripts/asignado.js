const url = 'http://localhost:3000/Asignado/';
const urlaux = 'http://localhost:3000/Personal/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cedulaper= document.getElementById('cedulaper');
const cod_servicio= document.getElementById('cod_servicio');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cedulaper.value = '';
    cod_servicio.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cedulaper}</td>
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
    const fila = e.target.parentNode.parentNode;
    const idaux = fila.firstElementChild.innerHTML;
    const idauxx = fila.children[1].innerHTML;
    console.log('BORRANDO '+ idaux);
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idaux+'/Servicio/'+idauxx, {
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

    console.log(idForm);
    console.log(id2Form);

    cedulaper.value = idForm;
    cod_servicio.value = id2Form;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
    const filaced = fila.children[0].children[1].value;
    const filacod = fila.children[1].children[1].value;
    console.log(fila);
    console.log('filaced '+filaced);
    console.log('filacod '+filacod);
    if(opcion=='editar'){
        fetch(urlaux+idForm+'/Servicio/'+id2Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cedulaper: cedulaper.value,
                cod_servicio: cod_servicio.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       console.log('creando en: '+ urlaux+filaced+'/Servicio/'+filacod);
       fetch(urlaux+filaced+'/Servicio/'+filacod, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cedulaper: cedulaper.value,
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
});

fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));