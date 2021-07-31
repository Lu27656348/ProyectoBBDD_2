const { Pool }= require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'Lu27656348',
    database: 'PBBDD'
};

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
};

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
};

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
};

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
};

const getReservacion = async (req,res) => {
    const response = await pool.query('SELECT * FROM RESERVACION');
    res.json(response.rows);
};
const postReservacion = async (req,res) => {
    const { num_reservacion, fecha_reservacion, cedula_cliente, cod_servicio } = req.body;
    const response = await pool.query('INSERT INTO RESERVACION (num_reservacion, fecha_reservacion, cedula_cliente, cod_servicio) VALUES ($1,$2,$3,$4)',[num_reservacion, fecha_reservacion, cedula_cliente, cod_servicio]);
    res.json(response.rows);
};
const getReservacionByCod = async (req,res) => {
    const codlineaaux = req.params.num_reservacion;
    const response = await pool.query('SELECT * FROM RESERVACION WHERE num_reservacion = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteReservacionByCod = async (req,res) => {
    const codlineaaux = req.params.num_reservacion;
    const response = await pool.query('DELETE FROM RESERVACION WHERE num_reservacion = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateReservacionByCod = async (req,res) => {
    const codlineaaux = req.params.num_reservacion;
    const { num_reservacion, fecha_reservacion, cedula_cliente, cod_servicio } = req.body;
    const response = await pool.query('UPDATE RESERVACION SET num_reservacion = $1, fecha_reservacion = $2, cedula_cliente = $3, cod_servicio = $4 WHERE num_reservacion = $5', [ num_reservacion, fecha_reservacion, cedula_cliente, cod_servicio, codlineaaux]);
    res.json(response.rows);
};

const getPersonal = async (req,res) => {
    const response = await pool.query('SELECT * FROM PERSONAL');
    res.json(response.rows);
};
const postPersonal = async (req,res) => {
    const { cedulaper, nombreper, sueldo, telefonoper } = req.body;
    const response = await pool.query('INSERT INTO PERSONAL ( cedulaper, nombreper, sueldo, telefonoper ) VALUES ($1,$2,$3,$4)',[cedulaper, nombreper, sueldo, telefonoper ]);
    res.json(response.rows);
};
const getPersonalByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaper;
    const response = await pool.query('SELECT * FROM PERSONAL WHERE cedulaper = $1', [codlineaaux]);
    res.json(response.rows);
};
const deletePersonalByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaper;
    const response = await pool.query('DELETE FROM PERSONAL WHERE cedulaper = $1', [codlineaaux]);
    res.json(response.rows);
};
const updatePersonalByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaper;
    const { cedulaper, nombreper, sueldo, telefonoper } = req.body;
    const response = await pool.query('UPDATE PERSONAL SET cedulaper = $1, nombreper = $2, sueldo = $3, telefonoper = $4 WHERE cedulaper = $5', [ cedulaper, nombreper, sueldo, telefonoper, codlineaaux]);
    res.json(response.rows);
};

const getPago = async (req,res) => {
    const response = await pool.query('SELECT * FROM PAGO');
    res.json(response.rows);
};
const postPago = async (req,res) => {
    const {cedula_cliente, monto, fechapago, banco, numerot } = req.body;
    const response = await pool.query('INSERT INTO PAGO ( cedula_cliente, monto, fechapago, banco, numerot ) VALUES ($1,$2,$3,$4,$5)',[cedula_cliente, monto, fechapago, banco, numerot]);
    res.json(response.rows);
};
const getPagoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const response = await pool.query('SELECT * FROM PAGO WHERE cedula_cliente = $1', [codlineaaux]);
    res.json(response.rows);
};
const deletePagoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const response = await pool.query('DELETE FROM PAGO WHERE cedula_cliente = $1', [codlineaaux]);
    res.json(response.rows);
};
const updatePagoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const { cedula_cliente, monto, fechapago, banco, numerot } = req.body;
    const response = await pool.query('UPDATE PAGO SET cedula_cliente = $1, monto = $2, fechapago = $3, banco = $4, numerot = $5 WHERE cedula_cliente = $6', [ cedula_cliente, monto, fechapago, banco, numerot, codlineaaux]);
    res.json(response.rows);
};

