//En esta sección requerimos los paquetes instalados para su uso.
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userJSON ={
  "nombre": "none",
  "apellido":"none", 
  "usuario":"none",
  "password":"none",
  "cargo":"none"
};

var compradorActual ={
  "nombre": "none",
  "apellido":"none", 
  "cedula":"none",
  "monto":"none"
};


//En esta parte se encuentra la configuración para conectarse a la base de datos
const { Client } = require('pg');  //Requerimos el paquete postgres
const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'proyectoBD1',
  password: '209fadfc',
  port: 5432,
}; //En esta parte solo se modifica el 'user', 'database' y 'password' (Esta sección cambia por cada computadora y su config en BD)

// Aqui se establece la conección a la base de datos
const client = new Client(connectionData);
client.connect();

//Set de motor de vistas, directorios importantes y body-parser para manejo de respuestas en servidor
app.use('/public',express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Lógica de consultas

//-----Login MinerUCAB-------


//METODO GET

app.get("/login",function(req,res){
  res.render('login');
}); 

app.get("/Home",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('home',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Caja",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('homeCaja',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Proyectos",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('homeProyectos',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Gestion",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('homeGestion',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Personal",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('homePersonal',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Empleados",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('empleados',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Empleados-Agregar",function(req,res){
  let dataCargo;
  let dataLugar;
  if(userJSON.usuario != "none"){
    client.query('SELECT car_nombre,car_codigo FROM CARGO',(err,resultA)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(resultA.rows[0] != null){
        dataCargo = resultA.rows;
        client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR',(err,resultB)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(resultB.rows[0] != null){
            dataLugar = resultB.rows;
            res.render('empleadosAgregar',{dataLugar: dataLugar,dataCargo: dataCargo, user: userJSON});
          }else{
            res.send('failed');
          };
        });
      }else{
        res.send('failed');
      }
    });
  }else{
    res.redirect('login');
  };

});

app.get("/Empleados-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT E.emp_cedula,E.emp_nombre,E.emp_apellido,E.emp_genero,C.car_nombre,P.lug_nombre FROM empleado AS E,cargo AS C,lugar AS P WHERE E.fk_emp_cargo = C.car_codigo AND E.fk_emp_lugar = P.lug_codigo',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        console.log(result.rows);
        res.render('empleadosConsultar',{dataTable: result.rows, user: userJSON});
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});

