//En esta sección requerimos los paquetes instalados para su uso.
var express = require('express');
var bodyParser = require('body-parser');
const morgan = require('morgan');
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
  database: 'loginTest',
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

//Lógica login
app.get("/login",function(req,res){
  res.render('login');
});

//Lógica de home 
app.get("/Home",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('home',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.post('/login',function(req,res){
  var userCheck = req.body.user;
  var userPassword = req.body.password;
  client.query('SELECT nombre,apellido,keyword FROM usuarios WHERE usuario = $1',[userCheck],(err,result)=>{
      if(result.rows[0] != null && result.rows[1] == null){
        if (result.rows[0].keyword == userPassword){
          userJSON.nombre = result.rows[0].nombre;
          userJSON.apellido = result.rows[0].apellido;
          userJSON.usuario = userCheck;
          userJSON.password = userPassword;
          res.json('access');  
        }else{
          res.json('notAccess');
        }
      }else{
        res.json('notAccess');
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

//Logica home

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







//Test para insertar elemento en base de datos con formulario
app.post("/users",function(req,res){
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var edad = req.body.edad;
  var usuario = req.body.usuario;
  var keyword = req.body.keyword;
  console.log("Nombre: " + nombre);
  console.log("Apellido: " + apellido);
  console.log("Edad: " + edad);
  console.log("Usuario: " + usuario);
  console.log("Keyword: " + keyword);
  var query = "INSERT INTO USUARIOS (nombre,apellido,edad,usuario,keyword) VALUES ($1,$2,$3,$4,$5)";
  var values = [nombre,apellido,edad,usuario,keyword];
  genericInsertQuery(query,values);
  res.render("users");
});

function genericInsertQuery(query,values){
  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
      client.end();
    } else {
      console.log('Query procesado correctamente');
      client.end();
    }
  });
};

//Puerto donde se escuchan las peticiones http
app.listen(8080);