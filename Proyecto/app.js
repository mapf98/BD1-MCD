//En esta sección requerimos los paquetes instalados para su uso.
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userJSON ={
  "nombre": "none",
  "apellido":"none",
  "usuario":"none",
  "password":"none",
  "cargo": "none"
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
  password: 'admin',
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

app.get("/Yacimientos",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('yacimientos',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Explotaciones",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('explotaciones',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Explotacion-Configuracion",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('explotacionesConfiguracion',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Empleados-Agregar",function(req,res){
  let dataCargo;
  let dataLugar;
  let dataRol;
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
            client.query('SELECT rol_codigo,rol_nombre FROM ROL',(err,resultC)=>{
              if (err) {
                console.log(err.stack);
                res.send('failed'); 
              }else if(resultC.rows[0] != null){
                dataRol = resultC.rows
                res.render('empleadosAgregar',{dataLugar: dataLugar, dataRol: dataRol, dataCargo: dataCargo, user: userJSON});
              }else{
                res.send('failed');
              };
            });
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

//Yacimientos
app.get("/Yacimientos-Agregar",function(req,res){
  let dataLugar;
  let dataMM;
  if(userJSON.usuario != "none"){
    client.query('SELECT lug_codigo,lug_nombre,lug_tipo FROM LUGAR',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        dataLugar = result.rows;
        res.render('yacimientosAgregar',{dataLugar: dataLugar,user: userJSON});
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  };
});

app.post("/Yacimientos-Agregar",function(req,res){
  var nombreYac = req.body.nombreYacimiento;
  var extensionYac = req.body.extensionYacimiento;
  var parroquiaYac = req.body.parroquia;
  var minTipo = req.body.minTipo;
  var minMin = req.body.minMin;
  var minCantidad = req.body.minCantidad;
  var estatusY = 'SCF';

  if(userJSON.usuario != "none"){
    client.query('INSERT INTO YACIMIENTO (yac_extension,yac_fecharegistro,yac_nombre,fk_yac_estatus,fk_yac_lugar) VALUES($1,(SELECT NOW()),$2,(SELECT est_codigo FROM ESTATUS WHERE est_nombre = $3),$4)',[extensionYac,nombreYac,estatusY,parroquiaYac],(err,result)=>{
      if (err) {
        console.log('Entro en el error esperado');
        console.log(err.stack);
        res.send('failed'); 
      }else if(minTipo != null){
        console.log('Entro en la insersion de minerales');
        for (var i = minTipo.length - 1; i >= 0; i--) {

          if(minTipo[i]=='MIN_METALICO'){

            client.query('INSERT INTO YAC_MIN (fk_ym_yacimiento,fk_ym_minmetalico,ym_cantidad) VALUES ( (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $1) ,$2,$3)',[nombreYac,minMin[i],minCantidad[i]],(err,resultM)=>{
              if (err) {
                console.log(err.stack);
                res.send('failed'); 
              }
            });

          }else{

            client.query('INSERT INTO YAC_MIN (fk_ym_yacimiento,fk_ym_minnometalico,ym_cantidad) VALUES ( (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $1) ,$2,$3)',[nombreYac,minMin[i],minCantidad[i]],(err,resultN)=>{
              if (err) {
                console.log(err.stack);
                res.send('failed'); 
              }
            });

          }
        }
        res.send('great');

      }else{
        console.log('Entro en la insersion del yacimiento sin minerales');
        res.send('great');
      }
    });
  }else{
    res.redirect('login');
  };
});

app.get("/Yacimientos-Consultar",function(req,res){
  var fy = 'yyyy';
  var fm = 'mm';
  var fd = 'dd';
  if(userJSON.usuario != "none"){
    client.query('SELECT Y.yac_codigo,Y.yac_extension,Y.yac_nombre, to_char(Y.yac_fecharegistro,$1) AS year,to_char(Y.yac_fecharegistro,$2) AS month,to_char(Y.yac_fecharegistro,$3) AS day FROM yacimiento AS Y',[fy,fm,fd],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var infoYac = result.rows;
        client.query('SELECT YM.fk_ym_yacimiento, MM.met_nombre,YM.ym_cantidad FROM yac_min AS YM, min_metalico AS MM WHERE YM.fk_ym_minmetalico = MM.met_codigo ',(err,resultMET)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(resultMET.rows[0] != null){
            var metYac = resultMET.rows;
           client.query('SELECT YM.fk_ym_yacimiento, YM.ym_cantidad, NOM.nom_nombre FROM yac_min AS YM, min_no_metalico AS NOM WHERE YM.fk_ym_minnometalico = NOM.nom_codigo ',(err,resultNOM)=>{
              if (err) {
                console.log(err.stack);
                res.send('failed'); 
              }else if(resultNOM.rows[0] != null){
                var nomYac = resultNOM.rows;
                res.render('yacimientosConsultar',{dataTable: infoYac,metYac: metYac,nomYac: nomYac, user: userJSON});
              }else{
                res.send('failed');
              };
            });
          }else{
            res.send('failed');
          };
        });
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});

app.post("/Yacimientos-AgregarMin",function(req,res){
  var filtro = req.body.filtroMin;
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

app.get("/Yacimientos-Modificar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('yacimientosModificar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Yacimientos-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('yacimientosEliminar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.post("/Yacimientos-Eliminar",function(req,res){
  var eliminarYac = req.body.nombreYac;
  client.query('DELETE FROM yacimiento AS Y WHERE Y.yac_nombre = $1',[eliminarYac],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
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
  var rolUsuarioEmpleado = req.body.rol;

  if(empleadoGenero == 'Femenino'){
    empleadoGenero = 'F';
  }else if(empleadoGenero == 'Masculino'){
    empleadoGenero = 'M';
  }else{
    empleadoGenero = 'O';
  }

  client.query('INSERT INTO empleado (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[empleadoCedula,empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,cargoEmpleado,parroquiaEmpleado],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(empleadoUsuario != "" && passwordUsuario != ""){
      client.query('INSERT INTO usuario (usu_usuario,usu_password,fk_usu_empleado_ci,fk_usu_rol) VALUES($1,$2,$3,$4)',[empleadoUsuario,passwordUsuario,empleadoCedula,rolUsuarioEmpleado],(err,result)=>{
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

//URL para verificar empleado en modificacion
app.post("/Empleados-Verificar",function(req,res){ 
  var cedulaV = req.body.cedulaEmpV;
  client.query('SELECT E.emp_cedula,E.emp_nombre,E.emp_apellido,E.emp_fechanacimiento,E.emp_genero,E.emp_telefono, Carg.car_nombre, Carg.car_codigo, Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod, U.usu_usuario,U.usu_password,R.rol_codigo,R.rol_nombre FROM empleado AS E, cargo AS Carg, lugar AS Par, lugar AS Mun, lugar AS Est, usuario AS U, rol AS R WHERE E.emp_cedula = $1 AND E.fk_emp_cargo = Carg.car_codigo AND Par.lug_codigo = E.fk_emp_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo AND U.fk_usu_empleado_ci = E.emp_cedula AND U.fk_usu_rol = R.rol_codigo',[cedulaV],(err,result)=>{
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
              client.query('SELECT rol_nombre,rol_codigo FROM ROL',(err,roles)=>{
                if (err) {
                  console.log(err.stack);
                  res.send('failed'); 
                }else if(roles.rows[0] != null){
                  var roles = roles.rows;
                  var sinU = false;                  
                  res.send({dataV: dataV,estados: estados,cargos: cargos,roles: roles,sinU: sinU});
                }else{
                  res.send('failed');
                }
              });
            }else{
              res.send('failed');
            }
          });
        }else{
          res.send('failed');
        }
      });
    }else{
      client.query('SELECT E.emp_cedula,E.emp_nombre,E.emp_apellido,E.emp_fechanacimiento,E.emp_genero,E.emp_telefono, Carg.car_nombre, Carg.car_codigo, Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod FROM empleado AS E, cargo AS Carg, lugar AS Par, lugar AS Mun, lugar AS Est WHERE E.emp_cedula = $1 AND E.fk_emp_cargo = Carg.car_codigo AND Par.lug_codigo = E.fk_emp_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo',[cedulaV],(err,result)=>{
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
                  client.query('SELECT rol_nombre,rol_codigo FROM ROL',(err,roles)=>{
                    if (err) {
                      console.log(err.stack);
                      res.send('failed'); 
                    }else if(roles.rows[0] != null){
                      var roles = roles.rows;
                      var sinU = true;                  
                      res.send({dataV: dataV,estados: estados,cargos: cargos,roles: roles,sinU: sinU});
                    }else{
                      res.send('failed');
                    }
                  });
                }else{
                  res.send('failed');
                }
              });
            }else{
              res.send('failed');
            }
          });
        }else{ 
        }
      });
    }
  });
});    

