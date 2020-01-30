var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Docente = require('../models/docente');

// =======================================================================
// Obtener todos los Docentes
// =======================================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Docente.find({})
        .skip(desde)
        .limit(5)
        .populate('asignaturas', 'nombre')
        .exec(
            (err, docentes) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Docentes',
                        errors: err
                    });
                }

                Docente.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        docentes: docentes,
                        total: conteo
                    });
                });
            });
});


// =======================================================================
// Obtener Docente
// =======================================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Docente.findById(id, (err, docente) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Docente',
                errors: err
            });
        }

        if (!docente) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Docente con el id ' + id + ' no existe',
                errors: { message: 'No existe un Docente con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            docente: docente
        });
    }).populate('asignaturas');
});


// =======================================================================
// Actualizar Docente
// =======================================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Docente.findById(id, (err, docente) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Docente',
                errors: err
            })
        }

        if (!docente) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El docente con el id ' + id + ' no existe',
                errors: { message: 'No existe un docente con ese ID' }
            });
        }

        docente.cedula = body.cedula;
        docente.nombres = body.nombres;
        docente.apellidos = body.apellidos;
        docente.compania = body.compania;
        docente.curso = body.curso;
        docente.seccion = body.seccion;
        docente.ciudad = body.ciudad;
        docente.telefono = body.telefono;
        docente.email = body.email;
        docente.tipo = body.tipo;
        docente.asignaturas = body.asignaturas;
        //docente.asignaturas = req.asignaturas._id;

        docente.save((err, docenteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Docente',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                docente: docenteGuardado
            });
        });
    });
});


// =======================================================================
// Crear un nuevo Docente
// =======================================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var docente = new Docente({
        cedula: body.cedula,
        nombres: body.nombres,
        apellidos: body.apellidos,
        compania: body.compania,
        curso: body.curso,
        seccion: body.seccion,
        ciudad: body.ciudad,
        telefono: body.telefono,
        email: body.email,
        tipo: body.tipo,
        asignaturas: body.asignaturas
    });

    docente.save((err, docenteGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al crear Docente",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            docente: docenteGuardado
        });
    });

});


// =======================================================================
// Borrar Docente
// =======================================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Docente.findByIdAndRemove(id, (err, docenteBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Docente',
                errors: err
            });
        }

        if (!docenteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Docente con ese ID',
                errors: { message: 'No existe un Docente con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            docente: docenteBorrado
        });
    });
});

module.exports = app;