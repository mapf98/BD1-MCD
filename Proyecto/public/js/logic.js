var globalIDMineralYacimiento = 1;


function clearArray(array){
	var start = 0;
	var k = array.length;
	while(k >= start){
		array.splice(k-start, 1);
		start++;
	}
}

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

function verifyAndOrder(a,b){
	var start = 0;
	var forDelete = [];
	while(a.length>start){
		var flag = 0;
		while(b.length >flag){
			if(a[start].id == b[flag].id ){
				a[start].c = b[flag].c;
				a[start].t = b[flag].t;
				a[start].cod = b[flag].cod;
				forDelete.push(flag);
			}else{
				console.log('no son iguales');
			}
			flag++;
		}
		start++;
	}

	for (var k = forDelete.length - 1; k >= 0; k--) {
		b.splice(forDelete[k], 1);
	}
}






// MINERALES (METALICOS Y NO METALICOS) --  DAVID

var globalIDPresentacionMineral = 1;

var globalIDMinetalMetalico = 1;

var modMet = {
    "d": [],
    "u": [],
    "i": []
} 

var modNoMet = {
    "d": [],
    "u": [],
    "i": []
} 

$(document).ready( function () {
    $('#table_id_metalicos').DataTable();
});

$(document).ready( function () {
    $('#table_id_no_metalicos').DataTable();
});

$(document).ready( function () {
    $('#table_id_ventas').DataTable();
});

$('#agregarMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreMetalico = $('#nombreMetalico');
	let escalaMaleabilidad = $('#escalaMaleabilidad');
	let escalaDureza = $('#escalaDureza');
	// let presentacionMetalico = $('#presentacionMetalico');
	// let nombrePresentacion = $('#nombrePresentacion');
	// let precioMP = $('#precioMetalicoPresentacion');


	var start = 1;
	var prePresentacion = [];
	var prePrecio = [];
	var preTipo = [];

	
	while(globalIDPresentacionMineral>=start){

		preTipo.push( $('#'+start+'').val() );
		prePresentacion.push( $('#'+start+'').val() );
		prePrecio.push($('#p'+start+'').val());
		start++;
	}

	// var startMet = 1;
	// var metMetalico = [];
	// var metProporcion = [];
	// var metTipo = [];


	// while(globalIDMinetalMetalico>=startMet){

	// 	metTipo.push( $('#'+start+'').val() );
	// 	metMetalico.push( $('#'+start+'').val() );
	// 	metProporcion.push($('#p'+start+'').val());
	// 	startMet++;
	// }

	if(escalaDureza.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if((verifyElementValPre()==true)){
			$.ajax({
			url: '/Metalicos-Agregar',
			method: 'POST',
			data: {
				nombreMetalico: nombreMetalico.val(),
				escalaMaleabilidad: escalaMaleabilidad.val(),
				escalaDureza: escalaDureza.val(),
				// presentacionMetalico: presentacionMetalico.val(),
				nombrePresentacion: prePresentacion,
				precioMP: prePrecio,
				preTipo: preTipo,
				// metMetalico: metMetalico,
				// metProporcion: metProporcion,
				// metTipo: metTipo
			},
			success: function(response){
				if(response == 'great'){
					alert('El mineral fue registrado satisfactoriamente');
				}else{
					alert('El mineral no se pudo agregar, revisa los campos');
				}			
			}
		});
			alert('Fino!');
		}else{
			alert('Existen minerales repetidos, porfavor verifique el formulario para continuar!');
		}
	}
	
});

addPre($('#addPre'),$('#listPre'));

