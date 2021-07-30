const url = 'http://localhost:3000/Locales/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const riflocal= document.getElementById('riflocal');
const nombre= document.getElementById('nombre');
const direccion= document.getElementById('direccion');
const fechainventario= document.getElementById('fechainventario');
const fecha_encargado= document.getElementById('fecha_encargado');
const encargado= document.getElementById('encargado');
const nombre_ciudad= document.getElementById('nombre_ciudad');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    riflocal.value = '';
    nombre.value = '';
    direccion.value = '';
    fechainventario.value = '';
    fecha_encargado.value = '';
    encargado.value = '';
    nombre_ciudad.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.riflocal}</td>
                            <td>${linea.nombre}</td>
                            <td>${linea.direccion}</td>
                            <td>${linea.fechainventario}</td>
                            <td>${linea.fecha_encargado}</td>
                            <td>${linea.encargado}</td>
                            <td>${linea.nombre_ciudad}</td>
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
let idForm;
on(document, 'click','.btnEditar', (e)=>{
    const fila = e.target.parentNode.parentNode;

    idForm = fila.children[0].innerHTML;
    const nombreForm = fila.children[1].innerHTML;
    const direccionForm = fila.children[2].innerHTML;
    const fechainventarioForm = fila.children[3].innerHTML;
    const fecha_encargadoForm = fila.children[4].innerHTML;
    const encargadoForm = fila.children[5].innerHTML;
    const nombre_ciudadForm = fila.children[6].innerHTML;
    
    riflocal.value = idForm;
    nombre.value = nombreForm;
    direccion.value = direccionForm;
    fechainventario.value = fechainventarioForm;
    fecha_encargado.value = fecha_encargadoForm;
    encargado.value = encargadoForm;
    nombre_ciudad.value = nombre_ciudadForm;

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
                riflocal: riflocal.value,
                nombre: nombre.value,
                direccion: direccion.value,
                fechainventario: fechainventario.value,
                fecha_encargado: fecha_encargado.value,
                encargado: encargado.value,
                nombre_ciudad: nombre_ciudad.value
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
                riflocal: riflocal.value,
                nombre: nombre.value,
                direccion: direccion.value,
                fechainventario: fechainventario.value,
                fecha_encargado: fecha_encargado.value,
                encargado: encargado.value,
                nombre_ciudad: nombre_ciudad.value
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