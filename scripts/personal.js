const url = 'http://localhost:3000/Personal/';
const contenedor = document.querySelector('tbody');
console.log(contenedor);
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cedulaper = document.getElementById('cedulaper');
const nombreper = document.getElementById('nombreper');
const direccion =  document.getElementById('direccion');
const sueldo = document.getElementById('sueldo');
const telefonoper = document.getElementById('telefonoper');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cedulaper.value = '';
    nombreper.value = '';
    sueldo.value = '';
    telefonoper.value = '';
    direccion.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cedulaper}</td>
                            <td>${linea.nombreper}</td>
                            <td>${linea.direccion}</td>
                            <td>${linea.sueldo}</td>
                            <td>${linea.telefonoper}</td>
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
    const nombreperForm = fila.children[1].innerHTML;
    const direccionForm = fila.children[2].innerHTML;
    const sueldoForm = fila.children[3].innerHTML;
    const telefonoperForm = fila.children[4].innerHTML;

    cedulaper.value = idForm;
    nombreper.value = nombreperForm;
    direccion.value = direccionForm;
    sueldo.value = sueldoForm;
    telefonoper.value = telefonoperForm;
  
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
                cedulaper: cedulaper.value,
                nombreper: nombreper.value,
                direccion: direccion.value,
                sueldo: sueldo.value,
                telefonoper: telefonoper.value
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
                cedulaper: cedulaper.value,
                nombreper: nombreper.value,
                direccion: direccion.value,
                sueldo: sueldo.value,
                telefonoper: telefonoper.value
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