//Presentacion
function addPre(button,list){
		button.on('click',function(e){
	e.preventDefault();
	listPre = $('#listPre');

	var nextID = globalIDPresentacionMineral;
				listPre.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxPre" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					<div class="col-md-4 mb-3">\n\
					  <label for="t'+nextID+'" class="boxMinText">Asignar</label>\n\
					  <select class="form-control formsCRUD" id="t'+nextID+'" required>\n\
					  	<option value="PRESENTACION">Presentacion</option>\n\
					  </select>\n\
					</div>\n\
					\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="'+nextID+'" class="boxMinText">Presentacion</label>\n\
					  <select class="form-control formsCRUD" id="'+nextID+'" required></select>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					    <label for="p'+nextID+'" class="boxMinText">Precio</label>\n\
					    <div class="input-group mb-2 mr-sm-2">\n\
					    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="p'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$USD</div>\n\
					  	</div>\n\
					    </div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mb-3">\n\
					  <label for="removePre" class="hackerText">Hacker</label>\n\
					  <button class="btn btn-danger btn-block" id="remove'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');


	presentacionSelect($('#t'+nextID+''),$('#'+nextID+''));

	// $('#remove'+nextID+'').on('click',function(e){
	// 	e.preventDefault();
	// 	$('#'+nextID+'').attr('id',(nextID)*(-1));
	// 	boxButtonDelete = $(this).parent();
	// 	boxMinDelete = $(boxButtonDelete).parent();
	// 	boxMinDelete.remove();
	// });

	$('#remove'+nextID+'').on('click',function(e){
			e.preventDefault();
			modMet.d.push({"cod":$('#'+nextID+'').val(),"p":$('#p'+nextID+'').val(),"id":nextID});
			$('#'+nextID+'').attr('id',(nextID)*(-1));
			$('#p'+nextID+'').attr('value',$('#p'+nextID+'').val()*0);
			boxButtonDelete = $(this).parent();
			boxMinDelete = $(boxButtonDelete).parent();
			boxDelete = $(boxMinDelete).parent();
			$(boxDelete).removeClass('fadeIn');
			$(boxDelete).addClass('fadeOut');
			setTimeout(function(){
				boxMinDelete.remove();
			},300);
		});

	globalIDPresentacionMineral++;

});
	}

addMinMet($('#addMinMet'),$('#listMinMet'));

//Presentacion
function addMinMet(button,list){
		button.on('click',function(e){
	e.preventDefault();
	listMinMet = $('#listMinMet');

	var nextID = globalIDMinetalMetalico;
				listMinMet.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxPre" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					<div class="col-md-4 mb-3">\n\
					  <label for="t'+nextID+'" class="boxMinText">Compuesto</label>\n\
					  <select class="form-control formsCRUD" id="t'+nextID+'" required>\n\
					  	<option value="MIN_METALICO">Metalico</option>\n\
					  </select>\n\
					</div>\n\
					\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="'+nextID+'" class="boxMinText">Mineral</label>\n\
					  <select class="form-control formsCRUD" id="'+nextID+'" required></select>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					    <label for="p'+nextID+'" class="boxMinText">Proporcion</label>\n\
					    <div class="input-group mb-2 mr-sm-2">\n\
					    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="p'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$USD</div>\n\
					  	</div>\n\
					    </div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mb-3">\n\
					  <label for="removePre" class="hackerText">Hacker</label>\n\
					  <button class="btn btn-danger btn-block" id="remove'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');


	metalicoSelect($('#t'+nextID+''),$('#'+nextID+''));

	// $('#remove'+nextID+'').on('click',function(e){
	// 	e.preventDefault();
	// 	$('#'+nextID+'').attr('id',(nextID)*(-1));
	// 	boxButtonDelete = $(this).parent();
	// 	boxMinDelete = $(boxButtonDelete).parent();
	// 	boxMinDelete.remove();
	// });

	$('#remove'+nextID+'').on('click',function(e){
			e.preventDefault();
			modMet.d.push({"cod":$('#'+nextID+'').val(),"p":$('#p'+nextID+'').val(),"id":nextID});
			$('#'+nextID+'').attr('id',(nextID)*(-1));
			$('#p'+nextID+'').attr('value',$('#p'+nextID+'').val()*0);
			boxButtonDelete = $(this).parent();
			boxMinDelete = $(boxButtonDelete).parent();
			boxDelete = $(boxMinDelete).parent();
			$(boxDelete).removeClass('fadeIn');
			$(boxDelete).addClass('fadeOut');
			setTimeout(function(){
				boxMinDelete.remove();
			},300);
		});

	globalIDMinetalMetalico++;

});
	}

$('#eliminarMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreMetalico = $('#nombreMetalico');

	$.ajax({
		url: '/Metalicos-Eliminar',
		method: 'POST',
		data: {
			nombreMetalico: nombreMetalico.val(),
		},
		success: function(response){
			if(response == 'great'){
				alert('El mineral metálico fue ELIMINADO satisfactoriamente');
			}else{
				alert('El empleado NO SE PUDO ELIMINAR, revisa los campos');
			}			
		}
	});
});



