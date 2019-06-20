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

//Puerto donde se escuchan las peticiones http
app.listen(8080);