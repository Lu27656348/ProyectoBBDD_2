const url = 'http://localhost:3000/Producto/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalLinea = new bootstrap.Modal(document.getElementById('modalLinea'));
const formLinea = document.querySelector('form');

const cod_producto = document.getElementById('cod_producto');
const nombrep = document.getElementById('nombrep');
const maximo = document.getElementById('maximo');
const minimo = document.getElementById('minimo');
const descripcionp = document.getElementById('descripcionp');
const fabricante = document.getElementById('fabricante');
const precio = document.getElementById('precio');
const existencia = document.getElementById('existencia');
const ecologico = document.getElementById('ecologico');
const cod_linea = document.getElementById('cod_linea');
const rif_proveedor = document.getElementById('rif_proveedor');

let opcion = '';

btnCrear.addEventListener('click', ()=> {
    cod_producto.value = '';
    nombrep.value = '';
    maximo.value = '';
    minimo.value = '';
    descripcionp.value = '';
    fabricante.value = '';
    precio.value = '';
    existencia.value = '';
    ecologico.value = '';
    cod_linea.value = '';
    rif_proveedor.value = '';

    modalLinea.show();
    opcion = 'crear';
});

//FUNCION PARA MOSTRAR RESULTADOS
const mostrar = (l) => {
    l.forEach(linea => {
        resultados += ` <tr>
                            <td>${linea.cod_producto}</td>
                            <td>${linea.nombrep}</td>
                            <td>${linea.maximo}</td>
                            <td>${linea.minimo}</td>
                            <td>${linea.descripcionp}</td>
                            <td>${linea.fabricante}</td>
                            <td>${linea.precio}</td>
                            <td>${linea.existencia}</td>
                            <td>${linea.ecologico}</td>
                            <td>${linea.cod_linea}</td>
                            <td>${linea.rif_proveedor}</td>
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
    const nombrepForm = fila.children[1].innerHTML;
    const maximoForm = fila.children[2].innerHTML;
    const minimoForm = fila.children[3].innerHTML;
    const descripcionpForm = fila.children[4].innerHTML;
    const fabricanteForm = fila.children[5].innerHTML;
    const precioForm = fila.children[6].innerHTML;
    const existenciaForm = fila.children[7].innerHTML;
    const ecologicoForm = fila.children[8].innerHTML;
    const cod_lineaForm = fila.children[9].innerHTML;
    const rif_proveedorForm = fila.children[10].innerHTML;
   
    cod_producto.value = idForm;
    nombrep.value = nombrepForm;
    maximo.value = maximoForm;
    minimo.value = minimoForm;
    descripcionp.value = descripcionpForm;
    fabricante.value = fabricanteForm;
    precio.value = precioForm;
    existencia.value = existenciaForm;
    ecologico.value = ecologicoForm;
    cod_linea.value = cod_lineaForm;
    rif_proveedor.value = rif_proveedorForm;
    
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
                cod_producto: cod_producto.value,
                nombrep: nombrep.value,
                maximo: maximo.value,
                minimo: minimo.value,
                descripcionp: descripcionp.value,
                fabricante: fabricante.value,
                precio: precio.value,
                existencia: existencia.value,
                ecologico: ecologico.value,
                cod_linea: cod_linea.value,
                rif_proveedor: rif_proveedor.value
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
            cod_producto: cod_producto.value,
                nombrep: nombrep.value,
                maximo: maximo.value,
                minimo: minimo.value,
                descripcionp: descripcionp.value,
                fabricante: fabricante.value,
                precio: precio.value,
                existencia: existencia.value,
                ecologico: ecologico.value,
                cod_linea: cod_linea.value,
                rif_proveedor: rif_proveedor.value
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