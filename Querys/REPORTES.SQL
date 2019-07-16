

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

-- 8



select listado.fecha, pre.pre_codigo, pre.pre_nombre
from presentacion pre ,(select date_part('year', v.ven_fecha) as fecha, count(*) as cont,pre.pre_codigo,pre.pre_nombre as presentacion
															from detalle_ven dev, min_pre mp, presentacion pre,venta v
															where v.ven_codigo = dev.fk_dev_venta
															and dev.fk_dev_min_pre = mp.mp_codigo 
															and mp.fk_mp_presentacion = pre.pre_codigo
															group by fecha,pre.pre_codigo,pre.pre_nombre
															order by fecha,cont asc limit 1) as listado														
where pre.pre_codigo in (select pr.pre_codigo
						from presentacion pr,venta ven
						where listado.presentacion= pr.pre_nombre
						and (date_part('year', ven.ven_fecha)) in (listado.fecha)
						order by listado.cont )	
order by listado.fecha;

-------9

Select lista.cont, maq.maq_nombre,maq.maq_codigo
from maquinaria maq,(Select count(*) as cont, maq.maq_nombre, maq.maq_codigo as maq, ex.exp_fechainicio
					from maquinaria maq, explotacion ex, etapa et, fase fa, tm_fas tf, maq_fas mf
					where 
					et.fk_eta_explotacion = ex.exp_codigo 
					and et.eta_codigo = fa.fk_fas_etapa
					and tf.fk_tmf_fase = fa.fas_codigo
					and mf.fk_mf_tm_fase = tf.tmf_codigo
					and mf.fk_mf_maquinaria = maq.maq_codigo
					and ex.exp_fechainicio between '11-01-2017' and '21-02-2017'
					group by maq.maq_nombre, maq, ex.exp_fechainicio
					order by count(*) desc limit 1 ) as lista 
where maq.maq_codigo = lista.maq


--------------------10


Select min(pagos.veces),pagos.tipo
from  (select count(fk_vt_tptransferencia) as veces, 'Transferencia' as tipo from ven_tip vt, venta v
						   where vt.fk_vt_venta = v.ven_codigo 
							and v.ven_fecha between '13-04-2016' and '19-08-2016'
						   union all
						   select count(fk_vt_tpcheque) as veces, 'Cheque' as tipo from ven_tip vt,venta v
						   where vt.fk_vt_venta = v.ven_codigo 
							and v.ven_fecha between '13-04-2016' and '19-08-2016'
						   union all
						   select count(fk_vt_tpdebito) as veces, 'Tarjeta de Debito' as tipo from ven_tip vt ,venta v
						   where vt.fk_vt_venta = v.ven_codigo 
							and v.ven_fecha between '13-04-2016' and '19-08-2016'
						   union all
						   select count(fk_vt_tpcredito) as veces, 'Tarjeta de Credito' as tipo from ven_tip vt,venta v 
						  where vt.fk_vt_venta = v.ven_codigo 
							and v.ven_fecha between '13-04-2016' and '19-08-2016') as pagos 
group by pagos.tipo
order by min(pagos.veces) asc limit 1






-----------------7
Select count (*), emp.emp_nombre, emp.emp_apellido, emp.emp_codigo
from empleado emp,explotacion ex, etapa et, fase fa, car_fas cf, emp_cf ecf
where et.fk_eta_explotacion = ex.exp_codigo 
and et.eta_codigo = fa.fk_fas_etapa
and cf.fk_cf_fase = fa.fas_codigo
and ex.exp_fechainicio between '11-01-2017' and '12-01-2017'
and emp.emp_codigo = ecf.fk_ecf_empleado
group by emp.emp_nombre, emp.emp_apellido, emp.emp_codigo

Select count(*)
from (Select ex.exp_fechainicio, ecf.ecf_codigo, cf.cf_codigo
from explotacion ex, etapa et, fase fa, car_fas cf, emp_cf ecf
where et.fk_eta_explotacion = ex.exp_codigo 
and et.eta_codigo = fa.fk_fas_etapa
and cf.fk_cf_fase = fa.fas_codigo
and ex.exp_fechainicio = '01-01-2017'
group by ex.exp_fechainicio, ecf.ecf_codigo, cf.cf_codigo
order by cf.cf_codigo) as lista

select exp_fechainicio 
from explotacion
order by exp_fechainicio




	