// Cargar en nuestras dependencias
var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

// Registrar la ruta de inicio que muestra un mensaje de bienvenida
// Se puede acceder a esta ruta sin token
app.get('/', function(req, res){
  res.send('Welcome to our API');
})

// Registrar la ruta para obtener un nuevo token
// En una situación real autenticaríamos las credenciales del usuario
// antes de crear un token, pero para simplificar el acceso a esta ruta
// generará un nuevo token válido durante 2 minutos
app.get('/token', function(req, res){
  var token = jwt.sign({username:'ado'}, 'supersecret',{expiresIn: 120});
  res.send(token)
})

// Registrar una ruta que requiera un token válido para ver los datos
app.get('/api', function(req, res){
  var token = req.query.token;
  jwt.verify(token, 'supersecret', function(err, decoded){
    if(!err){
      var secrets = {'accountNumber' : '938291239','pin' : '11289','account' : 'Finance'};
      res.json(secrets);
    } else {
      res.send(err);
    }
  })
})

// Iniciar nuestra aplicación en el puerto 3000
app.listen('3000');