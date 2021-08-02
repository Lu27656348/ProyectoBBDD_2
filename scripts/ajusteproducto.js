const url = 'http://localhost:3000/AjusteProducto/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_producto = document.getElementById('cod_producto');
const tipodiferencia = document.getElementById('tipodiferencia');
const cantidad = document.getElementById('cantidad');
const fechaajuste = document.getElementById('fechaajuste');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_producto.value = '';
    cantidad.value = '';
    fechaajuste.value = '';
    tipodiferencia.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_producto}</td>
                            <td>${linea.fechaajuste}</td>
                            <td>${linea.cantidad}</td>
                            <td>${linea.tipodiferencia}</td>
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
    const cantidadForm = fila.children[2].innerHTML;
    const fechaajusteForm = fila.children[1].innerHTML;
    const tipodiferenciaForm = fila.children[3].innerHTML;

   
    cod_producto.value = idForm;
    fechaajuste.value = fechaajusteForm;
    cantidad.value = cantidadForm;
    tipodiferencia.value =tipodiferenciaForm; 

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
                cod_producto: cod_producto.value,
                fechaajuste: fechaajuste.value,
                cantidad: cantidad.value,
                tipodiferencia: tipodiferencia.value
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
                cod_producto: cod_producto.value,
                fechaajuste: fechaajuste.value,
                cantidad: cantidad.value,
                tipodiferencia: tipodiferencia.value
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