$('#verificarMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreMetalicoV = $('#nombreMetalicoVerificar');

	$.ajax({
		url: '/Metalicos-Verificar',
		method: 'POST',
		data: {
			nombreMetV: nombreMetalicoV.val(),
		},
		success: function(response){
			if(response.dataV != null){

				var boxModMet = $('#guardarCambioMetalico');

				boxModMet.html('');
				boxModMet.append(' \n\
					<div class="animated" id="boxGC">\n\
	                    <div class="form-row animated fadeIn animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gccodigo">Código</label>\n\
	                        <input type="number" class="form-control formsCRUD" id="gccodigo" value="'+response.dataV[0].met_codigo+'" disabled>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcnombreMetalico">Nombre</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcnombreMetalico" value="'+response.dataV[0].met_nombre+'" disabled>\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcmaleabilidad">Escala de Maleabilidad</label>\n\
	                        <input type="number" class="form-control formsCRUD" id="gcmaleabilidad" value="'+response.dataV[0].met_escalamaleabilidad+'" required>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcdureza">Escala de Dureza</label>\n\
	                        <input type="number" class="form-control formsCRUD" id="gcdureza" value="'+response.dataV[0].met_escaladureza+'" required>\n\
	                      </div>\n\
	                    </div>\n\
	                    <hr>\n\
						<div class="row">\n\
	                    <div class="col-4"></div>\n\
						<div class="col-4">\n\
						<button class="btn btn-success btn-block" id="addPre">Asignar presentacion</button>\n\
						</div>\n\
						<div class="col-4"></div>\n\
						</div>\n\
						<div class="listPre" id="listPre">\n\
						</div>\n\
						</div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	                </div>');

				// selectEstatus = $('#gcestatus');
				// selectEstatus.html('');
				// for (var i = response.estatuses.length - 1; i >= 0; i--) {
				// 	selectEstatus.append('<option value="'+response.estatuses[i].est_codigo+'">'+response.estatuses[i].est_nombre+'</option>');
				// }
				// $("#gcestatus option[value="+ response.dataV[0].est_codigo +"]").attr("selected",true);

				addPre($('#addPre'),$('#listPre'));

				function setPre(t,k){
					setTimeout(function(){
						$('#'+t+' option[value='+k+']').attr('selected',true);
					},150);
				}

				var pre=0;
				while(response.preMet.length>pre){
					if(response.preMet[pre].fk_mp_metalico == response.dataV[0].met_codigo){
						$('#addPre').trigger('click');
						$('#t'+(globalIDPresentacionMineral-1)+'').trigger('click');
						setPre(globalIDPresentacionMineral-1,response.preMet[pre].pre_codigo);
						$('#p'+(globalIDPresentacionMineral-1)+'').attr("value",response.preMet[pre].mp_precio);
						modMet.u.push({"cod":response.preMet[pre].pre_codigo,"p":response.preMet[pre].mp_precio,"id":globalIDPresentacionMineral-1,"o":response.preMet[pre].pre_codigo});
					}
					pre++;
				}
				

			}else if(response == 'failed'){
				alert('Error, no se consigue a mineral para modificar');				
			}			
		}
	});
});