app.get("/Empleados-Modificar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('empleadosModificar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Empleados-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('empleadosEliminar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});



//CAROLINA

//-----------------------------MINERAL---------------------------------
app.get("/CrearMineral",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('crearmineral.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Minerales",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDMinerales.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/DetalleMineral",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('detallemineral.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/ConsultaMinerales",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('consultaminerales.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


//--------------------------------YACIMIENTOS---------------------------
app.get("/Yacimientos",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDyacimiento.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/ConsultaYacimiento",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('ConsultaYacimiento.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/SuccessYacimiento",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('yacimientoexitoso.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/CrearYacimiento",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('crearyacimiento.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


//---------------------ALIADOS COMERCIALES------------------------
app.get("/ConsultaAC",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('consultaAC.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/AliadosComerciales",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDaliadoscomerciales.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/CompraAliados",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('consultacompraaliados.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/CrearAliadoComercial",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('crearac.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

//-----------------------VENTAS----------------------
app.get("/SuccessVenta",function(req,res){
    var fy='yyyy';
    var fm='mm';
    var fd= 'dd';
  if(userJSON.usuario != "none"){
    client.query('SELECT mp.fk_mp_metalico from venta v, detalle_ven dv, presentacion pr, min_pre mp where dv.fk_dev_venta = v.ven_codigo and v.ven_fecha =  (SELECT MAX(ven_fecha) from venta)and dv.fk_dev_min_pre = mp.mp_codigo and mp.fk_mp_presentacion = pr.pre_codigo',(err,result)=>{
    console.log ('consulta tipo mineral');
    console.log (result.rows.fk_mp_metalico);
    if (err) {
        console.log(err.stack);
        res.send('failed'); 
    }
    else if (result.rows.fk_mp_metalico != null){
     client.query ('SELECT v.ven_fecha,mt.met_nombre, pr.pre_nombre, dv.dev_cantidad, dv.dev_monto, v.ven_montototal from venta v, detalle_ven dv, presentacion pr, min_metalico mt, min_pre mp where dv.fk_dev_venta = v.ven_codigo and v.ven_fecha =  (SELECT MAX(ven_fecha) from venta) and dv.fk_dev_min_pre = mp.mp_codigo and  mp.fk_mp_presentacion = pr.pre_codigo and mp.fk_mp_metalico = mt.met_codigo',(err,result)=>{
      console.log ('entro a metalico');
        if (err) {
        console.log(err.stack);
        res.send('failed'); 
        }
        else if (result.rows!=null){
          var venta = result.rows;
          console.log (venta);
          res.render('ventaexitosa.ejs',{user: userJSON, dataTable:venta, compradorActual:compradorActual});
        }
        else {
          res.send('failed');
        }
    });

    }

    else {

      client.query ('SELECT v.ven_fecha,nm.nom_nombre, pr.pre_nombre, dv.dev_cantidad, dv.dev_monto, v.ven_montototal from venta v, detalle_ven dv, presentacion pr, min_no_metalico nm, min_pre mp where dv.fk_dev_venta = v.ven_codigo and v.ven_fecha =  (SELECT MAX(ven_fecha) from venta) and dv.fk_dev_min_pre = mp.mp_codigo and  mp.fk_mp_presentacion = pr.pre_codigo and mp.fk_mp_nometalico = nm.nom_codigo',(err,result)=>{
      console.log ('entro a no metalico');
        if (err) {
        console.log(err.stack);
        res.send('failed'); 
        }
        else if (result.rows!=null){
          var venta = result.rows;
          console.log (venta);
          res.render('ventaexitosa.ejs',{user: userJSON, dataTable:venta});
        }
        else {
          res.send('failed');
        }
    });

    }
  });
  }else{
    res.redirect('login');
  }
});


app.get("/ErrorVenta",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('errorventa.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Pagos",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('pagos.ejs',{user: userJSON, compradorActual:compradorActual});
  }else{
    res.redirect('login');
  }
});


app.get("/Ventas",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDventas.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/NuevaVenta",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('nueva venta.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


app.get("/CrearVenta",function(req,res){
  if(userJSON.usuario != "none" && compradorActual.cedula != "none"){
    res.render('crearventa.ejs',{user: userJSON,compradorActual:compradorActual});
  }else if(userJSON.usuario != "none"){
    res.redirect('CRUDventas.ejs');
  }else{
    res.redirect('login');
  }
});

app.get("/ConsultaVenta",function(req,res){
  var fy='yyyy';
  var fm='mm';
  var fd= 'dd';

  if(userJSON.usuario != "none"){
    client.query('SELECT V.ven_codigo, to_char(V.ven_fecha,$1)as Year, to_char(V.ven_fecha,$2)as Month, to_char(V.ven_fecha,$3)as Day, V.ven_montototal, Cli.cli_nombre,Cli.cli_apellido, U.usu_usuario FROM venta V, cliente Cli, Usuario U WHERE V.fk_ven_cliente = Cli.cli_codigo and V.fk_ven_usuario=U.usu_usuario_id',[fy,fm,fd],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        console.log(result.rows);
        console.log ('entro aqui');
        res.render('consultaventas.ejs',{dataTable: result.rows, user: userJSON});
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});

app.get("/DetalleVenta",function(req,res){
  if(userJSON.usuario != "none"){
        client.query('SELECT Pr.pre_nombre,V.ven_codigo, D.dev_cantidad, D.dev_monto,Mp.mp_codigo, Nm.nom_nombre FROM detalle_ven D, Min_no_metalico Nm, Min_Pre Mp, Venta V, Presentacion Pr WHERE V.ven_codigo = D.fk_dev_venta and Mp.mp_codigo = D.fk_dev_min_pre and Pr.pre_codigo = Mp.fk_mp_presentacion and Mp.mp_codigo = D.fk_dev_min_pre and Mp.fk_mp_nometalico=Nm.nom_codigo',(err,result)=>{
          if(err){
            console.log(err.stack);
            res.send('failed');
          }
          else if(result.rows[0] != null){
            var DetalleNoMet = result.rows;
            console.log('hizo el primer query');
            client.query('SELECT Pr.pre_nombre,V.ven_codigo, D.dev_cantidad, D.dev_monto,Mp.mp_codigo, Mt.met_nombre FROM detalle_ven D, Min_metalico Mt, Min_Pre Mp, Venta V, Presentacion Pr WHERE V.ven_codigo = D.fk_dev_venta and Mp.mp_codigo = D.fk_dev_min_pre and Pr.pre_codigo = Mp.fk_mp_presentacion and Mp.mp_codigo = D.fk_dev_min_pre and Mp.fk_mp_metalico=Mt.met_codigo',
              (err,result)=>{
              if (err){
                console.log(err.stack);
                res.send('failed');
              }
              else if(result.rows[0] != null){
              console.log('hizo el segundo query');
              var DetalleMet= result.rows;
              res.render('detalleventa.ejs',{DetalleMet:DetalleMet, DetalleNoMet:DetalleNoMet, user: userJSON});
              }
               else{
              res.send('failed');
                };
            });  
          }
          else{
          res.send('failed');
          };
        });
      }
      else {res.redirect('login');}
    });


// app.get("/VerificarComprador",function(req,res){
//   if (userJSON.usuario !="none"){
//     client.query( 'Select v.*, d.*, cli_cedula from venta v, cliente cl, detalle_ven d where v.fk_ven_cliente = cl.cli_codigo and v.ven_codigo = d.fk_dev_venta',
//     (err,result)=>{
//         if(err){
//             console.log('fallo query')
//             console.log(err.stack);
//             res.send('failed');
//         }
//         else if(result.rows[0] != null){
//           console.log(result.rows);
//           res.render('modificarventas.ejs',{user: userJSON, dataTable:result.rows})
//         }
//         else {
//           res.send('failed');
//           console.log ('fallo consulta x cliente')
//         }
//   });
//   }
//   else {
//     res.redirect('login');
//   }
// })


app.get("/VerificarComprador",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('modificarventas.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

//--------------------------CLIENTES------------------------------------------

app.get("/Clientes",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDclientes.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


app.get("/AgregarCliente",function(req,res){
  let dataLugar;
  if(userJSON.usuario != "none"){
    client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR',(err,resultB)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(resultB.rows[0] != null){
            dataLugar = resultB.rows;
            res.render('clienteAgregar.ejs',{dataLugar: dataLugar, user: userJSON});
          }else{
            res.send('failed');
          };
        });
    
  }else{
    res.redirect('login');
  }
});


app.get("/ConsultaCliente",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT C.cli_cedula,C.cli_nombre,C.cli_apellido,C.cli_telefono,L.lug_nombre FROM cliente AS C,lugar AS L WHERE C.fk_cli_lugar = L.lug_codigo',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        console.log(result.rows);
        res.render('clientesConsultar.ejs',{dataTable: result.rows, user: userJSON});
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});

app.get("/ModificarCliente",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('clientesModificar.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/EliminarCliente",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('clientesEliminar.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

//-------------------EXPLOTACIONES---------------------

app.get("/Explotaciones",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDExplotacion.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


app.get("/CrearExplotacion",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('crearexplotacion.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


//---------------------------SOLICITUD DE COMPRA----------------------------

app.get("/SolicitudCompra",function(req,res){
  var fy='yyyy';
  var fm='mm';
  var fd= 'dd';

  if(userJSON.usuario != "none"){
    client.query('SELECT S.sc_codigo, to_char(S.sc_fechaemision,$1) AS year,to_char(S.sc_fechaemision,$2) AS month, to_char(S.sc_fechaemision,$3) AS day, S.sc_costototal, S.fk_sc_aliado, AC.ac_nombre, S.fk_sc_explotacion FROM solicitud_compra AS S, aliado_comercial AS AC WHERE S.fk_sc_aliado = AC.ac_numero_rif',[fy,fm,fd],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        console.log(result.rows);
        res.render('SolicitudCompr.ejs',{dataTable: result.rows, user: userJSON});
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});


//METODOS POST

//URL para login
app.post('/login',function(req,res){
  var userCheck = req.body.user;
  var userPassword = req.body.password;
  client.query('SELECT E.emp_nombre,E.emp_apellido,Carg.car_nombre,U.usu_password FROM empleado AS E, usuario AS U , cargo AS Carg WHERE U.fk_usu_empleado_ci = E.emp_cedula AND E.fk_emp_cargo = Carg.car_codigo AND U.usu_usuario = $1',[userCheck],(err,result)=>{
      if(result.rows[0] != null && result.rows[1] == null){
        if (result.rows[0].usu_password == userPassword){
          userJSON.nombre = result.rows[0].emp_nombre;
          userJSON.apellido = result.rows[0].emp_apellido;
          userJSON.cargo = result.rows[0].car_nombre;
          userJSON.usuario = userCheck;
          userJSON.password = userPassword;
          res.send('access');  
        }else{
          res.send('notAccess');
        }
      }else{
        res.send('notAccess');
      }
  });
});

app.post("/logOut",function(req,res){
  userJSON.nombre = "none";
  userJSON.apellido = "none";
  userJSON.usuario = "none"; 
  userJSON.password = "none";
  res.redirect('login');
});

//URL para agregar empleado
app.post("/Empleados-Agregar",function(req,res){
  var empleadoPrimerNombre = req.body.nombre;
  var empleadoPrimerApellido = req.body.apellido;
  var empleadoCedula = req.body.cedula;
  var empleadoGenero = req.body.genero;
  var empleadoFechaNacimiento = req.body.fnac;
  var empleadoTelefono = req.body.telefono;
  var empleadoUsuario = req.body.usuario;
  var passwordUsuario = req.body.password;
  var cargoEmpleado = req.body.cargo;
  var parroquiaEmpleado = req.body.parroquia;

  if(empleadoGenero == 'Femenino'){
    empleadoGenero = 'F';
  }else if(empleadoGenero == 'Masculino'){
    empleadoGenero = 'M';
  }else{
    empleadoGenero = 'O';
  }

  client.query('INSERT INTO empleado (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar,fk_emp_estatus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,1)',[empleadoCedula,empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,cargoEmpleado,parroquiaEmpleado],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(empleadoUsuario != "" && passwordUsuario != ""){
      client.query('INSERT INTO usuario (usu_usuario,usu_password,fk_usu_estatus,fk_usu_empleado_ci,fk_usu_rol) VALUES($1,$2,1,$3,1)',[empleadoUsuario,passwordUsuario,empleadoCedula],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }else{
          console.log('Query procesado correctamente (Usuario)');
        };
      });
      res.send('great'); 
      console.log('Query procesado correctamente (Empleado y Usuario)');
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente (Empleado y Usuario)');
    }
  });
});

app.post("/lugar-estado",function(req,res){ 
  var filtro = req.body.filtroEstado;
  console.log(filtro);
  client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR WHERE fk_lug_lugar = $1',[filtro],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var filtroMunicipio = result.rows;
      res.json(filtroMunicipio);
    }else{
      res.send('failed');
    }
  });
});

app.post("/lugar-municipio",function(req,res){ 
  var filtro = req.body.filtroMunicipio;
  console.log(filtro);
  client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR WHERE fk_lug_lugar = $1',[filtro],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var filtroParroquia = result.rows;
      res.json(filtroParroquia);
    }else{
      res.send('failed');
    }
  });
});

//URL para eliminar empleados
app.post("/Empleados-Eliminar",function(req,res){ 
  var cedulaEliminar = req.body.cedulaEmp;
  client.query('DELETE FROM empleado AS E WHERE E.emp_cedula = $1',[cedulaEliminar],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
});

// ARREGLAR
//URL para verificar empleado en modificacion
app.post("/Empleados-Verificar",function(req,res){ 
  var cedulaV = req.body.cedulaEmpV;
  client.query('SELECT E.emp_cedula,E.emp_nombre,E.emp_apellido,E.emp_fechanacimiento,E.emp_genero,E.emp_telefono,Carg.car_nombre,Carg.car_codigo, Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod FROM empleado AS E, cargo AS Carg, lugar AS Par, lugar AS Mun, lugar AS Est WHERE E.emp_cedula = $1 AND E.fk_emp_cargo = Carg.car_codigo AND Par.lug_codigo = E.fk_emp_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo',[cedulaV],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var estado = 'ESTADO';
      var dataV = result.rows;
      client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR WHERE lug_tipo = $1 ',[estado],(err,estados)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }else if(estados.rows[0] != null){
          var estados = estados.rows;
          client.query('SELECT car_nombre,car_codigo FROM CARGO',(err,cargos)=>{
            if (err) {
              console.log(err.stack);
              res.send('failed'); 
            }else if(cargos.rows[0] != null){
              var cargos = cargos.rows;
              res.send({dataV: dataV,estados: estados,cargos: cargos});
            }else{
              res.send('failed');
            }
          });
        }else{
          res.send('failed');
        }
      });
    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
});         

//ARREGLAR
app.post("/Empleados-Modificar",function(req,res){ 
  var empleadoPrimerNombre = req.body.nombreGC;
  var empleadoPrimerApellido = req.body.apellidoGC;
  var empleadoCedula = req.body.cedulaGC;
  var empleadoGenero = req.body.generoGC;
  var empleadoFechaNacimiento = req.body.fnacGC;
  var empleadoTelefono = req.body.telefonoGC;
  var empleadoCargo = req.body.cargoGC;
  var empleadoParroquia = req.body.parroquiaGC;

  client.query('UPDATE EMPLEADO SET emp_nombre=$1,emp_apellido=$2,emp_fechanacimiento=$3,emp_genero= $4,emp_telefono= $5,fk_emp_cargo= $6,fk_emp_lugar= $7 WHERE emp_cedula= $8',[empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,empleadoCargo,empleadoParroquia,empleadoCedula],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente');
    };
  });
});

//URL para modificar el empleado verificado

//------------------CLIENTES--------------------

app.post("/AgregarCliente",function(req,res){
  var clienteNombre = req.body.nombre;
  var clienteApellido = req.body.apellido;
  var clienteCedula = req.body.cedula;
  var clienteTelefono = req.body.telefono;
  var clienteParroquia = req.body.parroquia;

  client.query('INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES ($1,$2,$3,$4,$5)',
    [clienteCedula,clienteNombre,clienteApellido,clienteTelefono,clienteParroquia],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente');
    };
  });
});

app.post("/EliminarCliente",function(req,res){ 
  var cedulaEliminar = req.body.cedulaCli;
  client.query('DELETE FROM cliente AS C WHERE C.cli_cedula = $1',[cedulaEliminar],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
});


//URL para verificar empleado en modificacion
app.post("/VerificarCliente",function(req,res){ 
  var cedulaV = req.body.cedulaCliV;
  client.query('SELECT Cli.cli_cedula,Cli.cli_nombre,Cli.cli_apellido,Cli.cli_telefono,Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod FROM cliente AS Cli , lugar AS Par, lugar AS Mun, lugar AS Est WHERE Cli.cli_cedula = $1 AND Par.lug_codigo = Cli.fk_cli_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo',[cedulaV],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      console.log('Hizo el primer query');
      var estado = 'ESTADO';
      var dataV = result.rows;
      client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR WHERE lug_tipo = $1 ',[estado],(err,estados)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed');        
        }else{
          var estados = estados.rows;
          res.json({dataV:dataV,estados: estados});
        }
      });
    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
});         

