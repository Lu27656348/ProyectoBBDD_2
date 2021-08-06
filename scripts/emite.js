const url = 'http://localhost:3000/Emite/';
const urlaux = 'http://localhost:3000/Locales/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const riflocal= document.getElementById('riflocal');
const cod_facturac= document.getElementById('cod_facturac');
const cedula_cliente = document.getElementById('cedula_cliente');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    riflocal.value = '';
    cod_facturac.value = '';
    cedula_cliente.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.riflocal}</td>
                            <td>${linea.cod_facturac}</td>
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
    console.log('Click en borrar');
    const fila = e.target.parentNode.parentNode;
    const idaux = fila.firstElementChild.innerHTML;
    const idauxx = fila.children[1].innerHTML;
    const idauxxx= fila.children[2].innerHTML;
    
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idaux+'/FacturaCompra/'+idauxx+'/Cliente/'+idauxxx, {
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

on(document, 'click','.btnEditar', (e)=>{
    const fila = e.target.parentNode.parentNode;
    
    idForm = fila.children[0].innerHTML;
    id2Form = fila.children[1].innerHTML;
    id3Form = fila.children[2].innerHTML;

    riflocal.value = idForm;
    cod_facturac.value = id2Form;
    cedula_cliente.value = id3Form;
  

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
    const filarif = fila.children[0].children[1].value;
    const filacod = fila.children[1].children[1].value;
    const filaced = fila.children[2].children[1].value;
    if(opcion=='editar'){
 
        fetch(urlaux+idForm+'/FacturaCompra/'+id2Form+'/Cliente/'+id3Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                riflocal: riflocal.value,
                cod_facturac: cod_facturac.value,
                cedula_cliente: cedula_cliente.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
     
       fetch(urlaux+filarif+'/FacturaCompra/'+filacod+'/Cliente/'+filaced, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                riflocal: riflocal.value,
                cod_facturac: cod_facturac.value,
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
    console.log('Creación de Actividad exitosa!');
});

fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));