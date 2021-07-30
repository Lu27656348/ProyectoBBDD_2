const url = 'http://localhost:3000/FichaServicio/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const num_unico = document.getElementById('num_unico');
const fechaent = document.getElementById('fechaent');
const fechaest = document.getElementById('fechaest');
const horaest = document.getElementById('horaest');
const fechareal = document.getElementById('fechareal');
const horareal = document.getElementById('horareal');
const cedulaaut = document.getElementById('cedulaaut');
const nombreaut = document.getElementById('nombreaut');
const personadistinta = document.getElementById('personadistinta');
const cedula_cliente = document.getElementById('cedula_cliente');
const cod_vehiculo = document.getElementById('cod_vehiculo');
const horaent = document.getElementById('horaent');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    num_unico.value = '';
    fechaent.value = '';
    horaent.value = '';
    fechaest.value = '';
    horaest.value = '';
    fechareal.value = '';
    horareal.value = '';
    cedulaaut.value = '';
    nombreaut.value = '';
    personadistinta.value = '';
    cedula_cliente.value = '';
    cod_vehiculo.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.num_unico}</td>
                            <td>${linea.fechaent}</td>
                            <td>${linea.horaent}</td>
                            <td>${linea.fechaest}</td>
                            <td>${linea.horaest}</td>
                            <td>${linea.fechareal}</td>
                            <td>${linea.horareal}</td>
                            <td>${linea.cedulaaut}</td>
                            <td>${linea.nombreaut}</td>
                            <td>${linea.personadistinta}</td>
                            <td>${linea.cedula_cliente}</td>
                            <td>${linea.cod_vehiculo}</td>
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
    console.log('BORRANDO '+ idaux);
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
    const fechaentForm = fila.children[1].innerHTML;
    const horaentForm = fila.children[2].innerHTML;
    const fechaestForm = fila.children[3].innerHTML;
    const horaestForm = fila.children[4].innerHTML;
    const fecharealForm = fila.children[5].innerHTML;
    const horarealForm = fila.children[6].innerHTML;
    const cedulaautForm = fila.children[7].innerHTML;
    const nombreautForm = fila.children[8].innerHTML;
    const personadistintaForm = fila.children[9].innerHTML;
    const cedula_clienteForm = fila.children[10].innerHTML;
    const cod_vehiculoForm = fila.children[11].innerHTML;


    num_unico.value = idForm;
    fechaent.value = fechaentForm;
    horaent.value = horaentForm;
    fechaest.value = fechaestForm;
    horaest.value = horaestForm;
    fechareal.value = fecharealForm;
    horareal.value = horarealForm;
    cedulaaut.value = cedulaautForm;
    nombreaut.value = nombreautForm;
    personadistinta.value = personadistintaForm;
    cedula_cliente.value = cedula_clienteForm;
    cod_vehiculo.value = cod_vehiculoForm;

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
                num_unico: num_unico.value,
                fechaent: fechaent.value,
                horaent: horaent.value,
                fechaest: fechaest.value,
                horaest: horaest.value,
                fechareal: fechareal.value,
                horareal: horareal.value,
                cedulaaut: cedulaaut.value,
                nombreaut: nombreaut.value,
                personadistinta: personadistinta.value,
                cedula_cliente: cedula_cliente.value,
                cod_vehiculo: cod_vehiculo.value
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
                num_unico: num_unico.value,
                fechaent: fechaent.value,
                horaent: horaent.value,
                fechaest: fechaest.value,
                horaest: horaest.value,
                fechareal: fechareal.value,
                horareal: horareal.value,
                cedulaaut: cedulaaut.value,
                nombreaut: nombreaut.value,
                personadistinta: personadistinta.value,
                cedula_cliente: cedula_cliente.value,
                cod_vehiculo: cod_vehiculo.value
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