function varToBoolean(element){
  if(element == 'false'){
    return Boolean(false);
  }else{
    return Boolean(true);
  }
}     

app.post("/Empleados-Modificar",function(req,res){ 
  var empleadoPrimerNombre = req.body.nombreGC;
  var empleadoPrimerApellido = req.body.apellidoGC;
  var empleadoCedula = req.body.cedulaGC;
  var empleadoGenero = req.body.generoGC;
  var empleadoFechaNacimiento = req.body.fnacGC;
  var empleadoTelefono = req.body.telefonoGC;
  var empleadoCargo = req.body.cargoGC;
  var empleadoParroquia = req.body.parroquiaGC;
  var empleadoUsuario = req.body.usuarioGC;
  var empleadoPassword = req.body.passwordGC;
  var empleadoUsuarioRol = req.body.rolGC;
  var nU = varToBoolean(req.body.nU);
  var uE = varToBoolean(req.body.uE);
  var dU = varToBoolean(req.body.dU);
  console.log(nU,uE,dU);

  if(nU == false && uE == true && dU != true){
    client.query('UPDATE EMPLEADO SET emp_nombre=$1,emp_apellido=$2,emp_fechanacimiento=$3,emp_genero= $4,emp_telefono= $5,fk_emp_cargo= $6,fk_emp_lugar= $7 WHERE emp_cedula= $8',[empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,empleadoCargo,empleadoParroquia,empleadoCedula],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(empleadoUsuario != "" && empleadoPassword != ""){
        client.query('UPDATE USUARIO SET usu_usuario=$1,usu_password=$2,fk_usu_rol=$3 WHERE usu_usuario_id = (SELECT usu_usuario_id FROM usuario WHERE fk_usu_empleado_ci = $4)',[empleadoUsuario,empleadoPassword,empleadoUsuarioRol,empleadoCedula],(err,result)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else{
            res.send('great'); 
            console.log('Query procesado correctamente con usuario MODIFICADO');
          };
        });
      }else{
        res.send('failed'); 
      }
    });
  }else if(uE == false && nU == false && dU != true){
    client.query('UPDATE EMPLEADO SET emp_nombre=$1,emp_apellido=$2,emp_fechanacimiento=$3,emp_genero= $4,emp_telefono= $5,fk_emp_cargo= $6,fk_emp_lugar= $7 WHERE emp_cedula= $8',[empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,empleadoCargo,empleadoParroquia,empleadoCedula],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else{
        console.log('Query procesado correctamente con EMPLEADO MODIFICADO SIN USUARIO');
        res.send('great'); 
      }
    });
  }else if(uE == false && nU == true && dU != true){
    console.log('Entro en el insertar');
    client.query('UPDATE EMPLEADO SET emp_nombre=$1,emp_apellido=$2,emp_fechanacimiento=$3,emp_genero= $4,emp_telefono= $5,fk_emp_cargo= $6,fk_emp_lugar= $7 WHERE emp_cedula= $8',[empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,empleadoCargo,empleadoParroquia,empleadoCedula],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(empleadoUsuario != "" && empleadoPassword != ""){
        client.query('INSERT INTO usuario (usu_usuario,usu_password,fk_usu_empleado_ci,fk_usu_rol) VALUES($1,$2,$3,$4)',[empleadoUsuario,empleadoPassword,empleadoCedula,empleadoUsuarioRol],(err,result)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else{
            res.send('great'); 
            console.log('Query procesado correctamente con usuario NUEVO');
          };
        });
      }else{
        res.send('failed'); 
      }
    });
  }else if(dU == true && uE == true && nU != true){
    console.log('Entro en ultima opcion');
    client.query('UPDATE EMPLEADO SET emp_nombre=$1,emp_apellido=$2,emp_fechanacimiento=$3,emp_genero= $4,emp_telefono= $5,fk_emp_cargo= $6,fk_emp_lugar= $7 WHERE emp_cedula= $8',[empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,empleadoCargo,empleadoParroquia,empleadoCedula],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else{
        client.query('DELETE FROM USUARIO WHERE usu_usuario_id = (SELECT usu_usuario_id FROM usuario WHERE fk_usu_empleado_ci = $1)',[empleadoCedula],(err,result)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else{
            res.send('great'); 
            console.log('Query procesado correctamente con usuario ELIMINADO');
          };
        });
      }
    });
  }else{
    res.send('failed'); 
  } 
});

