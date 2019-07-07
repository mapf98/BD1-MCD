var globalIDMineralYacimiento = 1;
var globalIDExplotacionEtapa = 1;
var globalIDExplotacionEtapaR = 0;
var globalIDExplotacionFase = 1;
var globalIDExplotacionFaseR = 0;
var globalIDCargo = 1;
var globalIDCargoR = 0;
var globalIDMaquinaria = 1;
var duracionExplotacion = 0;
var globalIDDET = 1;
var globalIDDEV = 1;
var globalIDDECH=1;
var globalIDDECR = 1;
var globalIDDEB=1;
var globalIDPago=1;
var gF = 0;
var gC = 0;
var gM = 0;
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

var dataIniciar = {
	"yac": "",
	"dur": 0,
	"estimado":0,
    "e": []
} 




//DEFINICION DEL JSON 

// var dataConfig = {
// 	"yac": "codigo",
//     "e": [{"f":[ { "c":[{"cod":"","q":"","sueldo":""}] , "m":[{"cod":"","q":"","costo":""}] ,"nF":"nombreFase","estF":"","dF":0} ],"nE":"NOMBRETAPA","estE":"","dE":0}]
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

$('#menuItemAgregarIniciar').on('click',function(){
	window.location.href = "/Explotaciones-Agregar-Iniciar";
});

$('#menuItemConsultarConfiguracion').on('click',function(){
	window.location.href = "/Explotaciones-Configuracion-Consultar";
});

$('#menuItemEliminarConfiguracion').on('click',function(){
	window.location.href = "/Explotaciones-Configuracion-Eliminar";
});

$('#menuItemIniciarExplotacion').on('click',function(){
	window.location.href = "/Explotaciones-Iniciar";
});

