const { Pool }= require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'Lu27656348',
    database: 'PBBDDFINAL'
};

const pool = new Pool(config);

/**METODOS FUNCIONALES**/
const getVehiculoobyCliente = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    console.log(codlineaaux);
    const response = await pool.query('SELECT Veh.* FROM VEHICULO Veh WHERE Veh.cedula_cliente = $1', [codlineaaux]);
    res.json(response.rows);
};

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
    const { cedula_cliente, nombrecliente, email, frecuente, cantidadservicios } = req.body;
    const response = await pool.query('INSERT INTO CLIENTE (cedula_cliente, nombrecliente, email, frecuente, cantidadservicios) VALUES ($1,$2,$3,$4,$5)',[cedula_cliente, nombrecliente, email, frecuente, cantidadservicios]);
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
    const { cedulaper, nombreper,direccion, sueldo, telefonoper } = req.body;
    const response = await pool.query('INSERT INTO PERSONAL ( cedulaper, nombreper,direccion, sueldo, telefonoper ) VALUES ($1,$2,$3,$4,$5)',[cedulaper, nombreper, direccion, sueldo, telefonoper ]);
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
    const { cedulaper, nombreper, direccion,sueldo, telefonoper } = req.body;
    const response = await pool.query('UPDATE PERSONAL SET cedulaper = $1, nombreper = $2, direccion = $3, sueldo = $4, telefonoper = $5 WHERE cedulaper = $6', [ cedulaper, nombreper,direccion, sueldo, telefonoper, codlineaaux]);
    res.json(response.rows);
};