app.post("/Yacimientos-Modificar",function(req,res){ 
  var nYac = req.body.nYac;
  var eYac = req.body.eYac;
  var pYac = req.body.pYac;
  var estYac = req.body.estYac;
  var modYac = req.body.modYac;
  var ready = true;

  console.log(eYac);

  client.query('UPDATE YACIMIENTO SET yac_extension = $1, fk_yac_lugar = $2,fk_yac_estatus= $3 WHERE yac_nombre =$4',[eYac,pYac,estYac,nYac],(err,result)=>{
    if (err) {
      ready = false;
      console.log(err.stack);
      res.send('failed'); 
    }
  });

  if(modYac.d !== undefined){
    console.log('Entro en los deletes');
    for (var i = modYac.d.length - 1; i >= 0; i--) {
      if(modYac.d[i].t =='MIN_METALICO'){

        client.query('DELETE FROM YAC_MIN WHERE fk_ym_yacimiento = (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $1) AND fk_ym_minmetalico=$2',[nYac,modYac.d[i].cod],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      }else{

        client.query('DELETE FROM YAC_MIN WHERE fk_ym_yacimiento = (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $1) AND fk_ym_minnometalico=$2',[nYac,modYac.d[i].cod],(err,resultN)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      }
    }
    console.log('HIZO TODOS LOS DELETES LJJP');
  }

  if(modYac.u !== undefined){
    for (var i = modYac.u.length - 1; i >= 0; i--) {
      if(modYac.u[i].t =='MIN_METALICO'){

        client.query('UPDATE YAC_MIN SET fk_ym_minmetalico = $1,fk_ym_minnometalico = null,ym_cantidad = $2 WHERE fk_ym_yacimiento = (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $3) AND fk_ym_minmetalico=$4',[modYac.u[i].cod,modYac.u[i].c,nYac,modYac.u[i].o],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      }else{

        client.query('UPDATE YAC_MIN SET fk_ym_minmetalico = null,fk_ym_minnometalico = $1,ym_cantidad = $2 WHERE fk_ym_yacimiento = (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $3) AND fk_ym_minnometalico=$4',[modYac.u[i].cod,modYac.u[i].c,nYac,modYac.u[i].o],(err,resultN)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      }
    }
    console.log('HIZO TODOS LOS UPDATES LJJP');
  }

  if(modYac.i !== undefined){
    for (var i = modYac.i.length - 1; i >= 0; i--) {
      if(modYac.i[i].t =='MIN_METALICO'){

        client.query('INSERT INTO YAC_MIN (fk_ym_yacimiento,fk_ym_minmetalico,ym_cantidad) VALUES ( (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $1) ,$2,$3)',[nYac,modYac.i[i].cod,modYac.i[i].c],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      }else{

        client.query('INSERT INTO YAC_MIN (fk_ym_yacimiento,fk_ym_minnometalico,ym_cantidad) VALUES ( (SELECT yac_codigo FROM YACIMIENTO WHERE yac_nombre = $1) ,$2,$3)',[nYac,modYac.i[i].cod,modYac.i[i].c],(err,resultN)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      }
    }
    console.log('HIZO TODOS LOS INSERTS LJJP');
  }

  if(ready){
    res.send('great');
  }
});

app.post("/Yacimientos-Verificar",function(req,res){ 
  var yacimientoV = req.body.yacimientoV;

  //PEDIR TODOS LOS DAOTOS
  client.query('SELECT Y.yac_codigo,Y.yac_nombre,Y.yac_extension,E.est_nombre,E.est_codigo, Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod FROM estatus AS E, yacimiento AS Y, lugar AS Par, lugar AS Mun, lugar AS Est WHERE Y.yac_nombre = $1 AND Par.lug_codigo = Y.fk_yac_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo AND Y.fk_yac_estatus = E.est_codigo',[yacimientoV],(err,result)=>{
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
          client.query('SELECT est_codigo,est_nombre FROM ESTATUS',(err,estatus)=>{
            if (err) {
              console.log(err.stack);
              res.send('failed'); 
            }else if(estatus.rows[0] != null){
              var estatus = estatus.rows;
              client.query('SELECT YM.fk_ym_yacimiento, MM.met_nombre,MM.met_codigo,YM.ym_cantidad FROM yac_min AS YM, min_metalico AS MM WHERE YM.fk_ym_minmetalico = MM.met_codigo ',(err,resultMET)=>{
                if (err) {
                  console.log(err.stack);
                  res.send('failed'); 
                }else if(resultMET.rows[0] != null){
                  var metYac = resultMET.rows;
                 client.query('SELECT YM.fk_ym_yacimiento, YM.ym_cantidad, NOM.nom_nombre,NOM.nom_codigo FROM yac_min AS YM, min_no_metalico AS NOM WHERE YM.fk_ym_minnometalico = NOM.nom_codigo ',(err,resultNOM)=>{
                    if (err) {
                      console.log(err.stack);
                      res.send('failed'); 
                    }else if(resultNOM.rows[0] != null){
                      var nomYac = resultNOM.rows;
                      res.send({dataV: dataV,estados: estados,estatus: estatus,metYac:metYac,nomYac:nomYac});
                    }else{
                      res.send('failed');
                    };
                  });
                }else{
                  res.send('failed');
                };
              });
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

/////////////////////////////////EXPLOTACIONES//////////////////////////////////

app.get("/Explotaciones-Configuracion-Agregar",function(req,res){
  var filtro = 'SCF';
  if(userJSON.usuario != "none"){
    client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS WHERE est_codigo = fk_yac_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ',[filtro],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yac = result.rows;
        res.render('explotacionesConfiguracionAgregar',{user: userJSON,yac: yac});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.get("/Explotaciones-Agregar-Iniciar",function(req,res){
  var filtro = 'CF';
  if(userJSON.usuario != "none"){
    client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS WHERE est_codigo = fk_yac_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ',[filtro],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yac = result.rows;
        res.render('explotacionesIniciarAgregar',{user: userJSON,yac: yac});
      }else{
        res.render('explotacionesIniciar',{user: userJSON,});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.get("/Explotaciones-Iniciar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('explotacionesIniciar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Explotaciones-Configuracion-Modificar",function(req,res){
  var filtro = 'CF';
  if(userJSON.usuario != "none"){
    client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS WHERE est_codigo = fk_yac_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ',[filtro],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yac = result.rows;
        res.render('explotacionesConfiguracionModificar',{user: userJSON,yac: yac});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.get("/ER",function(req,res){
  var filtro = 'SCF';
  client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS WHERE est_codigo = fk_yac_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ',[filtro],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var yac = result.rows;
      res.send({yac: yac});
    }
  });
});

app.get("/ERCF",function(req,res){
  var filtro = 'CF';
  client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS WHERE est_codigo = fk_yac_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ',[filtro],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var yac = result.rows;
      res.send({yac: yac});
    }
  });
});

app.get("/getCargo",function(req,res){
  client.query('SELECT car_codigo,car_nombre FROM CARGO',(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var car = result.rows;
      res.send({car:car});
    }
  });
});

app.get("/getTipoMaquinaria",function(req,res){
  client.query('SELECT tm_codigo,tm_nombre FROM TIPO_MAQUINARIA',(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var TMmaq = result.rows;
      res.send({TMmaq:TMmaq});
    }
  });
});

app.post("/getEmpleados",function(req,res){
  var empleadoCargo = req.body.eC;
  client.query('SELECT * FROM EMPLEADO AS E, CARGO AS C WHERE E.FK_EMP_CARGO = C.CAR_CODIGO AND C.CAR_NOMBRE = $1 ',[empleadoCargo],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var car = result.rows;
      res.send({car:car});
    }
  });
});

app.post("/getMaquinarias",function(req,res){
  var empleadoTM = req.body.mT;
  client.query('SELECT * FROM MAQUINARIA AS M, TIPO_MAQUINARIA AS TM WHERE M.FK_MAQ_TIPO = TM.TM_CODIGO AND TM.TM_NOMBRE = $1',[empleadoTM],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var TMmaq = result.rows;
      res.send({TMmaq:TMmaq});
    }
  });
});

app.post("/getYacExp",function(req,res){
  var verificar = req.body.yacExp;
  client.query('SELECT exp_codigo FROM EXPLOTACION WHERE fk_exp_yacimiento = $1',[verificar],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null ){
      res.send('great');
    }else{
      res.send('failed');
    }
  });
});

app.post("/AExp",function(req,res){
  var exp = req.body.AExp;
  var dur = req.body.ADur;
  var est = req.body.AEst; 
  console.log(exp);
  var estatusExp = 'Disponible';
  var estatusYac = 'CF';
  client.query('INSERT INTO EXPLOTACION (FK_EXP_ESTATUS,FK_EXP_YACIMIENTO,EXP_DURACION,EXP_COSTOTOTAL) VALUES ( (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ,$2,$3,$4) RETURNING EXP_CODIGO',[estatusExp,exp,dur,est],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0].exp_codigo != null){
      var expCod = result.rows[0];
      client.query('UPDATE YACIMIENTO SET FK_YAC_ESTATUS= (SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $1) WHERE YAC_CODIGO = $2',[estatusYac,exp],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }else{
          console.log('Modifico e inserto');
          res.send({cod: expCod}); 
        }
      });
    }else{
      console.log('Error');
      res.send('failed');
    }
  });
});

app.post("/AEta",function(req,res){
  var eta = req.body.AEta; 
  var exp = req.body.AExp;
  var est = req.body.AEst;
  var estD = req.body.AEstD;
  var estatusEta = 'Disponible';
  console.log(eta);
  client.query('INSERT INTO ETAPA (ETA_NOMBRE,FK_ETA_EXPLOTACION,FK_ETA_ESTATUS,ETA_COSTOTOTAL,ETA_DURACION) VALUES ($1,$2,(SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $3),$4,$5) RETURNING ETA_CODIGO',[eta,exp,estatusEta,est,estD],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0].eta_codigo != null){
      var etaCod = result.rows[0];
      res.send({cod: etaCod});
    }else{
      res.send('failed');
    }
  });
});

