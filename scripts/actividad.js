const url = 'http://localhost:3000/Actividad/';
const urlaux = 'http://localhost:3000/Servicio/';
const conector = '/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const nro_consecutivo= document.getElementById('nro_consecutivo');
const cod_servicio= document.getElementById('cod_servicio');
const nombre= document.getElementById('nombre');
const descripcion= document.getElementById('descripcion');
const capacidad= document.getElementById('capacidad');
const costo= document.getElementById('costo');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    nro_consecutivo.value = '';
    cod_servicio.value = '';
    nombre.value = '';
    descripcion.value = '';
    capacidad.value = '';
    costo.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.nro_consecutivo}</td>
                            <td>${linea.cod_servicio}</td>
                            <td>${linea.nombre}</td>
                            <td>${linea.descripcion}</td>
                            <td>${linea.capacidad}</td>
                            <td>${linea.costo}</td>
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
    console.log('Han presionado el botón de borrado');
    console.log('Fila contiene: ');
    const fila = e.target.parentNode.parentNode;
    console.log(fila.firstElementChild.innerHTML);
    console.log('idaux contiene: ');
    const idaux = fila.firstElementChild.innerHTML;
    console.log(idaux);
    console.log('idauxx contiene: ');
    const idauxx = fila.children[1].innerHTML;
    console.log(idauxx);
    console.log('BORRANDO '+ idaux);
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(urlaux+idauxx+conector+'Actividad/'+idaux, {
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

    console.log('En editar en idForm tiene un valor de: ');
    console.log(idForm);
    console.log('En editar en id2Form tiene un valor de: ');
    console.log(id2Form);

    const nombreForm = fila.children[2].innerHTML;
    const descripcionForm = fila.children[3].innerHTML;
    const capacidadForm = fila.children[4].innerHTML;
    const costoForm = fila.children[5].innerHTML;

    nro_consecutivo.value = idForm;
    cod_servicio.value = id2Form;
    nombre.value = nombreForm;
    descripcion.value = descripcionForm;
    capacidad.value = capacidadForm;
    costo.value = costoForm;

    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('Entrando en submit');
    const fila = e.target;
    console.log('fila contiene: ');
    console.log(fila);
    console.log('idForm contiene ');
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
        fetch(urlaux+id2Form+conector+'Actividad/'+idForm, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                nro_consecutivo: nro_consecutivo.value,
                cod_servicio: cod_servicio.value,
                nombre: nombre.value,
                descripcion: descripcion.value,
                capacidad: capacidad.value,
                costo: costo.value
            })
        })
        .then((response) => response.json())
        .then((response) => location.reload())
    }
    
    if(opcion=='crear'){
       console.log('opcion == crear');
       console.log(urlaux+filacod+conector+'Actividad'+conector+filanro);
       fetch(urlaux+filacod+conector+'Actividad'+conector+filanro, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                nro_consecutivo: filanro,
                cod_servicio: filacod,
                nombre: nombre.value,
                descripcion: descripcion.value,
                capacidad: capacidad.value,
                costo: costo.value
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