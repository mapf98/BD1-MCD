var globalIDDEV=1;
var globalIDDET = 1;
var globalIDDECH=1;
var globalIDDECR = 1;
var globalIDDEB=1;
var globalIDPago=1;


//PETICIONES AJAX
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
				parroquia: parroquiaEmpleado.val()
			},
			success: function(response){
				if(response == 'great'){
					alert('El empleado fue registrado satisfactoriamente');
				}else{
					alert('El empleado no se pudo agregar, revisa los campos');
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
				alert('El empleado NO SE PUDO ELIMINAR, revisa los campos');
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
			if(response.dataV[0].emp_cedula != null){
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
	                      <div class="col-md-12 mb-3">\n\
	                        <label for="gccargoEmpleado">Cargo</label>\n\
	                        <select class="form-control formsCRUD" id="gccargoEmpleado" required>\n\
	                        </select>\n\
	                      </div>\n\
	                    </div>\n\
	                    <div class="form-row animated fadeIn">\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gestadoEmpleado">Estado</label>\n\
	                        <select class="form-control formsCRUD" id="estadoSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcmunicipioEmpleado">Municipio</label>\n\
	                        <select class="form-control formsCRUD" id="municipioSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                      <div class="col-md-4 mb-3">\n\
	                        <label for="gcparroquiaEmpleado">Parroquia</label>\n\
	                        <select class="form-control formsCRUD" id="parroquiaSelect" required>\n\
	                        </select>\n\
	                      </div>\n\
	                    </div>\n\
	                    <button class="btn btnForms btn-block animated fadeIn" type="submit">Guardar cambios</button>\n\
	                </div>');

				$("#gcgeneroEmpleado option[value="+ response.dataV[0].emp_genero +"]").attr("selected",true);
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
	let nombreGC = $('#gcnombreEmpleado');
	let apellidoGC = $('#gcapellidoEmpleado');
	let cedulaGC = $('#gccedulaEmpleado');
	let telefonoGC = $('#gctelefonoEmpleado');
	let generoGC = $('#gcgeneroEmpleado');
	let fnacGC = $('#gcfechaNacimientoEmpleado');
	let cargoGC = $('#gccargoEmpleado');
	let parroquiaGC = $('#parroquiaSelect');

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
			parroquiaGC: parroquiaGC.val()
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

//-------------------CAROLINA--------------------------------------------------
//CLIENTES
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

		console.log (minMin);
		console.log (minCantidad);
		console.log(minPresentacion);
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
		

					// console.log(minCantidad);
					// console.log(minPresentacion);
					// console.log(minMonto);
					// console.log(minTotal);
					// console.log(tipopago);
					// console.log(tcuen);
					// console.log(tban);
					 console.log(tmon);
					// console.log(ttip);
					// console.log(ttarj);


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
							/*function redirect(url){
							window.location.href = url;
							}

							setTimeout(function(){
							redirect("/Pagos");
							},100);*/
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
// for(var id=0; id>=8; id++){
// $('row'+id+'').on('click',function(e){
// 	e.preventDefault();
// 	console.log('esta es la fila 1');
// 	// function redirect(url){
// 	// 	window.location.href = url;
// 	// 	}
// 	// 	setTimeout(function(){
// 	// 	redirect("/ModificarVenta");
// 	// },100);


// });

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
					<label for="mod'+nextID+'" class="boxMinText"></label>\n\
					 <button class="btn btn-success btn-block" id="mod'+nextID+'" value="'+response.dataC[i].ven_codigo+'">Modificar</button>\n\
					</div>\n\
					</div>\n\
					</div>\n\
				');
			
	$('#mod'+nextID+'').on('click',function(e){
		e.preventDefault();
		var codigo =36;// $('#mod'+nextID+'');
		console.log (codigo);
 
		$.ajax({
		url: '/ModificarVentaSelect',
		method: 'POST',
		data: {
			codigo:codigo,
		},
		success: function(response){
				if (response.ventamet){
				if(response.ventamet !=null){
					alert('trajo info de la venta metalico');
					console.log (response.ventamet);
					var boxModVenta = $('#guardarCambioVenta');
					boxModVenta.html('');
					boxModVenta.append('\n\
						<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="">\n\
						<div class="form-row blockMin">\n\
						\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="t" class="boxMinText">Tipo</label>\n\
						  <select class="form-control formsCRUD" id="t" required>\n\
						  	<option value="MIN_METALICO">Metalico</option>\n\
		                    <option value="MIN_NO_METALICO">No metalico</option>\n\
						  </select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="min" class="boxMinText">Mineral</label>\n\
						  <select class="form-control formsCRUD" id="min" required></select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="p" class="boxMinText">Presentacion</label>\n\
						  <select class="form-control formsCRUD" id="p" required></select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						   <label for="pr" class="boxMinText">Precio</label>\n\
						   <div class="input-group mb-2 mr-sm-2">\n\
						  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="pr" disabled>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">$</div>\n\
						  	</div>\n\
							</div>\n\
						</div>\n\
						\n\
						<div class="col-md-4 mx-auto">\n\
						  <label for="c" class="boxMinText">Cantidad</label>\n\
						    <div class="input-group mb-2 mr-sm-2">\n\
						    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="c" required>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">Ton</div>\n\
						  	</div>\n\
						    </div>\n\
						</div>\n\
						<div class="col-md-4 mb-3">\n\
						   <label for="mon" class="boxMinText">Monto</label>\n\
						   <div class="input-group mb-2 mr-sm-2">\n\
						  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="mon" disabled>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">$</div>\n\
						  	</div>\n\
							</div>\n\
						</div>\n\
					');

				SelectTipo= $('#t');
				SelectTipo.html('');
				//SelectTipo.append('<option value="'MIN_METALICO'">'Metalico'</option>');
				}else{
				alert('no trajo info de la venta metalico');
				}
			}//cierre if
			else if (response.ventanom) {
				if(response.ventanom !=null){
					alert('trajo info de la venta no metalico');
					console.log (response.ventanom);
					var boxModVenta = $('#guardarCambioVenta');
					boxModVenta.html('');
					boxModVenta.append(' \n\
						\n\			
						<div class="boxAgregarMinID animated zoomIn" id="boxAddMin" value="">\n\
						<div class="form-row blockMin">\n\
						\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="t" class="boxMinText">Tipo</label>\n\
						  <select class="form-control formsCRUD" id="t" required>\n\
						  	<option value="MIN_METALICO">Metalico</option>\n\
		                    <option value="MIN_NO_METALICO">No metalico</option>\n\
						  </select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="min" class="boxMinText">Mineral</label>\n\
						  <select class="form-control formsCRUD" id="min" required></select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						  <label for="p" class="boxMinText">Presentacion</label>\n\
						  <select class="form-control formsCRUD" id="p" required></select>\n\
						</div>\n\
						<div class="col-md-3 mb-3">\n\
						   <label for="pr" class="boxMinText">Precio</label>\n\
						   <div class="input-group mb-2 mr-sm-2">\n\
						  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="pr" disabled>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">$</div>\n\
						  	</div>\n\
							</div>\n\
						</div>\n\
						\n\
						<div class="col-md-4 mx-auto">\n\
						  <label for="c" class="boxMinText">Cantidad</label>\n\
						    <div class="input-group mb-2 mr-sm-2">\n\
						    <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="c" required>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">Ton</div>\n\
						  	</div>\n\
						    </div>\n\
						</div>\n\
						<div class="col-md-4 mb-3">\n\
						   <label for="mon" class="boxMinText">Monto</label>\n\
						   <div class="input-group mb-2 mr-sm-2">\n\
						  <input type="number" min="0.01" step="0.01" class="form-control formsCRUD" id="mon" disabled>\n\
						    <div class="input-group-append">\n\
						    	<div class="input-group-text">$</div>\n\
						  	</div>\n\
							</div>\n\
						</div>\n\
					');

				SelectTipo= $('#t');
				SelectTipo.html('');
				for (var i = response.ventanom.length - 1; i >= 0; i--) {
						SelectTipo.append('<option value="'MIN_NO_METALICO+'">''</option>');
				}

				}else{
				alert('no trajo info de la venta no metalico');
				}
			}//cierre else
		}	//cierre success	
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


		

//MOVIMIENTOS DE RUTA

$('#menuItemAliados').on('click',function(){
	window.location.href = "/AliadosComerciales";
});

$('#menuItemSolCompra').on('click',function(){
	window.location.href = "/SolicitudCompra";
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
	window.location.href = "/Minerales";
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

$('#backToHome').on('click',function(){
	window.location.href = "/Home";
});

$('#backToPersonal').on('click',function(){
	window.location.href = "/Personal";
});


//CAROLINA

//-----------------PROYECTOS------------------------

$('#backToProject').on('click',function(){
	window.location.href = "/Proyectos";
});

//yacimiento

$('#backToYacimiento').on('click',function(){
	window.location.href = "/Yacimientos";
});

$('#CreateYacimiento').on('click',function(){
	window.location.href = "/CrearYacimiento";
});

$('#SelectYacimiento').on('click',function(){
	window.location.href = "/ConsultaYacimiento";
});

$('#UpdateYacimiento').on('click',function(){
	window.location.href = "/Yacimientos";
});

$('#DeleteYacimiento').on('click',function(){
	window.location.href = "/Yacimientos";
});


//aliado comercial 
$('#backToAC').on('click',function(){
	window.location.href = "/AliadosComerciales";
});

$('#CreateAC').on('click',function(){
	window.location.href = "/CrearAliadoComercial";
});

$('#SelectAC').on('click',function(){
	window.location.href = "/ConsultaAC";
});

$('#UpdateAC').on('click',function(){
	window.location.href = "/AliadosComerciales";
});

$('#DeleteAC').on('click',function(){
	window.location.href = "/AliadosComerciales";
});


//explotacion
$('#backToExplotacion').on('click',function(){
	window.location.href = "/Explotaciones";
});

$('#CreateExplotacion').on('click',function(){
	window.location.href = "/CrearExplotacion";
});

$('#SelectExplotacion').on('click',function(){
	window.location.href = "/Explotaciones";
});

$('#UpdateExplotacion').on('click',function(){
	window.location.href = "/Explotaciones";
});

$('#DeleteExplotacion').on('click',function(){
	window.location.href = "/Explotaciones";
});

//------------------GESTION----------------
$('#backToGestion').on('click',function(){
	window.location.href = "/Gestion";
});

//mineral

$('#backToMineral').on('click',function(){
	window.location.href = "/Minerales";
});

$('#CreateMineral').on('click',function(){
	window.location.href = "/CrearMineral";
});

$('#SelectMineral').on('click',function(){
	window.location.href = "/ConsultaMinerales";
});

$('#UpdateMineral').on('click',function(){
	window.location.href = "/Minerales";
});

$('#DeleteMineral').on('click',function(){
	window.location.href = "/Minerales";
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
	window.location.href = "/Ventas";
});

$('#Verdetalle').on('click',function(){
	window.location.href = "/DetalleVenta";
});

$('#Success').on('click',function(){
	window.location.href = "/SuccessVenta";
});


//Data Table
$(document).ready( function () {
    $('#table_id').DataTable();
} );

$(document).ready( function () {
    $('#consultaDetalleVen').DataTable();
} );

$(document).ready( function () {
    $('#consultaVenta').DataTable();
} );



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

$('#estadoSelect').on('click',function(){
	var selectedOption = $(this).children(":selected").val();
	$.ajax({
		url: '/lugar-estado',
		method: 'POST',
		data: {
			filtroEstado: selectedOption 
		},
		success: function(response){
			if(response[0].lug_codigo != null){
				var dropMunicipio = $('#municipioSelect');
				dropMunicipio.html('');
				for(var i=0; i < response.length; i++){
					if(response[i].lug_tipo == 'MUNICIPIO'){
						dropMunicipio.append('<option value="'+response[i].lug_codigo+'">'+response[i].lug_nombre+'</option>');
					} 
				} 
				$('#municipioSelect').trigger('click');
			}else{
				alert('Fallo filtro ESTADO-MUNICIPO');
			}			
		}
	});
});

$('#municipioSelect').on('click',function(){
	var selectedOption = $(this).children(":selected").val();
	$.ajax({
		url: '/lugar-municipio',
		method: 'POST',
		data: {
			filtroMunicipio: selectedOption 
		},
		success: function(response){
			if(response[0].lug_codigo != null){
				var dropParroquia = $('#parroquiaSelect');
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


//CAROLINA
function mineralTipo(tipo,minerales){
	$(tipo).on('click',function(){
	var optionTipo = tipo.children(":selected").val();
		$.ajax({
			url: '/Ventas-AgregarDEV',
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
	var mtotal = mt;
	var montototal =(mtotal.val());

	console.log (montototal);
	console.log(cant);
	console.log (response.min[0].mp_precio);

	var total = (cant*response.min[0].mp_precio);
	monto.html('');
	monto.val(total);

	//var tot=0;
	// var tot = ;
	// console.log (tot);
	mtotal.html('');
	mtotal.val(total);
	console.log('MONTO TOTAL=',mtotal.val());	

	});
}

