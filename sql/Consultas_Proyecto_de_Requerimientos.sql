LAS CONSULTAS DE PRODUCTO MAYOR Y MENOR SALIDA NO SE HA CONSEGUIDO
RELACION ENTRE LOS DATOS.

LA CONSULTA DE FACVTURAS POR PAGAR NO SE HA CONSEGUIDO RELACION ENTRE LOS DATOS
----------------------------------------------------------------------------------------------------------------------------------
Servicio Mas/Menos Solicitados
------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------
--SERVICIO MAS SOLICITADO
/*
SELECT P1.Cod_Servicio_mas_solicitado,
	   P1.Nombre_Servicio_mas_solicitado,
	   P1.Veces_Solicitado
FROM (
	SELECT  S.cod_servicio as Cod_Servicio_mas_solicitado, 
			S.nombreserv as Nombre_Servicio_mas_solicitado, 
			count(f.Num_unico) AS Veces_Solicitado
	FROM fichaservicio f, Servicio S
	WHERE f.cod_servicio = S.cod_servicio
	GROUP BY S.cod_servicio
)P1
WHERE P1.Veces_Solicitado = (SELECT MAX(Veces_Solicitado) 
							 FROM (
								SELECT  S.cod_servicio as Cod_Servicio_mas_solicitado, 
								S.nombreserv as Nombre_Servicio_mas_solicitado, 
								count(f.Num_unico) AS Veces_Solicitado
								FROM fichaservicio f, Servicio S
								WHERE f.cod_servicio = S.cod_servicio
								GROUP BY S.cod_servicio
								)CANT_MAS_SOLICITADA
							);
*/
------------------------------------------------------------------------------------------------------------------------------------
--SERVICIO MENOS SELICITADO
/*
SELECT P1.Cod_Servicio_menos_solicitado,
	   P1.Nombre_Servicio_menos_solicitado,
	   P1.Veces_Solicitado
FROM (
	SELECT  S.cod_servicio as Cod_Servicio_menos_solicitado, 
			S.nombreserv as Nombre_Servicio_menos_solicitado, 
			count(f.Num_unico) AS Veces_Solicitado
	FROM fichaservicio f, Servicio S
	WHERE f.cod_servicio = S.cod_servicio
	GROUP BY S.cod_servicio
)P1
WHERE P1.Veces_Solicitado = (SELECT MIN(Veces_Solicitado) 
							 FROM (
								SELECT  S.cod_servicio as Cod_Servicio_menos_solicitado, 
								S.nombreserv as Nombre_Servicio_menos_solicitado, 
								count(f.Num_unico) AS Veces_Solicitado
								FROM fichaservicio f, Servicio S
								WHERE f.cod_servicio = S.cod_servicio
								GROUP BY S.cod_servicio
								)CANT_MENOS_SOLICITADA
							);
							*/
------------------------------------------------------------------------------------------------------------------------------------
Personal que realiza mas servicios 
------------------------------------------------------------------------------------------------------------------------------------
--Personal que realiza mas servicios 
------------------------------------------------------------------------------------------------------------------------------------

			/*						  
SELECT P.*, SUM(P1.Veces_Solicitado) as Cantidad_Servicios_Realizados
FROM PERSONAL P, Asignado A,
						(
							SELECT  F.cod_servicio as Cod_Servicio_colicitado,
									count(f.Num_unico) AS Veces_Solicitado
							FROM fichaservicio f
							GROUP BY f.cod_servicio
						)P1
WHERE P.cedulaper = A.cedulaper and A.cod_servicio = P1.Cod_Servicio_colicitado
GROUP BY P.cedulaper

having SUM(P1.Veces_Solicitado) = (

									SELECT MAX(Cantidad_Servicios_Realizados)
									FROM (
										SELECT SUM(P1.Veces_Solicitado) as Cantidad_Servicios_Realizados
										FROM PERSONAL P, Asignado A,
														(
															SELECT  F.cod_servicio as Cod_Servicio_colicitado,
																	count(f.Num_unico) AS Veces_Solicitado
															FROM fichaservicio f
															GROUP BY f.cod_servicio
														)P1
										WHERE P.cedulaper = A.cedulaper and A.cod_servicio = P1.Cod_Servicio_colicitado
										GROUP BY P.cedulaper
									)k
								);
								*/
