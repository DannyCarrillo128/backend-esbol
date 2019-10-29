var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Unidad = require('../models/unidad');

//=======================================================================
// Obtener todas las unidades
//=======================================================================
app.get('/', (req, res, next) => {

    Unidad.find({})
        .populate('temas')
        .exec(
            (err, unidades) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Unidades',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    unidades: unidades
                });
            });
});

//=======================================================================
// Actualizar Unidad
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Unidad.findById(id, (err, unidad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Unidad',
                errors: err
            })
        }

        if (!unidad) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La unidad con el id ' + id + ' no existe',
                errors: { message: 'No existe una unidad con ese ID' }
            });
        }

        unidad.nombre = body.nombre;
        unidad.temas = req.temas._id;

        unidad.save((err, unidadGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Unidad',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                unidad: unidadGuardada
            });
        });
    });
});

//=======================================================================
// Crear una nueva unidad
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var unidad = new Unidad({
        nombre: body.nombre,
        temas: body.temas
    });

    unidad.save((err, unidadGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Unidad",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            unidad: unidadGuardada
        });
    });

});

//=======================================================================
// Borrar Unidad
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Unidad.findByIdAndRemove(id, (err, unidadBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Unidad',
                errors: err
            });
        }

        if (!unidadBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una Unidad con ese ID',
                errors: { message: 'No existe una Unidad con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            unidad: unidadBorrada
        });
    });
});

module.exports = app;