app.post("/AFas",function(req,res){
  var eta = req.body.AEta; 
  var fas = req.body.AFas;
  var est = req.body.AEst;
  var estD = req.body.AEstD;
  var estatusFas = 'Disponible';
  console.log(fas);
  client.query('INSERT INTO FASE (FAS_NOMBRE,FK_FAS_ETAPA,FK_FAS_ESTATUS,FAS_COSTOTOTAL,FAS_DURACION) VALUES ($1,$2,(SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $3),$4,$5) RETURNING FAS_CODIGO',[fas,eta,estatusFas,est,estD],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0].fas_codigo != null){
      var fasCod = result.rows[0];
      console.log(fasCod.faseCod);
      res.send({cod: fasCod});
    }else{
      res.send('failed');
    }
  });
});

app.post("/ACar",function(req,res){
  var fas = req.body.AFas;
  var c = req.body.ACarT;
  var q = req.body.ACarQ;
  var salario = req.body.ACarS;
  console.log(c+'/'+q);
  client.query('INSERT INTO CAR_FAS (CF_CANTIDAD,FK_CF_CARGO,FK_CF_FASE,CF_COSTO) VALUES ($1,$2,$3,$4)',[q,c,fas,salario],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
});

app.post("/AMaq",function(req,res){
  var fas = req.body.AFas;
  var m = req.body.AMaqT;
  var q = req.body.AMaqQ;
  var costo = req.body.AMaqC;
  console.log(m+'/'+q);
  client.query('INSERT INTO TM_FAS (TMF_CANTIDAD,FK_TMF_TM,FK_TMF_FASE,TMF_COSTO) VALUES ($1,$2,$3,$4)',[q,m,fas,costo],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
});

app.get("/Explotaciones-Configuracion-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT Y.YAC_NOMBRE, Y.YAC_CODIGO, EX.EXP_DURACION, EX.EXP_COSTOTOTAL, COUNT(E.ETA_NOMBRE) AS TotalEtapas FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO GROUP BY Y.YAC_NOMBRE, Y.YAC_CODIGO, EX.EXP_DURACION, EX.EXP_COSTOTOTAL',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yacimientosExp = result.rows;
        res.render('explotacionesConfiguracionConsultar',{user: userJSON,yacimientosExp: yacimientosExp});
      }else{
        var yacimientosExp = result.rows;
        res.render('explotacionesConfiguracionConsultar',{user: userJSON,yacimientosExp: yacimientosExp});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.get("/Explotaciones-Configuracion-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    var filtro = 'CF';
    client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS WHERE est_codigo = fk_yac_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1) ',[filtro],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yac = result.rows;
        res.render('explotacionesConfiguracionEliminar',{user: userJSON,yac: yac});
      }else{
        res.render('explotacionesConfiguracion',{user: userJSON,yac: yac});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/YS",function(req,res){
  var yacCod = req.body.yacCod;
  if(userJSON.usuario != "none"){
    client.query('SELECT E.ETA_NOMBRE, E.ETA_CODIGO, COUNT(F.FAS_NOMBRE) AS TotalFases FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F WHERE Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND E.FK_ETA_EXPLOTACION = (SELECT E.EXP_CODIGO FROM EXPLOTACION AS E, YACIMIENTO AS Y WHERE E.FK_EXP_YACIMIENTO = Y.YAC_CODIGO AND Y.YAC_CODIGO = $1) GROUP BY E.ETA_NOMBRE, E.ETA_CODIGO',[yacCod],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yacimientosExpEtapa = result.rows;
        res.send({yacimientosExpEtapa: yacimientosExpEtapa});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/ES",function(req,res){
  var etapaCod = req.body.etapaCod;
  if(userJSON.usuario != "none"){
    client.query('SELECT F.FAS_NOMBRE, F.FAS_CODIGO FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND F.FK_FAS_ETAPA = $1',[etapaCod],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yacimientosEtapaFase = result.rows;
        res.send({yacimientosEtapaFase: yacimientosEtapaFase});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/EsDetalle",function(req,res){
  var faseCod = req.body.faseCod;
  if(userJSON.usuario != "none"){
    client.query('SELECT F.FAS_NOMBRE, F.FAS_COSTOTOTAL, F.FAS_DURACION FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND F.FAS_CODIGO = $1',[faseCod],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var detalleFase = result.rows;
        res.send({detalleFase: detalleFase});
      }else{
        res.send('failed'); 
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/detalleCargo",function(req,res){
  var faseCod = req.body.faseCod;
  if(userJSON.usuario != "none"){
    client.query('SELECT CF.CF_CANTIDAD, CAR.CAR_NOMBRE FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F, CAR_FAS AS CF, CARGO AS CAR WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND CF.FK_CF_FASE = F.FAS_CODIGO AND CF.FK_CF_CARGO = CAR.CAR_CODIGO AND F.FAS_CODIGO = $1',[faseCod],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var detalleCargos = result.rows;
        client.query('SELECT SUM(CF.CF_CANTIDAD) AS empleados FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F, CAR_FAS AS CF, CARGO AS CAR WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND CF.FK_CF_FASE = F.FAS_CODIGO AND CF.FK_CF_CARGO = CAR.CAR_CODIGO AND F.FAS_CODIGO = $1',[faseCod],(err,result)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(result.rows[0] != null){
            var totalCargos = result.rows;
            res.send({detalleCargos: detalleCargos,totalCargos:totalCargos});
          }else{
            res.send('failed'); 
          }
        });
      }else{
        res.send('failed'); 
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/detalleMaquinarias",function(req,res){
  var faseCod = req.body.faseCod;
  if(userJSON.usuario != "none"){
    client.query('SELECT TMF.TMF_CANTIDAD, TM.TM_NOMBRE FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F, TM_FAS AS TMF, TIPO_MAQUINARIA AS TM WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND TMF.FK_TMF_FASE = F.FAS_CODIGO AND TMF.FK_TMF_TM = TM.TM_CODIGO AND F.FAS_CODIGO = $1',[faseCod],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var detalleMaquinarias = result.rows;
        client.query('SELECT SUM(TMF.TMF_CANTIDAD) AS maquinarias FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F, TM_FAS AS TMF, TIPO_MAQUINARIA AS TM WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND TMF.FK_TMF_FASE = F.FAS_CODIGO AND TMF.FK_TMF_TM = TM.TM_CODIGO AND F.FAS_CODIGO = $1',[faseCod],(err,result)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(result.rows[0] != null){
            var totalMaquinarias = result.rows;
            res.send({detalleMaquinarias: detalleMaquinarias,totalMaquinarias: totalMaquinarias});
          }else{
            res.send('failed'); 
          }
        });
      }else{
        res.send('failed'); 
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/Explotaciones-Configuracion-Eliminar",function(req,res){
  var yacEC = req.body.yacEC;
  var uS = "SCF";
  client.query('DELETE FROM EXPLOTACION WHERE FK_EXP_YACIMIENTO = $1',[yacEC],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      client.query('UPDATE YACIMIENTO SET FK_YAC_ESTATUS = (SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $1) WHERE YAC_CODIGO = $2',[uS,yacEC],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }else{
          res.send('great');      
        }
      });
    }
  });
});

app.post("/Explotaciones-Configuracion-Verificar",function(req,res){
  var yacMod = req.body.yacMod;
  client.query('SELECT E.* FROM EXPLOTACION AS E, YACIMIENTO AS Y WHERE E.FK_EXP_YACIMIENTO = Y.YAC_CODIGO AND E.FK_EXP_YACIMIENTO = $1',[yacMod],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var explotacion = result.rows;
      client.query('SELECT * FROM ESTATUS',(err,result)=>{
        if (err){
          console.log(err.stack);
          res.send('failed'); 
        }else if(result.rows[0] != null){
          var estatus = result.rows;
          res.send({explotacion: explotacion,estatus: estatus});
        }else{
          res.send('failed');
        }
      });
    }
  });
});

app.post("/ExpDATA",function(req,res){
  var yacMod = req.body.yacMod;
  client.query('SELECT E.* FROM EXPLOTACION AS E, YACIMIENTO AS Y WHERE E.FK_EXP_YACIMIENTO = Y.YAC_CODIGO AND E.FK_EXP_YACIMIENTO = $1',[yacMod],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var explotacion = result.rows;
      res.send({explotacion: explotacion});
    }
  });
});

app.post("/ET",function(req,res){
  var yacMod = req.body.yacMod;
  client.query('SELECT E.* FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND Y.YAC_CODIGO = $1',[yacMod],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var etapas = result.rows;
      res.send({etapas: etapas});
    }
  });
});