---------------------------------------------------------------------------------------------------
Personal que realiza menos servicios 
---------------------------------------------------------------------------------------------------
--Personal que realiza Menos servicios 
------------------------------------------------------------------------------------------------------------------------------------
/*
SELECT P.*, h1.Cantidad_Servicios_Realizados
FROM PERSONAL P,(SELECT A.cedulaper as cedulaper, SUM(P1.Veces_Solicitado) as Cantidad_Servicios_Realizados
							FROM (SELECT  F.cod_servicio as Cod_Servicio_colicitado,
											count(f.Num_unico) AS Veces_Solicitado
									FROM fichaservicio f
									GROUP BY f.cod_servicio
								 )P1, Asignado A
							 WHERE A.cod_servicio = P1.Cod_Servicio_colicitado
							 GROUP BY A.cedulaper
						)h1
WHERE P.cedulaper = h1.cedulaper and
	h1.Cantidad_Servicios_Realizados=(SELECT MIN(p.Cantidad_Servicios_Realizados)
									  FROM (
										SELECT h2.Cantidad_Servicios_Realizados
										FROM (SELECT A.cedulaper as cedulaper, SUM(P1.Veces_Solicitado) as Cantidad_Servicios_Realizados
															FROM (SELECT  F.cod_servicio as Cod_Servicio_colicitado,
																			count(f.Num_unico) AS Veces_Solicitado
																	FROM fichaservicio f
																	GROUP BY f.cod_servicio
																 )P1, Asignado A
															 WHERE A.cod_servicio = P1.Cod_Servicio_colicitado
															 GROUP BY A.cedulaper
														)h2
										 )p
									)
order by h1.Cantidad_Servicios_Realizados desc;
*/
---------------------------------------------------------------------------------------------------
Proveedor que suministra mas/menos productos 
---------------------------------------------------------------------------------------------------
	SELECT P.rif_proveedor, max(count(D.Cod_Producto)) as productos_suministrados
	FROM Proveedor P, Producto D
	WHERE P.rif_proveedor = D.rif_proveedor
	GROUP BY D.Rif_proveedor

	SELECT P.rif_proveedor, MIN(count(D.Cod_Producto)) as productos_suministrados
	FROM Proveedor P, Producto D
	WHERE P.rif_proveedor = D.rif_proveedor
	GROUP BY D.Rif_proveedor


-----------------------------------------------------------------------
----Producto Con mas salida por ventas
-----------------------------------------------------------------------
/*
SELECT Producto.Cod_Producto,Producto.Nombrep,sum(DetalleCompra.Cantidad) acumulador 
FROM Producto,DetalleCompra
WHERE Producto.Cod_Producto=DetalleCompra.Cod_Producto
GROUP BY Producto.Cod_Producto,Producto.Nombrep
ORDER BY acumulador  Desc
OFFSET  0 ROWS 
FETCH FIRST 1 ROW ONLY; ----- El numero que acompaña al FETCH indica las primeras n filas.
*/
-------------------------------------------Agregado por Nahum

-----------------------------------------------------------------------
----Producto Con menos salida por ventas
-----------------------------------------------------------------------
/*
SELECT Producto.Cod_Producto,Producto.Nombrep,sum(DetalleCompra.Cantidad) acumulador 
FROM Producto,DetalleCompra
WHERE Producto.Cod_Producto=DetalleCompra.Cod_Producto
GROUP BY Producto.Cod_Producto,Producto.Nombrep
ORDER BY acumulador
OFFSET  0 ROWS 
FETCH FIRST 1 ROW ONLY; ----- El numero que acompaña al FETCH indica las primeras n filas.
*/
-------------------------------------------Agregado por Nahum
Proveedor que suministra mas productos
-------------------------------------------
SELECT Pro.rif_proveedor, Pro.razonsocial,sum(P.Productos_Suministrados) Cant_Productos_Suministrados 
FROM (
	SELECT P.rif_proveedor, Count(P.cod_producto) as Productos_Suministrados
	FROM Producto P
	GROUP BY P.rif_proveedor 
	 )P, Proveedor Pro
