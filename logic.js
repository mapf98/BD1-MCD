//Login
$('#userLogin').focus(function(){
	$('#userLogin').removeClass('formsFieldError');
});

$('#passwordLogin').focus(function(){
	$('#passwordLogin').removeClass('formsFieldError');
});



$('#formLogin').on('submit',function(e){
	e.preventDefault();
	let userLog = $('#userLogin');
	let passwordLog = $('#passwordLogin');
	userLogGlobal = userLog;
	passwordLogGlobal =passwordLog;
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
				createdemon = true;
				userLog.addClass('formsFieldError');
				passwordLog.addClass('formsFieldError');
			}			
		}
	});
});

//Home

//MOD
$('#menuItemAliados').on('click',function(){
	window.location.href = "/AliadosComerciales";
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

//MODIFICADOS ANTES INDICABAN AL HOME
$('#menuItemMinerales').on('click',function(){
	window.location.href = "/Minerales";
});

$('#menuItemReportes').on('click',function(){
	window.location.href = "/Home";
});

$('#menuItemYacimientos').on('click',function(){
	window.location.href = "/Yacimientos";
});

//MOD
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

$('#backToHome').on('click',function(){
	window.location.href = "/Home";
});

$('#backToPersonal').on('click',function(){
	window.location.href = "/Personal";
});



//------------------------------------------------------------------------------------------------------------------
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
	window.location.href = "/Caja";
});

//ventas
$('#backToVentas').on('click',function(){
	window.location.href = "/Ventas";
});

$('#CreateVenta').on('click',function(){
	window.location.href = "/CrearVenta";
});

$('#SelectVenta').on('click',function(){
	window.location.href = "/ConsultaVenta";
});

$('#UpdateVenta').on('click',function(){
	window.location.href = "/Ventas";
});

$('#DeleteVenta').on('click',function(){
	window.location.href = "/Ventas";
});

/*
$('#procesarventa').on('click',function(){
	window.location.href = "/SuccessVenta";

	//crear un if para que tambien se muestre /errorventa
});*/



















function showErrorColumLog(){
	let errorColumLog = $('#errorColumLog');

	errorColumLog.html('');
	errorColumLog.append(`
		<p class="text-center textErrorUp"><i class="far fa-arrow-alt-circle-left"></i>  Error en usuario</p>
		<p class="text-center textErrorDown"><i class="far fa-arrow-alt-circle-left"></i> Error en password</p>
	`)
};