app.post("/FT",function(req,res){
  var etapaMod = req.body.etapaMod;
  client.query('SELECT F.* FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX, FASE AS F WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND F.FK_FAS_ETAPA = E.ETA_CODIGO AND E.ETA_CODIGO = $1',[etapaMod],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var fases = result.rows;
      res.send({fases: fases});
    }
  });
});

app.get("/horarios",function(req,res){
  client.query('SELECT * FROM HORARIO',(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var horarios = result.rows;
      res.send({horarios: horarios});
    }
  });
});


app.post("/FC",function(req,res){
  var faseMod = req.body.faseMod;
  client.query('SELECT CAR.CAR_CODIGO, CAR.CAR_NOMBRE, CF.CF_CANTIDAD, CF.CF_COSTO, CF.CF_CODIGO FROM YACIMIENTO AS Y,EXPLOTACION AS EX, ETAPA AS E, FASE AS F,CARGO AS CAR, CAR_FAS AS CF WHERE Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND E.ETA_CODIGO = F.FK_FAS_ETAPA AND F.FAS_CODIGO = CF.FK_CF_FASE AND CAR.CAR_CODIGO = CF.FK_CF_CARGO AND F.FAS_CODIGO = $1',[faseMod],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var cargos = result.rows;
      res.send({cargos: cargos});
    }
  });
});

app.post("/FM",function(req,res){
  var faseMod = req.body.faseMod;
  console.log(faseMod);
  client.query('SELECT TM.TM_CODIGO, TM.TM_NOMBRE,TMF.TMF_CANTIDAD, TMF.TMF_COSTO, TMF.TMF_CODIGO FROM YACIMIENTO AS Y,EXPLOTACION AS EX, ETAPA AS E, FASE AS F,TIPO_MAQUINARIA AS TM, TM_FAS AS TMF WHERE Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND E.ETA_CODIGO = F.FK_FAS_ETAPA AND F.FAS_CODIGO = TMF.FK_TMF_FASE AND TM.TM_CODIGO = TMF.FK_TMF_TM AND F.FAS_CODIGO = $1',[faseMod],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
      console.log('Error bases');
    }else if(result.rows[0] != null){
      var maquinarias = result.rows;
      res.send({maquinarias: maquinarias});
    }else{
      res.send('failed');
    }
  });
});

app.post("/EALLD",function(req,res){
  let dDE = req.body.dDE;
  let dDF = req.body.dDF;
  let dDC = req.body.dDC;
  let dDM = req.body.dDM;

  if(dDE != null){
    console.log('Entro en eliminar etapas');
    console.log(dDE.length);
    for (var i = 0; i < dDE.length; i++) {
      client.query('DELETE FROM ETAPA WHERE ETA_CODIGO=$1',[dDE[i].codE],(err,result)=>{
        if (err){
          console.log(err.stack);
          res.send('failed'); 
        }
      });
    }
  }
  
  if(dDF != null){
    console.log('Entro en eliminar fases');
    console.log(dDF.length);
    for (var i = 0; i < dDF.length; i++) {
      client.query('DELETE FROM FASE WHERE FAS_CODIGO=$1',[dDF[i].codF],(err,result)=>{
        if (err){
          console.log(err.stack);
          res.send('failed'); 
        }
      });
    }
  }

  if(dDC != null){
    console.log('Entro en eliminar cargo');
    console.log(dDC.length);
    for (var i = 0; i < dDC.length; i++) {
      client.query('DELETE FROM CAR_FAS WHERE CF_CODIGO=$1',[dDC[i].codCF],(err,result)=>{
        if (err){
          console.log(err.stack);
          res.send('failed'); 
        }
      });
    }
  }

  if(dDM != null){
    console.log('Entro en eliminar maquinarias');
    console.log(dDM.length);
    for (var i = 0; i < dDM.length; i++) {
      client.query('DELETE FROM TM_FAS WHERE TMF_CODIGO=$1',[dDM[i].codTMF],(err,result)=>{
        if (err){
          console.log(err.stack);
          res.send('failed'); 
        }
      });
    }
  } 

  res.send('great');
});

app.post("/EUEF",function(req,res){
  let dGC = req.body.dGC;
  let dU = req.body.dU;
  // let dI = req.body.dI;
  // let dDE = req.body.dDE;
  // let dDF = req.body.dDF;
  // let dDC = req.body.dDC;
  // let dDM = req.body.dDM;

  client.query('UPDATE EXPLOTACION SET EXP_DURACION=$1,EXP_COSTOTOTAL=$2,FK_EXP_ESTATUS=$3 WHERE FK_EXP_YACIMIENTO = $4 ',[dGC.duracion,dGC.estimado,dGC.estatus,dGC.codYac],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      for (var i = 0; i < dU.e.length; i++) {
        client.query('UPDATE ETAPA SET ETA_DURACION=$1,ETA_COSTOTOTAL=$2,ETA_NOMBRE=$3 WHERE ETA_CODIGO = $4 ',[dU.e[i].dur,dU.e[i].est,dU.e[i].name,dU.e[i].cod],(err,result)=>{
          if (err){
            console.log(err.stack);
            res.send('failed'); 
          }
        });
        console.log(i);
        for (var k = 0; k < dU.e[i].f.length; k++){
          client.query('UPDATE FASE SET FAS_DURACION=$1,FAS_COSTOTOTAL=$2,FAS_NOMBRE=$3 WHERE FAS_CODIGO = $4 ',[dU.e[i].f[k].dur,dU.e[i].f[k].est,dU.e[i].f[k].name,dU.e[i].f[k].cod],(err,result)=>{
            if (err){
              console.log(err.stack);
              res.send('failed'); 
            }
          }); 
        }       
      }
      res.send('great');
    }
  });
});

