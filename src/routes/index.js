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
        getProducto, getProductoByCod, postProducto, deleteProductoByCod, updateProductoByCod} = require('../controllers/index.controller');

router.get('/Servicio', getServicio);
router.get('/Servicio/:cod_servicio', getServicioByCod);
router.post('/Servicio', postServicio);
router.delete('/Servicio/:cod_servicio', deleteServicioByCod);
router.put('/Servicio/:cod_servicio', updateServicioByCod);

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