
--------------------8


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


