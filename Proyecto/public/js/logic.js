var globalIDMineralYacimiento = 1;


//PETICIONES AJAX

//Empleado
$('#agregarEmpleado').on('submit',function(e){
	e.preventDefault();
	let nombre = $('#nombreEmpleado');
	let apellido = $('#apellidoEmpleado');
	let cedula = $('#cedulaEmpleado');
	let telefono = $('#telefonoEmpleado');
	let genero = $('#generoEmpleado');
	let fnac = $('#fechaNacimientoEmpleado');
	let nombreUsuario = $('#usuarioEmpleado');
	let passwordUsuario = $('#passwordEmpleado');
	let cargoEmpleado = $('#cargoEmpleado');
	let parroquiaEmpleado = $('#parroquiaSelect');
	let rolUsuarioEmpleado = $('#rolUsuarioEmpleado');

	if((passwordUsuario.val() != "" && nombreUsuario.val() == "") || (passwordUsuario.val() == "" && nombreUsuario.val() != "")){
		alert('Completa el formulario de usuario o deja en blanco los campos');
	}else{
		$.ajax({
			url: '/Empleados-Agregar',
			method: 'POST',
			data: {
				nombre: nombre.val(),
				apellido: apellido.val(),
				cedula: cedula.val(),
				telefono: telefono.val(),
				genero: genero.val(),
				usuario: nombreUsuario.val(),
				password: passwordUsuario.val(),
				fnac: fnac.val() ,
				cargo: cargoEmpleado.val(),
				parroquia: parroquiaEmpleado.val(),
				rol: rolUsuarioEmpleado.val()
			},
			success: function(response){
				if(response == 'great'){
					alert('El empleado fue registrado satisfactoriamente');
				}else{
					alert('El empleado no se pudo agregar, revisa los campos por informacion duplicada ');
				}			
			}
		});
	}
});

$('#eliminarEmpleado').on('submit',function(e){
	e.preventDefault();
	let cedulaEmpleado = $('#cedulaEmpleadoEliminar');

	$.ajax({
		url: '/Empleados-Eliminar',
		method: 'POST',
		data: {
			cedulaEmp: cedulaEmpleado.val(),
		},
		success: function(response){
			if(response == 'great'){
				alert('El empleado fue ELIMINADO satisfactoriamente');
			}else{
				alert('El empleado NO SE PUDO ELIMINAR, revisa los campos por informacion duplicada');
			}			
		}
	});
});

