const url = 'http://localhost:3000/DetalleCompra/';
const urlaux = 'http://localhost:3000/FacturaCompra/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_facturac = document.getElementById('cod_facturac');
const cod_producto= document.getElementById('cod_producto');
const monto= document.getElementById('monto');
const cantidad = document.getElementById('cantidad');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_facturac.value='';
    cod_producto.value = '';
    monto.value = '';
    cantidad.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_facturac}</td>
                            <td>${linea.cod_producto}</td>
                            <td>${linea.monto}</td>
                            <td>${linea.cantidad}</td>
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

    console.log(idaux);
    console.log(idauxx);

    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idaux+'/Productos/'+idauxx, {
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
    const montoForm = fila.children[2].innerHTML;
    const cantidadForm = fila.children[3].innerHTML;

    cod_facturac.value=idForm;
    cod_producto.value = id2Form;
    monto.value = montoForm;
    cantidad.value = cantidadForm; 

    console.log('cod_facturac : ' + cod_facturac.value);
    console.log('cod_producto : ' + cod_producto.value);
    console.log('monto : ' + monto.value);
    console.log('cantidad : ' + cantidad.value);
    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
    const filanum = fila.children[0].children[1].value;
    const filacod = fila.children[1].children[1].value;
    console.log('filanum: '+filanum);
    console.log('filacod: '+filacod);
    console.log('idForm ' + idForm);
    console.log('id2Form ' + id2Form);
    if(opcion=='editar'){
       
        fetch(urlaux+idForm+'/Productos/'+id2Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cod_facturac: cod_facturac.value,
                cod_producto: cod_producto.value,
                monto: monto.value,
                cantidad: cantidad.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       
       fetch(urlaux+filanum+'/Productos/'+filacod, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cod_facturac: cod_facturac.value,
                cod_producto: cod_producto.value,
                monto: monto.value,
                cantidad: cantidad.value
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