app.post("/EUCM",function(req,res){
  let dU = req.body.dU;
  for (var i = 0; i < dU.e.length; i++){
    for (var k = 0; k < dU.e[i].f.length; k++){
      for (var p = 0; p < dU.e[i].f[k].c.length; p++){
        console.log('entro');
        console.log(dU.e[i].f[k].c[p].cod);
        client.query('UPDATE CAR_FAS SET CF_CANTIDAD=$1,CF_COSTO=$2,FK_CF_CARGO=$3 WHERE CF_CODIGO=$4 ',[dU.e[i].f[k].c[p].q,dU.e[i].f[k].c[p].salario,dU.e[i].f[k].c[p].cod,dU.e[i].f[k].c[p].codCF],(err,result)=>{
          if (err){
            console.log(err.stack);
            res.send('failed'); 
          }
        });  
      }
      if(dU.e[i].f[k].m != null){
        for (var v = 0; v < dU.e[i].f[k].m.length; v++){
          client.query('UPDATE TM_FAS SET TMF_CANTIDAD=$1,TMF_COSTO=$2,FK_TMF_TM=$3 WHERE TMF_CODIGO= $4 ',[dU.e[i].f[k].m[v].q,dU.e[i].f[k].m[v].costo,dU.e[i].f[k].m[v].cod,dU.e[i].f[k].m[v].codTMF],(err,result)=>{
            if (err){
              console.log(err.stack);
              res.send('failed'); 
            }
          });  
        } 
      }      
    }
  }
  res.send('great');
});



/// ARREGLAR
app.post("/ExplotacionIniciarEmpleados",function(req,res){
  var c = req.body.c;
  var e = 'Ocupado';
  client.query('INSERT INTO EMP_CF (FK_ECF_EMPLEADO,FK_ECF_CARFAS,FK_ECF_ESTATUS) VALUES ($1,$2,(SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $3)) RETURNING ECF_CODIGO',[c.codC,c.codCF,e],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      var ecf = result.rows[0];
      res.send({"ecf":ecf});
    }
  });  
});

app.post("/ExplotacionIniciarHorarioEmpleado",function(req,res){
  var h = req.body.h;
  var ecf = req.body.ecf;
  client.query('INSERT INTO HOR_ECF (FK_HECF_ECF,FK_HECF_HOR) VALUES ($1,$2)',[ecf,h],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
});

app.post("/ExplotacionIniciarMaquinarias",function(req,res){
  var m = req.body.m;
  var e = 'Ocupado';
  client.query('INSERT INTO MAQ_FAS (FK_MF_MAQUINARIA,FK_MF_TM_FASE,FK_MF_ESTATUS) VALUES ($1,$2,(SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $3))',[m.codM,m.codTMF,e],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });  
});

app.post("/ExplotacionIniciarFases",function(req,res){
  var f = req.body.f;
  var e = 'Ocupado';
  for (var i = 0; i < f.length; i++) {
    client.query('UPDATE FASE SET FAS_FECHAINICIO=$1, FAS_FECHAFIN=$2 WHERE FAS_CODIGO = $3',[f[i].fi,f[i].ff,f[i].codFas],(err,result)=>{
      if (err){
        console.log(err.stack);
        res.send('failed'); 
      }
    });
  }  
  res.send('great');
});

app.post("/ExplotacionIniciarEtapas",function(req,res){
  var f = req.body.f;
  var e = 'Ocupado';
  for (var i = 0; i < f.length; i++) {
    client.query('UPDATE ETAPA SET ETA_FECHAINICIO=$1, ETA_FECHAFIN=$2 WHERE ETA_CODIGO = $3',[f[i].fi,f[i].ff,f[i].codEta],(err,result)=>{
      if (err){
        console.log(err.stack);
        res.send('failed'); 
      }
    });
  }  
  res.send('great');
});

app.post("/ExplotacionIniciarExp",function(req,res){
  var f = req.body.f;
  var e = 'En proceso';
  client.query('UPDATE EXPLOTACION SET EXP_FECHAINICIO=$1, EXP_FECHAFIN=$2, FK_EXP_ESTATUS=(SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $3) WHERE EXP_CODIGO = $4',[f.fi,f.ff,e,f.codExp],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great'); 
    }
  });
});

app.get("/Minerales",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('minerales',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/metalicos",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('metalicos',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Metalicos-Agregar",function(req,res){
  let dataPresentacion;
  if(userJSON.usuario != "none"){
    client.query('SELECT pre_nombre FROM presentacion',(err,resultP)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(resultP.rows[0] != null){
            dataPresentacion = resultP.rows;
            res.render('metalicosAgregar',{dataPresentacion: dataPresentacion, user: userJSON});
          }else{
            res.send('failed');
          };
        });
  }else{
    res.redirect('login');
  }
});

app.get("/Metalicos-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT met_codigo, met_nombre, met_escalamaleabilidad, met_escaladureza FROM min_metalico',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var infoMet = result.rows;
        client.query('SELECT MP.fk_mp_presentacion, P.pre_nombre, MP.mp_precio, MP.fk_mp_metalico FROM min_pre AS MP, presentacion AS P WHERE P.pre_codigo = MP.fk_mp_presentacion',(err,resultPre)=>{
          if (err){
            console.log(err,stack);
            res.send("failed");
          } else if (resultPre.rows[0] != null){
            var preMet = resultPre.rows;
            res.render('metalicosConsultar',{dataTable: result.rows, preMet: preMet, user: userJSON});
            } else {
              res.send('failed');
            }
          });
        
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});

app.get("/Metalicos-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('metalicosEliminar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/nometalicos",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('nometalicos',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/NoMetalicos-Agregar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('noMetalicosAgregar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/NoMetalicos-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT nom_codigo, nom_nombre, nom_utilidad FROM min_no_metalico',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var infoMet = result.rows;
        client.query('SELECT MP.fk_mp_presentacion, P.pre_nombre, MP.mp_precio, MP.fk_mp_nometalico FROM min_pre AS MP, presentacion AS P WHERE P.pre_codigo = MP.fk_mp_presentacion',(err,resultPre)=>{
          if (err){
            console.log(err,stack);
            res.send("failed");
          } else if (resultPre.rows[0] != null){
            var preNoMet = resultPre.rows;
            res.render('noMetalicosConsultar',{dataTable: result.rows, preNoMet: preNoMet, user: userJSON});
            } else {
              res.send('failed');
            }
          });
        
      }else{
        res.send('failed');
      };
    });
  }else{
    res.redirect('login');
  }
});

app.get("/NoMetalicos-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('noMetalicosEliminar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.post("/Metalicos-Agregar",function(req,res){
  var metalicoNombre = req.body.nombreMetalico;
  var metalicoMaleabilidad = req.body.escalaMaleabilidad;
  var metalicoDureza = req.body.escalaDureza;
  var nombrePresentacion = req.body.nombrePresentacion;
  var precioMP = req.body.precioMP;
  var preTipo = req.body.preTipo;
  // var metTipo = req.body.metTipo;
  // var metProporcion = req.body.metProporcion;
  // var metMetalico = req.body.metMetalico;

  console.log(preTipo);

  if(userJSON.usuario != "none"){

  client.query('INSERT INTO min_metalico (met_nombre,met_escalamaleabilidad, met_escaladureza) VALUES ($1,$2,$3)',[metalicoNombre, metalicoMaleabilidad, metalicoDureza],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if (nombrePresentacion != ""){

      for (var i = preTipo.length - 1; i >= 0; i--) {

        client.query('INSERT INTO min_pre (mp_precio, fk_mp_presentacion, fk_mp_metalico) VALUES ($1,$2, (SELECT met_codigo FROM MIN_METALICO WHERE met_nombre = $3))',[precioMP[i],nombrePresentacion[i],metalicoNombre],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }        
      });
      }

      // for (var i = metTipo.length - 1; i >= 0; i--) {

      //   client.query('INSERT INTO min_min (mm_proporcionm1m2, fk_mm_1metalico, fk_mm_2metalico) VALUES ($1,$2, (SELECT met_codigo FROM MIN_METALICO WHERE met_nombre = $3))',[metProporcion[i],metMetalico[i],metalicoNombre],(err,result)=>{
      //   if (err) {
      //     console.log(err.stack);
      //     res.send('failed'); 
      //   }        
      // });
      // }

      
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente (Mineral metálico)');
    }
  });
  }else{
    res.redirect('login');
  }
});   