app.post("/ModificarCliente",function(req,res){ 
  var clientePrimerNombre = req.body.nombreGC;
  var clientePrimerApellido = req.body.apellidoGC;
  var clienteCedula = req.body.cedulaGC;
  var clienteTelefono = req.body.telefonoGC;
  var clienteParroquia = req.body.parroquiaGC;

  client.query('UPDATE CLIENTE SET cli_nombre=$1,cli_apellido=$2,cli_telefono=$3,fk_cli_lugar= $4 WHERE cli_cedula= $5',[clientePrimerNombre,clientePrimerApellido,clienteTelefono,clienteParroquia,clienteCedula],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente');
    };
  });
});


//----------------VENTAS-------------------------------------

app.post("/GuardarClienteNuevaVenta",function(req,res){
  var ced = req.body.cedulaC;
  var nom = req.body.nombreC;
  var ape = req.body.apellidoC;

  compradorActual.nombre = nom;
  compradorActual.apellido = ape;
  compradorActual.cedula = ced; 

  res.send('guardado');

});


app.post("/NuevaVenta",function(req,res){
  var cedula = req.body.cedulaCliente;
    client.query ('Select cli_cedula,cli_nombre, cli_apellido from cliente where cli_cedula = $1',[cedula],(err,result)=>{
      if (err){
        console.log(err.stack);
        res.send('failed'); 
      }
      else if (result.rows[0] != null){
        console.log(result.rows);
        var datacliente = result.rows;
        res.send({datacliente:datacliente});
      }
      else {
        console.log ('entra aqui');
        res.send('new');
      };
    });
});

