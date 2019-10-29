var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Compania = require('../models/compania');

//=======================================================================
// Obtener todas las Compañias
//=======================================================================
app.get('/', (req, res, next) => {

    Compania.find({})
        .populate('secciones')
        .exec(
            (err, companias) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error cargando Compañia',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    companias: companias
                });
            });
});


//=======================================================================
// Obtener todas las Compañias
//=======================================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Compania.findById(id, (err, compania) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Compañía',
                errors: err
            });
        }

        if (!compania) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Compañía con el id ' + id + ' no existe',
                errors: { message: 'No existe una Compañía con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            compania: compania
        });
    });
});


//=======================================================================
// Actualizar Compania
//=======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Compania.findById(id, (err, compania) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Compañia',
                errors: err
            })
        }

        if (!compania) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Compañia con el id ' + id + ' no existe',
                errors: { message: 'No existe una Compañia con ese ID' }
            });
        }

        compania.nombre = body.nombre;
        compania.secciones = req.secciones._id;

        compania.save((err, companiaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Compañia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                compania: companiaGuardada
            });
        });
    });
});


//=======================================================================
// Crear una nueva Compañia
//=======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var compania = new Compania({
        nombre: body.nombre,
        secciones: body.secciones
    });

    compania.save((err, companiaGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Compañia",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            compania: companiaGuardada
        });
    });
});


//=======================================================================
// Borrar Compañia
//=======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Compañia.findByIdAndRemove(id, (err, companiaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Compañia',
                errors: err
            });
        }

        if (!companiaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una Compañia con ese ID',
                errors: { message: 'No existe una Compañia con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            compania: companiaBorrada
        });
    });
});

module.exports = app;