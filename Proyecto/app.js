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

var checkLogJSON = {
  "usuario": "correcto",
  "password": "correcto"
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

app.get("/loginVerify",function(req,res){
  res.json(userJSON);
});

app.get("/loginCheck",function(req,res){
  res.json(checkLogJSON);
});

//Lógica para cerrar sesión
app.post("/logOut",function(req,res){
  userJSON.nombre = "none";
  userJSON.apellido = "none";
  userJSON.usuario = "none"; 
  userJSON.password = "none";
  res.redirect('login');
});

//Lógica de login y verificación de usuario
app.post("/login",function(req,res){
  var user = req.body.user;
  var password = req.body.password;
  console.log("Usuario: " + user);
  console.log("Keyword: " + password);
  client.query('SELECT * FROM usuarios WHERE usuario = $1',[user],(err,result)=>{
      if(result.rows[0] != null && result.rows[1] == null){
        checkLogJSON.usuario = "correcto";
        if (result.rows[0].keyword == password){
          userJSON.nombre = result.rows[0].nombre;
          userJSON.apellido = result.rows[0].apellido;
          userJSON.usuario = user;
          userJSON.password = password;
          checkLogJSON.password = "correcto";
          res.redirect('Home');  
        }else{
          checkLogJSON.password = "error"; 
          res.redirect('login');
        }
      }else{
        checkLogJSON.usuario = "error";
        checkLogJSON.password = "error"; 
        res.redirect('login');
      }
  });
});

//Test para moestrar elementos de base de datos en pantalla
app.get("/test",function(req,res){
  client.query('SELECT * FROM usuarios',(err,result)=>{
    res.render('test',{test: result.rows});
  });
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