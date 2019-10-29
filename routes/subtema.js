var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Subtema = require('../models/subtema');

//=======================================================================
// Obtener todas las asignaturas
//=======================================================================
app.get('/', (req, res, next) => {

    Subtema.find({})
        .exec(
            (err, subtemas) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Subtemas',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    subtemas: subtemas
                });
            });
});

//=======================================================================
// Actualizar Subtema
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Subtema.findById(id, (err, subtema) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Subtema',
                errors: err
            })
        }

        if (!subtema) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El subtema con el id ' + id + ' no existe',
                errors: { message: 'No existe un subtema con ese ID' }
            });
        }

        subtema.nombre = body.nombre;

        subtema.save((err, subtemaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Subtema',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                subtema: subtemaGuardado
            });
        });
    });
});

//=======================================================================
// Crear un nuevo Subtema
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var subtema = new Subtema({
        nombre: body.nombre
    });

    subtema.save((err, subtemaGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Subtema",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            subtema: subtemaGuardado
        });
    });

});

//=======================================================================
// Borrar Subtema
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Subtema.findByIdAndRemove(id, (err, subtemaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Subtema',
                errors: err
            });
        }

        if (!subtemaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Subtema con ese ID',
                errors: { message: 'No existe un Subtema con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            subtema: subtemaBorrado
        });
    });
});

module.exports = app;