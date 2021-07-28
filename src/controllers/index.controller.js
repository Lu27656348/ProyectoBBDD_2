const { Pool }= require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'Lu27656348',
    database: 'PBBDD'
}

const pool = new Pool(config);

/**METODOS FUNCIONALES**/
const getServicio = async (req,res) => {
    const response = await pool.query('SELECT * FROM SERVICIO');
    res.json(response.rows);
};
const getServicioByCod = async (req,res) => {
    const codlineaaux = req.params.codlinea;
    const response = await pool.query('SELECT * FROM SERVICIO WHERE cod_servicio = $1', [codlineaaux]);
    res.json(response.rows);
};
const postServicio = async (req,res) => {
    const { nombreserv, descripcionserv, anticipacion, reserva } = req.body;
    const response = await pool.query('INSERT INTO SERVICIO (nombreserv,descripcionserv,anticipacion,reserva) VALUES ($1,$2,$3,$4)',[nombreserv,descripcionserv,anticipacion,reserva]);
};
const deleteServicioByCod = async (req,res) => {
    const codlineaaux = req.params.cod_servicio;
    const response = await pool.query('DELETE FROM SERVICIO WHERE cod_servicio = $1', [codlineaaux]);
    res.json('SERVICIO COD ${codlineaaux} DELETED');
};
const updateServicioByCod = async (req,res) => {
    const codlineaaux = req.params.cod_servicio;
    const { cod_servicio, nombreserv,descripcionserv,anticipacion,reserva } = req.body;
    const response = await pool.query('UPDATE SERVICIO SET cod_servicio = $1, nombreserv = $2, descripcionserv = $3, anticipacion = $4, reserva = $5 WHERE cod_servicio = $6', [cod_servicio,nombreserv,descripcionserv,anticipacion,reserva,codlineaaux]);
    res.json('LINEA COD ${codlineaaux} UPDATED');
};

const getCliente = async (req,res) => {
    const response = await pool.query('SELECT * FROM CLIENTE');
    res.json(response.rows);
};
const getClienteByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const response = await pool.query('SELECT * FROM CLIENTE WHERE cedula_cliente = $1', [codlineaaux]);
    res.json(response.rows);
};
const postCliente = async (req,res) => {
    const { cedula_cliente, nombre, email, frecuente, cantidadservicios } = req.body;
    const response = await pool.query('INSERT INTO CLIENTE (cedula_cliente, nombre, email, frecuente, cantidadservicios) VALUES ($1,$2,$3,$4,$5)',[cedula_cliente, nombre, email, frecuente, cantidadservicios]);
};
const deleteClienteByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const response = await pool.query('DELETE FROM CLIENTE WHERE cedula_cliente = $1', [codlineaaux]);
    res.json('CLIENTE COD ${codlineaaux} DELETED');
};
const updateClienteByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const { cedula_cliente, nombre,email,frecuente,cantidadservicios} = req.body;
    const response = await pool.query('UPDATE CLIENTE SET cedula_cliente = $1, nombre = $2, email = $3, frecuente = $4, cantidadservicios = $5 WHERE cedula_cliente = $6', [cedula_cliente, nombre,email,frecuente,cantidadservicios,codlineaaux]);
    res.json('CLIENTE COD ${codlineaaux} UPDATED');
};

