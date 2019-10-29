var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Estudiante = require('../models/estudiante');

//=======================================================================
// Obtener todos los estudiantes
//=======================================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Estudiante.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, estudiantes) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Estudiantes',
                        errors: err
                    });
                }

                Estudiante.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        estudiantes: estudiantes,
                        total: conteo
                    });
                });
            });
});


//=======================================================================
// Obtener Estudiante
//=======================================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Estudiante.findById(id, (err, estudiante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Estudiante',
                errors: err
            });
        }

        if (!estudiante) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Estudiante con el id ' + id + ' no existe',
                errors: { message: 'No existe un Estudiante con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            estudiante: estudiante
        });
    });
});


//=======================================================================
// Actualizar Estudiante
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Estudiante.findById(id, (err, estudiante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Estudiante',
                errors: err
            })
        }

        if (!estudiante) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El estudiante con el id ' + id + ' no existe',
                errors: { message: 'No existe un estudiante con ese ID' }
            });
        }

        estudiante.cedula = body.cedula;
        estudiante.nombres = body.nombres;
        estudiante.apellidos = body.apellidos;
        estudiante.programa = body.programa;
        estudiante.compania = body.compania;
        estudiante.seccion = body.seccion;

        estudiante.save((err, estudianteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Estudiante',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                estudiante: estudianteGuardado
            });
        });
    });
});


//=======================================================================
// Crear un nuevo estudiante
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var estudiante = new Estudiante({
        cedula: body.cedula,
        nombres: body.nombres,
        apellidos: body.apellidos,
        programa: body.programa,
        compania: body.compania,
        seccion: body.seccion
    });

    estudiante.save((err, estudianteGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear Estudiante",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            estudiante: estudianteGuardado
        });
    });

});


//=======================================================================
// Borrar Estudiante
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Estudiante.findByIdAndRemove(id, (err, estudianteBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Estudiante',
                errors: err
            });
        }

        if (!estudianteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Estudiante con ese ID',
                errors: { message: 'No existe un Estudiante con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            estudiante: estudianteBorrado
        });
    });
});

module.exports = app;