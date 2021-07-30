const url = 'http://localhost:3000/Reservacion/';
const contenedor = document.querySelector('tbody');
console.log(contenedor);
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const num_reservacion = document.getElementById('num_reservacion');
const fecha_reservacion = document.getElementById('fecha_reservacion');
const cedula_cliente = document.getElementById('cedula_cliente');
const cod_servicio = document.getElementById('cod_servicio');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    num_reservacion.value = '';
    fecha_reservacion.value = '';
    cedula_cliente.value = '';
    cod_servicio.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.num_reservacion}</td>
                            <td>${linea.fecha_reservacion}</td>
                            <td>${linea.cedula_cliente}</td>
                            <td>${linea.cod_servicio}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">EDITAR</a><a class="btnBorrar btn btn-danger">BORRAR</a></td>
                        </tr>`;
    });
    contenedor.innerHTML = resultados;
    console.log(resultados);
    
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
let idForm;
on(document, 'click','.btnEditar', (e)=>{
    const fila = e.target.parentNode.parentNode;
    
    idForm = fila.children[0].innerHTML;
    const fecha_reservacionForm = fila.children[1].innerHTML;
    const cedula_clienteForm = fila.children[2].innerHTML;
    const cod_servicioForm = fila.children[3].innerHTML;

    num_reservacion.value = idForm;
    fecha_reservacion.value = fecha_reservacionForm;
    cedula_cliente.value = cedula_clienteForm;
    cod_servicio.value = cod_servicioForm;
    
    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(opcion=='editar'){
        console.log(idForm);
        fetch(url+idForm, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                num_reservacion: num_reservacion.value,
                fecha_reservacion: fecha_reservacion.value,
                cedula_cliente: cedula_cliente.value,
                cod_servicio: cod_servicio.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
        console.log(idForm);
       fetch(url, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                num_reservacion: num_reservacion.value,
                fecha_reservacion: fecha_reservacion.value,
                cedula_cliente: cedula_cliente.value,
                cod_servicio: cod_servicio.value
           })
       })
       .then((response) => response.json())
       .then((data )=>{
           const nuevaLinea = [];
           nuevaLinea.push(data);
           mostrar(nuevaLinea);
       })
       .then((response) => location.reload());
    }
    modalLinea.hide();
});

fetch (url)
    .then(  (response) => response.json() )
    .then((data) => mostrar(data))
    .catch( (error) => console.log(error));