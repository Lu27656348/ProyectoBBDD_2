const url = 'http://localhost:3000/Proveedor/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const rif_proveedor = document.getElementById('rif_proveedor');
const direccion = document.getElementById('direccion');
const razonsocial = document.getElementById('razonsocial');
const telefono = document.getElementById('telefono');
const celular = document.getElementById('celular');
const nombre = document.getElementById('nombre');
const cedula = document.getElementById('cedula');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    rif_proveedor.value = '';
    direccion.value = '';
    razonsocial.value = '';
    telefono.value = '';
    celular.value = '';
    nombre.value = '';
    cedula.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.rif_proveedor}</td>
                            <td>${linea.direccion}</td>
                            <td>${linea.razonsocial}</td>
                            <td>${linea.telefono}</td>
                            <td>${linea.celular}</td>
                            <td>${linea.nombre}</td>
                            <td>${linea.cedula}</td>
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
    const direccionForm = fila.children[1].innerHTML;
    const razonsocialForm = fila.children[2].innerHTML;
    const telefonoForm = fila.children[3].innerHTML;
    const celularForm = fila.children[4].innerHTML;
    const nombreForm = fila.children[5].innerHTML;
    const cedulaForm = fila.children[6].innerHTML;
   
    rif_proveedor.value = idForm;
    direccion.value = direccionForm;
    razonsocial.value = razonsocialForm;
    telefono.value = telefonoForm;
    celular.value = celularForm;
    nombre.value = nombreForm;
    cedula.value = cedulaForm;
    
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
                rif_proveedor: rif_proveedor.value,
                direccion: direccion.value,
                razonsocial: razonsocial.value,
                telefono: telefono.value,
                celular: celular.value,
                nombre:nombre.value,
                cedula: cedula.value
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
                rif_proveedor: rif_proveedor.value,
                direccion: direccion.value,
                razonsocial: razonsocial.value,
                telefono: telefono.value,
                celular: celular.value,
                nombre:nombre.value,
                cedula: cedula.value
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