app.post("/VerificarCedula",function(req,res){ 
  var cedulaV = req.body.cedulaCliV;
  client.query('SELECT Cli.cli_cedula,Cli.cli_nombre,Cli.cli_apellido,Cli.cli_telefono,Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod FROM cliente AS Cli , lugar AS Par, lugar AS Mun, lugar AS Est WHERE Cli.cli_cedula = $1 AND Par.lug_codigo = Cli.fk_cli_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo',[cedulaV],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      console.log('Hizo el primer query');
      var estado = 'ESTADO';
      var dataV = result.rows;
      client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR WHERE lug_tipo = $1 ',[estado],(err,estados)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed');        
        }else{
          var estados = estados.rows;
          res.json({dataV:dataV,estados: estados});
        }
      });
    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
});  


app.post("/CrearVenta",function(req,res){
  var minCantidad = req.body.minCantidad;
  var devMonto = req.body.minMonto;
  var minPresentacion = req.body.minPresentacion;
  var minPrecio = req.body.minPrecio;
  var minTotal = req.body.minTotal;
  var cuenta= req.body.tcuen;
  var tipopago = req.body.tipopago;
  var banco = req.body.tban;
  var montoparcial = req.body.tmon;
  var tipotarjeta=req.body.ttip;
  var nrotarj=req.body.ttarj;
  var referencia = req.body.tref;

  //compradorActual.monto = minTotal; 
  for (var i = montoparcial.length - 1; i >= 0; i--) {
  console.log (montoparcial[i]);
}
  if(userJSON.usuario != "none"){
    client.query('INSERT INTO VENTA (ven_fecha,ven_montototal,fk_ven_cliente,fk_ven_usuario) VALUES((SELECT NOW()),$1,(SELECT cli_codigo from cliente where cli_cedula =$2),(SELECT usu_usuario_id from usuario where usu_usuario =$3)) returning ven_codigo',
      [minTotal,compradorActual.cedula,userJSON.usuario],(err,result)=>{
      if (err) {
        console.log('Entro en el error de venta');
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows!= null && devMonto != null){
        console.log('Entro en la insercion de detalleventa');
        var codigoventa=result.rows;
        for (var i = devMonto.length - 1; i >= 0; i--) {
            console.log (codigoventa);
            console.log ('for 1'); 
            console.log(montoparcial[i]);
            client.query('INSERT INTO Detalle_Ven (fk_dev_venta,dev_monto,dev_cantidad,fk_dev_min_pre) VALUES($1,$2,$3,$4)',
            [codigoventa[0].ven_codigo,devMonto[i], minCantidad[i], minPresentacion[i]],(err,resultM)=>{
              if (err) {
                console.log(err.stack);
                res.send('failed'); 
              }
              else if (minCantidad !=null){
                console.log(minCantidad[i]);
                console.log ('entro en la insercion de inventario');
                for (var i = minCantidad.length - 1; i >= 0; i--) {
                console.log ('for 2'); 
            console.log(montoparcial[i]);
                client.query('INSERT INTO inventario(inv_cantidadmovimiento, inv_cantidadactual, inv_fechamovimiento, fk_inv_venta, fk_inv_explotacion, fk_inv_minpre) VALUES ($1,(select inv_cantidadactual-($2) from inventario where fk_inv_minpre = $3 and inv_fechamovimiento = (select max(inv_fechamovimiento) AS fecha from inventario where (fk_inv_minpre = $4))),(SELECT ven_fecha from venta where ven_codigo = $5),$6,$7,$8)', 
                  [-(minCantidad[i]), minCantidad[i], minPresentacion[i],minPresentacion[i],codigoventa[0].ven_codigo,codigoventa[0].ven_codigo,null,minPresentacion[i]],(err,resultM)=>{
                  if (err){
                      console.log ('Entro en el error de inventario');
                      console.log (err.stack);
                      res.send ('failed');
                  }
                  else if(tipopago!=null){
                    console.log('Entro en la insercion de tipos de pago');
                    for (var i = tipopago.length - 1; i >= 0; i--) {
                        console.log ('for 3'); 
                        console.log(montoparcial[i]);
                      // TRANSFERENCIA
                        if (tipopago[i]=="Transf"){
                          console.log('entro a transf');
                          console.log(montoparcial[i]);
                          var monto=montoparcial[i];
                          client.query('INSERT INTO tp_transferencia(tpt_numero, tpt_banco, tpt_cuenta) VALUES ($1, $2, $3) returning tpt_codigo', 
                          [referencia[i],banco[i],cuenta[i]],(err,result)=>{
                          if(err){
                            console.log ('error en transferencia');
                            console.log(err.stack);
                            res.send('failed');
                          } 
                          else if (result.rows!=null){
                            console.log ('entro en ventip de transferencia')
                            console.log(monto);
                            var codigotransf = result.rows;
                            console.log(codigotransf);
                           client.query('INSERT INTO public.ven_tip(vt_fecha, vt_monto, fk_vt_tptransferencia, fk_vt_venta) VALUES ((Select now()),$1,$2,$3)', 
                            [monto,codigotransf[0].tpt_codigo,codigoventa[0].ven_codigo],(err,resultM)=>{
                              if(err){
                                console.log ('error en transferencia');
                                console.log(err.stack);
                                res.send('failed');
                              } 
                            });
                          } 
                        });
                        }

                        //CREDITO
                        else if (tipopago[i]=="Cred"){
                          console.log('entro a cred');
                          console.log(montoparcial[i]);
                          var monto=montoparcial[i];
                          client.query('INSERT INTO tp_credito(tpc_numero, tpc_banco, tpc_tipocredito) VALUES ($1, $2, $3) returning tpc_codigo', 
                          [nrotarj[i],banco[i],tipotarjeta[i]],(err,result)=>{
                          if(err){
                            console.log ('error en credito');
                            console.log(err.stack);
                            res.send('failed');
                          } 
                          else if (result.rows!=null){
                            console.log ('entro en ventip de credito')
                            console.log(monto);
                            var codigocred = result.rows;
                            console.log(codigocred);
                           client.query('INSERT INTO ven_tip(vt_fecha, vt_monto, fk_vt_tpcredito, fk_vt_venta) VALUES ((Select now()),$1,$2,$3)', 
                            [monto,codigocred[0].tpt_codigo,codigoventa[0].ven_codigo],(err,result)=>{
                              if(err){
                                console.log ('error en credito');
                                console.log(err.stack);
                                res.send('failed');
                              } 
                            });
                          } 
                        });
                        }

                        //DEBITO
                        else if (tipopago[i]=="Deb"){
                          console.log('entro a deb');
                          console.log(montoparcial[i]);
                          var monto=montoparcial[i];
                          client.query('INSERT INTO tp_debito(tpd_numero, tpd_banco, tpd_tipodebito) VALUES ($1, $2, $3) returning tpd_codigo', 
                          [nrotarj[i],banco[i],tipotarjeta[i]],(err,result)=>{
                          if(err){
                            console.log ('error en debito');
                            console.log(err.stack);
                            res.send('failed');
                          } 
                          else if (result.rows!=null){
                            console.log ('entro en ventip de debito')
                            console.log(monto);
                            var codigodeb = result.rows;
                            console.log(codigodeb);
                           client.query('INSERT INTO ven_tip(vt_fecha, vt_monto, fk_vt_tpdebito, fk_vt_venta) VALUES ((Select now()),$1,$2,$3)', 
                            [monto,codigodeb[0].tpt_codigo,codigoventa[0].ven_codigo],(err,result)=>{
                              if(err){
                                console.log ('error en debito');
                                console.log(err.stack);
                                res.send('failed');
                              } 
                            });
                          } 
                        });
                        }

                        //CHEQUE
                        else if (tipopago[i]=="Cheque"){
                          console.log('entro a cheque');
                          console.log(montoparcial[i]);
                          var monto=montoparcial[i];
                          client.query('INSERT INTO tp_cheque(tpch_numero, tpch_banco, tpch_cuenta) VALUES ($1, $2, $3) returning tpch_codigo', 
                          [referencia[i],banco[i],cuenta[i]],(err,result)=>{
                          if(err){
                            console.log ('error en cheque');
                            console.log(err.stack);
                            res.send('failed');
                          } 
                          else if (result.rows!=null){
                            console.log ('entro en ventip de cheque')
                            console.log(monto);
                            var codigoch = result.rows;
                            console.log(codigoch);
                           client.query('INSERT INTO ven_tip(vt_fecha, vt_monto, fk_vt_tpcheque, fk_vt_venta) VALUES ((Select now()),$1,$2,$3)', 
                            [monto,codigoch[0].tpt_codigo,codigoventa[0].ven_codigo],(err,result)=>{
                              if(err){
                                console.log ('error en cheque');
                                console.log(err.stack);
                                res.send('failed');
                              } 
                            });
                          } 
                        });
                        }
                  }//cierre for3
                }//cierre else de tercer query
                }); //tercer query    
                } // for 2  
              }else{
                console.log('Entro en la insercion de detalle venta sin inventario');
                res.send('great');
              }//else segundo query
        res.send('great');
      });//segundo query
      }//1er for
      }else{
        console.log('Entro en la insercion de venta sin detalleventa');
        res.send('great');
      }//else primerquery
    });//primer query
  }else{
    res.redirect('login');
  };//cierra condicion usuario
});//cierra el post


