

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