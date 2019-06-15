
//PETICIONES AJAX

$('#agregarEmpleado').on('submit',function(e){
	e.preventDefault();
	let pNombre = $('#nombreEmpleado');
	let sNombre = $('#segundoNombreEmpleado');
	let pApellido = $('#apellidoEmpleado');
	let sApellido = $('#segundoApellidoEmpleado');
	let cedula = $('#cedulaEmpleado');
	let nacionalidad = $('#nacionalidadEmpleado');
	let telefono = $('#telefonoEmpleado');
	let genero = $('#generoEmpleado');
	let fnac = $('#fechaNacimientoEmpleado');

	$.ajax({
		url: '/Empleados-Agregar',
		method: 'POST',
		data: {
			pnombre: pNombre.val(),
			snombre: sNombre.val(),
			papellido: pApellido.val(),
			sapellido: sApellido.val(),
			cedula: cedula.val(),
			nacionalidad: nacionalidad.val(),
			telefono: telefono.val(),
			genero: genero.val(),
			fnac: fnac.val() 
		},
		success: function(response){
			if(response == 'great'){
				alert('El empleado fue registrado satisfactoriamente');
			}else{
				alert('El empleado no se pudo agregar, revisa los campos');
			}			
		}
	});
});

$('#eliminarEmpleado').on('submit',function(e){
	e.preventDefault();
	let cedulaEmpleado = $('#cedulaEmpleadoEliminar');
	let nacionalidadEmpleado = $('#nacionalidadEmpleadoEliminar');

	$.ajax({
		url: '/Empleados-Eliminar',
		method: 'POST',
		data: {
			cedulaEmp: cedulaEmpleado.val(),
			nacionalidadEmp: nacionalidadEmpleado.val()
		},
		success: function(response){
			if(response == 'great'){
				alert('El empleado fue ELIMINADO satisfactoriamente');
			}else{
				alert('El empleado NO SE PUDO ELIMINAR, revisa los campos');
			}			
		}
	});
});

$('#verificarEmpleado').on('submit',function(e){
	e.preventDefault();
	let cedulaEmpleadoV = $('#cedulaEmpleadoVerificar');
	let nacionalidadEmpleadoV = $('#nacionalidadEmpleadoVerificar');

	$.ajax({
		url: '/Empleados-Verificar',
		method: 'POST',
		data: {
			cedulaEmpV: cedulaEmpleadoV.val(),
			nacionalidadV: nacionalidadEmpleadoV.val()
		},
		success: function(response){
			if(response[0].emp_cedula != null){
				var boxModEmp = $('#guardarCambioEmpleado');

				var fechaNac = new Date(response[0].emp_fechanacimiento);
				var d = (fechaNac.getDate()).toString();
				var m = (fechaNac.getMonth()+1).toString();
				var y = fechaNac.getFullYear().toString();
				console.log(d);
				console.log(m);
				console.log(y);
				if( m < 10 ){
					m = "0"+m;
				};

				if( d < 10 ){
					d = "0"+d;
				};

				boxModEmp.html('');
				boxModEmp.append(' \n\
					<div class="animated" id="boxGC">\n\
	                    <div class="form-row animated fadeIn animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcnombreEmpleado">Primer nombre</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcnombreEmpleado" value="'+response[0].emp_nombre1+'" required>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcsegundoNombreEmpleado">Segundo nombre</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcsegundoNombreEmpleado" value="'+response[0].emp_nombre2+'">\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcapellidoEmpleado">Primer apellido</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcapellidoEmpleado" value="'+response[0].emp_apellido1+'" required>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcsegundoApellidoEmpleado">Segundo apellido</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcsegundoApellidoEmpleado" value="'+response[0].emp_apellido2+'">\n\
	                      </div>\n\
	                    </div>\n\
	                    <hr>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-2 mb-3">\n\
	                        <label for="gcnacionalidadEmpleado">Nacionalidad</label>\n\
	                        <select class="form-control formsCRUD" id="gcnacionalidadEmpleado" required>\n\
	                          <option value="V">V</option>\n\
	                          <option value="E">E</option>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gccedulaEmpleado">Cédula</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gccedulaEmpleado" value="'+response[0].emp_cedula+'" disabled>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcfechaNacimientoEmpleado">Fecha Nacimiento</label>\n\
	                        <input type="date" class="form-control formsCRUD" id="gcfechaNacimientoEmpleado" value="'+y+'-'+m+'-'+d+'" required>\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcgeneroEmpleado">Género</label>\n\
	                        <select class="form-control formsCRUD" id="gcgeneroEmpleado" required>\n\
	                          <option value="F">Femenino</option>\n\
	                          <option value="M">Masculino</option>\n\
	                          <option value="O">Otro</option>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-8 mb-3">\n\
	                        <label for="gctelefonoEmpleado">Teléfono</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gctelefonoEmpleado" value="'+ response[0].emp_telefono+'" required>\n\
	                      </div>\n\
	                    </div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	                </div>');
					  $("#gcgeneroEmpleado option[value="+ response[0].emp_genero +"]").attr("selected",true);
					  $("#gcnacionalidadEmpleado option[value="+ response[0].emp_nacionalidad +"]").attr("selected",true);
			}else if(response == 'failed'){
				alert('Error, no se consigue a empleado para modificar');				
			}			
		}
	});
});