app.post("/ConsultarInv",function(req,res){
  console.log('estoy en app');
  var minPresentacion = req.body.minPresentacion;
  console.log (minPresentacion);
  for (var i = minPresentacion.length - 1; i >= 0; i--) {

  client.query('select inv_cantidadactual from inventario where fk_inv_minpre = $1 and inv_fechamovimiento = (select max(inv_fechamovimiento) AS fecha from inventario where (fk_inv_minpre = $2))',
    [minPresentacion[i],minPresentacion[i]],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if (result.rows != null){
      var disp = result.rows;
      res.send({disp:disp}); 
      console.log(disp);
      console.log('Query procesado correctamente');
    }
    else{
      res.send ('failed');
      console.log ('No entro');
    }
  });
  };
});

app.post("/VerificarComprador",function(req,res){ 
  var cedulaC = req.body.cedulacomprador;
  console.log(cedulaC);
  client.query('Select v.*, d.* from venta v, cliente cl, detalle_ven d where v.fk_ven_cliente = cl.cli_codigo and cl.cli_cedula = $1 and v.ven_codigo = d.fk_dev_venta',
    [cedulaC],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      console.log('Consulto venta por cliente');
      var dataC = result.rows;
      console.log (dataC);
      res.send ({dataC:dataC});
    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
}); 


app.post("/ModificarVentaSelect",function(req,res){
   var cod = req.body.codigo;
  if(userJSON.usuario != "none"){
    client.query('select mp.fk_mp_metalico from detalle_ven d, min_pre mp where d.fk_dev_venta = $1 and d.fk_dev_min_pre = mp.mp_codigo',
    [cod],(err,result)=>{
    console.log ('consulta tipo mineral');
    if (err) {
        console.log(err.stack);
        res.send('failed'); 
    }
    else if (result.rows.fk_mp_metalico!= null){
     client.query(' select pr.pre_nombre, mt.met_nombre, d.dev_cantidad, d.dev_monto, v.ven_montototal, mp.mp_precio from detalle_ven d, min_pre mp, presentacion pr, min_metalico mt, venta v where v.ven_codigo = $1 and d.fk_dev_venta = v.ven_codigo and d.fk_dev_min_pre = mp.mp_codigo and mp.fk_mp_presentacion = pr.pre_codigo and mp.fk_mp_metalico = mt.met_codigo ',
    [cod],(err,result)=>{
      console.log ('entro a metalico');
        if (err) {
        console.log(err.stack);
        res.send('failed'); 
        }
        else if (result.rows!=null){
          var ventamet = result.rows;
          console.log (ventamet);
          res.send({ventamet: ventamet});
        }
        else {
          res.send('failed');
        }
    });

    }

    else {

      client.query('select pr.pre_nombre, nm.nom_nombre, d.dev_cantidad, d.dev_monto, v.ven_montototal, mp.mp_precio from detalle_ven d, min_pre mp, presentacion pr, min_no_metalico nm, venta v where v.ven_codigo = $1 and d.fk_dev_venta = v.ven_codigo and d.fk_dev_min_pre = mp.mp_codigo and mp.fk_mp_presentacion = pr.pre_codigo and mp.fk_mp_nometalico = nm.nom_codigo ',
    [cod],(err,result)=>{
      console.log ('entro a no metalico');
        if (err) {
        console.log(err.stack);
        res.send('failed'); 
        }
        else if (result.rows!=null){
          var ventanom = result.rows;
          console.log (ventanom);
          res.send({ventanom: ventanom});
        }
        else {
          res.send('failed');
        }
    });

    }
  });
  }else{
    res.redirect('login');
  }
});

//CLIENTE
app.post("/AgregarCliente",function(req,res){
  var clienteNombre = req.body.nombre;
  var clienteApellido = req.body.apellido;
  var clienteCedula = req.body.cedula;
  var clienteTelefono = req.body.telefono;
  var clienteParroquia = req.body.parroquia;

  client.query('INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES ($1,$2,$3,$4,$5)',
    [clienteCedula,clienteNombre,clienteApellido,clienteTelefono,clienteParroquia],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente');
    };
  });
});


