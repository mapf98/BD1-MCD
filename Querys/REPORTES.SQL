

-- 1.- Empresa aliada a la que se le realizaron más compras.

	select nombre,rif from 
	(select ac_nombre AS nombre, ac_numero_rif AS Rif, count(sc_costototal) AS C
	from solicitud_compra, aliado_comercial
	where fk_sc_aliado = ac_numero_rif group by ac_nombre, Rif) AS t
	where c = (select max(c) from (select ac_nombre AS Nombre, ac_numero_rif AS Rif, count(sc_costototal) AS C
	from solicitud_compra, aliado_comercial
	where fk_sc_aliado = ac_numero_rif group by nombre, Rif) AS t);


-- 3.- Proyecto mas costoso por mes.

	select to_char(exp_fechainicio,'mm') AS mes, max(exp_costototal) as costo from explotacion
	group by mes;

-- 6

	select emp_codigo, emp_cedula, emp_nombre, emp_apellido, count(EX.*) AS TOTAL_PAR, to_char(FAS.fas_fechainicio, 'mm') as mes
	from empleado EMP, emp_cf ECF, car_fas CF, fase FAS, etapa ET, explotacion EX
	where emp.emp_codigo = ECF.fk_ecf_empleado AND fk_ecf_carfas = cf_codigo AND fk_cf_fase = fas_codigo
		AND fk_fas_etapa = eta_codigo AND fk_eta_explotacion = exp_codigo
	group by emp_codigo, emp_cedula, emp_nombre, emp_apellido, mes
	having count(ex.*)> 2

-- 8.- Presentacion del mineral menos solicitado por los clientes en un ano

	