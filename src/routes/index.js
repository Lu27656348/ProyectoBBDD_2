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
        getNecesita, getNecesitaByCod, postNecesita, deleteNecesitaByCod, updateNecesitaByCod,
        getPersonaAsociada, getPersonaAsociadaByCod, postPersonaAsociada, deletePersonaAsociadaByCod, updatePersonaAsociadaByCod,
        getAutorizado, getAutorizadoByCod, postAutorizado, deleteAutorizadoByCod, updateAutorizadoByCod,
        getMecanico, getMecanicoByCod, postMecanico, deleteMecanicoByCod, updateMecanicoByCod,
        getMantenimiento, getMantenimientoByCod, postMantenimiento, deleteMantenimientoByCod, updateMantenimientoByCod,
        getEmite,getEmiteByCod, postEmite, deleteEmiteByCod, updateEmiteByCod,
        getFacturaCompra, getFacturaCompraByCod, postFacturaCompra, deleteFacturaCompraByCod, updateFacturaCompraByCod,
        getDetalleCompra, getDetalleCompraByCod, postDetalleCompra, deleteDetalleCompraByCod, updateDetalleCompraByCod,
        getVehiculoobyCliente} = require('../controllers/index.controller');

router.get('/Cliente/:cedula_cliente/Vehiculo', getVehiculoobyCliente);

router.get('/Mantenimiento', getMantenimiento);
router.get('/Vehiculo/:cod_vehiculo/Mantenimiento/:fecha_mantenimiento', getMantenimientoByCod);
router.post('/Vehiculo/:cod_vehiculo/Mantenimiento/:fecha_mantenimiento', postMantenimiento);
router.delete('/Vehiculo/:cod_vehiculo/Mantenimiento/:fecha_mantenimiento', deleteMantenimientoByCod);
router.put('/Vehiculo/:cod_vehiculo/Mantenimiento/:fecha_mantenimiento', updateMantenimientoByCod);

router.get('/Emite', getEmite);
router.get('/Locales/:riflocal/FacturaCompra/:cod_facturac/Cliente/:cedula_cliente', getEmiteByCod);
router.post('/Locales/:riflocal/FacturaCompra/:cod_facturac/Cliente/:cedula_cliente', postEmite);
router.delete('/Locales/:riflocal/FacturaCompra/:cod_facturac/Cliente/:cedula_cliente', deleteEmiteByCod);
router.put('/Locales/:riflocal/FacturaCompra/:cod_facturac/Cliente/:cedula_cliente', updateEmiteByCod);

router.get('/Mecanico', getMecanico);
router.get('/Vehiculo/:cod_vehiculo/Mecanico/:telefono', getMecanicoByCod);
router.post('/Vehiculo/:cod_vehiculo/Mecanico/:telefono', postMecanico);
router.delete('/Vehiculo/:cod_vehiculo/Mecanico/:telefono', deleteMecanicoByCod);
router.put('/Vehiculo/:cod_vehiculo/Mecanico/:telefono', updateMecanicoByCod);

router.get('/DetalleCompra', getDetalleCompra);
router.get('/FacturaCompra/:cod_facturac/Productos/:cod_producto', getDetalleCompraByCod);
router.post('/FacturaCompra/:cod_facturac/Productos/:cod_producto', postDetalleCompra);
router.delete('/FacturaCompra/:cod_facturac/Productos/:cod_producto', deleteDetalleCompraByCod);
router.put('/FacturaCompra/:cod_facturac/Productos/:cod_producto', updateDetalleCompraByCod);

router.get('/Necesita', getNecesita);
router.get('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', getNecesitaByCod);
router.post('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', postNecesita);
router.delete('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', deleteNecesitaByCod);
router.put('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', updateNecesitaByCod);

router.get('/DetalleOrden', getDetalleOrden);
router.get('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo', getDetalleOrdenByCod);
router.post('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo', postDetalleOrden);
router.delete('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo', deleteDetalleOrdenByCod);
router.put('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo', updateDetalleOrdenByCod);

router.get('/Autorizado', getAutorizado);
router.get('/Autorizado/:cedulaaut', getAutorizadoByCod);
router.post('/Autorizado', postAutorizado);
router.delete('/Autorizado/:cedulaaut', deleteAutorizadoByCod);
router.put('/Autorizado/:cedulaaut', updateAutorizadoByCod);

router.get('/FacturaCompra', getFacturaCompra);
router.get('/FacturaCompra/:cod_facturac', getFacturaCompraByCod);
router.post('/FacturaCompra', postFacturaCompra);
router.delete('/FacturaCompra/:cod_facturac', deleteFacturaCompraByCod);
router.put('/FacturaCompra/:cod_facturac', updateFacturaCompraByCod);

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

router.get('/PersonaAsociada', getPersonaAsociada);
router.get('/PersonaAsociada/:cedulacontacto', getPersonaAsociadaByCod);
router.post('/PersonaAsociada', postPersonaAsociada);
router.delete('/PersonaAsociada/:cedulacontacto', deletePersonaAsociadaByCod);
router.put('/PersonaAsociada/:cedulacontacto', updatePersonaAsociadaByCod);

router.get('/AjusteProducto', getAjusteProducto);
router.get('/AjusteProducto/:cod_producto', getAjusteProductoByCod);
router.post('/AjusteProducto', postAjusteProducto);
router.delete('/AjusteProducto/:cod_producto', deleteAjusteProductoByCod);
router.put('/AjusteProducto/:cod_producto', updateAjusteProductoByCod);

router.get('/Asignado', getAsignado);
router.get('/Personal/:cedulaper/Servicio/:cod_servicio', getAsignadoByCod);
router.post('/Personal/:cedulaper/Servicio/:cod_servicio', postAsignado);
router.delete('/Personal/:cedulaper/Servicio/:cod_servicio', deleteAsignadoByCod);
router.put('/Personal/:cedulaper/Servicio/:cod_servicio', updateAsignadoByCod);

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
router.get('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', getConsumeByCod);
router.post('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', postConsume);
router.delete('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', deleteConsumeByCod);
router.put('/FichaServicio/:num_unico/Servicio/:cod_servicio/Actividad/:nro_consecutivo/Producto/:cod_producto', updateConsumeByCod);

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
router.get('/Pago/:cedula_cliente/Numero/:num_pago', getPagoByCod);
router.post('/Pago/:cedula_cliente/Numero/:num_pago', postPago);
router.delete('/Pago/:cedula_cliente/Numero/:num_pago', deletePagoByCod);
router.put('/Pago/:cedula_cliente/Numero/:num_pago', updatePagoByCod);

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