/*EN ESTA SECCIÓN SE DEFINEN LOS DOMINIOS ASOCIADOS A LAS TABLAS*/
CREATE DOMAIN DominioNombre AS VARCHAR (50);
CREATE DOMAIN DominioReserva AS CHAR(1) 
								CHECK(VALUE IN('S','N'));
CREATE DOMAIN DominioPD AS CHAR(1) 
								CHECK(VALUE IN('S','N'));
CREATE DOMAIN DominioEcologico AS CHAR(1) 
								CHECK(VALUE IN('S','N'));
								CREATE DOMAIN DominioDescuento AS CHAR(1) 
								CHECK(VALUE IN('S','N'));
/*EN ESTA SECCIÓN SE DEFINEN LAS TABLAS DE LA BASE DE DATOS*/
/*************************TABLAS PRIMAS*********************/
-----------------------------------------------------------------
-------------------   Tabla Servicio   --------------------------
-------2---------------------------------------------------------
CREATE TABLE Servicio(
Cod_Servicio SERIAL NOT NULL,
NombreServ DominioNombre NOT NULL,
DescripcionServ  VARCHAR(125),
Anticipacion INTEGER,
Reserva DominioReserva DEFAULT('N'),
PRIMARY KEY(Cod_Servicio)
);
-----------------------------------------------------------------
-------------------   Tabla Personal   --------------------------
-----------------------------------------------------------------
CREATE TABLE Personal(
Cedula_Personal VARCHAR(10) NOT NULL,
Nombre DominioNombre NOT NULL,
Direccion varchar(250),
Sueldo DECIMAL(11,2) NOT NULL
					 CONSTRAINT ck_sueldoPositivo
					 check(Sueldo>=0.00),
Telefono_Personal VARCHAR(12),
PRIMARY KEY(Cedula_Personal)
);
-----------------------------------------------------------------
-------------------   Tabla Ciudad   ----------------------------
-----------------------------------------------------------------
CREATE TABLE Ciudad(
Nombre_Ciudad DominioNombre NOT NULL,
PRIMARY KEY(Nombre_Ciudad)
);
-----------------------------------------------------------------
-------------------   Tabla TipoVehículo   ----------------------
-----------------------------------------------------------------
CREATE TABLE TipoVehiculo(
Cod_TipoVehiculo SERIAL,
Descripcion VARCHAR(25) NOT NULL,
PRIMARY KEY(Cod_TipoVehiculo)
);
-----------------------------------------------------------------
-------------------   Tabla Cliente   ---------------------------
-----------------------------------------------------------------
CREATE TABLE Cliente(
Cedula_Cliente INTEGER NOT NULL,
Nombre DominioNombre NOT NULL,
Email VARCHAR(75),
Frecuente VARCHAR(2) NOT NULL,
CantidadServicios INTEGER DEFAULT 0
						  CONSTRAINT ck_CantidadServicios
						  CHECK(CantidadServicios>=0),
PRIMARY KEY(Cedula_Cliente)
);
------------------------------------------------------------------
-------------------   Tabla MarcaVehículo   ----------------------
------------------------------------------------------------------
CREATE TABLE MarcaVehiculo(
Nombre_Marca DominioNombre NOT NULL,
Descripcion VARCHAR(125),
AceiteCaja VARCHAR(25) NOT NULL,
CantidadP INTEGER NOT NULL
				  CONSTRAINT ck_Puesto
			      CHECK(   CantidadP   >=   1   ),
Refrigerante VARCHAR(20) NOT NULL,
Octanaje INTEGER NOT NULL
				 CONSTRAINT ck_Octanaje
			     CHECK(   Octanaje   =  91 OR Octanaje = 95  ),
PRIMARY KEY(NombreMarca)
);
------------------------------------------------------------------
-------------------   Tabla Proveedor   --------------------------
------------------------------------------------------------------
CREATE TABLE Proveedor(
Rif_Proveedor VARCHAR(10) NOT NULL,
RazonSocial VARCHAR(50) NOT NULL,
Direccion VARCHAR(250) NOT NULL,
Telefono VARCHAR(12) NOT NULL,
Celular VARCHAR(12),
Nombre DominioNombre NOT NULL,
Cedula VARCHAR(10) NOT NULL,
PRIMARY KEY(Rif_Proveedor),
FOREIGN KEY(Cedula) 
REFERENCES Contactos(CedulaContacto)
ON UPDATE CASCADE
ON DELETE CASCADE
);
------------------------------------------------------------------
-------------------   Tabla Proveedor   --------------------------
------------------------------------------------------------------
CREATE TABLE Contactos(
CedulaContacto VARCHAR(10) NOT NULL,
Nombre DominioNombre NOT NULL,
PRIMARY KEY(CedulaContacto)
);
------------------------------------------------------------------
--------------   Tabla Línea de Suministro   ---------------------
------------------------------------------------------------------
CREATE TABLE LineaSuministro(
Cod_Linea SERIAL,
Descripcion VARCHAR(125) NOT NULL,
PRIMARY KEY(Cod_Linea)
);
/********TABLAS FUERTES CON REFERENCIAS***********/
-----------------------------------------------------------------
--------------Etidades fuertes con referencias-------------------
---------1-------------------------------------------------------

