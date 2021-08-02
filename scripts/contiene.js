const url = 'http://localhost:3000/Contiene/';
const urlaux = 'http://localhost:3000/OrdenServicio/';
const conector = '/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_orden= document.getElementById('cod_orden');
const cod_producto= document.getElementById('cod_producto');
const cantidad= document.getElementById('cantidad');
const monto= document.getElementById('monto');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_orden.value = '';
    cod_producto.value = '';
    cantidad.value = '';
    monto.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_orden}</td>
                            <td>${linea.cod_producto}</td>
                            <td>${linea.cantidad}</td>
                            <td>${linea.monto}</td>
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
   //console.log('Han presionado el botón de borrado');
    //console.log('Fila contiene: ');
    const fila = e.target.parentNode.parentNode;
    //console.log(fila.firstElementChild.innerHTML);
    //console.log('idaux contiene: ');
    const idaux = fila.firstElementChild.innerHTML;
    //console.log(idaux);
    //console.log('idauxx contiene: ');
    const idauxx = fila.children[1].innerHTML;
    //console.log(idauxx);
    //console.log('BORRANDO '+ idaux);
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idaux+conector+'Producto/'+idauxx, {
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
    const cantidadForm = fila.children[2].innerHTML;
    const montoForm  = fila.children[3].innerHTML;

    cod_orden.value = idForm;
    cod_producto.value = id2Form;
    cantidad.value = cantidadForm;
    monto.value = montoForm;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
    const filanro = fila.children[0].children[1].value;
    const filacod = fila.children[1].children[1].value;
    //console.log('idForm contiene: ' + idForm);
    //console.log(urlaux+id2Form+conector);
    //console.log('Actualmente el fetch contiene:');
    //console.log(url+idForm);

    if(opcion=='editar'){
        console.log('opcion == editar');
        console.log('edicion llevada en la ruta');
        console.log(url+idForm);
        fetch(urlaux+idForm+conector+'Producto/'+id2Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cod_orden: cod_orden.value,
                cod_producto: cod_producto.value,
                cantidad: cantidad.value,
                monto: monto.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
      
       fetch(urlaux+filanro+conector+'Producto'+conector+filacod, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cod_orden: cod_orden.value,
                cod_producto: cod_producto.value,
                cantidad: cantidad.value,
                monto: monto.value
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