app.post("/Metalicos-AgregarPre",function(req,res){
  var filtro = req.body.filtroPre;
  if(userJSON.usuario != "none"){

    client.query('SELECT * FROM '+filtro+'',(err,result)=>{

      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var pre = result.rows;
        res.send({pre: pre});
      }else{
        res.send('failed');
      };

    });

  }else{
    res.redirect('login');
  }
});

app.post("/Metalicos-Eliminar",function(req,res){ 
  var nombreMetalico = req.body.nombreMetalico;
  client.query('DELETE FROM min_pre WHERE fk_mp_metalico = (SELECT met_codigo FROM min_metalico WHERE met_nombre = $1)',[nombreMetalico],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if (nombreMetalico != null){

      client.query('DELETE FROM min_metalico WHERE met_nombre = $1',[nombreMetalico],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed');
          

        }else{
          res.send('great');
        }
      });

    }else{
      res.send('failed');
    }
  });
});

app.post("/NoMetalicos-Agregar",function(req,res){
  var noMetalicoNombre = req.body.nombreNoMetalico;
  var noMetalicoUtilidad = req.body.utilidadNoMetalico;
  var nombrePresentacion = req.body.nombrePresentacion;
  var precioMP = req.body.precioMP;
  var preTipo = req.body.preTipo;

  if(userJSON.usuario != "none"){

  client.query('INSERT INTO min_no_metalico (nom_nombre,nom_utilidad) VALUES ($1,$2)',[noMetalicoNombre, noMetalicoUtilidad],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if (nombrePresentacion != ""){

      for (var i = preTipo.length - 1; i >= 0; i--) {

        client.query('INSERT INTO min_pre (mp_precio, fk_mp_presentacion, fk_mp_nometalico) VALUES ($1,$2, (SELECT nom_codigo FROM MIN_NO_METALICO WHERE nom_nombre = $3))',[precioMP[i],nombrePresentacion[i],noMetalicoNombre],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }
        });
      }
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente (Mineral no metálico)');
    }
  });
  }else{
      res.send('great');
    }
});   

app.post("/NoMetalicos-Eliminar",function(req,res){ 
  var nombreNoMetalico = req.body.nombreNoMetalico;
  client.query('DELETE FROM min_pre WHERE fk_mp_nometalico = (SELECT nom_codigo FROM min_no_metalico WHERE nom_nombre = $1)',[nombreNoMetalico],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if (nombreNoMetalico != null){

      client.query('DELETE FROM min_no_metalico WHERE nom_nombre = $1',[nombreNoMetalico],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed');
          

        }else{
          res.send('great');
        }
      });

    }else{
      res.send('failed');
    }
  });
});

app.get("/Metalicos-Modificar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('metalicosModificar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.post("/Metalicos-Verificar",function(req,res){ 
  var nombreM = req.body.nombreMetV;
  client.query('SELECT M.met_codigo, M.met_escalamaleabilidad, M.met_nombre, M.met_escaladureza  FROM min_metalico AS M WHERE M.met_nombre = $1',[nombreM],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      
      var dataV = result.rows;
      client.query('SELECT MP.fk_mp_metalico, MP.mp_precio, P.pre_nombre, P.pre_codigo FROM min_pre AS MP,  presentacion AS P WHERE MP.fk_mp_presentacion = P.pre_codigo ',(err,resultPRE)=>{
                    if (err) {
                      console.log(err.stack);
                      res.send('failed'); 
                    }else if(resultPRE.rows[0] != null){
                      console.log("vamos muy bien");
                      var preMet = resultPRE.rows;
                      res.send({dataV: dataV, preMet:preMet});
                    }else{
                      // res.send('failed');
                      res.send({dataV: dataV});
                    };
                  });

    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
});

app.post("/Metalicos-Modificar",function(req,res){ 
  var metalicoCodigo = req.body.codigoGC;
  var metalicoNombre = req.body.nombreGC;
  var metalicoMaleabilidad = req.body.maleabilidadGC;
  var metalicoDureza = req.body.durezaGC;
  var modMet = req.body.modMet;
  var ready = true;

  console.log(modMet);

  client.query('UPDATE MIN_METALICO SET met_nombre=$1,met_escalamaleabilidad=$2,met_escaladureza=$3 WHERE met_nombre= $4',[metalicoNombre,metalicoMaleabilidad,metalicoDureza,metalicoNombre],(err,result)=>{
    if (err) {
      ready = false;
      console.log(err.stack);
      res.send('failed'); 
    }
    // }else{
    //   res.send('great'); 
    //   console.log('Query procesado correctamente (modificar mineral)');
    // }
  });

  if(modMet.d !== undefined){
    console.log('Entro en los deletes');
    for (var i = modMet.d.length - 1; i >= 0; i--) {
     

        client.query('DELETE FROM MIN_PRE WHERE fk_mp_metalico = (SELECT met_codigo FROM MIN_METALICO WHERE met_nombre = $1) AND fk_mp_metalico=$2',[metalicoNombre,modMet.d[i].cod],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }

        });

      
    }
    console.log('HIZO TODOS LOS DELETES LJJP');
  }

  if(modMet.u !== undefined){
    for (var i = modMet.u.length - 1; i >= 0; i--) {
      

        client.query('UPDATE MIN_PRE SET fk_mp_presentacion = $1,fk_mp_nometalico = null,mp_precio = $2 WHERE fk_mp_metalico = (SELECT met_codigo FROM MIN_METALICO WHERE met_nombre = $3) AND fk_mp_presentacion=$4',[modMet.u[i].cod,modMet.u[i].p,metalicoNombre,modMet.u[i].o],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      
    }
    console.log('HIZO TODOS LOS UPDATES LJJP');
  }

  if(modMet.i !== undefined){
    for (var i = modMet.i.length - 1; i >= 0; i--) {
      
        client.query('INSERT INTO MIN_PRE (fk_MP_METALICO,fk_mp_presentacion,mp_precio) VALUES ( (SELECT met_codigo FROM MIN_METALICO WHERE met_nombre = $1) ,$2,$3)',[metalicoNombre,modMet.i[i].cod,modMet.i[i].p],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }

        });

      
    }
    console.log('HIZO TODOS LOS INSERTS LJJP');
  }

  if(ready){
    res.send('great');
  }

});

app.get("/NoMetalicos-Modificar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('noMetalicosModificar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.post("/NoMetalicos-Verificar",function(req,res){ 
  var nombreM = req.body.nombreNoMetV;
  client.query('SELECT M.nom_codigo, M.nom_utilidad, M.nom_nombre FROM min_no_metalico AS M WHERE M.nom_nombre = $1',[nombreM],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0] != null){
      var dataV = result.rows;
      
      client.query('SELECT MP.fk_mp_nometalico, MP.mp_precio, P.pre_nombre, P.pre_codigo FROM min_pre AS MP,  presentacion AS P WHERE MP.fk_mp_presentacion = P.pre_codigo ',(err,resultPRE)=>{
                    if (err) {
                      console.log(err.stack);
                      res.send('failed'); 
                    }else if(resultPRE.rows[0] != null){
                      console.log("vamos muy bien");
                      var preNoMet = resultPRE.rows;
                      res.send({dataV: dataV, preNoMet:preNoMet});
                    }else{
                      // res.send('failed');
                      res.send({dataV: dataV});
                    };
                  });


    }else{
      console.log('Entraaaa aqui');
      res.send('failed');
    }
  });
});