CREATE TABLE Local(
Rif_Local VARCHAR(10) NOT NULL,
Nombre DominioNombre NOT NULL,
Direccion VARCHAR(250) NOT NULL,
Fecha_Inventario DATE,
Fecha_Encargado DATE NOT NULL,
Cedula_Encargado VARCHAR(10) NOT NULL,
Nombre_Ciudad VARCHAR(25) NOT NULL,
PRIMARY KEY(Rif_Local),
FOREIGN KEY(Encargado) 
REFERENCES Personal(Cedula_Personal)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(Nombre_Ciudad) 
REFERENCES Ciudad(Nombre_Ciudad)
ON UPDATE CASCADE
ON DELETE CASCADE
);
-----------------------------------------------------------------
------------------   Tabla Reservación   ------------------------
-----------------------------------------------------------------
CREATE TABLE Reservacion(
Num_Reservacion SERIAL,
Fecha_Reservacion DATE NOT NULL,
Cod_Servicio INTEGER NOT NULL,
Cedula_Cliente INTEGER NOT NULL,
PRIMARY KEY(Num_Reservacion),
FOREIGN KEY(Cedula_Cliente) 
REFERENCES Cliente(Cedula_Cliente)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(Cod_Servicio)
REFERENCES Servicio(Cod_Servicio)
ON UPDATE CASCADE
ON DELETE CASCADE
);
-----------------------------------------------------------------
--------------------   Tabla Vehículo   -------------------------
-----------------------------------------------------------------
CREATE TABLE Vehiculo(
Cod_Vehiculo SERIAL,
Placa VARCHAR(10) NOT NULL,
Modelo VARCHAR(25) NOT NULL,
TiempoUso INTEGER NOT NULL
				  CONSTRAINT ck_Vehiculos
				  CHECK(TiempoUso>0),
Kilometraje INTEGER NOT NULL
					CONSTRAINT ck_Kilometraje
					CHECK(Kilometraje>=0),
Capacidad_Tanque INTEGER NOT NULL,
Fecha_Adquisicion DATE NOT NULL,
Cod_TipoVehiculo INTEGER NOT NULL,
Cedula_Cliente INTEGER NOT NULL,
PRIMARY KEY(Cod_Vehiculo),
FOREIGN KEY(Cod_TipoVehiculo)
REFERENCES TipoVehiculo(Cod_TipoVehiculo)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(Cedula_Cliente)
REFERENCES Cliente(Cedula_Cliente)
ON UPDATE CASCADE
ON DELETE CASCADE
);
-----------------------------------------------------------------
--------------------   Tabla FichaServicio   --------------------
-----------------------------------------------------------------
CREATE TABLE FichaServicio(
Num_Unico SERIAL,
FechaEnt DATE NOT NULL,
HoraEnt TIME NOT NULL,
FechaEst DATE NOT NULL,
HoraEst TIME NOT NULL,
FechaReal DATE,
HoraReal TIME,
PersonaDistinta DominioPD NOT NULL,
CedulaAut VARCHAR(10),
Cedula_Cliente INTEGER NOT null,
Cod_Vehiculo INTEGER NOT null,
Cod_Servicio INTEGER NOT NULL,
PRIMARY KEY(Num_Unico),
FOREIGN KEY(Cedula_Cliente)
REFERENCES Cliente(Cedula_Cliente)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(Cod_Vehiculo)
REFERENCES Vehiculo(Cod_Vehiculo)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(Cod_Servicio)
REFERENCES Servicio(Cod_Servicio)
ON UPDATE CASCADE
ON DELETE CASCADE);
------------------------------------------------------------------
--------------------   Tabla Producto   -------------------------
------------------------------------------------------------------
CREATE TABLE Producto(
Cod_Producto SERIAL,
Nombre varchar(50) NOT NULL,
Descripcion varchar(125),
Fabricante varchar(50) NOT NULL,
Precio Decimal(11,2) NOT NULL
			CONSTRAINT ck_Precio
			CHECK(Precio>0.00),
Maximo integer NOT NULL
	 	 	CONSTRAINT ck_Maximo
			CHECK(Maximo>Minimo),
Minimo integer NOT NULL
			CONSTRAINT ck_Minimo
			CHECK(Minimo>=0),
-------------------------------------------------------------|||
-------------------------------------------------------------|||
------------------VA EN ALMACEN (REVISAR)--------------------|||
-------------------------------------------------------------|||
-------------------------------------------------------------|||
Existencia integer NOT NULL ---------------------------------|||
				   CONSTRAINT ck_Existencia --|||
				   CHECK(Existencia>=0),    --|||
-------------------------------------------------------------|||
-------------------------------------------------------------|||
-------------------------------------------------------------|||
-------------------------------------------------------------|||
-------------------------------------------------------------|||
Ecologico DominioEcologico NOT NULL,
Cod_Linea integer NOT NULL,
Rif_Proveedor varchar(10) NOT NULL,
PRIMARY KEY(Cod_Producto),
FOREIGN KEY(Cod_Linea) 
REFERENCES LineaSuministro(Cod_Linea)
ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY(Rif_Proveedor) 
REFERENCES Proveedor(Rif_Proveedor)
ON UPDATE CASCADE
ON DELETE CASCADE
);
-----------------------------------------------------------------
--------------------   Tabla OrdenCompra   ----------------------
-----------------------------------------------------------------
CREATE TABLE OrdenCompra(
Cod_Orden SERIAL,
FechaOrden DATE NOT NULL,
Rif_Proveedor VARCHAR(10) NOT NULL,
PRIMARY KEY(Cod_Orden),
FOREIGN KEY(Rif_Proveedor)
REFERENCES Proveedor(Rif_Proveedor)
ON UPDATE CASCADE
ON DELETE CASCADE
);
-----------------------------------------------------------------
--------------------   Tabla FacturaProveedor   -----------------
-----------------------------------------------------------------
CREATE TABLE FacturaProveedor(
Cod_FacturaP SERIAL,
FechaFacturaP date NOT NULL,
OrdenCompra integer NOT NULL,
PRIMARY KEY(Cod_FacturaP),
FOREIGN KEY(OrdenCompra)
REFERENCES OrdenCompra(Cod_Orden)
ON UPDATE CASCADE
ON DELETE CASCADE
);
-----------------------------------------------------------------
--------------------   Tabla FacturaServicio   -----------------
-----------------------------------------------------------------
CREATE TABLE FacturaServicio(
Cod_FacturaS SERIAL,
MontoTotal decimal(11,2) NOT NULL,
Descuento DominioDescuento NOT NULL,
Num_Unico integer NOT null,
PRIMARY KEY(Cod_FacturaS),
FOREIGN KEY(Num_Unico)
REFERENCES FichaServicio(Num_Unico)
ON UPDATE cascade
ON DELETE cascade
);
-----------------------------------------------------------------
--------------------   Tabla FacturaCompra   --------------------
-----------------------------------------------------------------
CREATE TABLE FacturaCompra(
Cod_FacturaC SERIAL,
FechaFactura DATE NOT NULL,
FormaPago varchar(15) NOT NULL
				CONSTRAINT ck_FormaPago 
				CHECK(FormaPago='Transferencia' or 					FormaPago='Efectivo' or FormaPago='Debito' or 				FormaPago='Credito' or FormaPago='Divisa'),
Descuento DominioDescuento NOT NULL,
Rif_Local varchar(10) NOT NULL,
Cedula_Cliente varchar(10) NOT NULL,
PRIMARY KEY(Cod_FacturaC),
FOREIGN KEY(Rif_Local)
REFERENCES Local(Rif_Local)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cedula_CLiente)
REFERENCES Cliente(Cedula_Cliente)
ON UPDATE cascade
ON DELETE cascade,
);
/********TABLAS DEBILES ***********/
-----------------------------------------------------------------
---------------------   Tabla Actividades -----------------------
----------17-----------------------------------------------------
CREATE TABLE Actividad(
Cod_Servicio integer NOT NULL,
Nro_Consecutivo SERIAL,
Nombre varchar(50) NOT NULL,
Descripcion varchar(125),
Capacidad integer NOT NULL
				  CONSTRAINT ck_Capacidad
				  CHECK(Capacidad>0),
Costo decimal (11,2) NOT NULL
					 CONSTRAINT ck_Costo
					 CHECK(Costo>0.00),
PRIMARY KEY(Cod_Servicio,Nro_Consecutivo),
FOREIGN KEY(Cod_Servicio)
REFERENCES Servicio(Cod_Servicio)
ON UPDATE CASCADE
ON DELETE CASCADE
);
----------19-----------------------------------------------------
CREATE TABLE AjusteProducto(
Cod_Producto INTEGER NOT NULL,
Fecha_Ajuste DATE NOT NULL,
Cantidad INTEGER NOT NULL
					CONSTRAINT ck_CantidadPr
					CHECK(Cantidad>=0),
-------TipoDiferencia
PRIMARY KEY(Cod_Producto,FechaAjuste),
FOREIGN KEY(Cod_Producto)
REFERENCES Producto(Cod_Producto)
ON UPDATE cascade
ON DELETE cascade);
----------20-----------------------------------------------------
CREATE TABLE Mantenimiento(
Cod_Vehiculo INTEGER NOT NULL,
Fecha_Mantenimiento DATE NOT NULL,
Descripcion VARCHAR(125) NOT NULL,
PRIMARY KEY(Cod_Vehiculo,Fecha_Mantenimiento),
FOREIGN KEY(Cod_Vehiculo)
REFERENCES Vehiculo(Cod_Vehiculo)
ON UPDATE cascade
ON DELETE cascade);
----------21-----------------------------------------------------
CREATE TABLE Mecanico(
Cod_Vehiculo INTEGER NOT NULL,
Telefono VARCHAR(12) NOT NULL,
Nombre VARCHAR(50) NOT NULL,
PRIMARY KEY(Cod_Vehiculo,Telefono),
FOREIGN KEY(Cod_Vehiculo)
REFERENCES Vehiculo(Cod_Vehiculo)
ON UPDATE cascade
ON DELETE cascade);
----------22-----------------------------------------------------
CREATE TABLE DetalleOrden(
Num_Unico INTEGER NOT NULL
Cod_Servicio INTEGER NOT NULL,
Nro_Consecutivo INTEGER NOT NULL,
CostoManoObra DECIMAL(11,2) NOT NULL
							CONSTRAINT ck_CostoManoObra
							CHECK(CostoManoObra>=0.00),
PRIMARY KEY(Num_Unico,Cod_Servicio,Nro_Consecutivo),
FOREIGN KEY(Cod_Servicio,Nro_Consecutivo)
REFERENCES Actividad(Cod_Servicio,Nro_Consecutivo)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Num_Unico)
REFERENCES FichaServicio(Num_Unico)
ON UPDATE cascade
ON DELETE cascade
);
----------23-----------------------------------------------------
CREATE TABLE CompraProducto(
Cod_Producto INTEGER NOT NULL,
Cedula_Cliente INTEGER NOT NULL,
Cantidad INTEGER NOT NULL
				 CONSTRAINT ck_Cantidad
				 CHECK(Cantidad>0),
Monto DECIMAL(11,2) NOT NULL
					CONSTRAINT ck_Monto
				    CHECK(Monto>0.00),
PRIMARY KEY(Cod_Producto,Cedula_Cliente),
FOREIGN KEY(Cod_Producto)
REFERENCES Producto(Cod_Producto)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cedula_Cliente)
REFERENCES Cliente(Cedula_Cliente)
ON UPDATE cascade
ON DELETE cascade);
----------24-----------------------------------------------------
CREATE TABLE Pago(					      --REVISAR Num_Pago
Cedula_Cliente INTEGER NOT NULL,			      --REVISAR Num_Pago
Num_Pago SERIAL NOT NULL,                                   --REVISAR Num_Pago
FechaPago DATE NOT NULL,
NumeroT INTEGER NOT NULL,
					CONSTRAINT ck_Monto   --REVISAR Num_Pago
					CHECK(Monto>0.00),    --REVISAR Num_Pago
Banco VARCHAR(25) NOT NULL,
Monto DECIMAL(11,2) NOT NULL,
PRIMARY KEY(Cedula_Cliente,Num_Pago),
FOREIGN KEY(Cedula_Cliente)
REFERENCES Cliente(Cedula_Cliente)
ON UPDATE cascade
ON DELETE cascade);
---------------------------------------------------------------
CREATE TABLE Recibe(
Rif_Local VARCHAR(10) NOT NULL,
Cod_TipoVehiculo INTEGER NOT NULL,
PRIMARY KEY(Rif_Local,Cod_TipoVehiculo),
FOREIGN KEY(Rif_Local)
REFERENCES Local(Rif_Local)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_TipoVehiculo)
REFERENCES TipoVehiculo(Cod_Tipovehiculo)
ON UPDATE cascade
ON DELETE cascade
);

