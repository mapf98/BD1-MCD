$(document).ready(function(){
	$.ajax({
		url: '/loginCheck',
		success : function(checkLogJSON){
			if(checkLogJSON.usuario == "error" && checkLogJSON.password == "error"){
				showErrorColumLog();	
			}else if(checkLogJSON.usuario == "error"){
				showErrorUser();
			}else if(checkLogJSON.password == "error"){
				showErrorPassword();
			}else{
				cleanErrorLog();
			}
		}
	});
});

function showErrorColumLog(){
	let errorColumLog = $('#errorColumLog');

	errorColumLog.html('');
	errorColumLog.append(`
		<p class="text-center textErrorUp"><i class="far fa-arrow-alt-circle-left"></i>  Error en usuario</p>
		<p class="text-center textErrorDown"><i class="far fa-arrow-alt-circle-left"></i> Error en password</p>
	`)
};

function showErrorPassword(){
	let errorColumLog = $('#errorColumLog');

	errorColumLog.html('');
	errorColumLog.append(`
		<p class="text-center textErrorDown"><i class="far fa-arrow-alt-circle-left"></i> Error en password</p>
	`)
};

function showErrorUser(){
	let errorColumLog = $('#errorColumLog');

	errorColumLog.html('');
	errorColumLog.append(`
		<p class="text-center textErrorUp"><i class="far fa-arrow-alt-circle-left"></i>  Error en usuario</p>
	`)
};

function cleanErrorLog(){
	let errorColumLog = $('#errorColumLog');
	errorColumLog.html('');
};