//QUERY DINAMICO
app.post("/Ventas-AgregarDEV",function(req,res){
  var filtro = req.body.filtroMin;
  //var filtropre = req.body.filtroPre;
  if(userJSON.usuario != "none"){

    client.query('SELECT * FROM '+filtro+'',(err,result)=>{

      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var min = result.rows;
        res.send({min: min});
      }else{
        res.send('failed');
      };

    });

  }else{
    res.redirect('login');
  }
});


app.post("/Ventas-AgregarPre",function(req,res){
  var filtro = req.body.filtroPre;
  var filtroT = req.body.filtroT;

  console.log(filtro);
  console.log(filtroT);

    if (filtroT == 'MIN_NO_METALICO') {
        console.log ('hola');
         client.query('SELECT Pr.pre_nombre, Mp.mp_codigo FROM Min_no_metalico Nm, Presentacion Pr, Min_Pre Mp WHERE Mp.fk_mp_presentacion = Pr.pre_codigo  and Mp.fk_mp_nometalico= nm.nom_codigo and nm.nom_codigo = $1',
          [filtro],(err,result)=>{ 
          
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(result.rows[0] != null){
            console.log(result.rows);
            var min = result.rows;
            res.send({min: min});
          }
          else {
            res.send ('failed');
          }
    });
    }
    else if (filtroT == 'MIN_METALICO'){
      console.log ('chao');
      client.query('SELECT Pr.pre_nombre, Mp.mp_codigo FROM Min_metalico mt, Presentacion Pr, Min_Pre Mp WHERE Mp.fk_mp_presentacion = Pr.pre_codigo  and Mp.fk_mp_metalico= mt.met_codigo  and mt.met_codigo = $1',
    [filtro],(err,result)=>{ 
      if (err) {
      console.log(err.stack);
      res.send('failed'); 
      }else if(result.rows[0] != null){
      console.log(result.rows);
      var min = result.rows;
      res.send({min: min});
    }else{
    res.send('failed');
      }
      });
    }
});

app.post("/Ventas-AgregarPrecio",function(req,res){
  var filtro = req.body.filtroPre;

  if(userJSON.usuario != "none"){

    client.query('SELECT mp_precio from min_pre where mp_codigo = $1',[filtro],(err,result)=>{

      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var min = result.rows;
        res.send({min: min});
      }else{
        res.send('failed');
      };

    });

  }else{
    res.redirect('login');
  }
});



//Puerto donde se escuchan las peticiones http
app.listen(8080);