$('#menuItemModificarConfiguracion').on('click',function(){
	window.location.href = "/Explotaciones-Configuracion-Modificar";
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

function addEtapa(button,list){
	button.on('click',function(e){
			e.preventDefault();
			listEtapa = list;

			var nextID = globalIDExplotacionEtapa;
			listEtapa.append('\n\
					<div class="newEtapa animated fadeIn" id="'+nextID+'">\n\
					<div class="form-row">\n\
					<div class="col-md-4 mb-3">\n\
					<label for="en'+nextID+'" class="textEtapa">Nombre de la etapa</label>\n\
					<input type="text" class="form-control formsCRUD" id="en'+nextID+'" required>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					<label for="ee'+nextID+'" class="textEtapa">Estimado (Bs)</label>\n\
					<input type="number" min="0.01" step="0.01" value="0" class="form-control formsCRUD" id="ee'+nextID+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					<label for="ed'+nextID+'" class="textEtapa">Duración (Días)</label>\n\
					<input type="number" min="1" step="1" value="0" class="form-control formsCRUD" id="ed'+nextID+'" disabled>\n\
					</div>\n\
					<div class="col-md-2 mb-3">\n\
					<label for="re'+nextID+'" class="hackerText">H</label>\n\
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
				removeDUpExp($('#ed'+nextID+'').val());
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
			var addD = true;
			var valueDPrev = 0;
			e.preventDefault();
			listFase = list;;

			var nextID = globalFase;
			listFase.append('\n\
				<div class="newFase animated fadeIn" id="e'+etapa+'f'+nextID+'">\n\
				<div class="form-row">\n\
				<div class="col-md-4 mb-3">\n\
				<label for="e'+etapa+'fn'+nextID+'" class="textEtapa">Nombre de la fase</label>\n\
				<input type="text" class="form-control formsCRUD" id="e'+etapa+'fn'+nextID+'" required>\n\
				</div>\n\
				<div class="col-md-3 mb-3">\n\
				<label for="e'+etapa+'fe'+nextID+'" class="textEtapa">Estimado (Bs)</label>\n\
				<input type="text" class="form-control min="0.01" step="0.01" value="0" formsCRUD" id="e'+etapa+'fe'+nextID+'" disabled>\n\
				</div>\n\
				<div class="col-md-3 mb-3">\n\
				<label for="e'+etapa+'d'+nextID+'" class="textEtapa">Duración (Días)</label>\n\
				<input type="number" min="1" step="1" value="0" class="form-control formsCRUD" id="e'+etapa+'d'+nextID+'" requiered>\n\
				</div>\n\
				<div class="col-md-2 mb-3">\n\
				<label for="re'+etapa+'f'+nextID+'" class="hackerText">H</label>\n\
				<button class="btn btn-danger btn-block" id="re'+etapa+'f'+nextID+'" >Eliminar</button>\n\
				</div>\n\
				</div>\n\
				<hr class="hretapa">\n\
				\n\
				<div class="container-fluid">\n\
				<div class="row">\n\
				<div class="col-md-6 mb-3">\n\
				<button class="btn btn-warning btn-block" id="addCe'+etapa+'f'+nextID+'">Agregar un nuevo Cargo</button>\n\
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
				removeDuracionFase(valueDPrev,etapa);
				removeDUpExp(valueDPrev);
				setTimeout(function(){
					globalIDExplotacionFaseR++;
					boxDelete.remove();
				},300);
			});

			$('#e'+etapa+'d'+nextID+'').on('change',function(){
				changeNaN(this);
				if(addD == true){
					valueDPrev = $(this).val();
					addDuracionFase($(this).val(),etapa);
					addDUpExp($(this).val());
					addD = false;
				}else{
					removeDuracionFase(valueDPrev,etapa);
					removeDUpExp(valueDPrev);
					addDUpExp($('#e'+etapa+'d'+nextID+'').val());
					addDuracionFase($('#e'+etapa+'d'+nextID+'').val(),etapa);
					valueDPrev = $('#e'+etapa+'d'+nextID+'').val();
				}
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

function addDuracionFase(value,etapa){
	var duracion = $('#ed'+etapa+'');
	duracion.val(parseInt(duracion.val())+parseInt(value));
}

function removeDuracionFase(value,etapa){
	var duracion = $('#ed'+etapa+'');
	duracion.val(parseInt(duracion.val())-parseInt(value));
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

function addDUpExp(value){
	console.log('entro AKI');
	var duracion = $('#duracionExplotacionConfigurar');
	duracion.val(parseInt(duracion.val())+parseInt(value));
}

function removeDUpExp(value){
	var duracion = $('#duracionExplotacionConfigurar');
	duracion.val(parseInt(duracion.val())-parseInt(value));
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

function resetYacCF(){
	$.ajax({
		url: '/ERCF',
		method: 'GET',
		success: function(response){
			if(response.yac != null){
				var yacBox = $('#configuracionEliminar');
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
						//console.log(globalIDExplotacionEtapa);
						while(globalIDExplotacionEtapa>start){
							//Se insertan las etapas
							if($('#en'+start+'').val() !== undefined && $('#en'+start+'').val() !== 'xxkkzz' ){
								var arrayCargo = 0;		
								var arrayMaquinaria = 0;
								dataConfig.e.push({"f":[],"nE":$('#en'+start+'').val(),"estE":$('#ee'+start+'').val(),"dE":$('#ed'+start+'').val()});
								var f=1;
								console.log(globalIDExplotacionFase);
								while(globalIDExplotacionFase > f){

									//Se registra las fases para etapa antes insertada
									if( ($('#e'+(start)+'fn'+f+'').val() !== 'xxkkzz') && ($('#e'+(start)+'fn'+f+'').val() !== undefined)){
										dataConfig.e[arrayPos].f.push({ "c":[] , "m":[] ,"nF": $('#e'+(start)+'fn'+f+'').val(), "estF": $('#e'+(start)+'fe'+f+'').val(),"dF":$('#e'+(start)+'d'+f+'').val()});		



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
								if(exp.cod.exp_codigo != 0){
									alert('Se inserto la explotacion exitosamente con el codigo = '+ exp.cod.exp_codigo);
									for (var i = 0; i < dataConfig.e.length; i++) {
										$.ajax({
											url: '/AEta',
											method: 'POST',
											data:{
												AEta: dataConfig.e[i].nE,
												AExp: exp.cod.exp_codigo,
												AEst: dataConfig.e[i].estE,
												AEstD: dataConfig.e[i].dE
											},
											success:function(eta){
												if(eta != null){
													//alert('Se inserto la etapa exitosamente con el codigo = '+ eta.cod.eta_codigo);
													console.log(i);
													for (var j = 0; j < dataConfig.e[i].f.length; j++) {
														$.ajax({
															url: '/AFas',
															method: 'POST',
															data:{
																AEta: eta.cod.eta_codigo,
																AFas: dataConfig.e[i].f[j].nF,
																AEst: dataConfig.e[i].f[j].estF,
																AEstD: dataConfig.e[i].f[j].dF
															},
															success:function(fas){
																if(fas != null){
																	//alert('Se inserto la fase exitosamente con el codigo = '+ fas.cod.fas_codigo+' en la etapa = '+eta.cod.eta_codigo);

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
																					//alert('Se inserto un cargo exitosamente en la fase '+ fas.cod.fas_codigo+' en la etapa '+eta.cod.eta_codigo);																						
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
																					//alert('Se inserto una maquinaria exitosamente en la fase '+ fas.cod.fas_codigo+' en la etapa '+eta.cod.eta_codigo);																						
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
		                          <td class="text-center">'+res.detalleFase[0].fas_duracion+' Días</td>\n\
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

$('#eliminarConfiguracion').on('submit',function(e){
	e.preventDefault();
	var yacimientoEliminarConfiguracion = $('#configuracionEliminar').children(":selected");
	console.log( yacimientoEliminarConfiguracion.val());
	$.ajax({
		url: '/Explotaciones-Configuracion-Eliminar',
		method: 'POST',
		data:{
			yacEC: yacimientoEliminarConfiguracion.val()
		},
		success:function(response){
			if(response == 'great'){
				alert('Se ha eliminado la configuracion para el yacimiento seleccionado');
				resetYacCF();
			}else{
				alert('Hubo un error, verifique');
			}
		}
	});
});



////////////////////////// MODIFICAR CONFIGURACION DE EXPLOTACION NO FUNCIONA
$('#verificarConfiguracion').on('submit',function(e){
	e.preventDefault();
	gF =0;
	gM =0;
	globalIDExplotacionEtapa = 1;
	globalIDExplotacionFase = 1;
	globalIDCargo =1;
	globalIDMaquinaria =1;
	var yacimientoVerificarConfiguracion = $('#yacimientoVerificarConfigurar').children(":selected");
	$.ajax({
		url: '/Explotaciones-Configuracion-Verificar',
		method: 'POST',
		data:{
			yacMod: yacimientoVerificarConfiguracion.val()
		},
		success:function(response){
			if(response.explotacion[0] != null){
				var modConfig = $('#modificarConfiguracion');
				modConfig.html('');
				modConfig.append('\n\
					<div class="row">\n\
					  <div class="col-4">\n\
					  	<label for="duracionExplotacionConfigurar">Duración (Días)</label>\n\
                        <input type="number" min="1" step="1" class="form-control formsCRUD" id="duracionExplotacionConfigurar" value="'+response.explotacion[0].exp_duracion+'" disabled>\n\
					  </div>\n\
					  <div class="col-4">\n\
					    <label for="estimadoExplotacionConfigurar">Estimado (Bs)</label>\n\
                        <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="estimadoExplotacionConfigurar" value="'+response.explotacion[0].exp_costototal+'" disabled>\n\
					  </div>\n\
					  <div class="col-4">\n\
					  	<label for="estatusExplotacion">Estatus</label>\n\
						<select class="form-control formsCRUD" id="estatusExplotacion" required>\n\
						</select>\n\
					  </div>\n\
					</div>\n\
					<hr>\n\
					<div class="row">\n\
					  <div class="col-4"></div>\n\
					  <div class="col-4">\n\
					    <button class="btn btn-success btn-block" id="addEtapa">Agregar una nueva etapa</button>\n\
					  </div>\n\
					  <div class="col-4"></div>\n\
					</div>\n\
					<hr>\n\
					<div class="animated fadeIn listEtapa" id="listEtapa">\n\
					</div>\n\
					<hr>\n\ ');

				addEtapa($('#addEtapa'),$('#listEtapa'));

				selectEstatus = $('#estatusExplotacion');
				selectEstatus.html('');
				for (var i = response.estatus.length - 1; i >= 0; i--) {
					selectEstatus.append('<option value="'+response.estatus[i].est_codigo+'">'+response.estatus[i].est_nombre+'</option>');
				}
				$("#estatusExplotacion option[value="+ response.explotacion[0].fk_exp_estatus+"]").attr("selected",true);

				$.ajax({
					url: '/ET',
					method: 'POST',
					data:{
						yacMod: yacimientoVerificarConfiguracion.val()
					},
					success:function(response){
						if(response.etapas[0] != null){
							for (var i = 0; i < response.etapas.length; i++) {
								$('#addEtapa').trigger('click');
								$.ajax({
									url: '/FT',
									method: 'POST',
									data:{
										etapaMod: response.etapas[i].eta_codigo
									},
									success:function(res){
										if(res.fases[0] != null){
											console.log(res.fases.length);
											for (var k = 0; k < res.fases.length; k++) {
												$('#addFe'+(i+1)+'').trigger('click');
												$.ajax({
													url: '/FM',
													method: 'POST',
													data:{
														faseMod: res.fases[k].fas_codigo
													},
													success:function(res){
														if(res.maquinarias != null){
															for (var j = 0; j < res.maquinarias.length; j++){
																$('#addMe'+(i+1)+'f'+(k+1)+'').trigger('click');
															}	
														}
													},
													async:false
												});

												$.ajax({
													url: '/FC',
													method: 'POST',
													data:{
														faseMod: res.fases[k].fas_codigo
													},
													success:function(res){
														if(res.cargos != null){
															console.log('i= '+i+' k= '+k);
															console.log(res.cargos.length);
															for (var g = 0; g < res.cargos.length; g++){
																etapa = i+1;
																fase = k+1;
																console.log("#addCe"+etapa+"f"+fase+"");
																$('#addCe'+etapa+'f'+fase+'').trigger('click');														
															}			
														}
													},
													async: false
												});
											}											
										}else{
											alert('Hubo un error, verifique');
										}
									},
									async: false
								});									
							}
						}else{
							alert('Hubo un error, verifique');
						}
					},
					async: false
				});

			}else{
				alert('Hubo un error, verifique');
			}
		},
		async: false
	});
});



var dataIniciar = {
	"yac": "",
	"dur": 0,
	"estimado":0,
    "e": []
} 


var dataCargos = [{}];
var dataMaquinarias = [{}];
var dataFechaFases = [{}];

//DEFINICION DEL JSON 

// var dataConfig = {
// 	"yac": "codigo",
//     "e": [{"f":[ { "c":[{"cod":"","q":"","sueldo":""}] , "m":[{"cod":"","q":"","costo":""}] ,"nF":"nombreFase","estF":"","dF":0} ],"nE":"NOMBRETAPA","estE":"","dE":0}]
// }

//dataConfig.e.push({"f":[],"nE":$('#en'+start+'').val(),"estE":$('#ee'+start+'').val(),"dE":$('#ed'+start+'').val()});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$('#addFormulario').on('click',function(e){
	dataIniciar.yac = "";
	dataIniciar.dur = 0;
	dataIniciar.estimado = 0;
	dataIniciar.e = [];
	e.preventDefault();
	var yacimientoIniciar = $('#yacimientoIniciar').children(':selected').val();

	$.ajax({
		url: '/ExpDATA',
		method: 'POST',
		data:{
			yacMod: yacimientoIniciar
		},
		success:function(res){
			if(res.explotacion != null){
				dataIniciar.yac = yacimientoIniciar;
				dataIniciar.dur = res.explotacion[0].exp_duracion;
				dataIniciar.estimado = res.explotacion[0].exp_costototal;	
			}else{
				alert('Hubo un error con la informacion de la explotacion');
			}
		},
		async: false
	});

	$.ajax({
		url: '/ET',
		method: 'POST',
		data:{
			yacMod: yacimientoIniciar
		},
		success:function(response){
			if(response.etapas[0] != null){
				for (var i = 0; i < response.etapas.length; i++) {
					dataIniciar.e.push({"f":[],"nE":response.etapas[i].eta_nombre,"estE":response.etapas[i].eta_costototal,"dE":response.etapas[i].eta_costototal,"codEta":response.etapas[i].eta_codigo});
					$.ajax({
						url: '/FT',
						method: 'POST',
						data:{
							etapaMod: response.etapas[i].eta_codigo
						},
						success:function(res){
							if(res.fases[0] != null){
								for (var k = 0; k < res.fases.length; k++) {
									dataIniciar.e[i].f.push({ "c":[] , "m":[] ,"nF": res.fases[k].fas_nombre, "estF":  res.fases[k].fas_costototal,"dF": res.fases[k].fas_duracion,"codFas": res.fases[k].fas_codigo});
									$.ajax({
										url: '/FC',
										method: 'POST',
										data:{
											faseMod: res.fases[k].fas_codigo
										},
										success:function(res){
											if(res.cargos != null){
												for (var g = 0; g < res.cargos.length; g++) {
													dataIniciar.e[i].f[k].c.push({"cod":res.cargos[g].car_codigo,"nC":res.cargos[g].car_nombre,"q":res.cargos[g].cf_cantidad,"salario":res.cargos[g].cf_costo,"cfC":res.cargos[g].cf_codigo});
												}			
											}
										},
										async: false
									});
									 $.ajax({
										url: '/FM',
										method: 'POST',
										data:{
											faseMod: res.fases[k].fas_codigo
										},
										success:function(res){
											if(res.maquinarias != null){
												for (var j = 0; j < res.maquinarias.length; j++){
													dataIniciar.e[i].f[k].m.push({"cod":res.maquinarias[j].tm_codigo,"nM":res.maquinarias[j].tm_nombre,"q":res.maquinarias[j].tmf_cantidad,"costo":res.maquinarias[j].tmf_costo,"tmfC":res.maquinarias[j].tmf_codigo});
												}	
											}
										},
										async:false
									});
								}
							}else{
								alert('Hubo un error, verifique');
							}
						},
						async: false
					});									
				}
				console.log(dataIniciar);
			}else{
				alert('Hubo un error, verifique');
			}
		},
		async: false
	});

	// MODIFICAR CAMPOS, Y AGREGAR CONSULTA PRA EMPLEADOS Y MAQUINARIAS
	var listE = $('#listFormulario');
	listE.html('');
	for (var i = 0; i < dataIniciar.e.length; i++) {
		listE.append('\n\
					<div class="newEtapa animated fadeIn" id="'+(i+1)+'">\n\
					<div class="form-row">\n\
					<div class="col-md-4 mb-3">\n\
					<label for="en'+(i+1)+'" class="textEtapa">Nombre de la etapa</label>\n\
					<input type="text" class="form-control formsCRUD" id="en'+(i+1)+'" value="'+dataIniciar.e[i].nE+'" required>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					</div>\n\
					</div>\n\
					<hr class="hretapa">\n\
					<div class="listFase" id="listFe'+(i+1)+'">\n\
					</div>\n\
					</div>\n\
			');
		var listF = $('#listFe'+(i+1)+'');
		listF.html('');
		for (var k = 0; k < dataIniciar.e[i].f.length; k++) {
			listF.append('\n\
				<div class="newFase animated fadeIn" id="e'+(i+1)+'f'+(k+1)+'">\n\
				<div class="form-row">\n\
				<div class="col-md-4 mb-3">\n\
				<label for="e'+(i+1)+'fn'+(k+1)+'" class="textEtapa">Nombre de la fase</label>\n\
				<input type="text" class="form-control formsCRUD" id="e'+(i+1)+'fn'+(k+1)+'" value="'+dataIniciar.e[i].f[k].nF+'" required>\n\
				</div>\n\
				<div class="col-md-4 mb-3">\n\
				<label for="e'+(i+1)+'fi'+(k+1)+'i" class="textEtapa">Fecha Inicio</label>\n\
				<input type="date" class="form-control formsCRUD" id="e'+(i+1)+'f'+(k+1)+'i" required>\n\
				</div>\n\
				<div class="col-md-4 mb-3">\n\
				<label for="e'+(i+1)+'ff'+(k+1)+'" class="textEtapa">Fecha Fin</label>\n\
				<input type="date" class="form-control formsCRUD" id="e'+(i+1)+'f'+(k+1)+'f" requiered>\n\
				</div>\n\
				</div>\n\
				<hr class="hretapa">\n\
				\n\
				<div class="container-fluid">\n\
				<div class="row">\n\
				<div class="col-md-6 mb-3">\n\
				<hr class="hretapa">\n\
				<div class="listCargo" id="e'+(i+1)+'listCf'+(k+1)+'">\n\
				</div>\n\
				</div>\n\
				<div class="col-md-6 mb-3">\n\
				<hr class="hretapa">\n\
				<div class="listMaquinaria" id="e'+(i+1)+'listMf'+(k+1)+'">\n\
				</div>\n\
				</div>\n\
				</div>\n\
				</div>\n\
				\n\
				</div>\n\
				');

			var listC = $('#e'+(i+1)+'listCf'+(k+1)+'');
			var listM = $('#e'+(i+1)+'listMf'+(k+1)+'');

			listC.html('');
			for (var j = 0; j < dataIniciar.e[i].f[k].c.length; j++) {
				for (var h = 0; h < dataIniciar.e[i].f[k].c[j].q; h++) {
					listC.append('\n\
					<div class="newCargo animated fadeIn">\n\
						<div class="form-row">\n\
							<div class="col-md-12 mb-3">\n\
								<label for="e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'e'+(h+1)+'" class="textEtapa">Empleado ('+dataIniciar.e[i].f[k].c[j].nC+')</label>\n\
								<select class="form-control formsCRUD" id="e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'e'+(h+1)+'" name="'+dataIniciar.e[i].f[k].c[j].cfC+'" required></select>\n\
							</div>\n\
						</div>\n\
						<div class="form-row">\n\
							<div class="col-md-12 mb-3">\n\
								<label for="e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'he'+(h+1)+'" class="textEtapa">Horario</label>\n\
								<select class="form-control formsCRUD" id="e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'he'+(h+1)+'" required></select>\n\
							</div>\n\
						</div>\n\
					\n\
					</div>\n\
					');

					var cargos;

					$.ajax({
						url: '/getEmpleados',
						method: 'POST',
						data:{
							eC: dataIniciar.e[i].f[k].c[j].nC
						},
						success:function(res){
							if(res.car != null){
								cargos = res.car;
							}else{
								alert('Hubo un error con la informacion de cargos');
							}
						},
						async: false
					});

					selectCargo = $('#e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'e'+(h+1)+'');
					selectCargo.html('');
					for (var y = cargos.length - 1; y >= 0; y--) {
						selectCargo.append('<option value="'+cargos[y].emp_codigo+'">'+cargos[y].emp_nombre+' '+cargos[y].emp_apellido+' / CI: '+cargos[y].emp_cedula+'</option>');
					}

					var horarios;
					$.ajax({
						url: '/horarios',
						method: 'GET',
						success:function(res){
							if(res.horarios != null){
								horarios = res.horarios;	
							}else{
								alert('Hubo un error con los horarios de la explotacion');
							}
						},
						async: false
					});

					console.log('Horarios= ',horarios);

					selectHorario = $('#e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'he'+(h+1)+'');
					selectHorario.html('');
					for (var y = horarios.length - 1; y >= 0; y--) {
						selectHorario.append('<option value="'+horarios[y].hor_codigo+'">'+horarios[y].hor_dia+' ('+horarios[y].hor_horainicio+' a '+horarios[y].hor_horafin+' )</option>');
					}
				}
				
			}

			listM.html('');
			for (var p = 0; p < dataIniciar.e[i].f[k].m.length; p++) {
				for (var u = 0; u < dataIniciar.e[i].f[k].m[p].q; u++) {
					listM.append('\n\
					<div class="newCargo animated fadeIn">\n\
						<div class="form-row">\n\
							<div class="col-md-12 mb-3">\n\
								<label for="e'+(i+1)+'f'+(k+1)+'m'+(p+1)+'e'+(u+1)+'" class="textEtapa">Maquinaria ('+dataIniciar.e[i].f[k].m[p].nM+')</label>\n\
								<select class="form-control formsCRUD" id="e'+(i+1)+'f'+(k+1)+'m'+(p+1)+'e'+(u+1)+'" name="'+dataIniciar.e[i].f[k].m[p].tmfC+'" required></select>\n\
							</div>\n\
						</div>\n\
					\n\
					</div>\n\
					');

					$.ajax({
						url: '/getMaquinarias',
						method: 'POST',
						data:{
							mT:dataIniciar.e[i].f[k].m[p].nM
						},
						success:function(res){
							if(res.TMmaq != null){
								maquinarias = res.TMmaq;
							}else{
								alert('Hubo un error con la informacion de maquinarias');
							}
						},
						async: false
					});

					selectMaquinaria = $('#e'+(i+1)+'f'+(k+1)+'m'+(p+1)+'e'+(u+1)+'');
					selectMaquinaria.html('');
					for (var v = maquinarias.length - 1; v >= 0; v--) {
						selectMaquinaria.append('<option value="'+maquinarias[v].maq_codigo+'">'+maquinarias[v].maq_nombre+'</option>');
					}
				}
				
			}

			
		}
	}

	// dataIniciar.yac = "";
	// dataIniciar.dur = 0;
	// dataIniciar.estimado = 0;
	// dataIniciar.e = [];
});

$('#iniciarExplotacion').on('submit',function(e){
	e.preventDefault();

	for (var i = 0; i < dataIniciar.e.length; i++) {

		for (var k = 0; k < dataIniciar.e[i].f.length; k++) {
			dataFechaFases.push({"codFas": dataIniciar.e[i].f[k].codFas,"fi":$('#e'+(i+1)+'f'+(k+1)+'i').val(),"ff":$('#e'+(i+1)+'f'+(k+1)+'f').val()});
		
			for (var j = 0; j < dataIniciar.e[i].f[k].c.length; j++) {
				for (var h = 0; h < dataIniciar.e[i].f[k].c[j].q; h++){
					//console.log($('#en'+(i+1)+'').val());
					dataCargos.push({"codCF":$('#e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'e'+(h+1)+'').attr('name'),"codC":$('#e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'e'+(h+1)+'').children(':selected').val(),"h": $('#e'+(i+1)+'f'+(k+1)+'c'+(j+1)+'he'+(h+1)+'').val()});
				}	

				for (var h = 0; h < dataIniciar.e[i].f[k].c[j].q; h++){
					//console.log($('#en'+(i+1)+'').val());
					dataMaquinarias.push({"codF":dataIniciar.e[i].f[k].codFas,"codM":$('#e'+(i+1)+'f'+(k+1)+'m'+(j+1)+'e'+(h+1)+'').children(':selected').val()});
				}	
				
			}			
		}								
	}
	console.log(dataCargos);
	console.log(dataMaquinarias);
	console.log(dataFechaFases);

	$.ajax({
		url: '/ExplotacionIniciarEmpleados',
		method: 'POST',
		data:{
			c: dataCargos[i]
		},
		success:function(res){
			if(res == "great"){
				alert('Moidificaciones realizadas correctamente');
			}else{
				alert('Hubo un error con la informacion de maquinarias');
			}
		},
		async: false
	});

	$.ajax({
		url: '/ExplotacionIniciarMaquinarias',
		method: 'POST',
		data:{
			m: dataMaquinarias[i]
		},
		success:function(res){
			if(res == "great"){
				alert('Moidificaciones realizadas correctamente');
			}else{
				alert('Hubo un error con la informacion de maquinarias');
			}
		},
		async: false
	});

	$.ajax({
		url: '/ExplotacionIniciarFases',
		method: 'POST',
		data:{
			f: dataFechaFases[i]
		},
		success:function(res){
			if(res == "great"){
				alert('Moidificaciones realizadas correctamente');
			}else{
				alert('Hubo un error con la informacion de maquinarias');
			}
		},
		async: false
	});
});

addEtapa($('#addEtapa'),$('#listEtapa'));




///////////////////////MINERALES


// MINERALES (METALICOS Y NO METALICOS) --  DAVID

var globalIDPresentacionMineral = 1;

var globalIDMineralMetalico = 1;

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



// AGREGUE MINERAL EN MINERAL - DAVID

$('#agregarMetalico').on('submit',function(e){
	e.preventDefault();
	let nombreMetalico = $('#nombreMetalico');
	let escalaMaleabilidad = $('#escalaMaleabilidad');
	let escalaDureza = $('#escalaDureza');



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


	var metStart = 1;
	var metTipo = [];
	var metMetalico = [];
	var metProporcion = [];
	while(globalIDMineralMetalico>=metStart){
		if($('#'+metStart+'').val() > 0){
			metTipo.push( $('#t'+metStart+'').val() );
			metMetalico.push( $('#m'+metStart+'').val() );
			metProporcion.push($('#pr'+metStart+'').val());
		}
		metStart++;		
	}


	if(escalaDureza.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if((verifyElementValPre()==true)){
			if((verifyElementValMinMet()==true)){
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
				metMetalico: metMetalico,
				metProporcion: metProporcion,
				metTipo: metTipo
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
			alert('Existen minerales repetidos');
		}

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
					    	<div class="input-group-text">Bs</div>\n\
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

// AGREGUE - DAVID

addMinMet($('#addMinMet'),$('#listMinMet'));

function addMinMet(button,list){
		button.on('click',function(e){
		e.preventDefault();
		listMinMet = list;

		var nextID = globalIDMineralMetalico;
					listMinMet.append(' \n\
						<div class="boxAgregarMinID animated fadeIn" id="boxAddMin" value="'+nextID+'">\n\
						<div class="form-row blockMin">\n\
						\n\
						<div class="col-md-4 mb-3">\n\
						  <label for="t'+nextID+'" class="boxMinText">Tipo</label>\n\
						  <select class="form-control formsCRUD" id="t'+nextID+'" required>\n\
						  	<option value="MIN_METALICO">Metalico</option>\n\
						  </select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="'+nextID+'" class="boxMinText">Mineral</label>\n\
						  <select class="form-control formsCRUD" id="m'+nextID+'" required></select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						    <label for="p'+nextID+'" class="boxMinText">Proporcion</label>\n\
						    <div class="input-group mb-2 mr-sm-2">\n\
						    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="pr'+nextID+'" required>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">/1</div>\n\
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


		mineralTipoMetalico($('#t'+nextID+''),$('#m'+nextID+''));

		$('#remove'+nextID+'').on('click',function(e){
			e.preventDefault();
			modMet.d.push({"cod":$('#m'+nextID+'').val(),"pr":$('#pr'+nextID+'').val(),"t":$('#t'+nextID+'').val(),"id":nextID});
			$('#m'+nextID+'').attr('id',(nextID)*(-1));
			$('#pr'+nextID+'').attr('value',$('#pr'+nextID+'').val()*0);
			boxButtonDelete = $(this).parent();
			boxMinDelete = $(boxButtonDelete).parent();
			boxDelete = $(boxMinDelete).parent();
			$(boxDelete).removeClass('fadeIn');
			$(boxDelete).addClass('fadeOut');
			setTimeout(function(){
				boxMinDelete.remove();
			},300);
		});

		globalIDMineralMetalico++;
		});
}

function verifyElementValMinMet(){
	var start=1;
	while(globalIDMineralMetalico>=start){
		var flag =1;
		while(globalIDMineralMetalico>=flag){
			if(($('#m'+start+'').children(":selected").val() == $('#m'+flag+'').children(":selected").val()) && (flag != start) && ($('#m'+start+'').children(":selected").val() !== undefined)  ){
				return false;
				start = globalIDMineralMetalico+1;
			}else{
				flag++;
			}
		}
		start++;
	}
	return true;
}

function verifyMinMet(){
	var start=1;
	var ready = false;
	while(globalIDMineralMetalico>=start){
		if($('#'+start+'').children(":selected").val() != null){
			ready = true;
			start = globalIDMineralMetalico+1;
		}else{
			start++;
		}
	}
	return ready;
}

function mineralTipoMetalico(tipo,minerales){
	$(tipo).on('click',function(){
	var optionTipo = tipo.children(":selected").val();
	console.log(optionTipo);
		$.ajax({
			url: '/Metalicos-AgregarMinMet',
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

	var metStart = 1;
	var metTipo = [];
	var metMetalico = [];
	var metProporcion = [];
	while(globalIDMineralMetalico>=metStart){
		if($('#'+metStart+'').val() > 0){
			metTipo.push( $('#t'+metStart+'').val() );
			metMetalico.push( $('#m'+metStart+'').val() );
			metProporcion.push($('#pr'+metStart+'').val());
		}
		metStart++;		
	}

	if(utilidadNoMetalico.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if(verifyElementValPre()==true){
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
				preTipo: preTipo,
				metMetalico: metMetalico,
				metProporcion: metProporcion,
				metTipo: metTipo
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
		}
		}else{
			alert('Existen minerales repetidos, porfavor verifique el formulario para continuar!');
		}
	}
	
});

addMinNoMet($('#addMinNoMet'),$('#listMinNoMet'));

function addMinNoMet(button,list){
		button.on('click',function(e){
		e.preventDefault();
		listMinNoMet = list;

		var nextID = globalIDMineralMetalico;
					listMinNoMet.append(' \n\
						<div class="boxAgregarMinID animated fadeIn" id="boxAddMin" value="'+nextID+'">\n\
						<div class="form-row blockMin">\n\
						\n\
						<div class="col-md-4 mb-3">\n\
						  <label for="t'+nextID+'" class="boxMinText">Tipo</label>\n\
						  <select class="form-control formsCRUD" id="t'+nextID+'" required>\n\
						  	<option value="MIN_NO_METALICO">Metalico</option>\n\
						  </select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="'+nextID+'" class="boxMinText">Mineral</label>\n\
						  <select class="form-control formsCRUD" id="m'+nextID+'" required></select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						    <label for="p'+nextID+'" class="boxMinText">Proporcion</label>\n\
						    <div class="input-group mb-2 mr-sm-2">\n\
						    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="pr'+nextID+'" required>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">/1</div>\n\
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


		mineralTipoMetalico($('#t'+nextID+''),$('#m'+nextID+''));

		$('#remove'+nextID+'').on('click',function(e){
			e.preventDefault();
			modMet.d.push({"cod":$('#m'+nextID+'').val(),"pr":$('#pr'+nextID+'').val(),"t":$('#t'+nextID+'').val(),"id":nextID});
			$('#m'+nextID+'').attr('id',(nextID)*(-1));
			$('#pr'+nextID+'').attr('value',$('#pr'+nextID+'').val()*0);
			boxButtonDelete = $(this).parent();
			boxMinDelete = $(boxButtonDelete).parent();
			boxDelete = $(boxMinDelete).parent();
			$(boxDelete).removeClass('fadeIn');
			$(boxDelete).addClass('fadeOut');
			setTimeout(function(){
				boxMinDelete.remove();
			},300);
		});

		globalIDMineralMetalico++;
		});
}

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

	verifyAndOrderMet(modNoMet.u,modNoMet.i);
	verifyAndOrderMet(modNoMet.d,modNoMet.u);

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


// INVENTARIO

$('#menuItemInventario').on('click',function(){
	window.location.href = "/Inventario-Consultar";
});

$(document).ready( function () {
    $('#table_id_inventario').DataTable();
});

function verifyAndOrderMet(a,b){
	var start = 0;
	var forDelete = [];
	while(a.length>start){
		var flag = 0;
		while(b.length >flag){
			if(a[start].id == b[flag].id ){
				a[start].p = b[flag].p;
				// a[start].t = b[flag].t;
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


$('#agregarCliente').on('submit',function(e){
	e.preventDefault();
	let nombre = $('#nombreCliente');
	let apellido = $('#apellidoCliente');
	let cedula = $('#cedulaCliente');
	let telefono = $('#telefonoCliente');
	let parroquia = $ ('#parroquiaSelect');

	$.ajax({
		url: '/AgregarCliente',
		method: 'POST',
		data: {
			nombre: nombre.val(),
			apellido: apellido.val(),
			cedula: cedula.val(),
			telefono: telefono.val(),
			parroquia:parroquia.val(),
		},

		success: function(response){
			if(response == 'great'){
				alert('El cliente fue registrado satisfactoriamente');
			}else{
				alert('El cliente no se pudo agregar, revisa los campos');
			}			
		}
	});
});



$('#eliminarCliente').on('submit',function(e){
	e.preventDefault();
	let cedulaCliente = $('#cedulaClienteEliminar');

	$.ajax({
		url: '/EliminarCliente',
		method: 'POST',
		data: {
			cedulaCli: cedulaCliente.val(),
		},
		success: function(response){
			if(response == 'great'){
				alert('El cliente fue ELIMINADO satisfactoriamente');
			}else{
				alert('El cliente NO SE PUDO ELIMINAR, revisa los campos');
			}			
		}
	});
});

$('#verificarCliente').on('submit',function(e){
	e.preventDefault();
	let cedulaClienteV = $('#cedulaClienteVerificar');

	$.ajax({
		url: '/VerificarCliente',
		method: 'POST',
		data: {
			cedulaCliV: cedulaClienteV.val(),
		},
		success: function(response){
			if(response.dataV != null){
				var boxModEmp = $('#guardarCambioCliente');
				boxModEmp.html('');
				boxModEmp.append(' \n\
				<div class="animated" id="boxGC">\n\
					 <div class="form-row animated fadeIn">\n\
                      <div class="col-md-6 mb-3">\n\
                        <label for="gcnombreCliente">Nombre</label>\n\
                        <input type="text" class="form-control formsCRUD" id="gcnombreCliente" value="'+response.dataV[0].cli_nombre+'" required autofocus>\n\
                      </div>\n\
                      <div class="col-md-6 mb-3">\n\
                        <label for="gcapellidoCliente">Apellido</label>\n\
                        <input type="text" class="form-control formsCRUD" id="gcapellidoCliente" value="'+response.dataV[0].cli_apellido+'" required>\n\
                      </div>\n\
                    </div>\n\
					\n\
                    <hr>\n\
					\n\
                    <div class="form-row animated fadeIn">\n\
                      <div class="col-md-2 mb-3"></div>\n\
                      <div class="col-md-4 mb-3">\n\
                        <label for="gccedulaCliente">Cédula</label>\n\
                        <input type="text" class="form-control formsCRUD" id="gccedulaCliente" value="'+response.dataV[0].cli_cedula+'" disabled>\n\
                      </div>\n\
                     \n\
                      <div class="col-md-4 mb-3">\n\
                        <label for="gctelefonoCliente">Teléfono</label>\n\
                        <input type="text" class="form-control formsCRUD" id="gctelefonoCliente"  value="'+response.dataV[0].cli_telefono+'" required>\n\
                      </div>\n\
                      <div class="col-md2 mb-3"></div>\n\
                    </div>\n\
					\n\
						<div class="form-row animated fadeIn">\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="estadoCliente">Estado</label>\n\
	                        <select class="form-control formsCRUD" id="estadoSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="municipioCliente">Municipio</label>\n\
	                        <select class="form-control formsCRUD" id="municipioSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcparroquiaCliente">Parroquia</label>\n\
	                        <select class="form-control formsCRUD" id="parroquiaSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                	</div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	            </div>');

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
				alert('Error, no se consigue a cliente para modificar');				
			}			
		}
	});
});

$('#guardarCambioCliente').on('submit',function(e){
	e.preventDefault();
	let nombreGC = $('#gcnombreCliente');
	let apellidoGC = $('#gcapellidoCliente');
	let cedulaGC = $('#gccedulaCliente');
	let telefonoGC = $('#gctelefonoCliente');
	let parroquiaGC = $('#parroquiaSelect');

	$.ajax({
		url: '/ModificarCliente',
		method: 'POST',
		data: {
			nombreGC: nombreGC.val(),
			apellidoGC: apellidoGC.val(),
			cedulaGC: cedulaGC.val(),
			telefonoGC: telefonoGC.val(),
			parroquiaGC: parroquiaGC.val()
		},
		success: function(response){
			if(response == 'great'){
				alert('El cliente fue MODIFICADO satisfactoriamente');
				var boxGCEmp = $('#boxGC');
				boxGCEmp.addClass('fadeOut');
				boxGCEmp.html('');
				var boxModEmp = $('#guardarCambioCliente');
				boxModEmp.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un cliente para modificar su ficha</h4>\n\
                      <p class="text-center"><i class="fas fa-address-card iconMod"></i></p>\n\
                    </div>\n\
				`);
			}else{
				alert('El cliente NO SE PUDO MOFICAR, revisa los campos');
			}			
		}
	});
});


//---------------------------VENTA -----------------------------------
  var eliminados = [];
  var y=0;
$('#addDEV').on('click',function(e){
	e.preventDefault();
	listDEV = $('#listDEV');

	var nextID = globalIDDEV;
				listDEV.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="t'+nextID+'" class="boxMinText">Tipo</label>\n\
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
					  <label for="p'+nextID+'" class="boxMinText">Presentacion</label>\n\
					  <select class="form-control formsCRUD" id="p'+nextID+'" required></select>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					   <label for="pr'+nextID+'" class="boxMinText">Precio</label>\n\
					   <div class="input-group mb-2 mr-sm-2">\n\
					  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="pr'+nextID+'" disabled>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$</div>\n\
					  	</div>\n\
						</div>\n\
					</div>\n\
					\n\
					<div class="col-md-4 mx-auto">\n\
					  <label for="c'+nextID+'" class="boxMinText">Cantidad</label>\n\
					    <div class="input-group mb-2 mr-sm-2">\n\
					    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="c'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">Ton</div>\n\
					  	</div>\n\
					    </div>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					   <label for="mon'+nextID+'" class="boxMinText">Monto</label>\n\
					   <div class="input-group mb-2 mr-sm-2">\n\
					  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="mon'+nextID+'" disabled>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$</div>\n\
					  	</div>\n\
						</div>\n\
					</div>\n\
					<div class="col-md-2 mx-auto">\n\
					  <label for="removeMin" class="hackerText">   </label>\n\
					  <button class="btn btn-danger btn-block" id="remove'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');


	mineralTipo($('#t'+nextID+''),$('#'+nextID+''));
	mineralpresentacion ($('#'+nextID+''),$('#p'+nextID+''),$('#t'+nextID+''));
	presentacionprecio ($('#p'+nextID+''),$('#pr'+nextID+''),$('#c'+nextID+''),$('#mon'+nextID+''));
	//total ($('#c'+nextID+''),$('#pr'+nextID+''),$('#mon'+nextID+''));

	$('#remove'+nextID+'').on('click',function(e){
		e.preventDefault();
		console.log (globalIDDEV);
		eliminados [y] = (nextID*-1);
		console.log (eliminados); 
		$('#'+nextID+'').attr('id',(nextID)*(-1));
		boxButtonDelete = $(this).parent();
		boxMinDelete = $(boxButtonDelete).parent();
		boxMinDelete.remove();
		y++;
	});
	globalIDDEV++;
});

var tipo =[];

$('#pagar').on('click',function(e){
	e.preventDefault();
	var start = 1;
	//var minTipo = [];
	var minMin = [];
	var minCantidad = [];
	var minPresentacion = [];
	var minMonto = [];
	var minPrecio=[];
	var minTotal = 0 ;//$('#MontoTotal');

	while(globalIDDEV>start){
		var z=0;
		var entro = 0;
		console.log (z);
		console.log (entro);
		console.log('hola');
		while (globalIDDEV>z && entro == 0){
			if (eliminados[z]==-(start)){
				entro=1;
				console.log ('entra al if ')
			}
			z++;
		}
			if (entro == 0){
				console.log('entra al else');
				minMin.push( $('#'+start+'').val() );
				minCantidad.push($('#c'+start+'').val());
				minPresentacion.push($('#p'+start+'').val());
				minMonto.push($('#mon'+start+'').val());
				minPrecio.push($('#pr'+start+'').val());
				//start++;
			}
		start++;
	}
		// var mt=$('#MT');
		// var total=0;
		// for (var i = minCantidad.length-1; i >=0 ; i--) {
		// 	total=total+parseInt($('#mon'+i+'').val());
		// }
		// mt.val(total);
		// console.log(mt.val());
		// var minTotal=0;
		// for (var i = minCantidad.length -2; i >=0 ; i--) {
		// minTotal = minTotal + (minCantidad [i] * minPrecio[i]);
		// }
		// console.log ('mintotal arriba',minTotal);

		//$('#MT').val(minTotal);

		$.ajax({
		url:'/ConsultarInv',
		method:'POST',
		data:{
			minPresentacion:minPresentacion,
		},
		success: function (response){
			if (response.disp != null){
				console.log (response.disp[0]);
				for (var i = response.disp.length-1; i >=0 ; i--) {
				console.log ('entro al ciclo');
					console.log (minCantidad[i]);
					console.log (response.disp[i].inv_cantidadactual);
					if (parseInt(minCantidad[i]) > parseInt(response.disp[i].inv_cantidadactual)){
						console.log ('entro al if');
						alert ('No poseemos disponibilidad para el mineral seleccionado');

					}else{	
						console.log('error');
						console.log (minCantidad[i]);
						console.log (response.disp[i].inv_cantidadactual);
					
						console.log('entra al else');
						e.preventDefault();
						listPago = $('#listPago');

					var nextID = globalIDPago;
					listPago.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					\n\
					<div class="col-md-3 mb-3">\n\
					  <button class="btn btnSave btn-block" id="transf'+nextID+'" >Transferencia</button>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <button class="btn btnSave btn-block" id="cred'+nextID+'" >Tarjeta de Credito</button>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <button class="btn btnSave btn-block" id="deb'+nextID+'" >Tarjeta de Debito</button>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					   <button class="btn btnSave btn-block" id="cheque'+nextID+'" >Cheque</button>\n\
					</div>\n\
					<div class="listDET" id="listDET"></div>\n\
					<div class="col-md-2 mx-auto">\n\
					  <button class="btn btn-danger btn-block" id="remove2'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');

				$('#remove2'+nextID+'').on('click',function(e){
					e.preventDefault();
					$('#'+nextID+'').attr('id',(nextID)*(-1));
					boxButtonDelete = $(this).parent();
					boxMinDelete = $(boxButtonDelete).parent();
					boxMinDelete.remove();
				});
				globalIDPago++;

				$('#transf'+nextID+'').on('click',function(e){
				e.preventDefault();
				listDET = $('#listDET');
				console.log (globalIDDET);
				var nextID = globalIDDET;
				tipo[globalIDDET-1]="Transf"; 
				console.log (tipo);
				console.log ('este es el total', minTotal);
				listDET.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					<div class = col-md-12>\n\
					<h5 class=titulo>Transferencia</h5>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="cuen'+nextID+'" class="boxMinText">Nro de Cuenta</label>\n\
					  <input type="number" class="form-control formsCRUD" id="cuen'+nextID+'" size="20" maxlength="20" required>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					  <label for="ref'+nextID+'" class="boxMinText">Nro de Referencia (Ultimos 5)</label>\n\
					 <input type="number" class="form-control formsCRUD" id="ref'+nextID+'" maxlength="5" required>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="ban'+nextID+'" class="boxMinText">Banco</label>\n\
					  <select class="form-control formsCRUD" id="ban'+nextID+'" required>\n\
					  	<option value="Banesco">Banesco</option>\n\
					  	<option value="Banco de Venezuela">Banco de Venezuela</option>\n\
					  	<option value="Banco Provincial">Banco Provincial</option>\n\
					  	<option value="BFC">BFC</option>\n\
					  	<option value="BNC">BNC</option>\n\
					  	<option value="Banplus">Banplus</option>\n\
					  	<option value="Bancaribe">Bancaribe</option>\n\
					  	<option value="Mercantil">Mercantil</option>\n\
					  	<option value="BOD">BOD</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					   <label for="tmon'+nextID+'" class="boxMinText">Monto</label>\n\
					   <div class="input-group mb-2 mr-sm-2">\n\
					  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="tmon'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$</div>\n\
					  	</div>\n\
						</div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mx-auto">\n\
					  <label for="removeMin" class="hackerText">   </label>\n\
					  <button class="btn btn-danger btn-block" id="remove3'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');

	$('#remove3'+nextID+'').on('click',function(e){
		e.preventDefault();
		$('#'+nextID+'').attr('id',(nextID)*(-1));
		boxButtonDelete = $(this).parent();
		boxMinDelete = $(boxButtonDelete).parent();
		boxMinDelete.remove();
	});
	globalIDDET++;
});//cierra transferencia

				$('#cred'+nextID+'').on('click',function(e){
				e.preventDefault();
				listDET = $('#listDET');
				var nextID = globalIDDET;
				tipo[globalIDDET-1]='Cred';
				console.log (tipo);
				listDET.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					<div class = col-md-12>\n\
					<h5 class=titulo>Tarjeta de Credito</h5>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="tarj'+nextID+'" class="boxMinText">Nro de Tarjeta</label>\n\
					  <input type="number" class="form-control formsCRUD" id="tarj'+nextID+'" maxlength="16" required>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					  <label for="tip'+nextID+'" class="boxMinText">Tipo</label>\n\
					 <select class="form-control formsCRUD" id="tip'+nextID+'" required>\n\
					  	<option value="VISA">Visa</option>\n\
					  	<option value="MASTER">MasterCard</option>\n\
					  	<option value="AMERICAN EXPRESS">American Express</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="ban'+nextID+'" class="boxMinText">Banco</label>\n\
					  <select class="form-control formsCRUD" id="ban'+nextID+'" required>\n\
					  	<option value="Banesco">Banesco</option>\n\
					  	<option value="Banco de Venezuela">Banco de Venezuela</option>\n\
					  	<option value="Banco Provincial">Banco Provincial</option>\n\
					  	<option value="BFC">BFC</option>\n\
					  	<option value="BNC">BNC</option>\n\
					  	<option value="Banplus">Banplus</option>\n\
					  	<option value="Bancaribe">Bancaribe</option>\n\
					  	<option value="Mercantil">Mercantil</option>\n\
					  	<option value="BOD">BOD</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					   <label for="tmon'+nextID+'" class="boxMinText">Monto</label>\n\
					   <div class="input-group mb-2 mr-sm-2">\n\
					  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="tmon'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$</div>\n\
					  	</div>\n\
						</div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mx-auto">\n\
					  <label for="removeMin" class="hackerText">   </label>\n\
					  <button class="btn btn-danger btn-block" id="remove4'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');

	$('#remove4'+nextID+'').on('click',function(e){
		e.preventDefault();
		$('#'+nextID+'').attr('id',(nextID)*(-1));
		boxButtonDelete = $(this).parent();
		boxMinDelete = $(boxButtonDelete).parent();
		boxMinDelete.remove();
	});
	globalIDDET++;
});//cierra credito

				$('#deb'+nextID+'').on('click',function(e){
				e.preventDefault();
				listDET = $('#listDET');
				tipo[globalIDDET-1]="Deb"; 
				var nextID = globalIDDET;
				listDET.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					<div class = col-md-12>\n\
					<h5 class=titulo>Tarjeta de Debito</h5>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="tarj'+nextID+'" class="boxMinText">Nro de Tarjeta</label>\n\
					  <input type="number" class="form-control formsCRUD" id="tarj'+nextID+'" maxlength="16" required>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					  <label for="tip'+nextID+'" class="boxMinText">Tipo</label>\n\
					 <select class="form-control formsCRUD" id="tip'+nextID+'" required>\n\
					  	<option value="MAESTRO">Maestro</option>\n\
					  	<option value="SUICHE7B">Suiche 7B</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="ban'+nextID+'" class="boxMinText">Banco</label>\n\
					  <select class="form-control formsCRUD" id="ban'+nextID+'" required>\n\
					  	<option value="Banesco">Banesco</option>\n\
					  	<option value="Banco de Venezuela">Banco de Venezuela</option>\n\
					  	<option value="Banco Provincial">Banco Provincial</option>\n\
					  	<option value="BFC">BFC</option>\n\
					  	<option value="BNC">BNC</option>\n\
					  	<option value="Banplus">Banplus</option>\n\
					  	<option value="Bancaribe">Bancaribe</option>\n\
					  	<option value="Mercantil">Mercantil</option>\n\
					  	<option value="BOD">BOD</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					   <label for="tmon'+nextID+'" class="boxMinText">Monto</label>\n\
					   <div class="input-group mb-2 mr-sm-2">\n\
					  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="tmon'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$</div>\n\
					  	</div>\n\
						</div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mx-auto">\n\
					  <label for="removeMin" class="hackerText">   </label>\n\
					  <button class="btn btn-danger btn-block" id="remove5'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');

	$('#remove5'+nextID+'').on('click',function(e){
		e.preventDefault();
		$('#'+nextID+'').attr('id',(nextID)*(-1));
		boxButtonDelete = $(this).parent();
		boxMinDelete = $(boxButtonDelete).parent();
		boxMinDelete.remove();
	});
	globalIDDET++;
});//cierra debito

				$('#cheque'+nextID+'').on('click',function(e){
				e.preventDefault();
				listDET = $('#listDET');
				tipo[globalIDDET-1]="Cheque"; 
				var nextID = globalIDDET;
				listDET.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					<div class = col-md-12>\n\
					<h5 class=titulo>Cheque</h5>\n\
					</div>\n\
					<div class="col-md-6 mb-3">\n\
					  <label for="cuen'+nextID+'" class="boxMinText">Nro de Cuenta</label>\n\
					 	<input type="number" class="form-control formsCRUD" id="cuen'+nextID+'" maxlength="20" required>\n\
					</div>\n\
					<div class="col-md-6 mb-3">\n\
					  <label for="ref'+nextID+'" class="boxMinText">Nro de Cheque</label>\n\
					  <input type="number" class="form-control formsCRUD" id="ref'+nextID+'" maxlength="20" required>\n\
					</div>\n\
					<div class="col-md-8 mb-3">\n\
					  <label for="ban'+nextID+'" class="boxMinText">Banco</label>\n\
					  <select class="form-control formsCRUD" id="ban'+nextID+'" required>\n\
					  	<option value="Banesco">Banesco</option>\n\
					  	<option value="Banco de Venezuela">Banco de Venezuela</option>\n\
					  	<option value="Banco Provincial">Banco Provincial</option>\n\
					  	<option value="BFC">BFC</option>\n\
					  	<option value="BNC">BNC</option>\n\
					  	<option value="Banplus">Banplus</option>\n\
					  	<option value="Bancaribe">Bancaribe</option>\n\
					  	<option value="Mercantil">Mercantil</option>\n\
					  	<option value="BOD">BOD</option>\n\
					  </select>\n\
					</div>\n\
					<div class="col-md-4 mb-3">\n\
					   <label for="tmon'+nextID+'" class="boxMinText">Monto</label>\n\
					   <div class="input-group mb-2 mr-sm-2">\n\
					  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="tmon'+nextID+'" required>\n\
					    <div class="input-group-append">\n\
					    	<div class="input-group-text">$</div>\n\
					  	</div>\n\
						</div>\n\
					</div>\n\
					\n\
					<div class="col-md-2 mx-auto">\n\
					  <label for="removeMin" class="hackerText">   </label>\n\
					  <button class="btn btn-danger btn-block" id="remove6'+nextID+'" >Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');

	$('#remove6'+nextID+'').on('click',function(e){
		e.preventDefault();
		$('#'+nextID+'').attr('id',(nextID)*(-1));
		boxButtonDelete = $(this).parent();
		boxMinDelete = $(boxButtonDelete).parent();
		boxMinDelete.remove();
	});
	globalIDDET++;
});//cierra cheque

					}//cierra el else
				}//cierra el for
			}//cierra el if 
			else {
				alert ('Fallo consulta disponibilidad');
			}
		}//cierra el success
		});//cierra el ajax	
});//cierra pagar



function verifyElementVal(){
	var start=1;
	while(globalIDDEV>=start){
		var flag =1;
		while(globalIDDEV>=flag){
			if(($('#'+start+'').children(":selected").val() == $('#'+flag+'').children(":selected").val()) && (flag != start) && ($('#'+start+'').children(":selected").val() !== undefined) && ($('#t'+start+'').children(":selected").val() == $('#t'+flag+'').children(":selected").val()) ){
				return false;
				start = globalIDDEV+1;
			}else{
				flag++;
			}
		}
		start++;
	}
	return true;
}


//AGREGAR VENTA
//Primero mostrar las presentaciones disponibles en cada drop nuevo, esto se hace en addMin
//Luego registrar con un json
$('#verificarcedula').on('submit',function(e){
	e.preventDefault();
	let cedulaCliente = $('#cedulaCliente');

	$.ajax({
		url: '/NuevaVenta',
		method: 'POST',
		data: {
			cedulaCliente: cedulaCliente.val(),
		},
		success: function(response){
			if(response.datacliente != null){
				$.ajax({
					url:'/GuardarClienteNuevaVenta',
					method: 'POST',
					data: {
						cedulaC: response.datacliente[0].cli_cedula,
						nombreC: response.datacliente[0].cli_nombre,
						apellidoC: response.datacliente[0].cli_apellido
					},
					success: function(response) {
						if(response == 'guardado'){
							function redirect(url){
								window.location.href = url;
							}

							setTimeout(function(){
								redirect("/CrearVenta");				
							},100);
						}else{
							alert('No se pudo registrar el comprador actual');
						}
						
					}
					
				});

			}else if(response == 'failed'){
				alert('Error, no se consigue a cliente para modificar');				
			}else if(response == 'new'){
				function redirect(url){
				window.location.href = url;
				}

				setTimeout(function(){
				redirect("/AgregarCliente");
				},100);
			}			
		}
	});
});

$('#agregarVenta').on('submit',function(e){
	e.preventDefault();

	var start = 1;
	//var minTipo = [];
	var minMin = [];
	var minCantidad = [];
	var minPresentacion = [];
	var minMonto = [];
	var minPrecio=[];
	var tipopago=[];

	var tcuen=[];
	var tban=[];
	var tmon=[];
	var ttip = [];
	var ttarj=[];
	var tref = [];

	tipopago=tipo;
	var minTotal = 0 ;//$('#MontoTotal');

	while(globalIDDEV>=start){
		//minTipo.push( $('#t'+start+'').val() );
		minMin.push( $('#'+start+'').val() );
		minCantidad.push($('#c'+start+'').val());
		minPresentacion.push($('#p'+start+'').val());
		minMonto.push($('#mon'+start+'').val());
		minPrecio.push($('#pr'+start+'').val());
		start++;
	}

	start=1;

	while(globalIDDET>=start){
		tcuen.push( $('#cuen'+start+'').val() );
		tban.push($('#ban'+start+'').val());
		tmon.push($('#tmon'+start+'').val());
		ttip.push($('#tip'+start+'').val());
		ttarj.push($('#tarj'+start+'').val());
		tref.push($('#ref'+start+'').val());
		start++;
	}

		for (var i = minCantidad.length -2; i >=0 ; i--) {
		minTotal = minTotal + (minCantidad [i] * minPrecio[i]);
		
			if(verifyElementVal()==true){
				$.ajax({
				url: '/CrearVenta',
				method: 'POST',
				data: {

					minCantidad: minCantidad,
					minPresentacion: minPresentacion,
					minMonto: minMonto,
					minTotal: minTotal,
					tipopago:tipopago,
					tcuen:tcuen,
					tban:tban,
					tmon:tmon,
					ttip:ttip,
					ttarj:ttarj,
					tref:tref,

				},
				success: function(response){
						if(response == 'great'){
							alert('La venta ha sido procesada exitosamente');
							function redirect(url){
							window.location.href = url;
							}

							setTimeout(function(){
							redirect("/NuevaVenta");
							},100);

						}else{
							alert('La venta no se pudo agregar, revise ');
						}			
				}//cierra success
				});//cierra ajax
			}
			else {
				alert ('La verificacion es falsa');
			};
		};
});//cierra agregar venta


var globalIDventa=1;
var codigo;

$('#verificarComprador').on('submit',function(e){
	e.preventDefault();
	let cedulacomp = $('#cedulaComprador');
	$.ajax({
		url: '/VerificarComprador',
		method: 'POST',
		data: {
			cedulacomprador: cedulacomp.val(),
		},
		success: function(response){
			if(response.dataC != null){
				var listventas = $('#guardarCambioVenta');
				console.log ('entro a guardar cambio venta');
				listventas.html('');
				var nextID = globalIDventa;
				console.log(response.estatus);
				for (var i = response.dataC.length - 1; i >= 0; i--){
				listventas.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxGCVen" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="minpre'+nextID+'" class="boxMinText">Mineral/Presentacion</label>\n\
					  <input type="number" class="form-control formsCRUD" id="minpre'+nextID+'" value="'+response.dataC[i].fk_dev_min_pre+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="cant'+nextID+'" class="boxMinText">Cantidad</label>\n\
					  <input type="number" class="form-control formsCRUD" id="cant'+nextID+'" value="'+response.dataC[i].dev_cantidad+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="tot'+nextID+'" class="boxMinText">Total</label>\n\
					  <input type="number" class="form-control formsCRUD" id="tot'+nextID+'" value="'+response.dataC[i].dev_monto+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="est'+nextID+'" class="boxMinText">Estatus</label>\n\
					 <select class="form-control formsCRUD" id="est'+nextID+'" required></select>\n\
					</div>\n\
					<div class="col-md-12 mb-3">\n\
					<label for="mod'+nextID+'" class="boxMinText"></label>\n\
					 <button class="btn btn-success btn-block" id="mod'+nextID+'" value="'+response.dataC[i].ven_codigo+'">Modificar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');
				selectEstatus = $('#est'+nextID+'');
				selectEstatus.html('');
				for (var i = response.estatus.length - 1; i >= 0; i--) {
					selectEstatus.append('<option value="'+response.estatus[i].est_codigo+'">'+response.estatus[i].est_nombre+'</option>');
				}
				$("#est"+nextID+" option[value="+ response.dataC[0].fk_ven_estatus+"]").attr("selected",true);
			
	$('#mod'+nextID+'').on('click',function(e){
		e.preventDefault();
		var codigo =$(this).val();
		var estatus=$('#est'+nextID+'').children(":selected").val();
 		console.log(estatus);
		$.ajax({
		url: '/ModificarVentaSelect',
		method: 'POST',
		data: {
			codigo:codigo,
			estatus:estatus,

		},
		success: function(response){
			if (response =='great'){
				alert('La venta fue modificada exitosamente');	
			}
			else{
				alert('No se pudo modificar la venta');
			}	//cierre success	
		}
	});//cierre ajax

});//cierra mod

	nextID++;
}//cierra el for
			}else if(response == 'failed'){
				alert('Error, no se consigue ventas para este cliente');				
			}			
		}
	});//cierra ajax
});//cierra verificar

$('#guardarCambioVenta').on('submit',function(e){
	e.preventDefault();
	let nombreGC = $('#gcnombreCliente');
	let apellidoGC = $('#gcapellidoCliente');
	let cedulaGC = $('#gccedulaCliente');
	let telefonoGC = $('#gctelefonoCliente');
	let parroquiaGC = $('#parroquiaSelect');

	$.ajax({
		url: '/ModificarVenta',
		method: 'POST',
		data: {
			nombreGC: nombreGC.val(),
			apellidoGC: apellidoGC.val(),
			cedulaGC: cedulaGC.val(),
			telefonoGC: telefonoGC.val(),
			parroquiaGC: parroquiaGC.val()
		},
		success: function(response){
			if(response == 'great'){
				alert('El cliente fue MODIFICADO satisfactoriamente');
				var boxGCEmp = $('#boxGC');
				boxGCEmp.addClass('fadeOut');
				boxGCEmp.html('');
				var boxModEmp = $('#guardarCambioCliente');
				boxModEmp.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un cliente para modificar su ficha</h4>\n\
                      <p class="text-center"><i class="fas fa-address-card iconMod"></i></p>\n\
                    </div>\n\
				`);
			}else{
				alert('El cliente NO SE PUDO MODIFICAR, revisa los campos');
			}			
		}
	});
});

var codigo = [];
$('#verificarComprador2').on('submit',function(e){
	e.preventDefault();
	let cedulacomp = $('#cedulaComprador2');
	$.ajax({
		url: '/VerificarComprador',
		method: 'POST',
		data: {
			cedulacomprador: cedulacomp.val(),
		},
		success: function(response){
			if(response.dataC != null){
				var listventas = $('#guardarCambioVenta');
				console.log ('entro a guardar cambio venta');
				listventas.html('');
				var nextID = globalIDventa;
				for (var i = response.dataC.length - 1; i >= 0; i--){
				listventas.append(' \n\
					<div class="boxAgregarMinID animated zoomIn" id="boxGCVen" value="'+nextID+'">\n\
					<div class="form-row blockMin">\n\
					\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="minpre'+nextID+'" class="boxMinText">Mineral/Presentacion</label>\n\
					  <input type="number" class="form-control formsCRUD" id="minpre'+nextID+'" value="'+response.dataC[i].fk_dev_min_pre+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="cant'+nextID+'" class="boxMinText">Cantidad</label>\n\
					  <input type="number" class="form-control formsCRUD" id="cant'+nextID+'" value="'+response.dataC[i].dev_cantidad+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					  <label for="tot'+nextID+'" class="boxMinText">Total</label>\n\
					  <input type="number" class="form-control formsCRUD" id="tot'+nextID+'" value="'+response.dataC[i].dev_monto+'" disabled>\n\
					</div>\n\
					<div class="col-md-3 mb-3">\n\
					<label for="elim'+nextID+'" class="boxMinText"></label>\n\
					 <button class="btn btn-danger btn-block" id="elim'+nextID+'" value="'+response.dataC[i].ven_codigo+'">Eliminar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');
			

	$('#elim'+nextID+'').on('click',function(e){
		console.log('entro en eliminar');
		e.preventDefault();
		codigo =($(this).val());
 
		$.ajax({
		url: '/EliminarVenta',
		method: 'POST',
		data: {
			codigo:codigo,
		},
		success: function(response){
			if (response =='great'){
				alert('El usuario fue eliminado satisfactoriamente');
				function redirect(url){
							window.location.href = url;
							}

							setTimeout(function(){
							redirect("/VerificarComprador2");
							},100);
			}
			else {
				alert('El usuario no puede ser eliminado');
			}
		}

		});
	});//cierre elim

	nextID++;
}

}

}

});

});

//------------------GESTION----------------
$('#backToGestion').on('click',function(){
	window.location.href = "/Gestion";
});

//---------CAJA ----------------------

$('#backToCaja').on('click',function(){
	window.location.href = "/Caja";
});
//cliente 

$('#menuItemClientes').on('click',function(){
	window.location.href = "/Clientes";
});

$('#backToClientes').on('click',function(){
	window.location.href = "/Clientes";
});

$('#CreateCliente').on('click',function(){
	window.location.href = "/AgregarCliente";
});

$('#SelectCliente').on('click',function(){
	window.location.href = "/ConsultaCliente";
});

$('#UpdateCliente').on('click',function(){
	window.location.href = "/ModificarCliente";
});

$('#DeleteCliente').on('click',function(){
	window.location.href = "/EliminarCliente";
});


//ventas
$('#backToVentas').on('click',function(){
	window.location.href = "/Ventas";
});

$('#CreateVenta').on('click',function(){
	window.location.href = "/NuevaVenta";
});

$('#SelectVenta').on('click',function(){
	window.location.href = "/ConsultaVenta";
});

$('#UpdateVenta').on('click',function(){
	window.location.href = "/VerificarComprador";
});

$('#DeleteVenta').on('click',function(){
	window.location.href = "/VerificarComprador2";
});

$('#Verdetalle').on('click',function(){
	window.location.href = "/DetalleVenta";
});

$('#Success').on('click',function(){
	window.location.href = "/SuccessVenta";
});


$(document).ready( function () {
    $('#consultaDetalleVen').DataTable();
} );

$(document).ready( function () {
    $('#consultaVenta').DataTable();
} );

function estatusventa(estatus){
	$(estatus).on('click',function(){
	var optionTipo = tipo.children(":selected").val();
		$.ajax({
			url: '/Ventas-AgregarEstatus',
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


function mineralpresentacion(mineral,presentacion,tipo){
	$(mineral).on('click',function(){

	var optionmineral = mineral.children(":selected").val();
	var optiontipo = tipo.children(":selected").val();

	console.log(optionmineral);
	console.log(optiontipo);

		$.ajax({
			url: '/Ventas-AgregarPre',
			method: 'POST',
			data:{
				filtroPre: optionmineral,
				filtroT: optiontipo.toString()
			},
			success: function(response){
					if(response.min != null){				
							presentacion.html('');
							for (var i = response.min.length - 1; i >= 0; i--) {
								presentacion.append('<option value="'+response.min[i].mp_codigo+'">'+response.min[i].pre_nombre+'</option>');
							}
							
					}
			}	
		});
	});	
}

function presentacionprecio (presentacion,precio,cantidad,monto){
	$(presentacion).on('click',function(){

	var optionpresentacion = presentacion.children(":selected").val();

	console.log(optionpresentacion);

		$.ajax({
			url: '/Ventas-AgregarPrecio',
			method: 'POST',
			data:{
				filtroPre: optionpresentacion,
			},
			success: function(response){
					if(response.min != null){	
						console.log (response.min[0].mp_precio);				
							precio.html('');
							for (var i = response.min.length - 1; i >= 0; i--) {
								precio.attr('value',response.min[i].mp_precio);
							}
						total(cantidad,response,monto,$('#MT'));	
					}
			}	
		});
	});	
}


function total (cantidad,response,monto,mt){
	$(cantidad).on('focusout',function(){

	var cant = cantidad.val();
	console.log(cant);
	console.log (response.min[0].mp_precio);

	var total = (cant*response.min[0].mp_precio);
	monto.html('');
	monto.val(total);

	//var valor = mt.val();
	//sumar (monto);
	// parseInt(mt.val());
	// console.log('del input',valor);
	// console.log('total',parseInt(total));
	// valor = valor + parseInt(total);
	// console.log('valor 2',valor);
	// mt.val(valor);


	});
}

// function sumar (monto) {

// 	$('#MT').on('change',monto,function(){
// 		var num1=parseInt((monto).val());
// 		$('#MT').val(num1);

// 	})

 //    var total = 0;	

 //    valor1 = parseInt(valor1); // Convertir el valor a un entero (número).
	// valor2 = parseInt(valor2);
 //    // Aquí valido si hay un valor previo, si no hay datos, le pongo un cero "0".
 //    total = (total == null || total == undefined || total == "") ? 0 : total;
	
 //    /* Esta es la suma. */
 //    total = (parseInt(valor1)+parseInt(valor2));
 //    console.log ('total',total);

 //   ($('#MT')).val(total);
//}


// ROLES

var globalIDPrivilegioRol = 1;


var modRol = {
    "d": [],
    "u": [],
    "i": []
} 

$(document).ready( function () {
    $('#table_id_roles').DataTable();
});

$('#menuItemRoles').on('click',function(){
	window.location.href = "/Roles";
});


$('#menuItemAgregarRol').on('click',function(){
	window.location.href = "/Roles-Agregar";
});

$('#menuItemConsultarRol').on('click',function(){
	window.location.href = "/Roles-Consultar";
});

$('#menuItemEliminarRol').on('click',function(){
	window.location.href = "/Roles-Eliminar";
});

$('#menuItemModificarRol').on('click',function(){
	window.location.href = "/Roles-Modificar";
});

$('#agregarRol').on('submit',function(e){
	e.preventDefault();
	var nombreRol = $('#nombreRol');


	var start = 1;
	var privilegioRol = [];
	var privilegioTipo = [];

	while(globalIDPrivilegioRol>=start){
		if($('#'+start+'').val() > 0){
			privilegioRol.push( $('#'+start+'').val() );
			privilegioTipo.push( $('#t'+start+'').val() );

		}
		start++;		
	}

	if(nombreRol.val() == 'Selecciona un municipio'){
		alert('Selecciona lugar valido, elige un estado primero!')
	}else{
		if(verifyElementPrivilegio()==true ){
			$.ajax({
			url: '/Roles-Agregar',
			method: 'POST',
			data: {
				nombreRol: nombreRol.val(),
				privilegioTipo: privilegioTipo,
				privilegioRol: privilegioRol
			},
			success: function(response){
					if(response == 'great'){
						alert('El rol fue registrado satisfactoriamente');
					}else{
						alert('El rol no se pudo agregar, revisa los campos por informacion duplicados');
					}			
				}
			});
			alert('Fino!');
		}else{
			alert('Existen privilegios repetidos o no ha asignado al menos un privilegio, porfavor verifique el formulario para continuar!');
		}
	}
});

addPrivilegio($('#addPrivilegio'),$('#listPrivilegio'));

function addPrivilegio(button,list){
		button.on('click',function(e){
		e.preventDefault();
		listPrivilegio = list;

		var nextID = globalIDPrivilegioRol;
					listPrivilegio.append(' \n\
						<div class="boxAgregarMinID animated fadeIn" id="boxAddMin" value="'+nextID+'">\n\
						<div class="form-row blockMin">\n\
						\n\
						<div class="col-md-4 mb-3">\n\
						  <label for="t'+nextID+'" class="boxMinText">Asignar</label>\n\
						  <select class="form-control formsCRUD" id="t'+nextID+'" required>\n\
						  	<option value="PRIVILEGIO">Privilegio</option>\n\
						  </select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="'+nextID+'" class="boxMinText">Privilegio</label>\n\
						  <select class="form-control formsCRUD" id="'+nextID+'" required></select>\n\
						</div>\n\
						\n\
						<div class="col-md-2 mb-3">\n\
						  <label for="removeMin" class="hackerText">Hacker</label>\n\
						  <button class="btn btn-danger btn-block" id="remove'+nextID+'" >Eliminar</button>\n\
						</div>\n\
						</div>\n\
						</div>\n\
					');


		privilegioSelect($('#t'+nextID+''),$('#'+nextID+''));

		$('#remove'+nextID+'').on('click',function(e){
			e.preventDefault();
			modRol.d.push({"cod":$('#'+nextID+'').val(),"t":$('#t'+nextID+'').val(),"id":nextID});
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

		globalIDPrivilegioRol++;
		});
}

function privilegioSelect(tipo,privilegios){
	$(tipo).on('click',function(){
	var optionTipo = tipo.children(":selected").val();
	console.log(optionTipo);
		$.ajax({
			url: '/Roles-AgregarPrivilegio',
			method: 'POST',
			data:{
				filtroPrivilegio: optionTipo.toString()
			},
			success: function(response){
					if(response.pri != null){
						if(optionTipo == 'PRIVILEGIO'){
							privilegios.html('');
							for (var i = response.pri.length - 1; i >= 0; i--) {
								privilegios.append('<option value="'+response.pri[i].pri_codigo+'">'+response.pri[i].pri_nombre+'</option>');
							}
						}
					}	
			}
		});	
	});
}

function verifyElementPrivilegio(){
	var start=1;
	while(globalIDPrivilegioRol>=start){
		var flag =1;
		while(globalIDPrivilegioRol>=flag){
			if(($('#'+start+'').children(":selected").val() == $('#'+flag+'').children(":selected").val()) && (flag != start) && ($('#'+start+'').children(":selected").val() !== undefined)  ){
				return false;
				start = globalIDPrivilegioRol+1;
			}else{
				flag++;
			}
		}
		start++;
	}
	return true;
}

$('#eliminarRol').on('submit',function(e){
	e.preventDefault();
	let nombreRol = $('#nombreRolEliminar');

	$.ajax({
		url: '/Roles-Eliminar',
		method: 'POST',
		data: {
			nombreRol: nombreRol.val(),
		},
		success: function(response){
			if(response == 'great'){
				alert('El rol fue ELIMINADO satisfactoriamente');
			}else{
				alert('El rol NO SE PUDO ELIMINAR, revisa los campos por informacion duplicada');
			}			
		}
	});
});

$('#verificarRol').on('submit',function(e){
	e.preventDefault();
	let nombreRolVerificar = $('#nombreRolVerificar');

	$.ajax({
		url: '/Roles-Verificar',
		method: 'POST',
		data: {
			rolV: nombreRolVerificar.val()
		},
		success: function(response){
			if(response.dataV != null){
				var boxModRol = $('#guardarCambioRol');

				boxModRol.html('');
				boxModRol.append('<div class="animated fadeIn" id="boxGC">\n\
				<div class="form-row animated fadeIn">\n\
				<div class="col-md-6 mb-3">\n\
				<label for="gcnombreRol">Nombre rol</label>\n\
				<input type="text" class="form-control formsCRUD" id="gcnombreRol" value="'+response.dataV[0].rol_nombre+'" disabled>\n\
				</div>\n\
				</div>\n\
				<hr>\n\
						<div class="row">\n\
	                    <div class="col-4"></div>\n\
						<div class="col-4">\n\
						<button class="btn btn-success btn-block" id="addPrivilegio">Asignar privilegio</button>\n\
						</div>\n\
						<div class="col-4"></div>\n\
						</div>\n\
						<div class="listPrivilegio" id="listPrivilegio">\n\
						</div>\n\
						</div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	                </div>');


				addPrivilegio($('#addPrivilegio'),$('#listPrivilegio'));

				function setPri(t,k){
					setTimeout(function(){
						$('#'+t+' option[value='+k+']').attr('selected',true);
					},150);
				}

				var pri=0;
				while(response.priRol.length>pri){
					if(response.priRol[pri].fk_rp_rol == response.dataV[0].rol_codigo){
						$('#addPrivilegio').trigger('click');
						$('#t'+(globalIDPrivilegioRol-1)+'').trigger('click');
						setMin(globalIDPrivilegioRol-1,response.priRol[pri].pri_codigo);
						modRol.u.push({"cod":response.priRol[pri].pri_codigo,"t":"PRIVILEGIO","id":globalIDPrivilegioRol-1,"o":response.priRol[pri].pri_codigo});
					}
					pri++;
				}

			}else if(response == 'failed'){
				alert('Error, no se consigue a rol para modificar');				
			}			
		}
	});
});

function verifyAndOrderRol(a,b){
	var start = 0;
	var forDelete = [];
	while(a.length>start){
		var flag = 0;
		while(b.length >flag){
			if(a[start].id == b[flag].id ){
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


$('#guardarCambioRol').on('submit',function(e){
	e.preventDefault();
	var nombreRol = $('#gcnombreRol');


	var start = 1;
	clearArray(modRol.i);
	while(globalIDPrivilegioRol>=start){
		if($('#'+start+'').val() > 0){
			var cod =$('#'+start+'').val();
			var t = $('#t'+start+'').val();
			modRol.i.push({"cod": cod , "t": t,"id":start});
		}
		start++;		
	}

	verifyAndOrderRol(modRol.u,modRol.i);
	verifyAndOrderRol(modRol.d,modRol.u);

	console.log('Por modificar');
	var test =0;
	while(modRol.u.length>test){
		console.log(modRol.u[test].t  + "/"+modRol.u[test].cod );
		test++;
	}

	console.log('Por insertar');
	var test =0;
	while(modRol.i.length>test){
		console.log(modRol.i[test].t + "/"+modRol.i[test].cod);
		test++;
	}

	console.log('Eliminados');
	var test =0;
	while(modRol.d.length>test){
		console.log(modRol.d[test].t +  "/"+modRol.d[test].cod);
		test++;
	}

	$.ajax({
		url: '/Roles-Modificar',
		method: 'POST',
		data: {
			nombreRol: nombreRol.val(),

			modRol: modRol
		},
		success: function(response){
			if(response == 'great'){
				alert('El rol fue MODIFICADO satisfactoriamente');
				var boxGCEmp = $('#boxGC');
				boxGCEmp.addClass('fadeOut');
				boxGCEmp.html('');
				var boxModEmp = $('#guardarCambioRol');
				boxModEmp.append(`\n\
                    <div class="boxPrevMod animated fadeIn">\n\
                      <h4 class="text-center">Selecciona un rol para modificar su registro</h4>\n\
                      <p class="text-center"><i class="fas fa-toolbox iconMod"></i></p>\n\
                    </div>\n\
				`);
				globalIDPrivilegioRol =1;
				clearArray(modRol.i);
				clearArray(modRol.d);
				clearArray(modRol.u);
			}else{
				alert('El rol NO SE PUDO MOFICAR, revisa los campos por informacion duplicada');
			}			
		}
	});
});

