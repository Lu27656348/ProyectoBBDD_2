const url = 'http://localhost:3000/Pago/';
const contenedor = document.querySelector('tbody');
console.log(contenedor);
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cedula_cliente = document.getElementById('cedula_cliente');
const monto = document.getElementById('monto');
const fechapago = document.getElementById('fechapago');
const banco = document.getElementById('banco');
const numerot = document.getElementById('numerot');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cedula_cliente.value = '';
    monto.value = '';
    fechapago.value = '';
    banco.value = '';
    numerot.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cedula_cliente}</td>
                            <td>${linea.monto}</td>
                            <td>${linea.fechapago}</td>
                            <td>${linea.banco}</td>
                            <td>${linea.numerot}</td>
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
    const montoForm = fila.children[1].innerHTML;
    const fechapagoForm = fila.children[2].innerHTML;
    const bancoForm = fila.children[3].innerHTML;
    const numerotForm = fila.children[4].innerHTML;
   
    cedula_cliente.value = idForm; 
    monto.value = montoForm;
    fechapago.value = fechapagoForm;
    banco.value = bancoForm;
    numerot.value = numerotForm;
    
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
                cedula_cliente: cedula_cliente.value,
                monto: monto.value,
                fechapago: fechapago.value,
                banco: banco.value,
                numerot: numerot.value
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
                cedula_cliente: cedula_cliente.value,
                monto: monto.value,
                fechapago: fechapago.value,
                banco: banco.value,
                numerot: numerot.value
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