app.post("/NoMetalicos-Modificar",function(req,res){ 
  var noMetalicoCodigo = req.body.codigoGC;
  var noMetalicoNombre = req.body.nombreGC;
  var noMetalicoUtilidad = req.body.utilidadGC;
  var modNoMet = req.body.modNoMet;
  var ready = true;

  console.log(modNoMet);


  client.query('UPDATE MIN_NO_METALICO SET nom_nombre=$1,nom_utilidad=$2 WHERE nom_nombre= $3',[noMetalicoNombre,noMetalicoUtilidad,noMetalicoNombre],(err,result)=>{
    if (err) {
      ready=false;
      console.log(err.stack);
      res.send('failed'); 
    }
  });

  if(modNoMet.d !== undefined){
    console.log('Entro en los deletes');
    for (var i = modNoMet.d.length - 1; i >= 0; i--) {
      

        client.query('DELETE FROM MIN_PRE WHERE fk_mp_nometalico = (SELECT nom_codigo FROM MIN_NO_METALICO WHERE nom_nombre = $1) AND fk_mp_presentacion=$2',[noMetalicoNombre,modNoMet.d[i].cod],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      
    }
    console.log('HIZO TODOS LOS DELETES LJJP');
  }

  if(modNoMet.u !== undefined){
    for (var i = modNoMet.u.length - 1; i >= 0; i--) {
      

        client.query('UPDATE MIN_PRE SET fk_mp_presentacion = $1,fk_mp_metalico = null,mp_precio = $2 WHERE fk_mp_nometalico = (SELECT nom_codigo FROM MIN_NO_METALICO WHERE nom_nombre = $3) AND fk_mp_presentacion=$4',[modNoMet.u[i].cod,modNoMet.u[i].p,noMetalicoNombre,modNoMet.u[i].o],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      
    }
    console.log('HIZO TODOS LOS UPDATES LJJP');
  }

  if(modNoMet.i !== undefined){
    for (var i = modNoMet.i.length - 1; i >= 0; i--) {
      

        client.query('INSERT INTO MIN_PRE (fk_MP_NOMETALICO,fk_mp_presentacion,mp_precio) VALUES ( (SELECT nom_codigo FROM MIN_NO_METALICO WHERE nom_nombre = $1) ,$2,$3)',[noMetalicoNombre,modNoMet.i[i].cod,modNoMet.i[i].p],(err,resultM)=>{
          if (err) {
            ready = false;
            console.log(err.stack);
            res.send('failed'); 
          }
        });

      
    }
    console.log('HIZO TODOS LOS INSERTS LJJP');
  }

  if(ready){
    res.send('great');
  }

});

// INVENTARIO

app.get("/Inventario-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT inv_codigo, inv_cantidadmovimiento, inv_cantidadactual, inv_fechamovimiento, fk_inv_venta, fk_inv_explotacion, fk_inv_minpre FROM inventario',(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){

        
            res.render('inventarioConsultar',{dataTable: result.rows, user: userJSON});
  
        
      }else{
        res.send('failed');
      };
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

app.get("/VerificarComprador",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('modificarventas.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/VerificarComprador2",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('eliminarventas.ejs',{user: userJSON});
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

  var estatus='Pagado';
  
  if(userJSON.usuario != "none"){
    client.query('INSERT INTO VENTA (ven_fecha,ven_montototal,fk_ven_cliente,fk_ven_usuario,fk_ven_estatus) VALUES((SELECT NOW()),$1,(SELECT cli_codigo from cliente where cli_cedula =$2),(SELECT usu_usuario_id from usuario where usu_usuario =$3),(Select est_codigo from estatus where est_nombre=$4)) returning ven_codigo',
      [minTotal,compradorActual.cedula,userJSON.usuario,estatus],(err,result)=>{
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
      client.query('Select * from estatus',(err,result)=>{
      if (err) {
      console.log(err.stack);
      res.send('failed');
      } 
      else if (result.rows!=null){
          var estatus=result.rows;
          console.log(estatus);
          res.send ({dataC:dataC, estatus:estatus});
      }
    });
    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
}); 


app.post("/ModificarVentaSelect",function(req,res){
   var cod = req.body.codigo;
   var estatus = req.body.estatus;
   console.log(cod);
   console.log(estatus);
  if(userJSON.usuario != "none"){
    client.query('update venta set fk_ven_estatus = $1 where ven_codigo=$2',
    [estatus,cod],(err,result)=>{
    console.log ('hizo la modificacion');
    if (err) {
        console.log(err.stack);
        res.send('failed'); 
    }
    else {
        res.send('great'); 
     }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/EliminarVenta",function(req,res){
   var cod = req.body.codigo;
  if(userJSON.usuario != "none"){
    client.query('delete from venta where ven_codigo= $1',[cod],(err,result)=>{
    console.log ('elimino la venta');
    if (err) {
        console.log(err.stack);
        res.send('failed'); 
    }
    else {
      res.send('great');
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


// EXPLOTACIONES INICIAR -- DAVID


app.get("/Explotaciones-Iniciar-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    var estatus = 'En proceso';
    client.query('SELECT Y.YAC_NOMBRE, Y.YAC_CODIGO, EX.EXP_DURACION, EX.EXP_COSTOTOTAL, COUNT(E.ETA_NOMBRE) AS TotalEtapas FROM ETAPA AS E, YACIMIENTO AS Y, EXPLOTACION AS EX WHERE EX.EXP_CODIGO = E.FK_ETA_EXPLOTACION AND Y.YAC_CODIGO = EX.FK_EXP_YACIMIENTO AND EX.FK_EXP_ESTATUS = (SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $1) GROUP BY Y.YAC_NOMBRE, Y.YAC_CODIGO, EX.EXP_DURACION, EX.EXP_COSTOTOTAL',[estatus],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yacimientosExp = result.rows;
        res.render('explotacionesIniciarConsultar',{user: userJSON,yacimientosExp: yacimientosExp});
      }else{
        var yacimientosExp = result.rows;
        res.render('explotacionesIniciarConsultar',{user: userJSON,yacimientosExp: yacimientosExp});
      }
    });
  }else{
    res.redirect('login');
  }
});


app.get("/Explotaciones-Iniciar-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    var filtro = 'En proceso';
    client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO, ESTATUS, EXPLOTACION WHERE fk_exp_yacimiento = yac_codigo AND est_codigo = fk_exp_estatus AND est_codigo = (SELECT est_codigo FROM ESTATUS WHERE est_nombre = $1)',[filtro],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        var yac = result.rows;
        res.render('explotacionesIniciarEliminar',{user: userJSON,yac: yac});
      }else{
        res.render('explotacionesIniciar',{user: userJSON,yac: yac});
      }
    });
  }else{
    res.redirect('login');
  }
});

app.post("/Explotaciones-Iniciar-Eliminar",function(req,res){
  var yacEC = req.body.yacEC;
  var uS = "Eliminado";
  client.query('DELETE FROM EXPLOTACION WHERE FK_EXP_YACIMIENTO = $1',[yacEC],(err,result)=>{
    if (err){
      console.log(err.stack);
      res.send('failed'); 
    }else{
      client.query('UPDATE YACIMIENTO SET FK_YAC_ESTATUS = (SELECT EST_CODIGO FROM ESTATUS WHERE EST_NOMBRE = $1) WHERE YAC_CODIGO = $2',[uS,yacEC],(err,result)=>{
        if (err) {
          console.log(err.stack);
          res.send('failed'); 
        }else{
          res.send('great');      
        }
      });
    }
  });
});


//Puerto donde se escuchan las peticiones http
app.listen(8080);