const getVehiculo = async (req,res) => {
    const response = await pool.query('SELECT * FROM VEHICULO');
    res.json(response.rows);
};
const getVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const response = await pool.query('SELECT * FROM VEHICULO WHERE cod_vehiculo = $1', [codlineaaux]);
    res.json(response.rows);
};
const postVehiculo = async (req,res) => {
    const { cod_vehiculo, modelo, capacidad_tanque, placa, tiempouso, kilometraje, fecha_adquisicion,cod_tipovehiculo,cedula_cliente } = req.body;
    const response = await pool.query('INSERT INTO VEHICULO (cod_vehiculo, modelo, capacidad_tanque, placa, tiempouso, kilometraje, fecha_adquisicion,cod_tipovehiculo,cedula_cliente) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[cod_vehiculo, modelo, capacidad_tanque, placa, tiempouso, kilometraje, fecha_adquisicion,cod_tipovehiculo,cedula_cliente]);
};
const deleteVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const response = await pool.query('DELETE FROM VEHICULO WHERE cod_vehiculo = $1', [codlineaaux]);
    res.json('VEHICULO COD ${codlineaaux} DELETED');
};
const updateVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const { cod_vehiculo, modelo, capacidad_tanque, placa, tiempouso, kilometraje, fecha_adquisicion,cod_tipovehiculo,cedula_cliente} = req.body;
    const response = await pool.query('UPDATE VEHICULO SET cod_vehiculo = $1, modelo = $2, capacidad_tanque = $3, placa = $4, tiempouso = $5, kilometraje = $6, fecha_adquisicion = $7, cod_tipovehiculo = $8, cedula_cliente = $9 WHERE cod_vehiculo = $10', [ cod_vehiculo, modelo, capacidad_tanque, placa, tiempouso, kilometraje, fecha_adquisicion,cod_tipovehiculo,cedula_cliente,codlineaaux]);
    res.json('VEHICULO COD ${codlineaaux} UPDATED');
};
const getTipoVehiculo = async (req,res) => {
    const response = await pool.query('SELECT * FROM TIPOVEHICULO');
    res.json(response.rows);
};
const getTipoVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_tipovehiculo;
    const response = await pool.query('SELECT * FROM TIPOVEHICULO WHERE cod_tipovehiculo = $1', [codlineaaux]);
    res.json(response.rows);
};
const postTipoVehiculo = async (req,res) => {
    const { cod_tipovehiculo, descripcion } = req.body;
    const response = await pool.query('INSERT INTO TIPOVEHICULO (cod_tipovehiculo, descripcion) VALUES ($1,$2)',[cod_tipovehiculo, descripcion]);
};
const deleteTipoVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_tipovehiculo;
    const response = await pool.query('DELETE FROM TIPOVEHICULO WHERE cod_tipovehiculo = $1', [codlineaaux]);
    res.json('TIPOVEHICULO COD ${codlineaaux} DELETED');
};
const updateTipoVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_tipovehiculo;
    const { cod_tipovehiculo, descripcion} = req.body;
    const response = await pool.query('UPDATE TIPOVEHICULO SET cod_tipovehiculo = $1, descripcion = $2 WHERE cod_tipovehiculo = $3', [ cod_tipovehiculo,descripcion,codlineaaux]);
    res.json('VEHICULO COD ${codlineaaux} UPDATED');
};
const getCiudad = async (req,res) => {
    const response = await pool.query('SELECT * FROM CIUDAD');
    res.json(response.rows);
};
const getCiudadByCod = async (req,res) => {
    const codlineaaux = req.params.nombre_ciudad;
    const response = await pool.query('SELECT * FROM CIUDAD WHERE nombre_ciudad = $1', [codlineaaux]);
    res.json(response.rows);
};
const postCiudad = async (req,res) => {
    const { nombre_ciudad } = req.body;
    const response = await pool.query('INSERT INTO CIUDAD (nombre_ciudad) VALUES ($1)',[nombre_ciudad]);
};
const deleteCiudadByCod = async (req,res) => {
    const codlineaaux = req.params.nombre_ciudad;
    const response = await pool.query('DELETE FROM CIUDAD WHERE nombre_ciudad = $1', [codlineaaux]);
    res.json('CIUDAD COD ${codlineaaux} DELETED');
};
const updateCiudadByCod = async (req,res) => {
    const codlineaaux = req.params.nombre_ciudad;
    const { nombre_ciudad } = req.body;
    const response = await pool.query('UPDATE CIUDAD SET nombre_ciudad = $1 WHERE nombre_ciudad = $2', [ nombre_ciudad, codlineaaux]);
    res.json('CIUDAD COD ${codlineaaux} UPDATED');
};
const getActividad = async (req,res) => {
    const response = await pool.query('SELECT * FROM ACTIVIDAD');
    res.json(response.rows);
};
const postActividad = async (req,res) => {
    const { nro_consecutivo, cod_servicio, nombre, descripcion, capacidad, costo } = req.body;
    const response = await pool.query('INSERT INTO ACTIVIDAD (nro_consecutivo, cod_servicio, nombre, descripcion, capacidad, costo) VALUES ($1,$2,$3,$4,$5,$6)',[nro_consecutivo, cod_servicio, nombre, descripcion, capacidad, costo]);
    res.json(response.rows);
};
const getActividadByCod = async (req,res) => {
    const codlineaaux = req.params.nro_consecutivo;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('SELECT * FROM ACTIVIDAD WHERE nro_consecutivo = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteActividadByCod = async (req,res) => {
    const codlineaaux = req.params.nro_consecutivo;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('DELETE FROM ACTIVIDAD WHERE nro_consecutivo = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json('CIUDAD COD ${codlineaaux} DELETED');
};
const updateActividadByCod = async (req,res) => {
    const codlineaaux = req.params.nro_consecutivo;
    const codlineaauxx = req.params.cod_servicio;
    const { nro_consecutivo, cod_servicio, nombre, descripcion, capacidad, costo } = req.body;
    const response = await pool.query('UPDATE ACTIVIDAD SET nro_consecutivo = $1, cod_servicio = $2, nombre = $3, descripcion = $4, capacidad = $5, costo = $6 WHERE nro_consecutivo = $7 AND cod_servicio = $8', [ nro_consecutivo, cod_servicio, nombre, descripcion, capacidad, costo, codlineaaux, codlineaauxx]);
    res.json('CIUDAD COD ${codlineaaux} UPDATED');
}
const getLinea = async (req,res) => {
    const response = await pool.query('SELECT * FROM LINEASUMINISTRO');
    res.json(response.rows);
};
const postLinea = async (req,res) => {
    const { cod_linea, descripcion } = req.body;
    const response = await pool.query('INSERT INTO LINEASUMINISTRO (cod_linea, descripcion) VALUES ($1,$2)',[cod_linea, descripcion]);
    res.json(response.rows);
};
const getLineaByCod = async (req,res) => {
    const codlineaaux = req.params.cod_linea;
    const response = await pool.query('SELECT * FROM LINEASUMINISTRO WHERE cod_linea = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteLineaByCod = async (req,res) => {
    const codlineaaux = req.params.cod_linea;
    const response = await pool.query('DELETE FROM LINEASUMINISTRO WHERE cod_linea = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateLineaByCod = async (req,res) => {
    const codlineaaux = req.params.cod_linea;
    const { cod_linea, descripcion } = req.body;
    const response = await pool.query('UPDATE LINEASUMINISTRO SET cod_linea = $1, descripcion = $2 WHERE cod_linea = $3', [ cod_linea, descripcion, codlineaaux]);
    res.json(response.rows);
}
const getProveedor = async (req,res) => {
    const response = await pool.query('SELECT * FROM PROVEEDOR');
    res.json(response.rows);
};
const postProveedor = async (req,res) => {
    const { rif_proveedor, direccion, razonsocial, telefono, celular, nombre, cedula } = req.body;
    const response = await pool.query('INSERT INTO PROVEEDOR (rif_proveedor, direccion, razonsocial, telefono, celular, nombre, cedula) VALUES ($1,$2,$3,$4,$5,$6,$7)',[rif_proveedor, direccion, razonsocial, telefono, celular, nombre, cedula]);
    res.json(response.rows);
};
const getProveedorByCod = async (req,res) => {
    const codlineaaux = req.params.rif_proveedor;
    const response = await pool.query('SELECT * FROM PROVEEDOR WHERE rif_proveedor = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteProveedorByCod = async (req,res) => {
    const codlineaaux = req.params.rif_proveedor;
    const response = await pool.query('DELETE FROM PROVEEDOR WHERE rif_proveedor = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateProveedorByCod = async (req,res) => {
    const codlineaaux = req.params.rif_proveedor;
    const { rif_proveedor, direccion, razonsocial, telefono, celular, nombre, cedula } = req.body;
    const response = await pool.query('UPDATE PROVEEDOR SET rif_proveedor = $1, direccion = $2, razonsocial = $3, telefono = $4, celular = $5, nombre = $6, cedula = $7 WHERE rif_proveedor = $8', [ rif_proveedor, direccion, razonsocial, telefono, celular, nombre, cedula, codlineaaux]);
    res.json(response.rows);
}
/*NO FUNCIONALES*/
const getProducto = async (req,res) => {
    const response = await pool.query('SELECT * FROM PRODUCTO');
    res.json(response.rows);
};
const postProducto = async (req,res) => {
    const { cod_producto, nombrep, maximo, minimo, descripcionp, fabricante, precio, existencia, ecologico, cod_linea, rif_proveedor } = req.body;
    const response = await pool.query('INSERT INTO PRODUCTO (cod_producto, nombrep, maximo, minimo, descripcionp, fabricante, precio, existencia, ecologico, cod_linea, rif_proveedor) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[cod_producto, nombrep, maximo, minimo, descripcionp, fabricante, precio, existencia, ecologico, cod_linea, rif_proveedor]);
    res.json(response.rows);
};
const getProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const response = await pool.query('SELECT * FROM PRODUCTO WHERE cod_producto = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const response = await pool.query('DELETE FROM PRODUCTO WHERE cod_producto = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const { cod_producto, nombrep, maximo, minimo, descripcionp, fabricante, precio, existencia, ecologico, cod_linea, rif_proveedor } = req.body;
    const response = await pool.query('UPDATE PRODUCTO SET cod_producto = $1, nombrep = $2, maximo = $3, minimo = $4, descripcionp = $5, fabricante = $6, precio = $7, existencia = $8, ecologico = $9, cod_linea = $10, rif_proveedor = $11 WHERE cod_producto = $12', [ cod_producto, nombrep, maximo, minimo, descripcionp, fabricante, precio, existencia, ecologico, cod_linea, rif_proveedor, codlineaaux]);
    res.json(response.rows);
}

module.exports = {

    getActividad,
    postActividad,
    getActividadByCod,
    deleteActividadByCod,
    updateActividadByCod,
    
    getCliente,
    postCliente,
    getClienteByCod,
    deleteClienteByCod,
    updateClienteByCod,

    getProducto,
    postProducto,
    getProductoByCod,
    deleteProductoByCod,
    updateProductoByCod,

    getProveedor,
    postProveedor,
    getProveedorByCod,
    deleteProveedorByCod,
    updateProveedorByCod,

    getLinea,
    postLinea,
    getLineaByCod,
    deleteLineaByCod,
    updateLineaByCod,

    getTipoVehiculo,
    postTipoVehiculo,
    getTipoVehiculoByCod,
    deleteTipoVehiculoByCod,
    updateTipoVehiculoByCod,

    getVehiculo,
    postVehiculo,
    getVehiculoByCod,
    deleteVehiculoByCod,
    updateVehiculoByCod,

    getCiudad,
    postCiudad,
    getCiudadByCod,
    deleteCiudadByCod,
    updateCiudadByCod,

    getServicio,
    postServicio,
    getServicioByCod,
    deleteServicioByCod,
    updateServicioByCod

}