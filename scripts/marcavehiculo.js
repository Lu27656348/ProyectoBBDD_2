const url = 'http://localhost:3000/MarcaVehiculo/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const nombremarca= document.getElementById('nombremarca');
const aceitecaja= document.getElementById('aceitecaja');
const descripcion= document.getElementById('descripcion');
const cantidadp= document.getElementById('cantidadp');
const refrigerante= document.getElementById('refrigerante');
const octanaje= document.getElementById('octanaje');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    nombremarca.value = '';
    aceitecaja.value = '';
    descripcion.value = '';
    cantidadp.value = '';
    refrigerante.value = '';
    octanaje.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.nombremarca}</td>
                            <td>${linea.aceitecaja}</td>
                            <td>${linea.descripcion}</td>
                            <td>${linea.cantidadp}</td>
                            <td>${linea.refrigerante}</td>
                            <td>${linea.octanaje}</td>
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

    //console.log('BORRANDO '+ idaux);
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
    const aceitecajaForm = fila.children[1].innerHTML;
    const descripcionForm = fila.children[3].innerHTML;
    const cantidadpForm = fila.children[4].innerHTML;
    const refrigeranteForm = fila.children[5].innerHTML;
    const octanajeForm = fila.children[5].innerHTML;

    nombremarca.value = idForm;
    aceitecaja.value = aceitecajaForm;
    descripcion.value = descripcionForm;
    cantidadp.value = cantidadpForm;
    refrigerante.value = refrigeranteForm;
    octanaje.value = octanajeForm;

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
                nombremarca: nombremarca.value,
                aceitecaja: aceitecaja.value,
                descripcion: descripcion.value,
                cantidadp: cantidadp.value,
                refrigerante: refrigerante.value,
                octanaje: octanaje.value
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
                nombremarca: nombremarca.value,
                aceitecaja: aceitecaja.value,
                descripcion: descripcion.value,
                cantidadp: cantidadp.value,
                refrigerante: refrigerante.value,
                octanaje: octanaje.value
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