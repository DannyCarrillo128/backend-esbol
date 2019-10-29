var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Asignatura = require('../models/asignatura');

//=======================================================================
// Obtener todas las asignaturas
//=======================================================================
app.get('/', (req, res, next) => {

    Asignatura.find({})
        .populate('unidades')
        .exec(
            (err, asignaturas) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Asignaturas',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    asignaturas: asignaturas
                });
            });
});


//=======================================================================
// Obtener Asignatura
//=======================================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Asignatura.findById(id, (err, asignatura) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Asignatura',
                errors: err
            });
        }

        if (!asignatura) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Asignatura con el id ' + id + ' no existe',
                errors: { message: 'No existe una Asignatura con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            asignatura: asignatura
        });
    });
});


//=======================================================================
// Actualizar Asignatura
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Asignatura.findById(id, (err, asignatura) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Asignatura',
                errors: err
            })
        }

        if (!asignatura) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La asignatura con el id ' + id + ' no existe',
                errors: { message: 'No existe una asignatura con ese ID' }
            });
        }

        asignatura.nombre = body.nombre;
        asignatura.programa = body.programa;
        asignatura.intensidad = body.intensidad;
        asignatura.creditos = body.creditos;
        asignatura.unidades = req.unidades._id;

        asignatura.save((err, asignaturaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Asignatura',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                asignatura: asignaturaGuardada
            });
        });
    });
});


//=======================================================================
// Crear una nueva asignatura
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var asignatura = new Asignatura({
        nombre: body.nombre,
        programa: body.programa,
        intensidad: body.intensidad,
        creditos: body.creditos,
        unidades: body.unidades
    });

    asignatura.save((err, asignaturaGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Asignatura",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            asignatura: asignaturaGuardada
        });
    });
});


//=======================================================================
// Borrar Asignatura
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Asignatura.findByIdAndRemove(id, (err, asignaturaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Asignatura',
                errors: err
            });
        }

        if (!asignaturaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una Asignatura con ese ID',
                errors: { message: 'No existe una Asignatura con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            asignatura: asignaturaBorrada
        });
    });
});

module.exports = app;