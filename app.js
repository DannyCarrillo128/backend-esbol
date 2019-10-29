// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar Rutas
var appRoutes = require('./routes/app');
var estudianteRoutes = require('./routes/estudiante');
var docenteRoutes = require('./routes/docente');
var asignaturaRoutes = require('./routes/asignatura');
var claseRoutes = require('./routes/clase');
var unidadRoutes = require('./routes/unidad');
var temaRoutes = require('./routes/tema');
var subtemaRoutes = require('./routes/subtema');
var companiaRoutes = require('./routes/compania');
var seccionRoutes = require('./routes/seccion');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var busquedaRoutes = require('./routes/busqueda');

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/codiclaseDB', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
app.use('/estudiante', estudianteRoutes);
app.use('/docente', docenteRoutes);
app.use('/asignatura', asignaturaRoutes);
app.use('/clase', claseRoutes);
app.use('/unidad', unidadRoutes);
app.use('/tema', temaRoutes);
app.use('/subtema', subtemaRoutes);
app.use('/compania', companiaRoutes);
app.use('/seccion', seccionRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/', appRoutes);

// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online')
});