WHERE Pro.rif_proveedor = P.rif_proveedor
GROUP BY Pro.rif_proveedor
ORDER BY Cant_Productos_Suministrados DESC
OFFSET  0 ROWS          -----especifica el número de filas a omitir antes de comenzar a devolver filas desde la consulta.
FETCH FIRST 1 ROW ONLY; ----- El numero que acompaña al FETCH indica las primeras n filas.
----Realizado por Wladi1000
--------------------------------------------------------------------------------------
Proveedor que suministra mas productos
-------------------------------------------
SELECT Pro.rif_proveedor, Pro.razonsocial,sum(P.Productos_Suministrados) Cant_Productos_Suministrados 
FROM (
	SELECT P.rif_proveedor, Count(P.cod_producto) as Productos_Suministrados
	FROM Producto P
	GROUP BY P.rif_proveedor 
	 )P, Proveedor Pro
WHERE Pro.rif_proveedor = P.rif_proveedor
GROUP BY Pro.rif_proveedor
OFFSET  0 ROWS          -----especifica el número de filas a omitir antes de comenzar a devolver filas desde la consulta.
FETCH FIRST 1 ROW ONLY; ----- El numero que acompaña al FETCH indica las primeras n filas.
----Realizado por Wladi1000
--------------------------------------------------------------------------------------
Marca de vehículos que más atendemos por tipo de servicio. 
--------------------------------------------------------------------------------------
/*
  SELECT f.cod_servicio, S.nombreserv, MV.nombremarca, Count(f.num_unico) AS Vehiculos_Atendidos
  FROM Servicio S, fichaServicio f, Vehiculo V, MarcaVehiculo MV
  WHERE S.cod_servicio = f.cod_servicio and
 	   f.cod_vehiculo = V.cod_vehiculo and 
 	   V.marcavehiculo = MV.nombremarca
  GROUP BY f.cod_servicio, S.nombreserv, MV.nombremarca
  ORDER BY Vehiculos_Atendidos Desc;
--------------------------------------------------------------------------------------
*/
--Servicios aplicados a un vehiculo dado. 
-------------------------------------------------------------------------------------
 SELECT DISTINCT f.cod_servicio, S.nombreserv, V.cod_vehiculo, V.cedula_cliente, C.nombrecliente
 FROM Servicio S, fichaServicio f, Vehiculo V, Cliente C
 where S.cod_servicio=f.cod_servicio and
 	  f.cod_vehiculo=V.cod_vehiculo and
 	  V.cedula_cliente=C.cedula_cliente and
 	  V.cod_vehiculo='S%';
--------------------------------------------------------------------------------------
--Clientes que hacen reservas y después no usan el servicio. 
--------------------------------------------------------------------------------------
SELECT DISTINCT c.*
fROM Cliente C, Reservacion R, fichaServicio f
WHERE R.fecha_reservacion <> f.fechareal and
	  R.cedula_cliente <> f.cedula_cliente and
	  R.cod_servicio <> f.cod_servicio and
	  C.cedula_cliente=R.cedula_cliente;

/*
SELECT V.*
FROM VEHICULO Veh, CLIENTE
WHERE CLIENTE.cedula_cliente = VEHICULO.cedula_cliente
AND CLIENTE.cedula_cliente = $1;
*/
--------------------------------------------------------------------------------------
--Comparación entre los distintos M&M: cual factura más/menos por servicios, por ventas 
--------------------------------------------------------------------------------------
/*
SELECT L.riflocal, L.nombre, Sum(K1.Monto) as Ganancia_x_productos
FROM Locales L,(
		SELECT FC.riflocal, FC.cod_facturac as cod_facturac, Sum(DC.Monto) as Monto
		FROM DetalleCompra DC, FacturaCompra FC
		WHERE --L.riflocal = FC.riflocal and
				FC.cod_facturac = DC.cod_facturac
		GROUP BY FC.cod_facturac, FC.riflocal
	)K1
WHERE L.riflocal = K1.riflocal 
GROUP BY L.riflocal
ORDER BY Ganancia_x_productos DESC;
*/