const getOrdencompra = async (req,res) => {
    const response = await pool.query('SELECT * FROM ORDENCOMPRA');
    res.json(response.rows);
};
const postOrdencompra = async (req,res) => {
    const { cod_orden, fechaorden, rif_proveedor } = req.body;
    const response = await pool.query('INSERT INTO ORDENCOMPRA ( cod_orden, fechaorden, rif_proveedor ) VALUES ($1,$2,$3)',[cod_orden, fechaorden, rif_proveedor]);
    res.json(response.rows);
};
const getOrdencompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_orden;
    const response = await pool.query('SELECT * FROM ORDENCOMPRA WHERE cod_orden = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteOrdencompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_orden;
    const response = await pool.query('DELETE FROM ORDENCOMPRA WHERE cod_orden = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateOrdencompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_orden;
    const { cod_orden, fechaorden, rif_proveedor } = req.body;
    const response = await pool.query('UPDATE ORDENCOMPRA SET cod_orden = $1, fechaorden = $2, rif_proveedor = $3 WHERE cod_orden = $4', [ cod_orden, fechaorden, rif_proveedor, codlineaaux]);
    res.json(response.rows);
};

const getLocales = async (req,res) => {
    const response = await pool.query('SELECT * FROM LOCALES');
    res.json(response.rows);
};
const postLocales = async (req,res) => {
    const { riflocal, nombre, direccion, fechainventario, fecha_encargado, encargado, nombre_ciudad } = req.body;
    const response = await pool.query('INSERT INTO LOCALES ( riflocal, nombre, direccion, fechainventario, fecha_encargado, encargado, nombre_ciudad ) VALUES ($1,$2,$3,$4,$5,$6,$7)',[riflocal, nombre, direccion, fechainventario, fecha_encargado, encargado, nombre_ciudad]);
    res.json(response.rows);
};
const getLocalesByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const response = await pool.query('SELECT * FROM LOCALES WHERE riflocal = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteLocalesByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const response = await pool.query('DELETE FROM LOCALES WHERE riflocal = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateLocalesByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const { riflocal, nombre, direccion, fechainventario, fecha_encargado, encargado, nombre_ciudad } = req.body;
    const response = await pool.query('UPDATE LOCALES SET riflocal = $1, nombre = $2, direccion = $3, fechainventario = $4, fecha_encargado = $5, encargado = $6, nombre_ciudad = $7 WHERE riflocal = $8', [ riflocal, nombre, direccion, fechainventario, fecha_encargado, encargado, nombre_ciudad, codlineaaux]);
    res.json(response.rows);
};

const getOfrece= async (req,res) => {
    const response = await pool.query('SELECT * FROM OFRECE');
    res.json(response.rows);
};
const postOfrece = async (req,res) => {
    const { riflocal, cod_servicio } = req.body;
    const response = await pool.query('INSERT INTO OFRECE ( riflocal, cod_servicio ) VALUES ($1,$2)',[riflocal, cod_servicio]);
    res.json(response.rows);
};
const getOfreceByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('SELECT * FROM OFRECE WHERE riflocal = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteOfreceByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('DELETE FROM OFRECE WHERE riflocal = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateOfreceByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const codlineaauxx = req.params.cod_servicio;
    const { riflocal, cod_servicio } = req.body;
    const response = await pool.query('UPDATE OFRECE SET riflocal = $1, cod_servicio = $2 WHERE riflocal = $3 AND cod_servicio = $4', [ riflocal, cod_servicio, codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

const getFichaServicio= async (req,res) => {
    const response = await pool.query('SELECT * FROM FICHASERVICIO');
    res.json(response.rows);
};
const postFichaServicio = async (req,res) => {
    const { num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, cedulaaut, nombreaut, personadistinta, cedula_cliente, cod_vehiculo } = req.body;
    const response = await pool.query('INSERT INTO FICHASERVICIO ( num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, cedulaaut, nombreaut, personadistinta, cedula_cliente, cod_vehiculo ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, cedulaaut, nombreaut, personadistinta, cedula_cliente, cod_vehiculo]);
    res.json(response.rows);
};
const getFichaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const response = await pool.query('SELECT * FROM FICHASERVICIO WHERE num_unico = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteFichaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const response = await pool.query('DELETE FROM FICHASERVICIO WHERE num_unico = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateFichaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const { num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, cedulaaut, nombreaut, personadistinta, cedula_cliente, cod_vehiculo } = req.body;
    const response = await pool.query('UPDATE FICHASERVICIO SET num_unico = $1, fechaent = $2, horaent = $3, fechaest = $4, horaest = $5, fechareal = $6, horareal = $7, cedulaaut = $8, nombreaut = $9, personadistinta = $10, cedula_cliente = $11, cod_vehiculo = $12 WHERE num_unico = $13', [ num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, cedulaaut, nombreaut, personadistinta, cedula_cliente, cod_vehiculo, codlineaaux]);
    res.json(response.rows);
};

const getCompraProducto= async (req,res) => {
    const response = await pool.query('SELECT * FROM COMPRAPRODUCTO');
    res.json(response.rows);
};
const postCompraProducto = async (req,res) => {
    const { cod_producto, cedula_cliente, cantidad, monto } = req.body;
    const response = await pool.query('INSERT INTO COMPRAPRODUCTO ( cod_producto, cedula_cliente, cantidad, monto  ) VALUES ($1,$2,$3,$4)',[cod_producto, cedula_cliente, cantidad, monto ]);
    res.json(response.rows);
};
const getCompraProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const codlineaauxx = req.params.cedula_cliente;
    const response = await pool.query('SELECT * FROM COMPRAPRODUCTO WHERE cod_producto = $1 AND cedula_cliente = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteCompraProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const codlineaauxx = req.params.cedula_cliente;
    const response = await pool.query('DELETE FROM COMPRAPRODUCTO WHERE cod_producto = $1 AND cedula_cliente = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateCompraProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const codlineaauxx = req.params.cedula_cliente;
    const { cod_producto, cedula_cliente, cantidad, monto } = req.body;
    const response = await pool.query('UPDATE COMPRAPRODUCTO SET cod_producto = $1, cedula_cliente = $2, cantidad = $3, monto = $4 WHERE cod_producto = $5 AND cedula_cliente = $6', [ cod_producto, cedula_cliente, cantidad, monto, codlineaaux,codlineaauxx ]);
    res.json(response.rows);
};

const getConsume= async (req,res) => {
    const response = await pool.query('SELECT * FROM CONSUME');
    res.json(response.rows);
};
const postConsume = async (req,res) => {
    const { cedula_personal, cod_producto, nro_consecutivo, cod_servicio } = req.body;
    const response = await pool.query('INSERT INTO CONSUME ( cedula_personal, cod_producto, nro_consecutivo, cod_servicio  ) VALUES ($1,$2,$3,$4)',[cedula_personal, cod_producto, nro_consecutivo, cod_servicio ]);
    res.json(response.rows);
};
const getConsumeByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_personal;
    const codlineaauxx = req.params.cod_producto;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_servicio;
    const response = await pool.query('SELECT * FROM COMPRAPRODUCTO WHERE cedula_personal = $1 AND cod_producto = $2 AND nro_consecutivo = $3 AND cod_servicio = $4', [codlineaaux,codlineaauxx,codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};
const deleteConsumeByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_personal;
    const codlineaauxx = req.params.cod_producto;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_servicio;
    const response = await pool.query('DELETE FROM CONSUME WHERE cedula_personal = $1 AND cod_producto = $2 AND nro_consecutivo = $3 AND cod_servicio = $4', [codlineaaux,codlineaauxx,codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};
const updateConsumeByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_personal;
    const codlineaauxx = req.params.cod_producto;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_servicio;
    const { cedula_personal, cod_producto, nro_consecutivo, cod_servicio } = req.body;
    const response = await pool.query('UPDATE CONSUME SET cedula_personal = $1, cod_producto = $2, nro_consecutivo = $3, cod_servicio = $4 WHERE cedula_personal = $5 AND cod_producto = $6 AND nro_consecutivo = $7 AND cod_servicio = $8', [ cedula_personal, cod_producto, nro_consecutivo, cod_servicio, codlineaaux,codlineaauxx,codlineaauxxx,codlineaauxxxx ]);
    res.json(response.rows);
};

const getContiene= async (req,res) => {
    const response = await pool.query('SELECT * FROM CONTIENE');
    res.json(response.rows);
};
const postContiene = async (req,res) => {
    const { cod_orden, cod_producto, cantidad, precio } = req.body;
    const response = await pool.query('INSERT INTO CONTIENE (  cod_orden, cod_producto, cantidad, precio  ) VALUES ($1,$2,$3,$4)',[ cod_orden, cod_producto, cantidad, precio ]);
    res.json(response.rows);
};
const getContieneByCod = async (req,res) => {
    const codlineaaux = req.params.cod_orden;
    const codlineaauxx = req.params.cod_producto;
    const response = await pool.query('SELECT * FROM CONTIENE WHERE cod_orden = $1 AND cod_producto = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteContieneByCod = async (req,res) => {
    const codlineaaux = req.params.cod_orden;
    const codlineaauxx = req.params.cod_producto;
    const response = await pool.query('DELETE FROM CONTIENE WHERE cod_orden = $1 AND cod_producto = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateContieneByCod = async (req,res) => {
    const codlineaaux = req.params.cod_orden;
    const codlineaauxx = req.params.cod_producto;
    const { cod_orden, cod_producto, cantidad, precio } = req.body;
    const response = await pool.query('UPDATE CONTIENE SET cod_orden = $1, cod_producto = $2, cantidad = $3, precio = $4 WHERE cod_orden = $5 AND cod_producto = $6', [ cod_orden, cod_producto, cantidad, precio , codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

const getFacturaServicio= async (req,res) => {
    const response = await pool.query('SELECT * FROM FACTURASERVICIO');
    res.json(response.rows);
};
const postFacturaServicio = async (req,res) => {
    const { cod_facturas, montototal, ficha } = req.body;
    const response = await pool.query('INSERT INTO FACTURASERVICIO (  cod_facturas, montototal, ficha  ) VALUES ($1,$2,$3)',[ cod_facturas, montototal, ficha ]);
    res.json(response.rows);
};
const getFacturaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturas;
    const response = await pool.query('SELECT * FROM FACTURASERVICIO WHERE cod_facturas = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteFacturaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturas;
    const response = await pool.query('DELETE FROM FACTURASERVICIO WHERE cod_facturas = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateFacturaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturas;
    const { cod_facturas, montototal, ficha } = req.body;
    const response = await pool.query('UPDATE FACTURASERVICIO SET cod_facturas = $1, montototal = $2, ficha = $3 WHERE cod_facturas = $4', [ cod_facturas, montototal, ficha, codlineaaux]);
    res.json(response.rows);
};

const getFacturaProveedor= async (req,res) => {
    const response = await pool.query('SELECT * FROM FACTURAPROVEEDOR');
    res.json(response.rows);
};
const postFacturaProveedor = async (req,res) => {
    const { cod_facturap, fechafacturap, ordencompra } = req.body;
    const response = await pool.query('INSERT INTO FACTURAPROVEEDOR (  cod_facturap, fechafacturap, ordencompra  ) VALUES ($1,$2,$3)',[ cod_facturap, fechafacturap, ordencompra ]);
    res.json(response.rows);
};
const getFacturaProveedorByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const response = await pool.query('SELECT * FROM FACTURAPROVEEDOR WHERE cod_facturap = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteFacturaProveedorByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const response = await pool.query('DELETE FROM FACTURAPROVEEDOR WHERE cod_facturap = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateFacturaProveedorByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const { cod_facturap, fechafacturap, ordencompra } = req.body;
    const response = await pool.query('UPDATE FACTURAPROVEEDOR SET cod_facturap = $1, fechafacturap = $2, ordencompra = $3 WHERE cod_facturap = $4', [ cod_facturap, fechafacturap, ordencompra, codlineaaux]);
    res.json(response.rows);
};
/*NO FUNCIONALES*/

const getAjusteProducto= async (req,res) => {
    const response = await pool.query('SELECT * FROM AJUSTEPRODUCTO');
    res.json(response.rows);
};
const postAjusteProducto = async (req,res) => {
    const {  } = req.body;
    const response = await pool.query('INSERT INTO AJUSTEPRODUCTO (  cod_facturap, fechafacturap, ordencompra  ) VALUES ($1,$2,$3)',[ cod_facturap, fechafacturap, ordencompra ]);
    res.json(response.rows);
};
const getAjusteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const response = await pool.query('SELECT * FROM AJUSTEPRODUCTO WHERE cod_facturap = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteAjusteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const response = await pool.query('DELETE FROM AJUSTEPRODUCTO WHERE cod_facturap = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateAjusteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const { cod_facturap, fechafacturap, ordencompra } = req.body;
    const response = await pool.query('UPDATE AJUSTEPRODUCTO SET cod_facturap = $1, fechafacturap = $2, ordencompra = $3 WHERE cod_facturap = $4', [ cod_facturap, fechafacturap, ordencompra, codlineaaux]);
    res.json(response.rows);
};

const getAsignado= async (req,res) => {
    const response = await pool.query('SELECT * FROM ASIGNADO');
    res.json(response.rows);
};
const postAsignado = async (req,res) => {
    const { cedula_personal, cod_servicio } = req.body;
    const response = await pool.query('INSERT INTO ASIGNADO (  cedula_personal, cod_servicio  ) VALUES ($1,$2)',[ cedula_personal, cod_servicio ]);
    res.json(response.rows);
};
const getAsignadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_personal;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('SELECT * FROM ASIGNADO WHERE cedula_personal = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteAsignadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_personal;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('DELETE FROM ASIGNADO WHERE cod_facturap = $1 AND ', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateAsignadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_personal;
    const codlineaauxx = req.params.cod_servicio;
    const { cedula_personal, cod_servicio } = req.body;
    const response = await pool.query('UPDATE ASIGNADO SET cedula_personal = $1, cod_servicio = $2 WHERE cedula_personal = $3 AND cod_servicio = $4', [ cedula_personal, cod_servicio, codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
module.exports = {

    getOfrece,
    postOfrece,
    getOfreceByCod,
    deleteOfreceByCod,
    updateOfreceByCod,

    getAsignado,
    postAsignado,
    getAsignadoByCod,
    deleteAsignadoByCod,
    updateAsignadoByCod,

    getFacturaProveedor,
    postFacturaProveedor,
    getFacturaProveedorByCod,
    deleteFacturaProveedorByCod,
    updateFacturaProveedorByCod,

    getFacturaServicio,
    postFacturaServicio,
    getFacturaServicioByCod,
    deleteFacturaServicioByCod,
    updateFacturaServicioByCod,

    getContiene,
    postContiene,
    getContieneByCod,
    deleteContieneByCod,
    updateContieneByCod,

    getConsume,
    postConsume,
    getConsumeByCod,
    deleteConsumeByCod,
    updateConsumeByCod,

    getCompraProducto,
    postCompraProducto,
    getCompraProductoByCod,
    deleteCompraProductoByCod,
    updateCompraProductoByCod,

    getFichaServicio,
    postFichaServicio,
    getFichaServicioByCod,
    deleteFichaServicioByCod,
    updateFichaServicioByCod,

    getActividad,
    postActividad,
    getActividadByCod,
    deleteActividadByCod,
    updateActividadByCod,

    getLocales,
    postLocales,
    getLocalesByCod,
    deleteLocalesByCod,
    updateLocalesByCod,

    getOrdencompra,
    postOrdencompra,
    getOrdencompraByCod,
    deleteOrdencompraByCod,
    updateOrdencompraByCod,

    getPago,
    postPago,
    getPagoByCod,
    deletePagoByCod,
    updatePagoByCod,

    getReservacion,
    postReservacion,
    getReservacionByCod,
    deleteReservacionByCod,
    updateReservacionByCod,

    getPersonal,
    postPersonal,
    getPersonalByCod,
    deletePersonalByCod,
    updatePersonalByCod,
    
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