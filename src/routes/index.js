const { Router } = require('express');
const router = Router();

const { getServicio, getServicioByCod,postServicio,deleteServicioByCod,updateServicioByCod, 
        getCliente,getClienteByCod,postCliente,deleteClienteByCod,updateClienteByCod,
        getVehiculo, getVehiculoByCod,postVehiculo,deleteVehiculoByCod,updateVehiculoByCod,
        getTipoVehiculo, getTipoVehiculoByCod,postTipoVehiculo,deleteTipoVehiculoByCod,updateTipoVehiculoByCod,
        getCiudad,getCiudadByCod,postCiudad,deleteCiudadByCod,updateCiudadByCod,
        getActividad,postActividad, getActividadByCod, deleteActividadByCod, updateActividadByCod,
        getLinea,getLineaByCod,postLinea,deleteLineaByCod,updateLineaByCod,
        getProveedor,getProveedorByCod,postProveedor,deleteProveedorByCod,updateProveedorByCod,
        getProducto, getProductoByCod, postProducto, deleteProductoByCod, updateProductoByCod,
        getReservacion, getReservacionByCod, postReservacion, deleteReservacionByCod, updateReservacionByCod,
        getPersonal, getPersonalByCod, postPersonal, deletePersonalByCod, updatePersonalByCod,
        getPago, getPagoByCod, postPago, deletePagoByCod, updatePagoByCod,
        getOrdencompra, getOrdencompraByCod, postOrdencompra, deleteOrdencompraByCod, updateOrdencompraByCod,
        getLocales, getLocalesByCod, postLocales, deleteLocalesByCod, updateLocalesByCod,
        getOfrece, getOfreceByCod, postOfrece, deleteOfreceByCod, updateOfreceByCod,
        getFichaServicio, getFichaServicioByCod, postFichaServicio, deleteFichaServicioByCod, updateFichaServicioByCod,
        getCompraProducto, getCompraProductoByCod, postCompraProducto, deleteCompraProductoByCod, updateCompraProductoByCod,
        getConsume, getConsumeByCod, postConsume, deleteConsumeByCod, updateConsumeByCod, 
        getContiene, getContieneByCod, postContiene, deleteContieneByCod, updateContieneByCod,
        getFacturaServicio, getFacturaServicioByCod, postFacturaServicio, deleteFacturaServicioByCod, updateFacturaServicioByCod,
        getFacturaProveedor, getFacturaProveedorByCod, postFacturaProveedor, deleteFacturaProveedorByCod, updateFacturaProveedorByCod,
        getAsignado, getAsignadoByCod, postAsignado, deleteAsignadoByCod, updateAsignadoByCod,
        getAjusteProducto, getAjusteProductoByCod, postAjusteProducto, deleteAjusteProductoByCod, updateAjusteProductoByCod,
        getMarcaVehiculo, getMarcaVehiculoByCod, postMarcaVehiculo, deleteMarcaVehiculoByCod, updateMarcaVehiculoByCod,
        getDetalleOrden, getDetalleOrdenByCod, postDetalleOrden, deleteDetalleOrdenByCod, updateDetalleOrdenByCod,
        getNecesita, getNecesitaByCod, postNecesita, deleteNecesitaByCod, updateNecesitaByCod} = require('../controllers/index.controller');


router.get('/Necesita', getNecesita);
router.get('/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', getNecesitaByCod);
router.post('/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', postNecesita);
router.delete('/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', deleteNecesitaByCod);
router.put('/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', updateNecesitaByCod);

router.get('/MarcaVehiculo', getMarcaVehiculo);
router.get('/MarcaVehiculo/:nombremarca', getMarcaVehiculoByCod);
router.post('/MarcaVehiculo', postMarcaVehiculo);
router.delete('/MarcaVehiculo/:nombremarca', deleteMarcaVehiculoByCod);
router.put('/MarcaVehiculo/:nombremarca', updateMarcaVehiculoByCod);

router.get('/Servicio', getServicio);
router.get('/Servicio/:cod_servicio', getServicioByCod);
router.post('/Servicio', postServicio);
router.delete('/Servicio/:cod_servicio', deleteServicioByCod);
router.put('/Servicio/:cod_servicio', updateServicioByCod);