$('#guardarCambioMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreGC = $('#gcnombreMetalico');
	let maleabilidadGC = $('#gcmaleabilidad');
	let durezaGC = $('#gcdureza');
	let codigoGC = $('#gccodigo');

	var start = 1;
	clearArray(modMet.i);
	while(globalIDPresentacionMineral>=start){
		if($('#'+start+'').val() > 0){
			var cod =$('#'+start+'').val();
			var p = $('#p'+start+'').val();
			
			modMet.i.push({"cod": cod ,"p": p, "id":start});
		}
		start++;		
	}

	verifyAndOrderMet(modMet.u,modMet.i);
	verifyAndOrderMet(modMet.d,modMet.u);

	console.log('Por modificar');
	var test =0;
	while(modMet.u.length>test){
		console.log(modMet.u[test].p + "/"+modMet.u[test].cod );
		test++;
	}

	console.log('Por insertar');
	var test =0;
	while(modMet.i.length>test){
		console.log(modMet.i[test].p+ "/"+modMet.i[test].cod);
		test++;
	}

	console.log('Eliminados');
	var test =0;
	while(modMet.d.length>test){
		console.log(modMet.d[test].p+ "/"+modMet.d[test].cod);
		test++;
	}

	$.ajax({
		url: '/Metalicos-Modificar',
		method: 'POST',
		data: {
			codigoGC: codigoGC.val(),
			nombreGC: nombreGC.val(),
			maleabilidadGC: maleabilidadGC.val(),
			durezaGC: durezaGC.val(),
			modMet: modMet

		},
		success: function(response){
			if(response == 'great'){
				alert('El mineral fue MODIFICADO satisfactoriamente');
				var boxGCMet = $('#boxGC');
				boxGCMet.addClass('fadeOut');
				boxGCMet.html('');
				var boxModMet = $('#guardarCambioMetalico');
				boxModMet.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un mineral para modificar su ficha</h4>\n\
                      <p class="text-center"><i class="fas fa-address-card iconMod"></i></p>\n\
                    </div>\n\
				`);
				globalIDPresentacionMineral =1;
				clearArray(modMet.i);
				clearArray(modMet.d);
				clearArray(modMet.u);
			}else{
				alert('El mineral NO SE PUDO MOFICAR, revisa los campos');
			}			
		}
	});
});

$('#agregarNoMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreNoMetalico = $('#nombreNoMetalico');
	let utilidadNoMetalico = $('#utilidadNoMetalico');

	var start = 1;
	var prePresentacion = [];
	var prePrecio = [];
	var preTipo = [];
	
	while(globalIDPresentacionMineral>=start){

		preTipo.push( $('#'+start+'').val() );
		prePresentacion.push( $('#'+start+'').val() );
		prePrecio.push($('#p'+start+'').val());
		start++;
	}

	if(utilidadNoMetalico.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if(verifyElementValPre()==true){
			$.ajax({
			url: '/NoMetalicos-Agregar',
			method: 'POST',
			data: {
				nombreNoMetalico: nombreNoMetalico.val(),
				utilidadNoMetalico: utilidadNoMetalico.val(),
				// presentacionMetalico: presentacionMetalico.val(),
				nombrePresentacion: prePresentacion,
				precioMP: prePrecio,
				preTipo: preTipo
			},
			success: function(response){
				if(response == 'great'){
					alert('El mineral fue registrado satisfactoriamente');
				}else{
					alert('El mineral no se pudo agregar, revisa los campos');
				}			
			}
		});
			alert('Fino!');
		}else{
			alert('Existen minerales repetidos, porfavor verifique el formulario para continuar!');
		}
	}
	
});

$('#eliminarNoMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreNoMetalico = $('#nombreNoMetalico');

	$.ajax({
		url: '/NoMetalicos-Eliminar',
		method: 'POST',
		data: {
			nombreNoMetalico: nombreNoMetalico.val(),
		},
		success: function(response){
			if(response == 'great'){
				alert('El mineral no metálico fue ELIMINADO satisfactoriamente');
			}else{
				alert('El mineral NO SE PUDO ELIMINAR, revisa los campos');
			}			
		}
	});
});

$('#verificarNoMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreNoMetalicoV = $('#nombreNoMetalicoVerificar');

	$.ajax({
		url: '/NoMetalicos-Verificar',
		method: 'POST',
		data: {
			nombreNoMetV: nombreNoMetalicoV.val(),
		},
		success: function(response){
			if(response.dataV != null){

				var boxModNoMet = $('#guardarCambioNoMetalico');

				boxModNoMet.html('');
				boxModNoMet.append(' \n\
					<div class="animated" id="boxGC">\n\
	                    <div class="form-row animated fadeIn animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gccodigo">Código</label>\n\
	                        <input type="number" class="form-control formsCRUD" id="gccodigo" value="'+response.dataV[0].nom_codigo+'" disabled>\n\
	                      </div>\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcnombreNoMetalico">Nombre</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcnombreNoMetalico" value="'+response.dataV[0].nom_nombre+'" disabled>\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-6 mb-3">\n\
	                        <label for="gcutilidad">Utilidad</label>\n\
	                        <input type="text" class="form-control formsCRUD" id="gcutilidad" value="'+response.dataV[0].nom_utilidad+'" required>\n\
	                      </div>\n\
	                    </div>\n\
	                    <hr>\n\
						<div class="row">\n\
	                    <div class="col-4"></div>\n\
						<div class="col-4">\n\
						<button class="btn btn-success btn-block" id="addPre">Asignar presentacion</button>\n\
						</div>\n\
						<div class="col-4"></div>\n\
						</div>\n\
						<div class="listPre" id="listPre">\n\
						</div>\n\
						</div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	                </div>');

				// selectEstatus = $('#gcestatus');
				// selectEstatus.html('');
				// for (var i = response.estatuses.length - 1; i >= 0; i--) {
				// 	selectEstatus.append('<option value="'+response.estatuses[i].est_codigo+'">'+response.estatuses[i].est_nombre+'</option>');
				// }
				// $("#gcestatus option[value="+ response.dataV[0].est_codigo +"]").attr("selected",true);

				addPre($('#addPre'),$('#listPre'));

				function setPre(t,k){
					setTimeout(function(){
						$('#'+t+' option[value='+k+']').attr('selected',true);
					},150);
				}

				var pre=0;
				while(response.preNoMet.length>pre){
					if(response.preNoMet[pre].fk_mp_nometalico == response.dataV[0].nom_codigo){
						$('#addPre').trigger('click');
						$('#t'+(globalIDPresentacionMineral-1)+'').trigger('click');
						setPre(globalIDPresentacionMineral-1,response.preNoMet[pre].pre_codigo);
						$('#p'+(globalIDPresentacionMineral-1)+'').attr("value",response.preNoMet[pre].mp_precio);
						modNoMet.u.push({"cod":response.preNoMet[pre].pre_codigo,"p":response.preNoMet[pre].mp_precio,"id":globalIDPresentacionMineral-1,"o":response.preNoMet[pre].pre_codigo});
					}
					pre++;
				}
				

			}else if(response == 'failed'){
				alert('Error, no se consigue a mineral para modificar');				
			}			
		}
	});
});

$('#guardarCambioNoMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreGC = $('#gcnombreNoMetalico');
	let utilidadGC = $('#gcutilidad');
	let codigoGC = $('#gccodigo');

	console.log(nombreGC.val() + utilidadGC.val() + codigoGC.val());

	var start = 1;
	clearArray(modNoMet.i);
	while(globalIDPresentacionMineral>=start){
		if($('#'+start+'').val() > 0){
			var cod =$('#'+start+'').val();
			var p = $('#p'+start+'').val();
			modNoMet.i.push({"cod": cod ,"p": p ,"id":start});
		}
		start++;		
	}

	verifyAndOrder(modNoMet.u,modNoMet.i);
	verifyAndOrder(modNoMet.d,modNoMet.u);

	console.log('Por modificar');
	var test =0;
	while(modNoMet.u.length>test){
		console.log(modNoMet.u[test].t + "/"+ modNoMet.u[test].p + "/"+modNoMet.u[test].cod );
		test++;
	}

	console.log('Por insertar');
	var test =0;
	while(modNoMet.i.length>test){
		console.log(modNoMet.i[test].t + "="+modNoMet.i[test].p+ "/"+modNoMet.i[test].cod);
		test++;
	}

	console.log('Eliminados');
	var test =0;
	while(modNoMet.d.length>test){
		console.log(modNoMet.d[test].t + "="+modNoMet.d[test].p+ "/"+modNoMet.d[test].cod);
		test++;
	}

	$.ajax({
		url: '/NoMetalicos-Modificar',
		method: 'POST',
		data: {
			codigoGC: codigoGC.val(),
			nombreGC: nombreGC.val(),
			utilidadGC: utilidadGC.val(),
			modNoMet: modNoMet

		},
		success: function(response){
			if(response == 'great'){
				alert('El mineral fue MODIFICADO satisfactoriamente');
				console.log("hola");
				var boxGCNoMet = $('#boxGC');
				boxGCNoMet.addClass('fadeOut');
				boxGCNoMet.html('');
				var boxmodNoMet = $('#guardarCambioNoMetalico');
				boxmodNoMet.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un mineral para modificar su ficha</h4>\n\
                      <p class="text-center"><i class="fas fa-address-card iconMod"></i></p>\n\
                    </div>\n\
				`);
				globalIDPresentacionMineral =1;
				clearArray(modNoMet.i);
				clearArray(modNoMet.d);
				clearArray(modNoMet.u);
			}else{
				alert('El mineral NO SE PUDO MOFICAR, revisa los campos');
			}			
		}
	});
});


