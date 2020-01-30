var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Clase = require('../models/clase');

//=======================================================================
// Obtener todas las Clases
//=======================================================================
app.get('/', (req, res, next) => {

    Clase.find({})
        .populate('asginatura', 'nombre')
        .exec(
            (err, clases) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Clases',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    clases: clases
                });
            });
});


//=======================================================================
// Obtener Clase
//=======================================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Clase.findById(id, (err, clase) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Clase',
                errors: err
            });
        }

        if (!clase) {
            return res.status(400).json({
                ok: true,
                mensaje: 'La Clase con el id ' + id + ' no existe',
                errors: { message: 'No existe una Clase con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            clase: clase
        });
    }).populate('asignatura', 'nombre');
});


//=======================================================================
// Actualizar Clase
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Clase.findById(id, (err, clase) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Clase',
                errors: err
            })
        }

        if (!clase) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Clase con el id ' + id + ' no existe',
                errors: { message: 'No existe una Clase con ese ID' }
            });
        }

        clase.asignatura = req.asignatura._id;
        clase.horaInicio = body.horaInicio;
        clase.horaFin = body.horaFin;
        clase.seccion = body.seccion;

        clase.save((err, claseGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Clase',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                clase: claseGuardada
            });
        });
    });
});


//=======================================================================
// Crear una nueva Clase
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var clase = new Clase({
        asignatura: body.asignatura,
        horaInicio: body.horaInicio,
        horaFin: body.horaFin,
        seccion: body.seccion
    });

    clase.save((err, claseGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Clase",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            clase: claseGuardada
        });
    });

});


//=======================================================================
// Borrar Clase
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Clase.findByIdAndRemove(id, (err, claseBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Clase',
                errors: err
            });
        }

        if (!claseBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una Clase con ese ID',
                errors: { message: 'No existe una Clase con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            clase: claseBorrada
        });
    });
});

module.exports = app;