router.get('/AjusteProducto', getAjusteProducto);
router.get('/AjusteProducto/:cod_producto', getAjusteProductoByCod);
router.post('/AjusteProducto', postAjusteProducto);
router.delete('/AjusteProducto/:cod_producto', deleteAjusteProductoByCod);
router.put('/AjusteProducto/:cod_producto', updateAjusteProductoByCod);

router.get('/Asignado', getAsignado);
router.get('/Personal/:cedula_personal/Servicio/:cod_servicio', getAsignadoByCod);
router.post('/Personal/:cedula_personal/Servicio/:cod_servicio', postAsignado);
router.delete('/Personal/:cedula_personal/Servicio/:cod_servicio', deleteAsignadoByCod);
router.put('/Personal/:cedula_personal/Servicio/:cod_servicio', updateAsignadoByCod);

router.get('/FacturaProveedor', getFacturaProveedor);
router.get('/FacturaProveedor/:cod_facturap', getFacturaProveedorByCod);
router.post('/FacturaProveedor', postFacturaProveedor);
router.delete('/FacturaProveedor/:cod_facturap', deleteFacturaProveedorByCod);
router.put('/FacturaProveedor/:cod_facturap', updateFacturaProveedorByCod);


router.get('/FacturaServicio', getFacturaServicio);
router.get('/FacturaServicio/:cod_facturas', getFacturaServicioByCod);
router.post('/FacturaServicio', postFacturaServicio);
router.delete('/FacturaServicio/:cod_facturas', deleteFacturaServicioByCod);
router.put('/FacturaServicio/:cod_facturas', updateFacturaServicioByCod);

router.get('/Contiene', getContiene);
router.get('/OrdenServicio/:cod_orden/Producto/:cod_producto', getContieneByCod);
router.post('/OrdenServicio/:cod_orden/Producto/:cod_producto', postContiene);
router.delete('/OrdenServicio/:cod_orden/Producto/:cod_producto', deleteContieneByCod);
router.put('/OrdenServicio/:cod_orden/Producto/:cod_producto', updateContieneByCod);

router.get('/Consume', getConsume);
router.get('/Personal/:cedula_personal/Producto/:cod_producto/Actividad/:nro_consecutivo/Servicio/:cod_servicio', getConsumeByCod);
router.post('/Personal/:cedula_personal/Producto/:cod_producto/Actividad/:nro_consecutivo/Servicio/:cod_servicio', postConsume);
router.delete('/Personal/:cedula_personal/Producto/:cod_producto/Actividad/:nro_consecutivo/Servicio/:cod_servicio', deleteConsumeByCod);
router.put('/Personal/:cedula_personal/Producto/:cod_producto/Actividad/:nro_consecutivo/Servicio/:cod_servicio', updateConsumeByCod);

router.get('/Compraproducto', getCompraProducto);
router.get('/Cliente/:cedula_cliente/Producto/:cod_producto', getCompraProductoByCod);
router.post('/Cliente/:cedula_cliente/Producto/:cod_producto', postCompraProducto);
router.delete('/Cliente/:cedula_cliente/Producto/:cod_producto', deleteCompraProductoByCod);
router.put('/Cliente/:cedula_cliente/Producto/:cod_producto', updateCompraProductoByCod);

router.get('/FichaServicio', getFichaServicio);
router.get('/FichaServicio/:num_unico', getFichaServicioByCod);
router.post('/FichaServicio', postFichaServicio);
router.delete('/FichaServicio/:num_unico', deleteFichaServicioByCod);
router.put('/FichaServicio/:num_unico', updateFichaServicioByCod);

router.get('/Ofrece', getOfrece);
router.get('/Locales/:riflocal/Servicio/:cod_servicio', getOfreceByCod);
router.post('/Locales/:riflocal/Servicio/:cod_servicio', postOfrece);
router.delete('/Locales/:riflocal/Servicio/:cod_servicio', deleteOfreceByCod);
router.put('/Locales/:riflocal/Servicio/:cod_servicio', updateOfreceByCod);

