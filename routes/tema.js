var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Tema = require('../models/tema');

//=======================================================================
// Obtener todas los temas
//=======================================================================
app.get('/', (req, res, next) => {

    Tema.find({})
        .populate('subtemas')
        .exec(
            (err, temas) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Temas',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    temas: temas
                });
            });
});

//=======================================================================
// Actualizar Tema
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Tema.findById(id, (err, tema) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Tema',
                errors: err
            })
        }

        if (!tema) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tema con el id ' + id + ' no existe',
                errors: { message: 'No existe un tema con ese ID' }
            });
        }

        tema.nombre = body.nombre;
        tema.subtemas = req.subtemas._id;

        tema.save((err, temaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Tema',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                tema: temaGuardado
            });
        });
    });
});

//=======================================================================
// Crear un nuevo Tema
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var tema = new Tema({
        nombre: body.nombre,
        subtemas: body.subtemas
    });

    tema.save((err, temaGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Tema",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            tema: temaGuardado
        });
    });

});

//=======================================================================
// Borrar Tema
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Tema.findByIdAndRemove(id, (err, temaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Tema',
                errors: err
            });
        }

        if (!temaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Tema con ese ID',
                errors: { message: 'No existe un Tema con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            tema: temaBorrado
        });
    });
});

module.exports = app;