$('#menuItemMinerales').on('click',function(){
	window.location.href = "/minerales";
});

$('#menuItemMetalicos').on('click',function(){
	window.location.href = "/metalicos";
});

$('#menuItemNoMetalicos').on('click',function(){
	window.location.href = "/nometalicos";
});

$('#menuItemAgregarMetalico').on('click',function(){
	window.location.href = "/Metalicos-Agregar";
});

$('#menuItemAgregarNoMetalico').on('click',function(){
	window.location.href = "/NoMetalicos-Agregar";
});

$('#menuItemConsultarMetalico').on('click',function(){
	window.location.href = "/Metalicos-Consultar";
});

$('#menuItemConsultarNoMetalico').on('click',function(){
	window.location.href = "/NoMetalicos-Consultar";
});

$('#menuItemModificarMetalico').on('click',function(){
	window.location.href = "/Metalicos-Modificar";
});

$('#menuItemModificarNoMetalico').on('click',function(){
	window.location.href = "/NoMetalicos-Modificar";
});


$('#menuItemEliminarMetalico').on('click',function(){
	window.location.href = "/Metalicos-Eliminar";
});

$('#menuItemEliminarNoMetalico').on('click',function(){
	window.location.href = "/NoMetalicos-Eliminar";
});


$('#backToMinerales').on('click',function(){
	window.location.href = "/Minerales";
});



