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
  database: 'practica2',
  password: '209fadfc',
  port: 5432,
}; //En esta parte solo se modifica el 'user', 'database' y 'password' (Esta sección cambia por cada computadora y su config en BD)

// Aqui se establece la conección a la base de datos
const client = new Client(connectionData);
client.connect();

//Set de motor de vistas, directorios importantes y body-parser para manejo de respuestas en servidor
app.use('/public',express.static('public'));
//app.use(express.static(__dirname + '/public'));
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

app.get("/Empleados",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('empleados',{user: userJSON});
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
  if(userJSON.usuario != "none"){
    res.render('ventaexitosa.ejs',{user: userJSON});
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


app.get("/Ventas",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('CRUDventas.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});


app.get("/CrearVenta",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('crearventa.ejs',{user: userJSON});
  }else{
    res.redirect('login');
  }
});

app.get("/ConsultaVenta",function(req,res){
  if(userJSON.usuario != "none"){
    res.render('consultaventas.ejs',{user: userJSON});
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