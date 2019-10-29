var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var claseSchema = new Schema({
    asignatura: { type: String, required: [true, "La Asignatura de inicio es necesaria"] },
    //asignatura: { type: Schema.Types.ObjectId, ref: 'Asignatura', required: true },
    docente: { type: Schema.Types.ObjectId, ref: 'Docente', required: false },
    horaInicio: { type: String, required: [true, "La hora de inicio es necesaria"] },
    horaFin: { type: String, required: [true, "La hora de finalización es necesaria"] },
    fecha: { type: String, required: [false, "La fecha es necesaria"] },
    seccion: { type: String, required: [false, "La sección es necesaria"] },
    estudiante: { type: Schema.Types.ObjectId, ref: 'Estudiante', required: false }
});

claseSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Clase', claseSchema);