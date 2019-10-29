var express = require('express');

var app = express();

var Usuario = require('../models/usuario');
var Estudiante = require('../models/estudiante');
var Docente = require('../models/docente');
var Asignatura = require('../models/asignatura');
var Unidad = require('../models/unidad');
var Tema = require('../models/tema');
var Subtema = require('../models/subtema');
var Compania = require('../models/compania');
var Seccion = require('../models/seccion');

//=======================================================================
// Búsqueda por Colección
//=======================================================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'estudiantes':
            promesa = buscarEstudiantes(busqueda, regex);
            break;

        case 'docentes':
            promesa = buscarDocentes(busqueda, regex);
            break;

        case 'asignaturas':
            promesa = buscarAsignaturas(busqueda, regex);
            break;

        case 'unidades':
            promesa = buscarUnidades(busqueda, regex);
            break;

        case 'temas':
            promesa = buscarTemas(busqueda, regex);
            break;

        case 'subtemas':
            promesa = buscarSubtemas(busqueda, regex);
            break;

        case 'companias':
            promesa = buscarCompanias(busqueda, regex);
            break;

        case 'secciones':
            promesa = buscarSecciones(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de Búsqueda son: Usuarios, Estudiantes, Docentes, Asignaturas, Unidades, Temas, Subtemas, Companias y Secciones',
                error: { message: 'Tipo de tabla/colección no válido' }
            });
    }

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});


//=======================================================================
// Búsqueda General
//=======================================================================
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarUsuarios(busqueda, regex),
            buscarEstudiantes(busqueda, regex),
            buscarDocentes(busqueda, regex),
            buscarAsignaturas(busqueda, regex),
            buscarUnidades(busqueda, regex),
            buscarTemas(busqueda, regex),
            buscarSubtemas(busqueda, regex),
            buscarCompanias(busqueda, regex),
            buscarSecciones(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                usuarios: respuestas[0],
                estudiantes: respuestas[1],
                docentes: respuestas[2],
                asignaturas: respuestas[3],
                unidades: respuestas[4],
                temas: respuestas[5],
                subtemas: respuestas[6],
                companias: respuestas[7],
                secciones: respuestas[8]
            });
        });
});


function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre email role')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('Error al cargar Usuarios', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}


function buscarEstudiantes(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Estudiante.find({ nombres: regex }, (err, estudiantes) => {
            if (err) {
                reject('Error al cargar Estudiantes', err);
            } else {
                resolve(estudiantes);
            }
        });
    });
}


function buscarDocentes(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Docente.find({ nombres: regex }, (err, docentes) => {
            if (err) {
                reject('Error al cargar Docentes', err);
            } else {
                resolve(docentes);
            }
        });
    });
}


function buscarAsignaturas(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Asignatura.find({ nombre: regex }, (err, asignaturas) => {
            if (err) {
                reject('Error al cargar Asignaturas', err);
            } else {
                resolve(asignaturas);
            }
        });
    });
}


function buscarUnidades(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Unidad.find({ nombre: regex }, (err, unidades) => {
            if (err) {
                reject('Error al cargar Unidades', err);
            } else {
                resolve(unidades);
            }
        });
    });
}


function buscarTemas(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Tema.find({ nombre: regex }, (err, temas) => {
            if (err) {
                reject('Error al cargar Temas', err);
            } else {
                resolve(temas);
            }
        });
    });
}


function buscarSubtemas(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Subtema.find({ nombre: regex }, (err, subtemas) => {
            if (err) {
                reject('Error al cargar Subtemas', err);
            } else {
                resolve(subtemas);
            }
        });
    });
}


function buscarCompanias(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Compania.find({ nombre: regex }, (err, companias) => {
            if (err) {
                reject('Error al cargar Companias', err);
            } else {
                resolve(companias);
            }
        });
    });
}


function buscarSecciones(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Seccion.find({ nombre: regex }, (err, secciones) => {
            if (err) {
                reject('Error al cargar Secciones', err);
            } else {
                resolve(secciones);
            }
        });
    });
}

module.exports = app;