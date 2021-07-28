const url = 'http://localhost:3000/Servicio/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_servicio = document.getElementById('codservicio');
const descripcion = document.getElementById('descripcion');
const nombreserv = document.getElementById('nombreservicio');
const anticipacion = document.getElementById('anticipacion');
const reserva = document.getElementById('reserva');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    descripcion.value = '';
    cod_servicio.value = '';
    nombreserv.value = '';
    anticipacion.value = '';
    reserva.value = '';
    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_servicio}</td>
                            <td>${linea.nombreserv}</td>
                            <td>${linea.descripcionserv}</td>
                            <td>${linea.anticipacion}</td>
                            <td>${linea.reserva}</td>
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
    const nombreservForm = fila.children[1].innerHTML;
    const descripcionservForm = fila.children[2].innerHTML;
    const anticipacionForm = fila.children[3].innerHTML;
    const reservaForm = fila.children[4].innerHTML;
    cod_servicio.value = idForm;
    nombreserv.value = nombreservForm;

    descripcion.value = descripcionservForm;
    console.log(' descripcion en editar: ' + descripcion.value);

    anticipacion.value = anticipacionForm;
    reserva.value = reservaForm;
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
                nombreserv: nombreserv.value,
                descripcionserv: descripcion.value,
                anticipacion: anticipacion.value,
                reserva: reserva.value,
                cod_servicio: codservicio.value
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
            nombreserv: nombreserv.value,
            descripcionserv: descripcion.value,
            reserva: reserva.value,
            anticipacion: anticipacion.value,
            cod_servicio: codservicio.value
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