const getPago = async (req,res) => {
    const response = await pool.query('SELECT * FROM PAGO');
    res.json(response.rows);
};
const postPago = async (req,res) => {
    const {cedula_cliente,num_pago, fechapago, numerot,banco,monto } = req.body;
    const response = await pool.query('INSERT INTO PAGO ( cedula_cliente,num_pago, fechapago, numerot,banco,monto ) VALUES ($1,$2,$3,$4,$5,$6)',[cedula_cliente,num_pago, fechapago, numerot,banco,monto]);
    res.json(response.rows);
};
const getPagoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const codlineaauxx = req.params.num_pago;
    const response = await pool.query('SELECT * FROM PAGO WHERE cedula_cliente = $1 AND num_pago = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deletePagoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const codlineaauxx = req.params.num_pago;
    const response = await pool.query('DELETE FROM PAGO WHERE cedula_cliente = $1 AND num_pago = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updatePagoByCod = async (req,res) => {
    const codlineaaux = req.params.cedula_cliente;
    const codlineaauxx = req.params.num_pago;
    const { cedula_cliente,num_pago, fechapago, numerot,banco,monto} = req.body;
    const response = await pool.query('UPDATE PAGO SET cedula_cliente = $1, num_pago = $2, fechapago = $3, numerot = $4, banco = $5, monto = $6 WHERE cedula_cliente = $7 AND num_pago = $8', [ cedula_cliente,num_pago, fechapago, numerot,banco,monto, codlineaaux,codlineaauxx ]);
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
    const { num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, personadistinta,cedulaaut, cedula_cliente, cod_vehiculo, cod_servicio } = req.body;
    const response = await pool.query('INSERT INTO FICHASERVICIO ( num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, personadistinta,cedulaaut, cedula_cliente, cod_vehiculo,cod_servicio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, personadistinta,cedulaaut, cedula_cliente, cod_vehiculo,cod_servicio]);
    res.json(response.rows);
};
const getFichaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const response = await pool.query('SELECT * FROM FICHASERVICIO WHERE num_unico = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteFichaServicioByCod = async (req,res) => {
    console.log('Estoy en DELETE FICHA');
    console.log('BORRANDO LA FICHA CON EL ID');
    console.log(req.params.num_unico);
    const codlineaaux = req.params.num_unico;
    const response = await pool.query('DELETE FROM FICHASERVICIO WHERE num_unico = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateFichaServicioByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const { num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, personadistinta,cedulaaut, cedula_cliente, cod_vehiculo,cod_servicio } = req.body;
    const response = await pool.query('UPDATE FICHASERVICIO SET num_unico = $1, fechaent = $2, horaent = $3, fechaest = $4, horaest = $5, fechareal = $6, horareal = $7, personadistinta = $8, cedulaaut = $9, cedula_cliente = $10, cod_vehiculo = $11, cod_servicio = $12 WHERE num_unico = $13', [ num_unico, fechaent, horaent, fechaest, horaest, fechareal, horareal, personadistinta,cedulaaut, cedula_cliente, cod_vehiculo,cod_servicio, codlineaaux]);
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
    const response = await pool.query('SELECT * FROM REQUIERE');
    res.json(response.rows);
};
const postConsume = async (req,res) => {
    const { num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto } = req.body;
    const response = await pool.query('INSERT INTO REQUIERE (  num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto   ) VALUES ($1,$2,$3,$4,$5,$6)',[ num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto  ]);
    res.json(response.rows);
};
const getConsumeByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_producto;
    const response = await pool.query('SELECT * FROM REQUIERE WHERE num_unico = $1 AND cod_servicio = $2 AND nro_consecutivo = $3 AND cod_producto = $4', [codlineaaux,codlineaauxx,codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};
const deleteConsumeByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_producto;
    const response = await pool.query('DELETE FROM REQUIERE WHERE num_unico = $1 AND cod_servicio = $2 AND nro_consecutivo = $3 AND cod_producto = $4', [codlineaaux,codlineaauxx,codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};
const updateConsumeByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_producto;
    const { num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto } = req.body;
    const response = await pool.query('UPDATE REQUIERE SET num_unico = $1, cod_servicio = $2, nro_consecutivo = $3, cod_servicio = $4, cantidad = $5, monto = $6 WHERE num_unico = $7 AND cod_servicio = $8 AND nro_consecutivo = $9 AND cod_producto = $10', [ num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto, codlineaaux,codlineaauxx,codlineaauxxx,codlineaauxxxx ]);
    res.json(response.rows);
};

const getContiene= async (req,res) => {
    const response = await pool.query('SELECT * FROM CONTIENE');
    res.json(response.rows);
};
const postContiene = async (req,res) => {
    const { cod_orden, cod_producto, cantidad, monto } = req.body;
    const response = await pool.query('INSERT INTO CONTIENE (  cod_orden, cod_producto, cantidad, monto  ) VALUES ($1,$2,$3,$4)',[ cod_orden, cod_producto, cantidad, monto ]);
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
    const { cod_orden, cod_producto, cantidad, monto } = req.body;
    const response = await pool.query('UPDATE CONTIENE SET cod_orden = $1, cod_producto = $2, cantidad = $3, monto = $4 WHERE cod_orden = $5 AND cod_producto = $6', [ cod_orden, cod_producto, cantidad, monto , codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

const getFacturaServicio= async (req,res) => {
    const response = await pool.query('SELECT * FROM FACTURASERVICIO');
    res.json(response.rows);
};
const postFacturaServicio = async (req,res) => {
    const { cod_facturas, montototal, descuento, num_unico } = req.body;
    const response = await pool.query('INSERT INTO FACTURASERVICIO (  cod_facturas, montototal, descuento, num_unico  ) VALUES ($1,$2,$3,$4)',[ cod_facturas, montototal, descuento, num_unico ]);
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
    const { cod_facturas, montototal, descuento, num_unico } = req.body;
    const response = await pool.query('UPDATE FACTURASERVICIO SET cod_facturas = $1, montototal = $2,descuento = $3, num_unico = $4 WHERE cod_facturas = $5', [ cod_facturas, montototal, descuento, num_unico, codlineaaux]);
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

const getAjusteProducto= async (req,res) => {
    const response = await pool.query('SELECT * FROM AJUSTEPRODUCTO');
    res.json(response.rows);
};
const postAjusteProducto = async (req,res) => {
    const { cod_producto, fechaajuste, cantidad, tipodiferencia } = req.body;
    const response = await pool.query('INSERT INTO AJUSTEPRODUCTO (  cod_producto, fechaajuste, cantidad, tipodiferencia   ) VALUES ($1,$2,$3,$4)',[ cod_producto, fechaajuste, cantidad, tipodiferencia  ]);
    res.json(response.rows);
};
const getAjusteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const response = await pool.query('SELECT * FROM AJUSTEPRODUCTO WHERE cod_producto = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteAjusteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturap;
    const response = await pool.query('DELETE FROM AJUSTEPRODUCTO WHERE cod_producto = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateAjusteProductoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_producto;
    const { cod_producto, fechaajuste, cantidad, tipodiferencia } = req.body;
    const response = await pool.query('UPDATE AJUSTEPRODUCTO SET cod_producto = $1, fechaajuste = $2, cantidad = $3, tipodiferencia = $4 WHERE cod_facturap = $4', [ cod_producto, fechaajuste, cantidad, tipodiferencia, codlineaaux]);
    res.json(response.rows);
};

const getAsignado= async (req,res) => {
    const response = await pool.query('SELECT * FROM ASIGNADO');
    res.json(response.rows);
};
const postAsignado = async (req,res) => {
    const { cedulaper, cod_servicio } = req.body;
    const response = await pool.query('INSERT INTO ASIGNADO (  cedulaper, cod_servicio  ) VALUES ($1,$2)',[ cedulaper, cod_servicio ]);
    res.json(response.rows);
};
const getAsignadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaper;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('SELECT * FROM ASIGNADO WHERE cedulaper = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteAsignadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaper;
    const codlineaauxx = req.params.cod_servicio;
    const response = await pool.query('DELETE FROM ASIGNADO WHERE cedulaper = $1 AND cod_servicio = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateAsignadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaper;
    const codlineaauxx = req.params.cod_servicio;
    const { cedulaper, cod_servicio } = req.body;
    const response = await pool.query('UPDATE ASIGNADO SET cedulaper = $1, cod_servicio = $2 WHERE cedulaper = $3 AND cod_servicio = $4', [ cedulaper, cod_servicio, codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

const getMarcaVehiculo= async (req,res) => {
    const response = await pool.query('SELECT * FROM MARCAVEHICULO');
    res.json(response.rows);
};
const postMarcaVehiculo = async (req,res) => {
    const { nombremarca, aceitecaja, descripcion, cantidadp,refrigerante, octanaje } = req.body;
    const response = await pool.query('INSERT INTO MARCAVEHICULO (  nombremarca, aceitecaja, descripcion, cantidadp,refrigerante, octanaje   ) VALUES ($1,$2,$3,$4,$5,$6)',[ nombremarca, aceitecaja, descripcion, cantidadp,refrigerante, octanaje ]);
    res.json(response.rows);
};
const getMarcaVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.nombremarca;
    const response = await pool.query('SELECT * FROM MARCAVEHICULO WHERE nombremarca = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteMarcaVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.nombremarca;
    const response = await pool.query('DELETE FROM MARCAVEHICULO WHERE nombremarca = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateMarcaVehiculoByCod = async (req,res) => {
    const codlineaaux = req.params.nombremarca;
    const { nombremarca, aceitecaja, descripcion, cantidadp,refrigerante, octanaje } = req.body;
    const response = await pool.query('UPDATE MARCAVEHICULO SET nombremarca = $1, aceitecaja = $2, descripcion = $3, aceitecaja = $4, descripcion = $5, aceitecaja = $6 WHERE nombremarca = $7', [ nombremarca, aceitecaja, descripcion, cantidadp,refrigerante, octanaje, codlineaaux]);
    res.json(response.rows);
};

const getDetalleOrden= async (req,res) => {
    const response = await pool.query('SELECT * FROM DETALLEORDEN');
    res.json(response.rows);
};
const postDetalleOrden = async (req,res) => {
    const { num_unico,cod_servicio, nro_consecutivo, costomanoobra } = req.body;
    const response = await pool.query('INSERT INTO DETALLEORDEN (  num_unico,cod_servicio, nro_consecutivo, costomanoobra   ) VALUES ($1,$2,$3,$4)',[num_unico, cod_servicio, nro_consecutivo, costomanoobra ]);
    res.json(response.rows);
};
const getDetalleOrdenByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const response = await pool.query('SELECT * FROM DETALLEORDEN WHERE num_unico = $1 AND cod_servicio = $2 AND nro_consecutivo = $3', [codlineaaux,codlineaauxx,codlineaauxxx]);
    res.json(response.rows);
};
const deleteDetalleOrdenByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
     const codlineaauxxx = req.params.nro_consecutivo;
    const response = await pool.query('DELETE FROM DETALLEORDEN WHERE num_unico = $1 AND cod_servicio = $2 AND nro_consecutivo = $3', [codlineaaux,codlineaauxx,codlineaauxxx]);
    res.json(response.rows);
};
const updateDetalleOrdenByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const { num_unico,cod_servicio, nro_consecutivo, costomanoobra } = req.body;
    const response = await pool.query('UPDATE DETALLEORDEN SET num_unico = $1, cod_servicio = $2, nro_consecutivo = $3, costomanoobra = $4 WHERE num_unico = $5 AND cod_servicio = $6 AND nro_consecutivo = $7', [  num_unico, cod_servicio, nro_consecutivo, costomanoobra,codlineaaux,codlineaauxx, codlineaauxxx]);
    res.json(response.rows);
};

const getNecesita= async (req,res) => {
    const response = await pool.query('SELECT * FROM REQUIERE');
    res.json(response.rows);
};
const postNecesita = async (req,res) => {
    const { num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto } = req.body;
    const response = await pool.query('INSERT INTO REQUIERE (  num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto   ) VALUES ($1,$2,$3,$4,$5,$6)',[  num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto ]);
    res.json(response.rows);
};
const getNecesitaByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_producto;
    const response = await pool.query('SELECT * FROM REQUIERE WHERE num_unico = $1 AND cod_servicio = $2, nro_consecutivo = $3 AND cod_producto = $4', [codlineaaux,codlineaauxx, codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};
const deleteNecesitaByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_producto;
    const response = await pool.query('DELETE FROM NECESITA REQUIERE num_unico = $1 AND cod_servicio = $2 AND nro_consecutivo = $3 AND cod_producto = $4', [codlineaaux,codlineaauxx, codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};
const updateNecesitaByCod = async (req,res) => {
    const codlineaaux = req.params.num_unico;
    const codlineaauxx = req.params.cod_servicio;
    const codlineaauxxx = req.params.nro_consecutivo;
    const codlineaauxxxx = req.params.cod_producto;
    const { num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto } = req.body;
    const response = await pool.query('UPDATE REQUIERE SET num_unico = $1, cod_servicio = $2, nro_consecutivo = $3,cod_producto = $4, cantidad=$5, monto = $6 WHERE num_unico =$7 AND cod_servicio = $8 AND nro_consecutivo = $9 AND cod_producto = $10', [  num_unico, cod_servicio, nro_consecutivo, cod_producto, cantidad, monto , codlineaaux,codlineaauxx, codlineaauxxx,codlineaauxxxx]);
    res.json(response.rows);
};

const getPersonaAsociada= async (req,res) => {
    const response = await pool.query('SELECT * FROM CONTACTOS');
    res.json(response.rows);
};
const postPersonaAsociada = async (req,res) => {
    const {  cedulacontacto, nombre  } = req.body;
    const response = await pool.query('INSERT INTO CONTACTOS (  cedulacontacto, nombre   ) VALUES ($1,$2)',[ cedulacontacto, nombre  ]);
    res.json(response.rows);
};
const getPersonaAsociadaByCod = async (req,res) => {
    const codlineaaux = req.params.cedulacontacto;
    const response = await pool.query('SELECT * FROM CONTACTOS WHERE cedulacontacto = $1', [codlineaaux]);
    res.json(response.rows);
};
const deletePersonaAsociadaByCod = async (req,res) => {
    const codlineaaux = req.params.cedulacontacto;
    const response = await pool.query('DELETE FROM CONTACTOS WHERE cedulacontacto = $1', [codlineaaux]);
    res.json(response.rows);
};
const updatePersonaAsociadaByCod = async (req,res) => {
    const codlineaaux = req.params.cedulacontacto;
    const {  cedulacontacto, nombre  } = req.body;
    const response = await pool.query('UPDATE CONTACTOS SET cedulacontacto = $1, nombre = $2 WHERE cedulacontacto = $3', [ cedulacontacto, nombre, codlineaaux]);
    res.json(response.rows);
};

const getAutorizado= async (req,res) => {
    const response = await pool.query('SELECT * FROM AUTORIZADO');
    res.json(response.rows);
};
const postAutorizado = async (req,res) => {
    const {  cedulaaut, nombreaut   } = req.body;
    const response = await pool.query('INSERT INTO AUTORIZADO (  cedulaaut, nombreaut   ) VALUES ($1,$2)',[ cedulaaut, nombreaut  ]);
    res.json(response.rows);
};
const getAutorizadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaaut;
    const response = await pool.query('SELECT * FROM AUTORIZADO WHERE cedulaaut = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteAutorizadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaaut;
    const response = await pool.query('DELETE FROM AUTORIZADO WHERE cedulaaut = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateAutorizadoByCod = async (req,res) => {
    const codlineaaux = req.params.cedulaaut;
    const {  cedulaaut, nombreaut   } = req.body;
    const response = await pool.query('UPDATE AUTORIZADO SET cedulaaut = $1, nombreaut = $2 WHERE cedulaaut = $3', [ cedulaaut, nombreaut, codlineaaux]);
    res.json(response.rows);
};
/*NO FUNCIONALES*/
const getMecanico= async (req,res) => {
    const response = await pool.query('SELECT * FROM MECANICO');
    res.json(response.rows);
};
const postMecanico = async (req,res) => {
    const {  cod_vehiculo, telefono, nombre   } = req.body;
    const response = await pool.query('INSERT INTO MECANICO (  cod_vehiculo, telefono, nombre     ) VALUES ($1,$2,$3)',[ cod_vehiculo, telefono, nombre  ]);
    res.json(response.rows);
};
const getMecanicoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const codlineaauxx = req.params.telefono;
    const response = await pool.query('SELECT * FROM MECANICO WHERE cod_vehiculo = $1 AND telefono = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteMecanicoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const codlineaauxx = req.params.telefono;
    const response = await pool.query('DELETE FROM MECANICO WHERE cod_vehiculo = $1 AND telefono = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateMecanicoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const codlineaauxx = req.params.telefono;
    const {  cod_vehiculo, telefono, nombre   } = req.body;
    const response = await pool.query('UPDATE MECANICO SET cod_vehiculo = $1, telefono = $2, nombre = $3 WHERE cod_vehiculo = $4 AND telefono = $5', [ cod_vehiculo, telefono, nombre, codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

const getMantenimiento= async (req,res) => {
    const response = await pool.query('SELECT * FROM MANTENIMIENTO');
    res.json(response.rows);
};
const postMantenimiento = async (req,res) => {
    const {  cod_vehiculo, fecha_mantenimiento, descripcion   } = req.body;
    const response = await pool.query('INSERT INTO MANTENIMIENTO (  cod_vehiculo, fecha_mantenimiento, descripcion    ) VALUES ($1,$2,$3)',[ cod_vehiculo, fecha_mantenimiento, descripcion  ]);
    res.json(response.rows);
};
const getMantenimientoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const codlineaauxx = req.params.fecha_mantenimiento;
    const response = await pool.query('SELECT * FROM MANTENIMIENTO WHERE cod_vehiculo = $1 AND fecha_mantenimiento = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteMantenimientoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const codlineaauxx = req.params.fecha_mantenimiento;
    const response = await pool.query('DELETE FROM MANTENIMIENTO WHERE cod_vehiculo = $1 AND fecha_mantenimiento = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateMantenimientoByCod = async (req,res) => {
    const codlineaaux = req.params.cod_vehiculo;
    const codlineaauxx = req.params.fecha_mantenimiento;
    const {  cod_vehiculo, fecha_mantenimiento, descripcion  } = req.body;
    const response = await pool.query('UPDATE MANTENIMIENTO SET cod_vehiculo = $1, fecha_mantenimiento = $2, descripcion = $3 WHERE cod_vehiculo = $4 AND fecha_mantenimiento = $5', [ cod_vehiculo, fecha_mantenimiento, descripcion, codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

const getEmite= async (req,res) => {
    const response = await pool.query('SELECT * FROM EMITE');
    res.json(response.rows);
};
const postEmite = async (req,res) => {
    const {  riflocal, cod_facturac, cedula_cliente   } = req.body;
    const response = await pool.query('INSERT INTO EMITE (   riflocal, cod_facturac, cedula_cliente   ) VALUES ($1,$2,$3)',[ riflocal, cod_facturac, cedula_cliente   ]);
    res.json(response.rows);
};
const getEmiteByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const codlineaauxx = req.params.cod_facturac;
    const codlineaauxxx = req.params.cedula_cliente;
    const response = await pool.query('SELECT * FROM EMITE WHERE riflocal = $1 AND cod_facturac = $2 AND cedula_cliente = $3', [codlineaaux,codlineaauxx,codlineaauxxx]);
    res.json(response.rows);
};
const deleteEmiteByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const codlineaauxx = req.params.cod_facturac;
    const codlineaauxxx = req.params.cedula_cliente;
    const response = await pool.query('DELETE FROM EMITE WHERE riflocal = $1 AND cod_facturac = $2 AND cedula_cliente = $3', [codlineaaux,codlineaauxx,codlineaauxxx]);
    res.json(response.rows);
};
const updateEmiteByCod = async (req,res) => {
    const codlineaaux = req.params.riflocal;
    const codlineaauxx = req.params.cod_facturac;
    const codlineaauxxx = req.params.cedula_cliente;
    const {  riflocal, cod_facturac, cedula_cliente } = req.body;
    const response = await pool.query('UPDATE EMITE SET riflocal = $1, cod_facturac = $2, cedula_cliente = $3 WHERE riflocal = $4 AND cod_facturac = $5 AND cedula_cliente = $6', [ riflocal, cod_facturac, cedula_cliente, codlineaaux,codlineaauxx,codlineaauxxx]);
    res.json(response.rows);
};

const getFacturaCompra= async (req,res) => {
    const response = await pool.query('SELECT * FROM FACTURACOMPRA');
    res.json(response.rows);
};
const postFacturaCompra = async (req,res) => {
    const {  cod_facturac, fechafactura, formapago, descuento, riflocal, cedula_cliente   } = req.body;
    const response = await pool.query('INSERT INTO FACTURACOMPRA (  cod_facturac, fechafactura, formapago, descuento, riflocal, cedula_cliente    ) VALUES ($1,$2,$3,$4,$5,$6)',[ cod_facturac, fechafactura, formapago, descuento, riflocal, cedula_cliente   ]);
    res.json(response.rows);
};
const getFacturaCompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturac;
    const response = await pool.query('SELECT * FROM FACTURACOMPRA WHERE cod_facturac = $1', [codlineaaux]);
    res.json(response.rows);
};
const deleteFacturaCompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturac;
    const response = await pool.query('DELETE FROM FACTURACOMPRA WHERE cod_facturac = $1', [codlineaaux]);
    res.json(response.rows);
};
const updateFacturaCompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturac;
    const {  cod_facturac, fechafactura, formapago, descuento, riflocal, cedula_cliente } = req.body;
    const response = await pool.query('UPDATE FACTURACOMPRA SET cod_facturac = $1, fechafactura = $2, formapago = $3, descuento= $4, riflocal = $5,cedula_cliente= $6 WHERE cod_facturac=$7', [ cod_facturac, fechafactura, formapago, descuento, riflocal, cedula_cliente, codlineaaux]);
    res.json(response.rows);
};

const getDetalleCompra= async (req,res) => {
    const response = await pool.query('SELECT * FROM DETALLECOMPRA');
    res.json(response.rows);
};
const postDetalleCompra = async (req,res) => {
    const {  cod_facturac, cod_producto, monto, cantidad   } = req.body;
    const response = await pool.query('INSERT INTO DETALLECOMPRA ( cod_facturac, cod_producto, monto, cantidad  ) VALUES ($1,$2,$3,$4)',[ cod_facturac, cod_producto, monto, cantidad  ]);
    res.json(response.rows);
};
const getDetalleCompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturac;
    const codlineaauxx = req.params.cod_producto;
    const response = await pool.query('SELECT * FROM DETALLECOMPRA WHERE cod_facturac = $1 AND cod_producto = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const deleteDetalleCompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturac;
    const codlineaauxx = req.params.cod_producto;
    console.log('BORRANDO ---'+codlineaaux+' --- '+ codlineaauxx);
    const response = await pool.query('DELETE FROM DETALLECOMPRA WHERE cod_facturac = $1 AND cod_producto = $2', [codlineaaux,codlineaauxx]);
    res.json(response.rows);
};
const updateDetalleCompraByCod = async (req,res) => {
    const codlineaaux = req.params.cod_facturac;
    const codlineaauxx = req.params.cod_producto;
    const {  cod_facturac, cod_producto, monto, cantidad } = req.body;
    const response = await pool.query('UPDATE DETALLECOMPRA SET cod_facturac = $1, cod_producto = $2, monto = $3, cantidad= $4 WHERE cod_facturac=$5 AND cod_producto = $6', [ cod_facturac, cod_producto, monto, cantidad, codlineaaux,codlineaauxx]);
    res.json(response.rows);
};

module.exports = {

    getVehiculoobyCliente,

    getNecesita,
    postNecesita,
    getNecesitaByCod,
    deleteNecesitaByCod,
    updateNecesitaByCod,

    getEmite,
    postEmite,
    getEmiteByCod,
    deleteEmiteByCod,
    updateEmiteByCod,

    getDetalleCompra,
    postDetalleCompra,
    getDetalleCompraByCod,
    deleteDetalleCompraByCod,
    updateDetalleCompraByCod,

    getFacturaCompra,
    postFacturaCompra,
    getFacturaCompraByCod,
    deleteFacturaCompraByCod,
    updateFacturaCompraByCod,

    getMecanico,
    postMecanico,
    getMecanicoByCod,
    deleteMecanicoByCod,
    updateMecanicoByCod,

    getMantenimiento,
    postMantenimiento,
    getMantenimientoByCod,
    deleteMantenimientoByCod,
    updateMantenimientoByCod,

    getAutorizado,
    postAutorizado,
    getAutorizadoByCod,
    deleteAutorizadoByCod,
    updateAutorizadoByCod,

    getPersonaAsociada,
    postPersonaAsociada,
    getPersonaAsociadaByCod,
    deletePersonaAsociadaByCod,
    updatePersonaAsociadaByCod,

    getOfrece,
    postOfrece,
    getOfreceByCod,
    deleteOfreceByCod,
    updateOfreceByCod,

    getDetalleOrden,
    postDetalleOrden,
    getDetalleOrdenByCod,
    deleteDetalleOrdenByCod,
    updateDetalleOrdenByCod,

    getMarcaVehiculo,
    postMarcaVehiculo,
    getMarcaVehiculoByCod,
    deleteMarcaVehiculoByCod,
    updateMarcaVehiculoByCod,

    getAjusteProducto,
    postAjusteProducto,
    getAjusteProductoByCod,
    deleteAjusteProductoByCod,
    updateAjusteProductoByCod,

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