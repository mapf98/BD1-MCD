//En esta sección requerimos los paquetes instalados para su uso.
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userJSON ={
  "nombre": "none",
  "apellido":"none",
  "usuario":"none",
  "password":"none"
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
  if(userJSON.usuario != "none"){
    res.render('empleadosAgregar',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/Empleados-Consultar",function(req,res){
  if(userJSON.usuario != "none"){
    client.query('SELECT emp_cedula,emp_nombre1,emp_apellido1,emp_genero,emp_telefono FROM empleado',(err,result)=>{
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
  client.query('SELECT E.emp_nombre1,E.emp_apellido1,U.usu_password FROM empleado AS E, usuario AS U WHERE U.fk_empleado = E.id_empleado AND U.usu_usuario = $1',[userCheck],(err,result)=>{
      if(result.rows[0] != null && result.rows[1] == null){
        if (result.rows[0].usu_password == userPassword){
          userJSON.nombre = result.rows[0].emp_nombre1;
          userJSON.apellido = result.rows[0].emp_apellido1;
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
  var empleadoPrimerNombre = req.body.pnombre;
  var empleadoSegundoNombre = req.body.snombre;
  var empleadoPrimerApellido = req.body.papellido;
  var empleadoSegundoApellido = req.body.sapellido;
  var empleadoCedula = req.body.cedula;
  var empleadoNacionalidad = req.body.nacionalidad;
  var empleadoGenero = req.body.genero;
  var empleadoFechaNacimiento = req.body.fnac;
  var empleadoTelefono = req.body.telefono;

  if(empleadoGenero == 'Femenino'){
    empleadoGenero = 'F';
  }else if(empleadoGenero == 'Masculino'){
    empleadoGenero = 'M';
  }else{
    empleadoGenero = 'O';
  }

  client.query('INSERT INTO empleado (emp_cedula,emp_nacionalidad,emp_nombre1,emp_nombre2,emp_apellido1,emp_apellido2,emp_fechanacimiento,emp_genero,emp_telefono) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[empleadoCedula,empleadoNacionalidad,empleadoPrimerNombre,empleadoSegundoNombre,empleadoPrimerApellido,empleadoSegundoApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    }else{
      res.send('great'); 
      console.log('Query procesado correctamente');
    };
  });
});

//URL para eliminar empleados
app.post("/Empleados-Eliminar",function(req,res){ 
  var cedulaEliminar = req.body.cedulaEmp;
  var nacionalidad = req.body.nacionalidadEmp;
  client.query('DELETE FROM empleado AS E WHERE E.emp_cedula = $1 AND E.emp_nacionalidad = $2',[cedulaEliminar,nacionalidad],(err,result)=>{
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
  var nacionalidadV = req.body.nacionalidadV;
  client.query('SELECT emp_cedula,emp_nacionalidad,emp_nombre1,emp_nombre2,emp_apellido1,emp_apellido2,emp_fechanacimiento,emp_genero,emp_telefono FROM empleado WHERE emp_cedula = $1 AND emp_nacionalidad = $2',[cedulaV,nacionalidadV],(err,result)=>{
    if (err) {
      console.log(err.stack);
      res.send('failed'); 
    } else if(result.rows[0] != null){
      var dataV = result.rows;
      res.json(dataV);
    }else{
      console.log('Entra aqui');
      res.send('failed');
    }
  });
});

app.post("/Empleados-Modificar",function(req,res){ 
  var empleadoPrimerNombre = req.body.pnombreGC;
  var empleadoSegundoNombre = req.body.snombreGC;
  var empleadoPrimerApellido = req.body.papellidoGC;
  var empleadoSegundoApellido = req.body.sapellidoGC;
  var empleadoCedula = req.body.cedulaGC;
  var empleadoNacionalidad = req.body.nacionalidadGC;
  var empleadoGenero = req.body.generoGC;
  var empleadoFechaNacimiento = req.body.fnacGC;
  var empleadoTelefono = req.body.telefonoGC;

  console.log(empleadoGenero);

  client.query('UPDATE EMPLEADO SET emp_nacionalidad=$1,emp_nombre1=$2,emp_nombre2=$3,emp_apellido1=$4,emp_apellido2=$5,emp_fechanacimiento=$6,emp_genero= $7,emp_telefono= $8 WHERE emp_cedula=$9',[empleadoNacionalidad,empleadoPrimerNombre,empleadoSegundoNombre,empleadoPrimerApellido,empleadoSegundoApellido,empleadoFechaNacimiento,empleadoGenero,empleadoTelefono,empleadoCedula],(err,result)=>{
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

//Puerto donde se escuchan las peticiones http
app.listen(8080);