$('#verificarEmpleado').on('submit',function(e){
	e.preventDefault();
	let cedulaEmpleadoV = $('#cedulaEmpleadoVerificar');

	$.ajax({
		url: '/Empleados-Verificar',
		method: 'POST',
		data: {
			cedulaEmpV: cedulaEmpleadoV.val(),
		},
		success: function(response){
			if(response.dataV != null){
				var boxModEmp = $('#guardarCambioEmpleado');

				var fechaNac = new Date(response.dataV[0].emp_fechanacimiento);
				var d = (fechaNac.getDate()).toString();
				var m = (fechaNac.getMonth()+1).toString();
				var y = fechaNac.getFullYear().toString();

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
	                        <label for="gcnombreEmpleado">Primer Nombre</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcnombreEmpleado" value="'+response.dataV[0].emp_nombre+'" required>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcapellidoEmpleado">Primer apellido</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcapellidoEmpleado" value="'+response.dataV[0].emp_apellido+'" required>\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gccedulaEmpleado">Cédula</label>\n\
	                        <input type="number" class="form-control formsCRUD" id="gccedulaEmpleado" value="'+response.dataV[0].emp_cedula+'" disabled>\n\
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
	                        <input type="number" class="form-control formsCRUD" id="gctelefonoEmpleado" value="'+response.dataV[0].emp_telefono+'" required>\n\
	                      </div>\n\
	                    </div>\n\
	                   	<hr>\n\
	                   	<div class="form-row animated fadeIn">\n\
	                      <div class="col-md-3 mb-3">\n\
	                        <label for="gccargoEmpleado">Cargo</label>\n\
	                        <select class="form-control formsCRUD" id="gccargoEmpleado" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-3 mb-3">\n\
	                        <label for="estadoSelect">Estado</label>\n\
	                        <select class="form-control formsCRUD" id="estadoSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-3 mb-3">\n\
	                        <label for="municipioSelect">Municipio</label>\n\
	                        <select class="form-control formsCRUD" id="municipioSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-3 mb-3">\n\
	                        <label for="parroquiaSelect">Parroquia</label>\n\
	                        <select class="form-control formsCRUD" id="parroquiaSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcrolEmpleado">Rol</label>\n\
	                        <select class="form-control formsCRUD" id="gcrolEmpleado">\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcusuarioEmpleado">Usuario</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcusuarioEmpleado" value="'+response.dataV[0].usu_usuario+'">\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcpasswordEmpleado">Password</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcpasswordEmpleado" value="'+response.dataV[0].usu_password+'">\n\
	                      </div>\n\
	                    </div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	                </div>');

				$("#gcgeneroEmpleado option[value="+ response.dataV[0].emp_genero +"]").attr("selected",true);

				selectRol = $('#gcrolEmpleado');
				selectRol.html('');
				for (var i = response.roles.length - 1; i >= 0; i--) {
					selectRol.append('<option value="'+response.roles[i].rol_codigo+'">'+response.roles[i].rol_nombre+'</option>');
				}
				$("#gcrolEmpleado option[value="+ response.dataV[0].rol_codigo +"]").attr("selected",true);

				selectCargo = $('#gccargoEmpleado');
				selectCargo.html('');
				for (var i = response.cargos.length - 1; i >= 0; i--) {
					selectCargo.append('<option value="'+response.cargos[i].car_codigo+'">'+response.cargos[i].car_nombre+'</option>');
				}
				$("#gccargoEmpleado option[value="+ response.dataV[0].car_codigo +"]").attr("selected",true);

				selectEstado = $('#estadoSelect');
				selectEstado.html('');
				for (var i = response.estados.length - 1; i >= 0; i--) {
					selectEstado.append('<option value="'+response.estados[i].lug_codigo+'">'+response.estados[i].lug_nombre+'</option>');
				}

				$("#estadoSelect option[value="+ response.dataV[0].estcod +"]").attr("selected",true);
				estadoMunicipio($('#estadoSelect'),$('#municipioSelect'),$('#parroquiaSelect'));
				$('#estadoSelect').trigger('click');
				setTimeout(function(){
					$("#municipioSelect option[value="+ response.dataV[0].muncod +"]").attr("selected",true);
					$('#municipioSelect').trigger('click');
				}, 100);
				setTimeout(function(){
					$("#parroquiaSelect option[value="+ response.dataV[0].parcod +"]").attr("selected",true);
				},150);

			}else if(response == 'failed'){
				alert('Error, no se consigue a empleado para modificar');				
			}			
		}
	});
});

$('#guardarCambioEmpleado').on('submit',function(e){
	e.preventDefault();
	let nombreGC = $('#gcnombreEmpleado');
	let apellidoGC = $('#gcapellidoEmpleado');
	let cedulaGC = $('#gccedulaEmpleado');
	let telefonoGC = $('#gctelefonoEmpleado');
	let generoGC = $('#gcgeneroEmpleado');
	let fnacGC = $('#gcfechaNacimientoEmpleado');
	let cargoGC = $('#gccargoEmpleado');
	let parroquiaGC = $('#parroquiaSelect');
	let usuarioGC = $('#gcusuarioEmpleado');
	let passwordGC = $('#gcpasswordEmpleado');
	let rolGC = $('#gcrolEmpleado');

	$.ajax({
		url: '/Empleados-Modificar',
		method: 'POST',
		data: {
			nombreGC: nombreGC.val(),
			apellidoGC: apellidoGC.val(),
			cedulaGC: cedulaGC.val(),
			telefonoGC: telefonoGC.val(),
			generoGC: generoGC.val(),
			fnacGC: fnacGC.val(),
			cargoGC: cargoGC.val(),
			parroquiaGC: parroquiaGC.val(),
			usuarioGC: usuarioGC.val(),
			passwordGC: passwordGC.val(),
			rolGC: rolGC.val()
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
				alert('El empleado NO SE PUDO MOFICAR, revisa los campos por informacion duplicada');
			}			
		}
	});
});