function verifyElementValPre(){
	var start=1;
	while(globalIDPresentacionMineral>=start){
		var flag =1;
		while(globalIDPresentacionMineral>=flag){
			if(($('#'+start+'').children(":selected").val() == $('#'+flag+'').children(":selected").val()) && (flag != start) && ($('#'+start+'').children(":selected").val() !== undefined)  ){
				return false;
				start = globalIDPresentacionMineral+1;
			}else{
				flag++;
			}
		}
		start++;
	}
	return true;
}

function presentacionSelect(tipo,presentaciones){
	$(tipo).on('click',function(){
	var optionTipo = tipo.children(":selected").val();
		$.ajax({
			url: '/Metalicos-AgregarPre',
			method: 'POST',
			data:{
				filtroPre: optionTipo.toString()
			},
			success: function(response){
					if(response.pre != null){
						
							presentaciones.html('');
							for (var i = response.pre.length - 1; i >= 0; i--) {
								presentaciones.append('<option value="'+response.pre[i].pre_codigo+'">'+response.pre[i].pre_nombre+'</option>');
							}
						
					}	
			}
		});	
	});
}




// function verifyElementValMinMet(){
// 	var start=1;
// 	while(globalIDMinetalMetalico>=start){
// 		var flag =1;
// 		while(globalIDMinetalMetalico>=flag){
// 			if(($('#'+start+'').children(":selected").val() == $('#'+flag+'').children(":selected").val()) && (flag != start) && ($('#'+start+'').children(":selected").val() !== undefined)  ){
// 				return false;
// 				start = globalIDMinetalMetalico+1;
// 			}else{
// 				flag++;
// 			}
// 		}
// 		start++;
// 	}
// 	return true;
// }

// // function metalicoSelect(tipo,metalicos){
// // 	$(tipo).on('click',function(){
// // 	var optionTipo = tipo.children(":selected").val();
// // 		$.ajax({
// // 			url: '/Metalicos-AgregarMinMet',
// // 			method: 'POST',
// // 			data:{
// // 				filtroMinMet: optionTipo.toString()
// // 			},
// // 			success: function(response){
// // 					if(response.met != null){
						
// // 							metalicos.html('');
// // 							for (var i = response.met.length - 1; i >= 0; i--) {
// // 								metalicos.append('<option value="'+response.met[i].met_codigo+'">'+response.met[i].met_nombre+'</option>');
// // 							}
						
// // 					}	
// // 			}
// // 		});	
// // 	});
// // }


// function verifyAndOrderMet(a,b){
// 	var start = 0;
// 	var forDelete = [];
// 	while(a.length>start){
// 		var flag = 0;
// 		while(b.length >flag){
// 			if(a[start].id == b[flag].id ){
// 				a[start].p = b[flag].p;
// 				// a[start].t = b[flag].t;
// 				a[start].cod = b[flag].cod;
// 				forDelete.push(flag);
// 			}else{
// 				console.log('no son iguales');
// 			}
// 			flag++;
// 		}
// 		start++;
// 	}

// 	for (var k = forDelete.length - 1; k >= 0; k--) {
// 		b.splice(forDelete[k], 1);
// 	}
// }