router.get('/Locales', getLocales);
router.get('/Locales/:riflocal', getLocalesByCod);
router.post('/Locales', postLocales);
router.delete('/Locales/:riflocal', deleteLocalesByCod);
router.put('/Locales/:riflocal', updateLocalesByCod);

router.get('/Ordencompra', getOrdencompra);
router.get('/Ordencompra/:cod_orden', getOrdencompraByCod);
router.post('/Ordencompra', postOrdencompra);
router.delete('/Ordencompra/:cod_orden', deleteOrdencompraByCod);
router.put('/Ordencompra/:cod_orden', updateOrdencompraByCod);

router.get('/Pago', getPago);
router.get('/Pago/:cedula_cliente', getPagoByCod);
router.post('/Pago', postPago);
router.delete('/Pago/:cedula_cliente', deletePagoByCod);
router.put('/Pago/:cedula_cliente', updatePagoByCod);

router.get('/Personal', getPersonal);
router.get('/Personal/:cedulaper', getPersonalByCod);
router.post('/Personal', postPersonal);
router.delete('/Personal/:cedulaper', deletePersonalByCod);
router.put('/Personal/:cedulaper', updatePersonalByCod);

router.get('/Reservacion', getReservacion);
router.get('/Reservacion/:num_reservacion', getReservacionByCod);
router.post('/Reservacion', postReservacion);
router.delete('/Reservacion/:num_reservacion', deleteReservacionByCod);
router.put('/Reservacion/:num_reservacion', updateReservacionByCod);

router.get('/Producto', getProducto);
router.get('/Producto/:cod_producto', getProductoByCod);
router.post('/Producto', postProducto);
router.delete('/Producto/:cod_producto', deleteProductoByCod);
router.put('/Producto/:cod_producto', updateProductoByCod);

router.get('/Linea', getLinea);
router.get('/Linea/:cod_linea', getLineaByCod);
router.post('/Linea', postLinea);
router.delete('/Linea/:cod_linea', deleteLineaByCod);
router.put('/Linea/:cod_linea', updateLineaByCod);

router.get('/Proveedor', getProveedor);
router.get('/Proveedor/:rif_proveedor', getProveedorByCod);
router.post('/Proveedor', postProveedor);
router.delete('/Proveedor/:rif_proveedor', deleteProveedorByCod);
router.put('/Proveedor/:rif_proveedor', updateProveedorByCod);

router.get('/Actividad', getActividad);
router.get('/Servicio/:cod_servicio/Actividad/:nro_consecutivo', getActividadByCod);
router.post('/Servicio/:cod_servicio/Actividad/:nro_consecutivo', postActividad);
router.delete('/Servicio/:cod_servicio/Actividad/:nro_consecutivo', deleteActividadByCod);
router.put('/Servicio/:cod_servicio/Actividad/:nro_consecutivo', updateActividadByCod);

router.get('/Vehiculo', getVehiculo);
router.get('/Vehiculo/:cod_vehiculo', getVehiculoByCod);
router.post('/Vehiculo', postVehiculo);
router.delete('/Vehiculo/:cod_vehiculo', deleteVehiculoByCod);
router.put('/Vehiculo/:cod_vehiculo', updateVehiculoByCod);

router.get('/TipoVehiculo', getTipoVehiculo);
router.get('/TipoVehiculo/:cod_tipovehiculo', getTipoVehiculoByCod);
router.post('/TipoVehiculo', postTipoVehiculo);
router.delete('/TipoVehiculo/:cod_tipovehiculo', deleteTipoVehiculoByCod);
router.put('/TipoVehiculo/:cod_tipovehiculo', updateTipoVehiculoByCod);

router.get('/Cliente', getCliente);
router.get('/Cliente/:cedula_cliente', getClienteByCod);
router.post('/Cliente', postCliente);
router.delete('/Cliente/:cedula_cliente', deleteClienteByCod);
router.put('/Cliente/:cedula_cliente', updateClienteByCod);

router.get('/Ciudad', getCiudad);
router.get('/Ciudad/:nombre_ciudad', getCiudadByCod);
router.post('/Ciudad', postCiudad);
router.delete('/Ciudad/:nombre_ciudad', deleteCiudadByCod);
router.put('/Ciudad/:nombre_ciudad', updateCiudadByCod);

module.exports = router;