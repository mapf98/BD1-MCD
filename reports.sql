
--------------------8


select distinct listado.fecha, pre.pre_codigo, pre.pre_nombre
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
group by listado.fecha,pre.pre_codigo, pre.pre_nombre
order by listado.fecha;