//Login
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


//Yacimiento
$('#addMin').on('click',function(e){
	e.preventDefault();
	listMin = $('#listMin');

	var nextID = globalIDMineralYacimiento;
				listMin.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					\n\
					<div class="col-md-4 mb-3">\n\
					  <label for="t'+nextID+'" class="boxMinText">Mineral</label>\n\
					  <select class="form-control formsCRUD" id="t'+nextID+'" required>\n\
					  	<option value="MIN_METALICO">Metalico</option>\n\
	                    <option value="MIN_NO_METALICO">No metalico</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="'+nextID+'" class="boxMinText">Mineral</label>\n\
					  <select class="form-control formsCRUD" id="'+nextID+'" required></select>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					    <label for="c'+nextID+'" class="boxMinText">Cantidad</label>\n\
					    <div class="input-group mb-2 mr-sm-2">\n\
					    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="c'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">Ton</div>\n\
					  	</div>\n\
					    </div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mb-3">\n\
					  <label for="removeMin" class="hackerText">Hacker</label>\n\
					  <button class="btn btn-danger btn-block" id="remove'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');


	mineralTipo($('#t'+nextID+''),$('#'+nextID+''));

	$('#remove'+nextID+'').on('click',function(e){
		e.preventDefault();
		$('#'+nextID+'').attr('id',(nextID)*(-1));
		boxButtonDelete = $(this).parent();
		boxMinDelete = $(boxButtonDelete).parent();
		boxMinDelete.remove();
	});

	globalIDMineralYacimiento++;

});

function verifyElementVal(){
	var start=1;
	while(globalIDMineralYacimiento>=start){
		var flag =1;
		while(globalIDMineralYacimiento>=flag){
			if(($('#'+start+'').children(":selected").val() == $('#'+flag+'').children(":selected").val()) && (flag != start) && ($('#'+start+'').children(":selected").val() !== undefined) && ($('#t'+start+'').children(":selected").val() == $('#t'+flag+'').children(":selected").val()) ){
				return false;
				start = globalIDMineralYacimiento+1;
			}else{
				flag++;
			}
		}
		start++;
	}
	return true;
}

