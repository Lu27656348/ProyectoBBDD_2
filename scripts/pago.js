const url = 'http://localhost:3000/Pago/';
const contenedor = document.querySelector('tbody');
console.log(contenedor);
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cedula_cliente = document.getElementById('cedula_cliente');
const num_pago = document.getElementById('num_pago');
const monto = document.getElementById('monto');
const fechapago = document.getElementById('fechapago');
const banco = document.getElementById('banco');
const numerot = document.getElementById('numerot');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cedula_cliente.value = '';
    num_pago.value = '';
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
                            <td>${linea.num_pago}</td>
                            <td>${linea.fechapago}</td>
                            <td>${linea.numerot}</td>
                            <td>${linea.banco}</td>
                            <td>${linea.monto}</td>
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
    const idauxx = fila.children[1].innerHTML;
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(url+idaux+'/Numero/'+idauxx, {
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
    const montoForm = fila.children[5].innerHTML;
    const fechapagoForm = fila.children[2].innerHTML;
    const bancoForm = fila.children[4].innerHTML;
    const numerotForm = fila.children[3].innerHTML;
   
    cedula_cliente.value = idForm; 
    num_pago.value = id2Form;
    monto.value = montoForm;
    fechapago.value = fechapagoForm;
    banco.value = bancoForm;
    numerot.value = numerotForm;

    console.log(cedula_cliente.value);
    console.log(num_pago.value);
    console.log(fechapago.value);
    console.log(numerot.value);
    console.log(banco.value);
    console.log(monto.value);

    
    opcion = 'editar';
    modalLinea.show();
});

//PROCEDIMIENTO PARA GUARDAR O EDITAR DATOS DE LA BASE DE DATOS
formLinea.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fila = e.target;
    const filanro = fila.children[1].children[1].value;
    const filacli = fila.children[0].children[1].value;

    if(opcion=='editar'){
        console.log(idForm);
        fetch(url+idForm+'/Numero/'+id2Form, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                num_pago: num_pago.value,
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
       fetch(url+filacli+'/Numero/'+filanro, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
                num_pago: num_pago.value,
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