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

  if(userJSON.usuario != "none"){
    client.query('INSERT INTO YACIMIENTO (yac_extension,yac_fecharegistro,yac_nombre,fk_yac_estatus,fk_yac_lugar) VALUES($1,(SELECT NOW()),$2,1,$3)',[extensionYac,nombreYac,parroquiaYac],(err,result)=>{
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

  client.query('INSERT INTO empleado (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar,fk_emp_estatus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,1)',[empleadoCedula,empleadoPrimerNombre,empleadoPrimerApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,cargoEmpleado,parroquiaEmpleado],(err,result)=>{
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
  if(userJSON.usuario != "none"){
    client.query('SELECT yac_nombre,yac_codigo FROM YACIMIENTO',(err,result)=>{
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
  console.log(exp);
  client.query('INSERT INTO EXPLOTACION (FK_EXP_ESTATUS,FK_EXP_YACIMIENTO) VALUES (1,$1) RETURNING EXP_CODIGO',[exp],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0].exp_codigo != null){
      var expCod = result.rows[0];
      res.send({cod: expCod}); 
    }else{
      res.send('failed');
    }
  });
});

app.post("/AEta",function(req,res){
  var eta = req.body.AEta; 
  var exp = req.body.AExp;
  console.log(eta);
  client.query('INSERT INTO ETAPA (ETA_NOMBRE,FK_ETA_EXPLOTACION,FK_ETA_ESTATUS) VALUES ($1,$2,1) RETURNING ETA_CODIGO',[eta,exp],(err,result)=>{
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
  console.log(fas);
  client.query('INSERT INTO FASE (FAS_NOMBRE,FK_FAS_ETAPA,FK_FAS_ESTATUS) VALUES ($1,$2,1) RETURNING FAS_CODIGO',[fas,eta],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else if(result.rows[0].fas_codigo != null){
      var fasCod = result.rows[0];
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
  console.log(c+'/'+q);
  client.query('INSERT INTO CAR_FAS (CF_CANTIDAD,FK_CF_CARGO,FK_CF_FASE) VALUES ($1,$2,$3)',[q,c,fas],(err,result)=>{
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
  console.log(m+'/'+q);
  client.query('INSERT INTO TM_FAS (TMF_CANTIDAD,FK_TMF_TM,FK_TMF_FASE) VALUES ($1,$2,$3)',[q,m,fas],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great');
    }
  });
});

//Puerto donde se escuchan las peticiones http
app.listen(8080);



      // for (var i = 0; i < dC.e.length; i++) {
      //   console.log('VALOR DE LA I = ',i);
      //   client.query('INSERT INTO ETAPA (ETA_NOMBRE,FK_ETA_EXPLOTACION,FK_ETA_ESTATUS) VALUES ($1,$2,1) RETURNING ETA_CODIGO',[dC.e[i].nE,result.rows[0].exp_codigo],(err,result)=>{
      //     if (err) {
      //       console.log(err.stack);
      //       res.send('failed'); 
      //     }else if(result.rows[0].eta_codigo != null){
      //       console.log('VALOR DE LA I = ',i);
      //       for (var j = 0; j < dC.e[i].f.length ; j++) {
      //         client.query('INSERT INTO FASE (FAS_NOMBRE,FK_FAS_ETAPA,FK_FAS_ESTATUS) VALUES ($1,$2,1) RETURNING FAS_CODIGO',[dC.e[i].f[j].nF,result.rows[0].eta_codig],(err,result)=>{
      //           if (err) {
      //             console.log(err.stack);
      //             res.send('failed'); 
      //           }else if(result.rows[0].fas_codigo != null){

      //             for (var k = 0; k < dC.e[i].f[j].c[k].length; k++) {
      //               client.query('INSERT INTO CAR_FAS (CF_CANTIDAD,FK_CF_CARGO,FK_CF_FASE) VALUES ($1,$2,$3)',[dC.e[i].f[j].c[k].cq,dC.e[i].f[j].c[k].c,result.rows[0].fas_codigo],(err,result)=>{
      //                 if (err) {
      //                   console.log(err.stack);
      //                   res.send('failed'); 
      //                 }else{
                        
      //                 }
      //               });
      //             }

      //             for (var g = 0; g < dC.e[i].f[j].m[g].length; g++) {
      //               client.query('INSERT INTO TM_FAS (TMF_CANTIDAD,FK_TMF_TM,FK_TMF_FASE) VALUES ($1,$2,$3)',[dC.e[i].f[j].c[g].mq,dC.e[i].f[j].c[g].m,result.rows[0].fas_codigo],(err,result)=>{
      //                 if (err) {
      //                   console.log(err.stack);
      //                   res.send('failed'); 
      //                 }else{
                        
      //                 }
      //               });
      //             }

      //           }
      //         }); 
      //       }
      //     }
      //   });
      // }