$('#formLogin').on('submit',function(e){
	e.preventDefault();
	let userLog = $('#userLogin');
	let passwordLog = $('#passwordLogin');
	$.ajax({
		url: '/login',
		method: 'POST',
		data: {
			user: userLog.val(),
			password: passwordLog.val()
		},
		success: function(response){
			if(response == 'access'){
				window.location.href = "/Home";
			}else{
				userLog.addClass('formsFieldError');
				passwordLog.addClass('formsFieldError');
			}			
		}
	});
});

$('#guardarCambioEmpleado').on('submit',function(e){
	e.preventDefault();
	let pNombreGC = $('#gcnombreEmpleado');
	let sNombreGC = $('#gcsegundoNombreEmpleado');
	let pApellidoGC = $('#gcapellidoEmpleado');
	let sApellidoGC = $('#gcsegundoApellidoEmpleado');
	let cedulaGC = $('#gccedulaEmpleado');
	let nacionalidadMGC = $('#gcnacionalidadEmpleado');
	let telefonoGC = $('#gctelefonoEmpleado');
	let generoGC = $('#gcgeneroEmpleado');
	let fnacGC = $('#gcfechaNacimientoEmpleado');

	$.ajax({
		url: '/Empleados-Modificar',
		method: 'POST',
		data: {
			pnombreGC: pNombreGC.val(),
			snombreGC: sNombreGC.val(),
			papellidoGC: pApellidoGC.val(),
			sapellidoGC: sApellidoGC.val(),
			cedulaGC: cedulaGC.val(),
			nacionalidadGC: nacionalidadMGC.val(),
			telefonoGC: telefonoGC.val(),
			generoGC: generoGC.val(),
			fnacGC: fnacGC.val() 
		},
		success: function(response){
			if(response == 'great'){
				alert('El empleado fue MODIFICADO satisfactoriamente');
				var boxGCEmp = $('#boxGC');
				boxGCEmp.addClass('fadeOut');
				boxGCEmp.html('');
				var boxModEmp = $('#guardarCambioEmpleado');
				boxModEmp.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un usuario para modificar su ficha</h4>\n\
                      <p class="text-center"><i class="fas fa-address-card iconMod"></i></p>\n\
                    </div>\n\
				`);
			}else{
				alert('El empleado NO SE PUDO MOFICAR, revisa los campos');
			}			
		}
	});
});

//MOVIMIENTOS DE RUTA

$('#menuItemAliados').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemSolCompra').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemEmpleados').on('click',function(){
	window.location.href = "/Empleados";
});

$('#menuItemVentas').on('click',function(){
	window.location.href = "/Ventas";
});

$('#menuItemCaja').on('click',function(){
	window.location.href = "/Caja";
});

$('#menuItemMinerales').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemReportes').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemYacimientos').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemExplotaciones').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemGestion').on('click',function(){
	window.location.href = "/Gestion";
});

$('#menuItemProyectos').on('click',function(){
	window.location.href = "/Proyectos";
});

$('#menuItemPersonal').on('click',function(){
	window.location.href = "/Personal";
});

$('#menuItemUsuarios').on('click',function(){
	window.location.href = "/Usuarios";
});

$('#menuItemHome').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemAgregarEmpleado').on('click',function(){
	window.location.href = "/Empleados-Agregar";
});

$('#menuItemConsultarEmpleado').on('click',function(){
	window.location.href = "/Empleados-Consultar";
});

$('#menuItemEliminarEmpleado').on('click',function(){
	window.location.href = "/Empleados-Eliminar";
});

$('#menuItemModificarEmpleado').on('click',function(){
	window.location.href = "/Empleados-Modificar";
});

$('#backToHome').on('click',function(){
	window.location.href = "/Home";
});

$('#backToPersonal').on('click',function(){
	window.location.href = "/Personal";
});

//Data Table
$(document).ready( function () {
    $('#table_id').DataTable();
} );

//ESTILOS
$('#userLogin').focus(function(){
	$('#userLogin').removeClass('formsFieldError');
});

$('#passwordLogin').focus(function(){
	$('#passwordLogin').removeClass('formsFieldError');
});


/*

$('#guardarCambioEmpleado').on('submit',function(e){
	e.preventDefault();
	let pNombreGC = $('#gcnombreEmpleado');
	let sNombreGC = $('#gcsegundoNombreEmpleado');
	let pApellidoGC = $('#gcapellidoEmpleado');
	let sApellidoGC = $('#gcsegundoApellidoEmpleado');
	let cedulaGC = $('#gccedulaEmpleado');
	let nacionalidadGC = $('#gcnacionalidadEmpleado');
	let telefonoGC = $('#gctelefonoEmpleado');
	let generoGC = $('#gcgeneroEmpleado');
	let fnacGC = $('#gcfechaNacimientoEmpleado');

	$.ajax({
		url: '/Empleados-Modificar',
		method: 'POST',
		data: {
			pnombre: pNombreGC.val(),
			snombre: sNombreGC.val(),
			papellido: pApellidoGC.val(),
			sapellido: sApellidoGC.val(),
			cedula: cedulaGC.val(),
			nacionalidad: nacionalidadGC.val(),
			telefono: telefonoGC.val(),
			genero: generoGC.val(),
			fnac: fnacGC.val() 
		},
		success: function(response){
			if(response == 'failedTest'){
				alert('El empleado fue MODIFICADO satisfactoriamente');
			}else{
				alert('El empleado NO SE PUDO MOFICAR, revisa los campos');
			}			
		}
	});
});







*/
