var globalIDMineralYacimiento = 1;
var globalIDExplotacionEtapa = 1;
var globalIDExplotacionEtapaR = 0;
var globalIDExplotacionFase = 1;
var globalIDExplotacionFaseR = 0;
var globalIDCargo = 1;
var globalIDCargoR = 0;
var globalIDMaquinaria = 1;
var uE = false;
var nU = false;
var dU = false;

var modYac = {
    "d": [],
    "u": [],
    "i": []
} 

var dataConfig = {
	"yac": "",
	"dur": 0,
	"estimado":0,
    "e": []
} 




//DEFINICION DEL JSON 

// var dataConfig = {
// 	"yac": "codigo",
//     "e": [{"f":[ { "c":[{"cod":"","q":"","sueldo":""}] , "m":[{"cod":"","q":"","costo":""}] ,"nF":"nombreFase","estF":""} ],"nE":"NOMBRETAPA","estE":""}]
// } 

// console.log(dataConfig.e[0].nE);

//onsole.log(dataConfig.e);

// console.log(dataConfig.yac);
// console.log(dataConfig.e[0]);

// dataConfig.e.push({"f":[]});

// console.log(dataConfig.e[1].f);

// dataConfig.e[1].f.push({"c":[],"m":[]});

// dataConfig.e[1].f[0].c.push({"cod":"c1l","q":"co1"});

// console.log(dataConfig.e[1].f[0].c[0].cod);

/*modYac.d.push({"n":"vitrita","cod":220});
modYac.d.push({"n":"vitritdsda","cod":2223});
modYac.u.push({"n":"vitritax","cod":221,"c":1100});
modYac.i.push({"n":"vitritaz","cod":222,"c":10000});

console.log(modYac.d[0].n);
console.log(modYac.u[0].n);
console.log(modYac.i[0].n);

clearArray(modYac.d);*/

function clearArray(array){
	var start = 0;
	var k = array.length;
	while(k >= start){
		array.splice(k-start, 1);
		start++;
	}
}

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
				alert('El empleado NO SE PUDO ELIMINAR, verifique que la cedula exista');
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
			cedulaEmpV: cedulaEmpleadoV.val()
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
	                    <div class="form-row animated fadeIn">\n\
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
				
				console.log(response.sinU);

				selectRol = $('#gcrolEmpleado');
				selectRol.html('');
				for (var i = response.roles.length - 1; i >= 0; i--) {
					selectRol.append('<option value="'+response.roles[i].rol_codigo+'">'+response.roles[i].rol_nombre+'</option>');
				}

				if(response.sinU == true){
					console.log('El empleado no tiene usuario');
					$('#gcusuarioEmpleado').attr('value',"");
					$('#gcpasswordEmpleado').attr('value',"");
				}else{
					$("#gcrolEmpleado option[value="+ response.dataV[0].rol_codigo +"]").attr("selected",true);
					uE = true;
				}

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

	if((passwordGC.val() != "" && usuarioGC.val() == "") || (passwordGC.val() == "" && usuarioGC.val() != "")){
		alert('Completa el formulario de usuario o deja en blanco los campos');
	}else{
		if(uE == false && passwordGC.val() != "" && usuarioGC.val() != ""){
			nU = true; 
		}

		if(uE == true && passwordGC.val() == "" && usuarioGC.val() == ""){
			dU = true; 
		}

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
				rolGC: rolGC.val(),
				uE: uE,
				nU: nU,
				dU: dU
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
				    uE = false;
				    nU = false;
				    dU = false;
				}else{
					alert('El empleado NO SE PUDO MOFICAR, revisa los campos por informacion duplicada');
					uE = false;
				    nU = false;
				    dU = false;
				}			
			}
		});
	}	
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

addMin($('#addMin'),$('#listMin'));

function addMin(button,list){
		button.on('click',function(e){
		e.preventDefault();
		listMin = list;

		var nextID = globalIDMineralYacimiento;
					listMin.append(' \n\
						<div class="boxAgregarMinID animated fadeIn" id="boxAddMin" value="'+nextID+'">\n\
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
			modYac.d.push({"cod":$('#'+nextID+'').val(),"c":$('#c'+nextID+'').val(),"t":$('#t'+nextID+'').val(),"id":nextID});
			$('#'+nextID+'').attr('id',(nextID)*(-1));
			$('#c'+nextID+'').attr('value',$('#c'+nextID+'').val()*0);
			boxButtonDelete = $(this).parent();
			boxMinDelete = $(boxButtonDelete).parent();
			boxDelete = $(boxMinDelete).parent();
			$(boxDelete).removeClass('fadeIn');
			$(boxDelete).addClass('fadeOut');
			setTimeout(function(){
				boxMinDelete.remove();
			},300);
		});

		globalIDMineralYacimiento++;
		});
}

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

function verifyMin(){
	var start=1;
	var ready = false;
	while(globalIDMineralYacimiento>=start){
		if($('#'+start+'').children(":selected").val() != null){
			ready = true;
			start = globalIDMineralYacimiento+1;
		}else{
			start++;
		}
	}
	return ready;
}

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
		if($('#'+start+'').val() > 0){
			minTipo.push( $('#t'+start+'').val() );
			minMin.push( $('#'+start+'').val() );
			minCantidad.push($('#c'+start+'').val());
		}
		start++;		
	}

	if(parroquiaYacimiento.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if(verifyElementVal()==true && verifyMin()==true){
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
			alert('Existen minerales repetidos o no ha asignado al menos un mineral, porfavor verifique el formulario para continuar!');
		}
	}
});

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
	window.location.href = "/Explotaciones";
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

$('#menuItemAgregarConfiguracion').on('click',function(){
	window.location.href = "/Explotaciones-Configuracion-Agregar";
});

