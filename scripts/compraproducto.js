const url = 'http://localhost:3000/Compraproducto/';
const urlaux = 'http://localhost:3000/Cliente/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
console.log(modalLinea);
const formLinea = document.querySelector('form');
console.log(formLinea);

const cod_producto = document.getElementById('cod_producto');
const cedula_cliente = document.getElementById('cedula_cliente');
const cantidad = document.getElementById('cantidad');
const monto = document.getElementById('monto');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_producto.value = '';
    cedula_cliente.value = '';
    cantidad.value = '';
    monto.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_producto}</td>
                            <td>${linea.cedula_cliente}</td>
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
    const fila = e.target.parentNode.parentNode;
    const idaux = fila.firstElementChild.innerHTML;
    const idauxx = fila.children[1].innerHTML;
    console.log('BORRANDO '+ idaux);
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idauxx+'/Producto/'+idaux, {
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
    const montoForm = fila.children[3].innerHTML;
    console.log(idForm);

    cod_producto.value = idForm;
    cedula_cliente.value = id2Form;
    cantidad.value = cantidadForm;
    monto.value = montoForm;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    const fila = e.target;
    const filacod = fila.children[0].children[1].value;
    const filaced = fila.children[1].children[1].value;
    e.preventDefault();
    if(opcion=='editar'){
        fetch(urlaux+filaced+'/Producto/'+filacod, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                cod_producto: cod_producto.value,
                cedula_cliente: cedula_cliente.value,
                cantidad: cantidad.value,
                monto: monto.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       console.log(idForm);
       fetch(urlaux+id2Form+'/Producto/'+idForm, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                cod_producto: cod_producto.value,
                cedula_cliente: cedula_cliente.value,
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
});

fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));