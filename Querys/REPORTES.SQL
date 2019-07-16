

-- 1.- Empresa aliada a la que se le realizaron más compras.

	select nombre,rif from 
	(select ac_nombre AS nombre, ac_numero_rif AS Rif, count(sc_costototal) AS C
	from solicitud_compra, aliado_comercial
	where fk_sc_aliado = ac_numero_rif group by ac_nombre, Rif) AS t
	where c = (select max(c) from (select ac_nombre AS Nombre, ac_numero_rif AS Rif, count(sc_costototal) AS C
	from solicitud_compra, aliado_comercial
	where fk_sc_aliado = ac_numero_rif group by nombre, Rif) AS t);

-- 2 


	SELECT fas_codigo, fas_nombre FROM FASE
	WHERE fas_duracion > fas_fechafin - fas_fechainicio
		AND fas_fechainicio BETWEEN '01-01-2017' AND '12-30-2017';


-- 3.- Proyecto mas costoso por mes.

	select to_char(exp_fechainicio,'mm') AS mes, max(exp_costototal) as costo from explotacion
	group by mes;

-- 4

	SELECT  emp_codigo, emp_cedula, emp_nombre, emp_apellido, count(f.*)
	FROM empleado, emp_cf, fase f, car_fas
	WHERE emp_codigo = fk_ecf_empleado AND fk_ecf_carfas = cf_codigo AND fk_cf_fase = fas_codigo
		AND fas_fechafin - fas_fechainicio <= fas_duracion
		AND fas_fechainicio BETWEEN '01-01-2017' AND '12-30-2017'
	GROUP BY emp_codigo, emp_cedula, emp_nombre, emp_apellido ORDER BY count(f.*) DESC LIMIT 10

-- 5

	select fas_codigo AS FAS_ET, fas_nombre AS nombre from fase
	where fk_fas_estatus = (select est_codigo from estatus where est_nombre = 'En proceso')  AND fas_fechainicio BETWEEN '01-01-2017' AND '12-30-2018'
	UNION
	select eta_codigo AS FAS_ET, eta_nombre AS nombre from etapa
	where fk_eta_estatus = (select est_codigo from estatus where est_nombre = 'En proceso')  AND eta_fechainicio BETWEEN '01-01-2017' AND '12-30-2018'

-- 6

	select emp_codigo, emp_cedula, emp_nombre, emp_apellido, count(EX.*) AS TOTAL_PAR, to_char(FAS.fas_fechainicio, 'mm') as mes
	from empleado EMP, emp_cf ECF, car_fas CF, fase FAS, etapa ET, explotacion EX
	where emp.emp_codigo = ECF.fk_ecf_empleado AND fk_ecf_carfas = cf_codigo AND fk_cf_fase = fas_codigo
		AND fk_fas_etapa = eta_codigo AND fk_eta_explotacion = exp_codigo
		AND exp_fechainicio BETWEEN '01-01-2015' AND  '06-30-2019'
	group by emp_codigo, emp_cedula, emp_nombre, emp_apellido, mes
	having count(ex.*)> 2;

-- 7

	SELECT emp.emp_codigo, count(E.*)
	FROM empleado EMP, emp_cf ECF, car_fas CF, fase, etapa, explotacion E
	where emp.emp_codigo = ecf.fk_ecf_empleado AND emp.emp_codigo = ECF.fk_ecf_empleado AND fk_ecf_carfas = cf_codigo 
		AND fk_cf_fase = fas_codigo	AND fk_fas_etapa = eta_codigo AND fk_eta_explotacion = exp_codigo
		AND exp_fechainicio BETWEEN '01-01-2000' AND  '06-30-2019'
	group by emp.emp_codigo;

-- 8.- Presentacion del mineral menos solicitado por los clientes en un ano

	