----------25-----------------------------------------------------
CREATE TABLE Ofrece(
Rif_Local VARCHAR(10) NOT NULL,
Cod_Servicio INTEGER NOT NULL,
PRIMARY KEY(Rif_Local,Cod_Servicio),
FOREIGN KEY(Rif_Local)
REFERENCES Local(Rif_Local)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_Servicio)
REFERENCES Servicio(Cod_Servicio)
ON UPDATE cascade
ON DELETE cascade
);
----------26-----------------------------------------------------
CREATE TABLE Asignado(
Cedula_Personal VARCHAR(10) NOT NULL,
Cod_Servicio INTEGER NOT NULL,
PRIMARY KEY(Cedula_Personal,Cod_Servicio),
FOREIGN KEY(Cedula_Personal)
REFERENCES Personal(Cedula_Personal)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_Servicio)
REFERENCES Servicio(Cod_Servicio)
ON UPDATE cascade
ON DELETE cascade);
----------27-----------------------------------------------------
CREATE TABLE Contiene(
Cedula_Personal INTEGER NOT NULL,
Cod_Servicio INTEGER NOT NULL,
Cantidad INTEGER NOT NULL
				 CONSTRAINT ck_Cantidad
				 CHECK(Cantidad>=0),
Monto DECIMAL(11,2) NOT NULL
					 CONSTRAINT ck_MontoCont
				 	 CHECK(Monto>=0.00),
PRIMARY KEY(Cedula_Personal,Cod_Servicio),
FOREIGN KEY(Cedula_Personal)
REFERENCES Personal(Cedula_Personal)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_Servicio)
REFERENCES Servicio(Cod_Servicio)
ON UPDATE cascade
ON DELETE cascade
);
----------28-----------------------------------------------------
CREATE TABLE Requiere(
Num_Unico INTEGER NOT NULL,
Cod_Servicio INTEGER NOT NULL,
Nro_Consecutivo INTEGER NOT NULL,
Cod_Producto INTEGER NOT NULL,
Cantidad INTEGER NOT NULL
					 CONSTRAINT ck_Cantidad
					 CHECK(Cantidad>=0),
Monto DECIMAL(11,2) NOT NULL
					CONSTRAINT ck_monto
					CHECK(Monto>=0.00),
PRIMARY KEY(Num_Unico,Cod_Servicio,Nro_Consecutivo,Cod_Producto),
FOREIGN KEY(Num_Unico)
REFERENCES FichaServicio(Num_Unico)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_Servicio,Nro_Consecutivo)
REFERENCES Actividad(Nro_Consecutivo,Cod_Servicio)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_Producto)
REFERENCES Producto(Cod_Producto)
ON UPDATE cascade
ON DELETE cascade
);
----------29-----------------------REVISAR TABLA------------------------------
CREATE TABLE Modalidades(			
Cedula_Cliente INTEGER NOT NULL,		--REVISAR TABLA
Modalidades VARCHAR(25) NOT NULL,			--REVISAR TABLA
PRIMARY KEY(Cedula_Cliente,Modalidades),
FOREIGN KEY(Cedula_Cliente)				--REVISAR TABLA
REFERENCES Cliente(Cedula_Cliente)			--REVISAR TABLA
ON UPDATE cascade				--REVISAR TABLA
ON DELETE cascade);			--REVISAR TABLA
----------30-----------------------------------------------------
CREATE TABLE Almacena(
Rif_Local VARCHAR(10) NOT NULL,
Cod_Producto INTEGER NOT NULL,
Cantidad INTEGER NOT NULL
				 CONSTRAINT ck_CantidadAlmacena
				 CHECK(Cantidad>=0),
PRIMARY KEY(Rif_Local,Cod_Producto),
FOREIGN KEY(Rif_Local)
REFERENCES Local(Rif_Local)
ON UPDATE cascade
ON DELETE cascade,
FOREIGN KEY(Cod_Producto)
REFERENCES Producto(Cod_Producto)
ON UPDATE cascade
ON DELETE cascade,
);