$('#menuItemConsultarConfiguracion').on('click',function(){
	window.location.href = "/Explotaciones-Configuracion-Consultar";
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

$('#menuItemAgregarExplotacion').on('click',function(){
	window.location.href = "/Explotacion-Agregar";
});

$('#menuItemConsultarExplotacion').on('click',function(){
	window.location.href = "/Explotacion-Consultar";
});

$('#menuItemEliminarExplotacion').on('click',function(){
	window.location.href = "/Explotacion-Eliminar";
});

$('#menuItemModificarExplotacion').on('click',function(){
	window.location.href = "/Explotacion-Modificar";
});

$('#menuItemAgregarConfiguracionExplotacion').on('click',function(){
	window.location.href = "/Explotacion-Configuracion";
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

$('#backToExplotaciones').on('click',function(){
	window.location.href = "/Explotaciones";
});

//Data Table
$(document).ready( function () {
    $('#table_id_empleados').DataTable();
});

$(document).ready( function () {
    $('#table_id_yacimientos').DataTable();
});

$(document).ready( function () {
    $('#table_id_configuraciones').DataTable();
});

$(document).ready( function () {
    $('#table_id_detalleConfiguracion').DataTable();
});

//ESTILOS
$('#userLogin').focus(function(){
	$('#userLogin').removeClass('formsFieldError');
});

$('#passwordLogin').focus(function(){
	$('#passwordLogin').removeClass('formsFieldError');
});

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
	console.log(optionTipo);
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

$('#eliminarYacimiento').on('submit',function(e){
	e.preventDefault();
	let nombreYacimiento = $('#nombreYacimientoEliminar');

	$.ajax({
		url: '/Yacimientos-Eliminar',
		method: 'POST',
		data: {
			nombreYac: nombreYacimiento.val(),
		},
		success: function(response){
			if(response == 'great'){
				alert('El yacimiento fue ELIMINADO satisfactoriamente');
			}else{
				alert('El yacimiento NO SE PUDO ELIMINAR, revisa los campos por informacion duplicada');
			}			
		}
	});
});

$('#verificarYacimiento').on('submit',function(e){
	e.preventDefault();
	let nombreYacimientoV = $('#nombreYacimientoVerificar');

	$.ajax({
		url: '/Yacimientos-Verificar',
		method: 'POST',
		data: {
			yacimientoV: nombreYacimientoV.val()
		},
		success: function(response){
			if(response.dataV != null){
				var boxModYac = $('#guardarCambioYacimiento');

				boxModYac.html('');
				boxModYac.append('<div class="animated fadeIn" id="boxGC">\n\
				<div class="form-row animated fadeIn">\n\
				<div class="col-md-6 mb-3">\n\
				<label for="gcnombreYacimiento">Nombre yacimiento</label>\n\
				<input type="text" class="form-control formsCRUD" id="gcnombreYacimiento" value="'+response.dataV[0].yac_nombre+'" disabled>\n\
				</div>\n\
				<div class="col-md-6 mb-3">\n\
				<label for="gcextensionYacimiento">Extensión (kmts2)</label>\n\
				<input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="gcextensionYacimiento" value="'+response.dataV[0].yac_extension+'" required>\n\
				</div>\n\
				</div>\n\
				<hr>\n\
				<div class="form-row animated fadeIn">\n\
				<div class="col-md-3 mb-3">\n\
				<label for="gcestatusYacimiento">Estatus</label>\n\
				<select class="form-control formsCRUD" id="gcestatusYacimiento" required>\n\
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
				<hr>\n\
				<div class="row">\n\
				<div class="col-4"></div>\n\
				<div class="col-4">\n\
				<button class="btn btn-success btn-block" id="addMin">Asignar mineral</button>\n\
				</div>\n\
				<div class="col-4"></div>\n\
				</div>\n\
				<div class="listMin" id="listMin">\n\
				</div>\n\
				<button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	            </div>');

				selectEstatus = $('#gcestatusYacimiento');
				selectEstatus.html('');
				for (var i = response.estatus.length - 1; i >= 0; i--) {
					selectEstatus.append('<option value="'+response.estatus[i].est_codigo+'">'+response.estatus[i].est_nombre+'</option>');
				}
				$("#gcestatusYacimiento option[value="+ response.dataV[0].est_codigo +"]").attr("selected",true);

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

				addMin($('#addMin'),$('#listMin'));

				function setMin(t,k){
					setTimeout(function(){
						$('#'+t+' option[value='+k+']').attr('selected',true);
					},150);
				}

				var met=0;
				while(response.metYac.length>met){
					if(response.metYac[met].fk_ym_yacimiento == response.dataV[0].yac_codigo){
						$('#addMin').trigger('click');
						$('#t'+(globalIDMineralYacimiento-1)+'').trigger('click');
						setMin(globalIDMineralYacimiento-1,response.metYac[met].met_codigo);
						$('#c'+(globalIDMineralYacimiento-1)+'').attr("value",response.metYac[met].ym_cantidad);
						modYac.u.push({"cod":response.metYac[met].met_codigo,"c":response.metYac[met].ym_cantidad,"t":"MIN_METALICO","id":globalIDMineralYacimiento-1,"o":response.metYac[met].met_codigo});
					}
					met++;
				}

				var nom=0;
				while(response.nomYac.length>nom){
					if(response.nomYac[nom].fk_ym_yacimiento == response.dataV[0].yac_codigo){
						$('#addMin').trigger('click');
						$('#t'+(globalIDMineralYacimiento-1)+' option[value="MIN_NO_METALICO"]').attr('selected',true);
						$('#t'+(globalIDMineralYacimiento-1)+'').trigger('click');		
						setMin(globalIDMineralYacimiento-1,response.nomYac[nom].nom_codigo);		
						$('#c'+(globalIDMineralYacimiento-1)+'').attr("value",response.nomYac[nom].ym_cantidad);
						modYac.u.push({"cod":response.nomYac[nom].nom_codigo,"c":response.nomYac[nom].ym_cantidad,"t":"MIN_NO_METALICO","id":globalIDMineralYacimiento-1,"o":response.nomYac[nom].nom_codigo});
					}
					nom++;
				}

			}else if(response == 'failed'){
				alert('Error, no se consigue a yacimiento para modificar');				
			}			
		}
	});
});

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

function checkInserts(a,b){

}

$('#guardarCambioYacimiento').on('submit',function(e){
	e.preventDefault();
	var nombreYacimiento = $('#gcnombreYacimiento');
	var extensionYacimiento = $('#gcextensionYacimiento');
	var parroquiaYacimiento = $('#parroquiaSelect');
	var estatusYacimiento = $('#gcestatusYacimiento');

	var start = 1;
	clearArray(modYac.i);
	while(globalIDMineralYacimiento>=start){
		if($('#'+start+'').val() > 0){
			var cod =$('#'+start+'').val();
			var c = $('#c'+start+'').val();
			var t = $('#t'+start+'').val();
			modYac.i.push({"cod": cod ,"c": c , "t": t,"id":start});
		}
		start++;		
	}

	verifyAndOrder(modYac.u,modYac.i);
	verifyAndOrder(modYac.d,modYac.u);

	console.log('Por modificar');
	var test =0;
	while(modYac.u.length>test){
		console.log(modYac.u[test].t + "/"+ modYac.u[test].c + "/"+modYac.u[test].cod );
		test++;
	}

	console.log('Por insertar');
	var test =0;
	while(modYac.i.length>test){
		console.log(modYac.i[test].t + "="+modYac.i[test].c+ "/"+modYac.i[test].cod);
		test++;
	}

	console.log('Eliminados');
	var test =0;
	while(modYac.d.length>test){
		console.log(modYac.d[test].t + "="+modYac.d[test].c+ "/"+modYac.d[test].cod);
		test++;
	}

	$.ajax({
		url: '/Yacimientos-Modificar',
		method: 'POST',
		data: {
			nYac: nombreYacimiento.val(),
			eYac: extensionYacimiento.val(),
			pYac: parroquiaYacimiento.val(),
			estYac: estatusYacimiento.val(),
			modYac: modYac
		},
		success: function(response){
			if(response == 'great'){
				alert('El yacimiento fue MODIFICADO satisfactoriamente');
				var boxGCEmp = $('#boxGC');
				boxGCEmp.addClass('fadeOut');
				boxGCEmp.html('');
				var boxModEmp = $('#guardarCambioYacimiento');
				boxModEmp.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un yacimiento para modificar su registro</h4>\n\
                      <p class="text-center"><i class="fas fa-toolbox iconMod"></i></p>\n\
                    </div>\n\
				`);
				globalIDMineralYacimiento =1;
				clearArray(modYac.i);
				clearArray(modYac.d);
				clearArray(modYac.u);
			}else{
				alert('El yacimiento NO SE PUDO MOFICAR, revisa los campos por informacion duplicada');
			}			
		}
	});
});



////////////////////////////////////  EXPLOTACION  ///////////////////////////////////////////////////

addEtapa($('#addEtapa'),$('#listEtapa'));

function addEtapa(button,list){
	button.on('click',function(e){
			e.preventDefault();
			listEtapa = list;

			var nextID = globalIDExplotacionEtapa;
			listEtapa.append('\n\
					<div class="newEtapa animated fadeIn" id="'+nextID+'">\n\
					<div class="form-row">\n\
					<div class="col-md-2 mb-3">\n\
					<h3 class="text-center textEtapa">Etapa</h3>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					<label for="en'+nextID+'" class="textEtapa">Nombre de la etapa</label>\n\
					<input type="text" class="form-control formsCRUD" id="en'+nextID+'" required>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					<label for="ee'+nextID+'" class="textEtapa">Estimado (Bs)</label>\n\
					<input type="number" min="0.01" step="0.01" value="0" class="form-control formsCRUD" id="ee'+nextID+'" disabled>\n\
					</div>\n\
					<div class="col-md-2 mb-3">\n\
					<label for="re'+nextID+'" class="hackerText">Hacker</label>\n\
					<button class="btn btn-danger btn-block" id="re'+nextID+'" >X</button>\n\
					</div>\n\
					</div>\n\
					<hr class="hretapa">\n\
					<div class="row">\n\
					<div class="col-4"></div>\n\
					<div class="col-4">\n\
					<button class="btn btn-success btn-block" id="addFe'+nextID+'">Agregar una nueva fase</button>\n\
					</div>\n\
					<div class="col-4"></div>\n\
					</div>\n\
					<hr class="hretapa">\n\
					<div class="listFase" id="listFe'+nextID+'">\n\
					</div>\n\
					</div>\n\
			');

			addFase($('#addFe'+nextID+''),$('#listFe'+nextID+''),nextID);

			$('#re'+nextID+'').on('click',function(e){
				e.preventDefault();
				$('#en'+nextID+'').attr('value','xxkkzz');
				boxButtonDelete = $(this).parent();
				boxMinDelete = $(boxButtonDelete).parent();
				boxDelete = $(boxMinDelete).parent();
				$(boxDelete).removeClass('fadeIn');
				$(boxDelete).addClass('fadeOut');
				removeUpExp($('#ee'+nextID+'').val());
				setTimeout(function(){
					globalIDExplotacionEtapaR++;
					boxDelete.remove();
				},300);
			});

			globalIDExplotacionEtapa++;
	});
}

function addFase(button,list,etapa){
	var globalFase =1;
	button.on('click',function(e){
			e.preventDefault();
			listFase = list;;

			var nextID = globalFase;
			listFase.append('\n\
				<div class="newFase animated fadeIn" id="e'+etapa+'f'+nextID+'">\n\
				<div class="form-row">\n\
				<div class="col-md-2 mb-3">\n\
				<h3 class="text-center textEtapa">Fase</h3>\n\
				</div>\n\
				<div class="col-md-4 mb-3">\n\
				<label for="e'+etapa+'fn'+nextID+'" class="textEtapa">Nombre de la fase</label>\n\
				<input type="text" class="form-control formsCRUD" id="e'+etapa+'fn'+nextID+'" required>\n\
				</div>\n\
				<div class="col-md-4 mb-3">\n\
				<label for="e'+etapa+'fe'+nextID+'" class="textEtapa">Estimado (Bs)</label>\n\
				<input type="text" class="form-control min="0.01" step="0.01" value="0" formsCRUD" id="e'+etapa+'fe'+nextID+'" disabled>\n\
				</div>\n\
				<div class="col-md-2 mb-3">\n\
				<label for="re'+etapa+'f'+nextID+'" class="hackerText">Hacker</label>\n\
				<button class="btn btn-danger btn-block" id="re'+etapa+'f'+nextID+'" >Eliminar</button>\n\
				</div>\n\
				</div>\n\
				<hr class="hretapa">\n\
				\n\
				<div class="container-fluid">\n\
				<div class="row">\n\
				<div class="col-md-6 mb-3">\n\
				<button class="btn btn-warning btn-block" id="addCe'+etapa+'f'+nextID+'">Agregar un nueva Cargo</button>\n\
				<hr class="hretapa">\n\
				<div class="listCargo" id="e'+etapa+'listCf'+nextID+'">\n\
				</div>\n\
				</div>\n\
				<div class="col-md-6 mb-3">\n\
				<button class="btn btn-warning btn-block" id="addMe'+etapa+'f'+nextID+'">Agregar una nueva Maquinaria</button>\n\
				<hr class="hretapa">\n\
				<div class="listMaquinaria" id="e'+etapa+'listMf'+nextID+'">\n\
				</div>\n\
				</div>\n\
				</div>\n\
				</div>\n\
				\n\
				</div>\n\
				');

			addCargo($('#addCe'+etapa+'f'+nextID+''),$('#e'+etapa+'listCf'+nextID+''),etapa,nextID);
			addMaquinaria($('#addMe'+etapa+'f'+nextID+''),$('#e'+etapa+'listMf'+nextID+''),etapa,nextID);

			$('#re'+etapa+'f'+nextID+'').on('click',function(e){
				e.preventDefault();
				$('#e'+etapa+'fn'+nextID+'').attr('value','xxkkzz');
				boxButtonDelete = $(this).parent();
				boxMinDelete = $(boxButtonDelete).parent();
				boxDelete = $(boxMinDelete).parent();
				$(boxDelete).removeClass('fadeIn');
				$(boxDelete).addClass('fadeOut');
				removeUpFase($('#e'+etapa+'fe'+nextID+'').val(),etapa);
				removeUpExp($('#e'+etapa+'fe'+nextID+'').val());
				setTimeout(function(){
					globalIDExplotacionFaseR++;
					boxDelete.remove();
				},300);
			});

			globalFase++;
			globalIDExplotacionFase++;
	});
}

function addCargo(button,list,etapa,fase){
	var globalCargo=1;
	button.on('click',function(e){
			e.preventDefault();
			listCargo = list;
			$.ajax({
				url: '/getCargo',
				method: 'GET', 
				success: function(response){
						var add = true;
						var valuePrev = 0;
						var cantAdd = true;
						var cantPrev = false;
						if(response.car != null){
							var nextID = globalCargo;
							listCargo.append('\n\
								<div class="newCargo animated fadeIn">\n\
									<div class="form-row">\n\
										<div class="col-md-8 mb-3">\n\
											<label for="e'+etapa+'f'+fase+'c'+nextID+'" class="textEtapa">Cargo</label>\n\
											<select class="form-control formsCRUD" id="e'+etapa+'f'+fase+'c'+nextID+'" required></select>\n\
										</div>\n\
										<div class="col-md-4 mb-3">\n\
											<label for="e'+etapa+'f'+fase+'cq'+nextID+'" class="textEtapa">Cantidad</label>\n\
											<input type="number" min="1" class="form-control formsCRUD" id="e'+etapa+'f'+fase+'cq'+nextID+'" required>\n\
										</div>\n\
									</div>\n\
									<div class="form-row">\n\
										<div class="col-md-8 mb-3">\n\
										    <div class="input-group mb-2 mr-sm-2">\n\
										    	<div class="input-group-prepend">\n\
											    	<div class="input-group-text">Bs</div>\n\
											  	</div>\n\
											    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="e'+etapa+'f'+fase+'cs'+nextID+'" required>\n\
											</div>\n\
										</div>\n\
										<div class="col-md-4 mb-3">\n\
											<button class="btn btn-danger btn-block" id="re'+etapa+'f'+fase+'c'+nextID+'" >X</button>\n\
										</div>\n\
									</div>\n\
								\n\
								</div>\n\
								');

							selectCargo = $('#e'+etapa+'f'+fase+'c'+nextID+'');
							selectCargo.html('');
							for (var i = response.car.length - 1; i >= 0; i--) {
								selectCargo.append('<option value="'+response.car[i].car_codigo+'">'+response.car[i].car_nombre+'</option>');
							}

							$('#re'+etapa+'f'+fase+'c'+nextID+'').on('click',function(e){
								e.preventDefault();
								$('#e'+etapa+'f'+fase+'cq'+nextID+'').attr('value',-1);
								boxButtonDelete = $(this).parent();
								boxMinDelete = $(boxButtonDelete).parent();
								boxDelete = $(boxMinDelete).parent();
								$(boxDelete).removeClass('fadeIn');
								$(boxDelete).addClass('fadeOut');
								removeEstimado(valuePrev);
								removeEstimadoFase(valuePrev,etapa,fase);
								removeEstimadoEtapa(valuePrev,etapa);
								setTimeout(function(){
									globalIDCargoR++;
									boxDelete.remove();
								},300);
							});

							$('#e'+etapa+'f'+fase+'cq'+nextID+'').on('change',function(){
								var costo = $('#e'+etapa+'f'+fase+'cs'+nextID+'');
								changeNaN(costo);
								changeNaN(this);
								var cantidad = $(this).val();
								if(cantAdd == true){
									addEstimadoFase(cantidad*(costo.val()),etapa,fase);
									addEstimado(cantidad*(costo.val()));
									addEstimadoEtapa(cantidad*(costo.val()),etapa);
									cantPrev = cantidad;
									valuePrev = cantidad*(costo.val());
									cantAdd = false;
								}else{
									removeEstimado(valuePrev);
									removeEstimadoFase(valuePrev,etapa,fase);
									removeEstimadoEtapa(valuePrev,etapa);
									addEstimadoEtapa(cantidad*(costo.val()),etapa);
									addEstimadoFase(cantidad*(costo.val()),etapa,fase);
									addEstimado(cantidad*(costo.val()));
									cantPrev = cantidad;
									valuePrev = cantidad*(costo.val());								
								}
							});


							$('#e'+etapa+'f'+fase+'cs'+nextID+'').on('change',function(){
								var cantidad = $('#e'+etapa+'f'+fase+'cq'+nextID+'');
								changeNaN(cantidad);
								changeNaN(this);
								var value = $(this).val();
								if(add == true){
									addEstimadoEtapa(value*(cantidad.val()),etapa);
									addEstimadoFase(value*(cantidad.val()),etapa,fase);
									addEstimado(value*(cantidad.val()));
									valuePrev = value*(cantidad.val());
									add = false;
								}else{
									removeEstimado(valuePrev);
									removeEstimadoFase(valuePrev,etapa,fase);
									removeEstimadoEtapa(valuePrev,etapa);
									addEstimadoEtapa(value*(cantidad.val()),etapa);
									addEstimadoFase(value*(cantidad.val()),etapa,fase);
									addEstimado(value*(cantidad.val()));
									valuePrev = value*(cantidad.val());									
								}
							});

							globalCargo++;
							globalIDCargo++;

						}else{
							alert('No se pueden obtener los cargos');
						}
				}
			});	

	});
}

function addMaquinaria(button,list,etapa,fase){
	var globalMaquinaria =1;
	button.on('click',function(e){
			e.preventDefault();
			listMaquinaria = list;
			$.ajax({
				url: '/getTipoMaquinaria',
				method: 'GET',
				success: function(response){
						var add = true;
						var valuePrev = 0;
						var cantAdd = true;
						var cantPrev = false;
						if(response.TMmaq != null){
							var nextID = globalMaquinaria;
							listMaquinaria.append('\n\
								<div class="newCargo animated fadeIn" id=" e'+etapa+'f'+fase+'m'+nextID+' ">\n\
									<div class="form-row">\n\
										<div class="col-md-8 mb-3">\n\
											<label for="e'+etapa+'f'+fase+'m'+nextID+'" class="textEtapa">Maquinaria</label>\n\
											<select class="form-control formsCRUD" id="e'+etapa+'f'+fase+'m'+nextID+'" required></select>\n\
										</div>\n\
										<div class="col-md-4 mb-3">\n\
											<label for="e'+etapa+'f'+fase+'mq'+nextID+'" class="textEtapa">Cantidad</label>\n\
											<input type="number" min="1" class="form-control formsCRUD" id="e'+etapa+'f'+fase+'mq'+nextID+'" required>\n\
										</div>\n\
									</div>\n\
									<div class="form-row">\n\
										<div class="col-md-8 mb-3">\n\
											<div class="input-group mb-2 mr-sm-2">\n\
										    	<div class="input-group-prepend">\n\
											    	<div class="input-group-text">Bs</div>\n\
											  	</div>\n\
											    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="e'+etapa+'f'+fase+'mc'+nextID+'" required>\n\
											</div>\n\
										</div>\n\
										<div class="col-md-4 mb-4">\n\
											<button class="btn btn-danger btn-block" id="re'+etapa+'f'+fase+'m'+nextID+'" >X</button>\n\
										</div>\n\
									</div>\n\
								\n\
								</div>\n\
								');


							selectMaquinaria = $('#e'+etapa+'f'+fase+'m'+nextID+'');
							selectMaquinaria.html('');
							for (var i = response.TMmaq.length - 1; i >= 0; i--) {
								selectMaquinaria.append('<option value="'+response.TMmaq[i].tm_codigo+'">'+response.TMmaq[i].tm_nombre+'</option>');
							}

							$('#re'+etapa+'f'+fase+'m'+nextID+'').on('click',function(e){
								e.preventDefault();
								$('#e'+etapa+'f'+fase+'mq'+nextID+'').attr('value',-1);
								boxButtonDelete = $(this).parent();
								boxMinDelete = $(boxButtonDelete).parent();
								boxDelete = $(boxMinDelete).parent();
								$(boxDelete).removeClass('fadeIn');
								$(boxDelete).addClass('fadeOut');
								removeEstimado(valuePrev);
								removeEstimadoFase(valuePrev,etapa,fase);
								removeEstimadoEtapa(valuePrev,etapa);
								setTimeout(function(){
									boxDelete.remove();
								},300);
							});

							$('#e'+etapa+'f'+fase+'mq'+nextID+'').on('change',function(){
								var costo = $('#e'+etapa+'f'+fase+'mc'+nextID+'');
								changeNaN(costo);
								changeNaN(this);
								var cantidad = $(this).val();
								if(cantAdd == true){
									addEstimadoFase(cantidad*(costo.val()),etapa,fase);
									addEstimado(cantidad*(costo.val()));
									addEstimadoEtapa(cantidad*(costo.val()),etapa);
									cantPrev = cantidad;
									valuePrev = cantidad*(costo.val());
									cantAdd = false;
								}else{
									removeEstimado(valuePrev);
									removeEstimadoFase(valuePrev,etapa,fase);
									removeEstimadoEtapa(valuePrev,etapa);
									addEstimadoEtapa(cantidad*(costo.val()),etapa);
									addEstimadoFase(cantidad*(costo.val()),etapa,fase);
									addEstimado(cantidad*(costo.val()));
									cantPrev = cantidad;
									valuePrev = cantidad*(costo.val());								
								}
							});


							$('#e'+etapa+'f'+fase+'mc'+nextID+'').on('change',function(){
								var cantidad = $('#e'+etapa+'f'+fase+'mq'+nextID+'');
								changeNaN(cantidad);
								changeNaN(this);
								var value = $(this).val();
								if(add == true){
									addEstimadoEtapa(value*(cantidad.val()),etapa);
									addEstimadoFase(value*(cantidad.val()),etapa,fase);
									addEstimado(value*(cantidad.val()));
									valuePrev = value*(cantidad.val());
									add = false;
								}else{
									removeEstimado(valuePrev);
									removeEstimadoFase(valuePrev,etapa,fase);
									removeEstimadoEtapa(valuePrev,etapa);
									addEstimadoEtapa(value*(cantidad.val()),etapa);
									addEstimadoFase(value*(cantidad.val()),etapa,fase);
									addEstimado(value*(cantidad.val()));
									valuePrev = value*(cantidad.val());									
								}
							});

							globalMaquinaria++;
							globalIDMaquinaria++;

						}else{
							alert('No se pueden obtener las maquinarias');
						}
				}
			});	
	});
}

function verifyNameEtapa(){
	var start=1;
	while(globalIDExplotacionEtapa > start){
		var flag =1;
		while(globalIDExplotacionEtapa > flag){
			if(($('#en'+start+'').val() == $('#en'+flag+'').val()) && (flag != start) && ($('#en'+start+'').val()!== undefined) ){
				return false;
				start = globalIDExplotacionEtapa+1;
			}
			flag++;
		}
		start++;
	}
	return true;
}

function verifyNameFase(){
	var start=1;
	while(globalIDExplotacionFase > start){
		var flag=1;
		while(globalIDExplotacionFase > flag){
			var aux = 1;
			while(globalIDExplotacionFase > aux){
				if( $('#e'+start+'fn'+flag+'').val() == $('#e'+start+'fn'+aux+'').val() && (flag != aux) && ($('#e'+start+'fn'+flag+'').val() !== undefined) && ($('#e'+start+'fn'+aux+'').val() !== undefined) ){
					return false;
				}
				aux++;
			}
			flag++;
		}
		start++;
	}
	return true;
}

function verifyCargoFase(){
	var start=1;
	while(globalIDCargo > start){
		var flag=1;
		while(globalIDCargo > flag){
			var aux = 1;
			while(globalIDCargo > aux){
				var k = 1;
				while(globalIDCargo > k){
					if( $('#e'+start+'f'+flag+'c'+aux+'').children(":selected").val() == $('#e'+start+'f'+flag+'c'+k+'').children(":selected").val() && (k != aux) && ($('#e'+start+'f'+flag+'c'+aux+'').children(":selected").val() !== undefined) && ($('#e'+start+'f'+flag+'c'+k+'').children(":selected").val() !== undefined) ){
						return false;
					}
					k++;
				}
				aux++;
			}
			flag++;
		}
		start++;
	}
	return true;
}

function verifyMaquinariaFase(){
	var start=1;
	while(globalIDMaquinaria > start){
		var flag=1;
		while(globalIDMaquinaria > flag){
			var aux = 1;
			while(globalIDMaquinaria > aux){
				var k = 1;
				while(globalIDMaquinaria > k){
					if( $('#e'+start+'f'+flag+'m'+aux+'').children(":selected").val() == $('#e'+start+'f'+flag+'m'+k+'').children(":selected").val() && (k != aux) && ($('#e'+start+'f'+flag+'m'+aux+'').children(":selected").val() !== undefined) && ($('#e'+start+'f'+flag+'m'+k+'').children(":selected").val() !== undefined) ){
						return false;
					}
					k++;
				}
				aux++;
			}
			flag++;
		}
		start++;
	}
	return true;
}

function insertConfig(dataConfig){
	$.ajax({
		url: '/Explotaciones-Configuracion-Agregar',
		method: 'POST',
		data:{
			dCE: dataConfig
		},
		success: function(response){
			if(response == 'great'){
				alert('Se inserto la configuracion');
			}else{
				alert('Hubo un error al insertar la configuracion');
			}
		}
	});
}

function addEstimado(value){
	var estimado = $('#estimadoExplotacionConfigurar');
	estimado.val(parseFloat(estimado.val())+parseFloat(value));
}

function removeEstimado(value){
	var estimado = $('#estimadoExplotacionConfigurar');
	estimado.val(parseFloat(estimado.val())-parseFloat(value));
}

function addEstimadoFase(value,etapa,id){
	var estimado = $('#e'+etapa+'fe'+id+'');
	estimado.val(parseFloat(estimado.val())+parseFloat(value));
}

function removeEstimadoFase(value,etapa,id){
	var estimado = $('#e'+etapa+'fe'+id+'');
	estimado.val(parseFloat(estimado.val())-parseFloat(value));
}

function addEstimadoEtapa(value,etapa){
	var estimado = $('#ee'+etapa+'');
	estimado.val(parseFloat(estimado.val())+parseFloat(value));
}

function removeEstimadoEtapa(value,etapa){
	var estimado = $('#ee'+etapa+'');
	estimado.val(parseFloat(estimado.val())-parseFloat(value));
}

function removeUpFase(value,etapa){
	var estimado = $('#ee'+etapa+'');
	estimado.val(parseFloat(estimado.val())-parseFloat(value));
}

function removeUpExp(value){
	var estimado = $('#estimadoExplotacionConfigurar');
	estimado.val(parseFloat(estimado.val())-parseFloat(value));
}

function changeNaN(element){
	if($(element).val() == "" || parseInt($(element).val()) < 0){
		$(element).val(0);
	}
}

//HACER LA VERIFICACION DE ELEMENTOS MINIMOS PARA REGISTRAR UNA EXPLOTACION
function verifyMinInsert(){
	if(globalIDExplotacionEtapa == globalIDExplotacionEtapaR+1){
		return false;
	}else if(globalIDExplotacionFase == globalIDExplotacionFaseR+1){
		return false;
	}else if((globalIDExplotacionFase-globalIDExplotacionFaseR) != (globalIDCargoR+1)*(globalIDExplotacionFase)){ //HACER LA PUTA VERIFICACION
		return false;
	}else{
		console.log(globalIDExplotacionFase+'=='+(globalIDCargoR+1));
		return true;
	}	
}

function resetYac(){
	$.ajax({
		url: '/ER',
		method: 'GET',
		success: function(response){
			if(response.yac != null){
				alert('Se inserto la configuracion');
				var yacBox = $('#yacimientoConfigurar');
				yacBox.html('');
				for (var i = response.yac.length - 1; i >= 0; i--) {
					yacBox.append('<option value="'+response.yac[i].yac_codigo+'">'+response.yac[i].yac_nombre+'</option>');
				}
			}else{
				alert('Hubo un error al buscar los nuevos yacimientos');
			}
		}
	});
}


$('#agregarConfiguracion').on('submit',function(e){
	e.preventDefault();
	var yacimientoExp = $('#yacimientoConfigurar').children(":selected");
	var expDur = $('#duracionExplotacionConfigurar');
	var expEstimado = $('#estimadoExplotacionConfigurar');

	console.log(globalIDExplotacionEtapa,globalIDExplotacionEtapaR);
	console.log(globalIDExplotacionFase,globalIDExplotacionFaseR);
	console.log(globalIDCargo,globalIDCargoR);
	$.ajax({
		url: '/getYacExp',
		method: 'POST',
		data:{
			yacExp: yacimientoExp.val(),
		},
		success: function(response){
				if(response == 'great'){
					alert('El yacimiento selecionado actualmente posee otra configuracion o explotacion activa!');
				}else{
					if(verifyNameEtapa()==true && verifyNameFase()==true && verifyCargoFase()==true && verifyMaquinariaFase()==true){
						var start = 1;
						var arrayPos = 0;				
						console.log(globalIDExplotacionEtapa);
						while(globalIDExplotacionEtapa>start){
							//Se insertan las etapas
							if($('#en'+start+'').val() !== undefined && $('#en'+start+'').val() !== 'xxkkzz' ){
								var arrayCargo = 0;		
								var arrayMaquinaria = 0;
								dataConfig.e.push({"f":[],"nE":$('#en'+start+'').val(),"estE":$('#ee'+start+'').val()});
								var f=1;
								console.log(globalIDExplotacionFase);
								while(globalIDExplotacionFase > f){

									//Se registra las fases para etapa antes insertada
									if( ($('#e'+(start)+'fn'+f+'').val() !== 'xxkkzz') && ($('#e'+(start)+'fn'+f+'').val() !== undefined)){
										dataConfig.e[arrayPos].f.push({ "c":[] , "m":[] ,"nF": $('#e'+(start)+'fn'+f+'').val(), "estF": $('#e'+(start)+'fe'+f+'').val()});		



										var k = 1;
										console.log(globalIDCargo);
										while(globalIDCargo >= k){
											console.log('#e'+start+'f'+(f)+'c'+k+'');
											//Se registra los cargos para cada fase insertada
											if($('#e'+start+'f'+(f)+'c'+k+'').val() !== undefined && $('#e'+start+'f'+(f)+'cq'+k+'').val() !== -1){
												console.log('F= '+f);
												dataConfig.e[arrayPos].f[arrayCargo].c.push({"cod":$('#e'+start+'f'+(f)+'c'+k+'').val(),"q":$('#e'+start+'f'+(f)+'cq'+k+'').val(),"salario":$('#e'+start+'f'+(f)+'cs'+k+'').val()});
												console.log('Registro C desde ='+'#e'+start+'f'+(f)+'c'+k);
											}  
											k++;												
										}
										arrayCargo++;
										



										var t = 1;
										console.log(globalIDMaquinaria);
										while(globalIDMaquinaria >= t){
											console.log('#e'+start+'f'+(f)+'m'+t+'');
											//Se registra las maquinarias para cada fase insertada
											if($('#e'+start+'f'+(f)+'m'+t+'').val() !== undefined && $('#e'+start+'f'+(f)+'mq'+t+'').val() !== -1){
												dataConfig.e[arrayPos].f[arrayMaquinaria].m.push({"cod":$('#e'+start+'f'+(f)+'m'+t+'').val(),"q":$('#e'+start+'f'+(f)+'mq'+t+'').val(),"costo":$('#e'+start+'f'+(f)+'mc'+t+'').val()});
												console.log('Registro M desde ='+'#e'+start+'f'+(f)+'m'+t);
												
											}  
											t++;
										}									
										arrayMaquinaria++;

									}
									f++;		
								}
								arrayPos++;
							}
							start++;		
						}
						dataConfig.yac = yacimientoExp.val();
						dataConfig.dur = expDur.val();
						dataConfig.estimado = expEstimado.val();
						$.ajax({
							url: '/AExp',
							method: 'POST',
							data:{
								AExp: dataConfig.yac,
								ADur: dataConfig.dur,
								AEst: dataConfig.estimado
							},
							success:function(exp){
								if(exp != null){
									alert('Se inserto la explotacion exitosamente con el codigo = '+ exp.cod.exp_codigo);
									for (var i = 0; i < dataConfig.e.length; i++) {
										$.ajax({
											url: '/AEta',
											method: 'POST',
											data:{
												AEta: dataConfig.e[i].nE,
												AExp: exp.cod.exp_codigo,
												AEst: dataConfig.e[i].estE
											},
											success:function(eta){
												if(eta != null){
													alert('Se inserto la etapa exitosamente con el codigo = '+ eta.cod.eta_codigo);
													console.log(i);
													for (var j = 0; j < dataConfig.e[i].f.length; j++) {
														$.ajax({
															url: '/AFas',
															method: 'POST',
															data:{
																AEta: eta.cod.eta_codigo,
																AFas: dataConfig.e[i].f[j].nF,
																AEst: dataConfig.e[i].f[j].estF
															},
															success:function(fas){
																if(fas != null){
																	alert('Se inserto la fase exitosamente con el codigo = '+ fas.cod.fas_codigo+' en la etapa = '+eta.cod.eta_codigo);

																	for (var k = 0; k < dataConfig.e[i].f[j].c.length; k++) {
																		$.ajax({
																			url: '/ACar',
																			method: 'POST',
																			data:{
																				ACarT: dataConfig.e[i].f[j].c[k].cod,
																				ACarQ: dataConfig.e[i].f[j].c[k].q,
																				ACarS: dataConfig.e[i].f[j].c[k].salario,
																				AFas: fas.cod.fas_codigo
																			},
																			success:function(car){
																				if(car == 'great'){
																					alert('Se inserto un cargo exitosamente en la fase '+ fas.cod.fas_codigo+' en la etapa '+eta.cod.eta_codigo);																						
																				}else{
																					alert('Error en agregar un cargo');
																				}
																			},
																			async: false
																		});
																	}

																	for (var v = 0; v < dataConfig.e[i].f[j].m.length; v++) {
																		$.ajax({
																			url: '/AMaq',
																			method: 'POST',
																			data:{
																				AMaqT: dataConfig.e[i].f[j].m[v].cod,
																				AMaqQ: dataConfig.e[i].f[j].m[v].q,
																				AMaqC: dataConfig.e[i].f[j].m[v].costo,
																				AFas: fas.cod.fas_codigo
																			},
																			success:function(maq){
																				if(maq == 'great'){
																					alert('Se inserto una maquinaria exitosamente en la fase '+ fas.cod.fas_codigo+' en la etapa '+eta.cod.eta_codigo);																						
																				}else{
																					alert('Error en agregar una maquinaria');
																				}
																			},
																			async: false
																		});
																	}
																		
																}else{
																	alert('Error en agregar una fase');
																}
															},
															async: false
														});
													}												
												}else{
													alert('Error en agregar una etapa');
												}
											},
											async: false
										});
				
									}
									alert('La configuracion para explotar el yacimiento fue realizada correctamente! Si desea agregar una nueva configuracion, porfavor seleccione un yacimiento valido nuevamente.');	
									dataConfig = {
										"yac": "",
									    "e": []
									};
									globalIDExplotacionEtapa = 1;
									globalIDExplotacionFase = 1;
									globalIDCargo = 1;
									globalIDMaquinaria = 1;
									$('#listEtapa').removeClass('fadeIn');
									$('#listEtapa').addClass('fadeOut');
									setTimeout(function(){
										$('#listEtapa').html(''); 
									},300);
									$('#listEtapa').removeClass('fadeOut');
									$('#listEtapa').addClass('fadeIn');
									$('#duracionExplotacionConfigurar').val(0);
									$('#estimadoExplotacionConfigurar').val(0);
									console.log(dataConfig);
									console.log(globalIDExplotacionEtapa);
									console.log(globalIDMaquinaria);
									console.log(globalIDCargo);
									console.log(globalIDExplotacionFase);	
									resetYac();
								}else{
									alert('Error en agregar la explotacion');
								}
							}
						});
					}else{
						alert('Verifica que la configuracion respeste los siguiente lineamientos:\n\
1) Que los nombres de las etapas sean diferentes\n\
2) Que los nombres de las fases en una misma etapa sean diferentes\n\
3) Que no se repitan los cargos ni la maquinaria para una fase');
					};
				};
		}
	});	

});

$('#yacimientoSelect').on('click',function(){
	var etapaSelect = $('#yacimientoEtapa');
	var selectedOption = $(this).children(":selected").val();
	console.log(selectedOption);
	$.ajax({
		url: '/YS',
		method: 'POST',
		data:{
			yacCod: selectedOption
		},
		success: function(response){
			if(response.yacimientosExpEtapa[0] != null){
				var yacEtapa = $('#yacimientoEtapa');
				yacEtapa.html('');
				for (var i = response.yacimientosExpEtapa.length - 1; i >= 0; i--) {
					yacEtapa.append('<option value="'+response.yacimientosExpEtapa[i].eta_codigo+'">'+response.yacimientosExpEtapa[i].eta_nombre+'</option>');
				}
				$('#yacimientoEtapa').trigger('click');
			}else{
				alert('Hubo un error al buscar las etapas para este yacimiento');
			}
		}
	});
});

$('#yacimientoEtapa').on('click',function(){
	var faseSelect = $('#yacimientoFase');
	var selectedOption = $(this).children(":selected").val();
	var dataTableDetalle = $('#tbodyDetalle');
	console.log(selectedOption);
	$.ajax({
		url: '/ES',
		method: 'POST',
		data:{
			etapaCod: selectedOption
		},
		success: function(response){
			if(response.yacimientosEtapaFase[0] != null){
				dataTableDetalle.html('');
				for (var i = 0; i < response.yacimientosEtapaFase.length; i++){
					$.ajax({
						url: '/EsDetalle',
						method: 'POST',
						data:{
							faseCod: response.yacimientosEtapaFase[i].fas_codigo
						},
						success:function(res){
							if(res.detalleFase != null && res != 'failed'){
								dataTableDetalle.append('\n\
								<tr>\n\
		                          <td class="text-center" value="'+response.yacimientosEtapaFase[i].fas_codigo+'">'+response.yacimientosEtapaFase[i].fas_nombre+'</td>\n\
		                          <td class="text-center">\n\
		                          	<select class="form-control formsCRUD" id="c'+i+'" required>\n\
			                         \n\
			                        </select>\n\
		                          </td>\n\
		                          <td class="text-center">\n\
		                          	<select class="form-control formsCRUD" id="m'+i+'" required>\n\
			                         \n\
			                        </select>\n\
		                          </td>\n\
		                          <td class="text-center" id="tc'+i+'""></td>\n\
		                          <td class="text-center" id="totalM'+i+'">'+res.detalleFase[0].maquinarias+'</td>\n\
		                          <td class="text-center">'+res.detalleFase[0].fas_costototal+'</td>\n\
		                        </tr>');	


								$.ajax({
									url: '/detalleCargo',
									method: 'POST',
									data:{
										faseCod: response.yacimientosEtapaFase[i].fas_codigo
									},
									success:function(cargos){
										if(cargos.detalleCargos != null && cargos != 'failed'){
											$('#c'+i+'').html('');
											for (var k = 0; k < cargos.detalleCargos.length; k++) {
					                        	$('#c'+i+'').append('<option>'+cargos.detalleCargos[k].car_nombre+' (Cantidad: '+cargos.detalleCargos[k].cf_cantidad+') </option>');
					                        }
					                        $('#tc'+i+'').html('');
					                        $('#tc'+i+'').append(cargos.totalCargos[0].empleados);
										}else{
											$('#c'+i+'').html('');
											$('#c'+i+'').append('<option>No posee cargos asignados</option>');
										}										
									},
									async: false
								});

								$.ajax({
									url: '/detalleMaquinarias',
									method: 'POST',
									data:{
										faseCod: response.yacimientosEtapaFase[i].fas_codigo
									},
									success:function(maquinarias){
										if(maquinarias.detalleMaquinarias != null && maquinarias != 'failed'){
											$('#m'+i+'').html('');
											for (var k = 0; k < maquinarias.detalleMaquinarias.length; k++) {
					                        	$('#m'+i+'').append('<option>'+maquinarias.detalleMaquinarias[k].tm_nombre+' (Cantidad: '+maquinarias.detalleMaquinarias[k].tmf_cantidad+') </option>');
					                        }
					                        $('#totalM'+i+'').html('');
					                        $('#totalM'+i+'').append(maquinarias.totalMaquinarias[0].maquinarias);
										}else{
											$('#m'+i+'').html('');
											$('#m'+i+'').append('<option>No posee maquinarias asignadas</option>');
											$('#totalM'+i+'').html('');
											$('#totalM'+i+'').append('0');
										}										
									},
									async: false
								});

							}else{
								alert('Error en agregar una maquinaria');
							}
						},
						async: false
					});
				}
			}else{
				alert('Hubo un error al buscar las fases para este etapa');
			}
		},
		async: false
	});
});



$('#yacimientoSelect').trigger('click');
