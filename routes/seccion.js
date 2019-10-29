var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Seccion = require('../models/seccion');

//=======================================================================
// Obtener todas las Secciones
//=======================================================================
app.get('/', (req, res, next) => {

    Seccion.find({})
        .exec(
            (err, secciones) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Secciones',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    secciones: secciones
                });
            });
});



//=======================================================================
// Obtener Sección
//=======================================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Seccion.findById(id, (err, seccion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Sección',
                errors: err
            });
        }

        if (!seccion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Sección con el id ' + id + ' no existe',
                errors: { message: 'No existe una Sección con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            seccion: seccion
        });
    });
});

//=======================================================================
// Actualizar Sección
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Seccion.findById(id, (err, seccion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Sección',
                errors: err
            })
        }

        if (!seccion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Sección con el id ' + id + ' no existe',
                errors: { message: 'No existe una Sección con ese ID' }
            });
        }

        seccion.nombre = body.seccion

        seccion.save((err, seccionGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Sección',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                seccion: seccionGuardada
            });
        });
    });
});


//=======================================================================
// Crear una nueva Sección
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var seccion = new Seccion({
        nombre: body.nombre
    });

    seccion.save((err, seccionGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Sección",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            seccion: seccionGuardada
        });
    });

});

//=======================================================================
// Borrar Sección
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Seccion.findByIdAndRemove(id, (err, seccionBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Sección',
                errors: err
            });
        }

        if (!seccionBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una Sección con ese ID',
                errors: { message: 'No existe una Sección con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            seccion: seccionBorrada
        });
    });
});

module.exports = app;