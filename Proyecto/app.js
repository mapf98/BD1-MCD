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

  if(userJSON.usuario != "none"){
    client.query('INSERT INTO YACIMIENTO (yac_extension,yac_fecharegistro,yac_nombre,fk_yac_estatus,fk_yac_lugar) VALUES($1,(SELECT NOW()),$2,1,$3)',[extensionYac,nombreYac,parroquiaYac],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(minTipo!= null){

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
        client.query('SELECT YM.fk_ym_yacimiento, MM.met_nombre FROM yac_min AS YM, min_metalico AS MM WHERE YM.fk_ym_minmetalico = MM.met_codigo ',(err,resultMET)=>{
          if (err) {
            console.log(err.stack);
            res.send('failed'); 
          }else if(resultMET.rows[0] != null){
            var metYac = resultMET.rows;
           client.query('SELECT YM.fk_ym_yacimiento, NOM.nom_nombre FROM yac_min AS YM, min_no_metalico AS NOM WHERE YM.fk_ym_minnometalico = NOM.nom_codigo ',(err,resultNOM)=>{
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


//QUERY DINAMICO
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
    res.render('empleadosModificar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Yacimientos-Eliminar",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('empleadosEliminar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


//METODOS POST

//URL para login
app.post('/login',function(req,res){
  var userCheck = req.body.user;
  var userPassword = req.body.password;
  client.query('SELECT E.emp_nombre,E.emp_apellido,Carg.car_nombre,U.usu_password FROM empleado AS E, usuario AS U , cargo AS Carg WHERE U.fk_usu_empleado = E.emp_codigo AND E.fk_emp_cargo = Carg.car_codigo AND U.usu_usuario = $1',[userCheck],(err,result)=>{
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
      client.query('INSERT INTO usuario (usu_usuario,usu_password,fk_usu_estatus,fk_usu_empleado_ci,fk_usu_rol) VALUES($1,$2,1,$3,$4)',[empleadoUsuario,passwordUsuario,empleadoCedula,rolUsuarioEmpleado],(err,result)=>{
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
  client.query('SELECT E.emp_cedula,E.emp_nombre,E.emp_apellido,E.emp_fechanacimiento,E.emp_genero,E.emp_telefono,Carg.car_nombre,Carg.car_codigo, Par.lug_nombre AS Parroquia, Par.lug_codigo AS ParCod, Mun.lug_nombre AS Municipio, Mun.lug_codigo AS MunCod, Est.lug_nombre AS Estado,Est.lug_codigo AS EstCod, U.usu_usuario,U.usu_password,R.rol_codigo,R.rol_nombre FROM empleado AS E, cargo AS Carg, lugar AS Par, lugar AS Mun, lugar AS Est, usuario AS U, rol AS R WHERE E.emp_cedula = $1 AND E.fk_emp_cargo = Carg.car_codigo AND Par.lug_codigo = E.fk_emp_lugar AND Par.fk_lug_lugar = Mun.lug_codigo AND Mun.fk_lug_lugar = Est.lug_codigo AND U.fk_usu_empleado_ci = E.emp_cedula AND U.fk_usu_rol = R.rol_codigo',[cedulaV],(err,result)=>{
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
                  res.send({dataV: dataV,estados: estados,cargos: cargos,roles: roles});
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
  var empleadoUsuario = req.body.usuarioGC;
  var empleadoPassword = req.body.passwordGC;
  var empleadoUsuarioRol = req.body.rolGC;

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
          console.log('Query procesado correctamente con usuario');
        };
      });
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente');
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
      // var estatusDisponible = 'Disponible';
      // var estatusEliminado = 'Eliminado';
      // client.query('SELECT est_nombre,est_codigo FROM estatus WHERE est_nombre=$1 OR est_nombre=$2',[estatusDisponible,estatusEliminado],(err,estatuses)=>{
      //           if (err) {
      //             console.log(err.stack);
      //             res.send('failed'); 
      //           }else if(estatuses.rows[0] != null){
      //             var estatuses = estatuses.rows;                  
      //             res.send({dataV: dataV, estatuses: estatuses});
      //           }else{
      //             res.send('failed');
      //           }
      //         });
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

// SECCION Ventas

app.get("/Ventas",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('ventas',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Ventas-Consultar",function(req,res){
  var fy = 'yyyy';
  var fm = 'mm';
  var fd = 'dd';
  if(userJSON.usuario != "none"){
    client.query('SELECT V.ven_codigo, to_char(V.ven_fecha,$1) AS year, to_char(V.ven_fecha,$2) AS month, to_char(V.ven_fecha,$3) AS day, ven_montototal, fk_ven_cliente, fk_ven_usuario FROM venta AS V',[fy,fm,fd],(err,result)=>{
      if (err) {
        console.log(err.stack);
        res.send('failed'); 
      }else if(result.rows[0] != null){
        console.log(result.rows);
        res.render('ventasConsultar',{dataTable: result.rows, user: userJSON});
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