//AGREGAR YACIMIENTOS
//Primero mostrar las presentaciones disponibles en cada drop nuevo, esto se hace en addMin
//Luego registrar con un json
$('#agregarYacimiento').on('submit',function(e){
	e.preventDefault();
	var nombreYacimiento = $('#nombreYacimiento');
	var extensionYacimiento = $('#extensionYacimiento');
	var parroquiaYacimiento = $('#parroquiaSelect');

	var start = 1;
	var minTipo = [];
	var minMin = [];
	var minCantidad = [];
	while(globalIDMineralYacimiento>=start){
		minTipo.push( $('#t'+start+'').val() );
		minMin.push( $('#'+start+'').val() );
		minCantidad.push($('#c'+start+'').val());
		start++;
	}

	if(parroquiaYacimiento.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if(verifyElementVal()==true){
			$.ajax({
			url: '/Yacimientos-Agregar',
			method: 'POST',
			data: {
				nombreYacimiento: nombreYacimiento.val(),
				extensionYacimiento: extensionYacimiento.val(),
				parroquia: parroquiaYacimiento.val(),
				minTipo: minTipo,
				minMin: minMin,
				minCantidad: minCantidad
			},
			success: function(response){
					if(response == 'great'){
						alert('El yacimiento fue registrado satisfactoriamente');
					}else{
						alert('El yacimiento no se pudo agregar, revisa los campos por informacion duplicados');
					}			
				}
			});
			alert('Fino!');
		}else{
			alert('Existen minerales repetidos, porfavor verifique el formulario para continuar!');
		}
	}
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
	window.location.href = "/Yacimientos";
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

$('#menuItemAgregarYacimiento').on('click',function(){
	window.location.href = "/Yacimientos-Agregar";
});

$('#menuItemConsultarYacimiento').on('click',function(){
	window.location.href = "/Yacimientos-Consultar";
});

$('#menuItemEliminarYacimiento').on('click',function(){
	window.location.href = "/Yacimientos-Eliminar";
});

$('#menuItemModificarYacimiento').on('click',function(){
	window.location.href = "/Yacimientos-Modificar";
});

$('#backToHome').on('click',function(){
	window.location.href = "/Home";
});

$('#backToPersonal').on('click',function(){
	window.location.href = "/Personal";
});


$('#backToProyectos').on('click',function(){
	window.location.href = "/Proyectos";
});

//Data Table
$(document).ready( function () {
    $('#table_id_empleados').DataTable();
});

$(document).ready( function () {
    $('#table_id_yacimientos').DataTable();
});

//ESTILOS
$('#userLogin').focus(function(){
	$('#userLogin').removeClass('formsFieldError');
});

$('#passwordLogin').focus(function(){
	$('#passwordLogin').removeClass('formsFieldError');
});

//LOGICA del selector de lugar
function estadoMunicipio(estado,municipio,parroquia){

	$(estado).on('click',function(){
		var selectedOption = $(this).children(":selected").val();
		$.ajax({
			url: '/lugar-estado',
			method: 'POST',
			data: {
				filtroEstado: selectedOption 
			},
			success: function(response){
				if(response[0].lug_codigo != null){
					var dropMunicipio = $(municipio);
					dropMunicipio.html('');
					for(var i=0; i < response.length; i++){
						if(response[i].lug_tipo == 'MUNICIPIO'){
							dropMunicipio.append('<option value="'+response[i].lug_codigo+'">'+response[i].lug_nombre+'</option>');
						} 
					} 
					$(municipio).trigger('click');
				}else{
					alert('Fallo filtro ESTADO-MUNICIPO');
				}			
			}
		});
	});

	$(municipio).on('click',function(){
		var selectedOption = $(this).children(":selected").val();
		$.ajax({
			url: '/lugar-municipio',
			method: 'POST',
			data: {
				filtroMunicipio: selectedOption 
			},
			success: function(response){
				if(response[0].lug_codigo != null){
					var dropParroquia = $(parroquia);
					dropParroquia.html('');
					for(var i=0; i < response.length; i++){
						if(response[i].lug_tipo == 'PARROQUIA'){
							dropParroquia.append('<option value="'+response[i].lug_codigo+'">'+response[i].lug_nombre+'</option>');
						} 
					} 
				}else if(response = 'failed'){
					alert('Fallo filtro MUNICIPIO-PARROQUIA');
				}			
			}
		});
	});
}

estadoMunicipio($('#estadoSelect'),$('#municipioSelect'),$('#parroquiaSelect'));

function mineralTipo(tipo,minerales){
	$(tipo).on('click',function(){
	var optionTipo = tipo.children(":selected").val();
		$.ajax({
			url: '/Yacimientos-AgregarMin',
			method: 'POST',
			data:{
				filtroMin: optionTipo.toString()
			},
			success: function(response){
					if(response.min != null){
						if(optionTipo == 'MIN_METALICO'){
							minerales.html('');
							for (var i = response.min.length - 1; i >= 0; i--) {
								minerales.append('<option value="'+response.min[i].met_codigo+'">'+response.min[i].met_nombre+'</option>');
							}
						}else{
							minerales.html('');
							for (var i = response.min.length - 1; i >= 0; i--) {
								minerales.append('<option value="'+response.min[i].nom_codigo+'">'+response.min[i].nom_nombre+'</option>');
							}
						}
					}	
			}
		});	
	});
}