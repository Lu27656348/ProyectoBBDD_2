const url = 'http://localhost:3000/FacturaCompra/';
const conector = '/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_facturac= document.getElementById('cod_facturac');
const fechafactura= document.getElementById('fechafactura');
const formapago= document.getElementById('formapago');
const descuento= document.getElementById('descuento');
const riflocal= document.getElementById('riflocal');
const cedula_cliente= document.getElementById('cedula_cliente');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_facturac.value = '';
    fechafactura.value = '';
    formapago.value = '';
    descuento.value = '';
    riflocal.value = '';
    cedula_cliente.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_facturac}</td>
                            <td>${linea.fechafactura}</td>
                            <td>${linea.formapago}</td>
                            <td>${linea.descuento}</td>
                            <td>${linea.riflocal}</td>
                            <td>${linea.cedula_cliente}</td>
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
    //console.log(fila.firstElementChild.innerHTML);
    //console.log('idaux contiene: ');
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
    const fechafacturaForm = fila.children[1].innerHTML;
    const formapagoForm = fila.children[2].innerHTML;
    const descuentoForm = fila.children[3].innerHTML;
    const riflocalForm = fila.children[4].innerHTML;
    const cedula_clienteForm = fila.children[5].innerHTML;

    cod_facturac.value = idForm;
    fechafactura.value = fechafacturaForm;
    formapago.value = formapagoForm;
    descuento.value = descuentoForm;
    riflocal.value = riflocalForm;
    cedula_cliente.value = cedula_clienteForm;

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
                cod_facturac: cod_facturac.value,
                fechafactura: fechafactura.value,
                formapago: formapago.value,
                descuento: descuento.value,
                riflocal: riflocal.value,
                cedula_cliente: cedula_cliente.value
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
                cod_facturac: cod_facturac.value,
                fechafactura: fechafactura.value,
                formapago: formapago.value,
                descuento: descuento.value,
                riflocal: riflocal.value,
                cedula_cliente: cedula_cliente.value
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