var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var estudianteSchema = new Schema({
    cedula: { type: String, unique: true, required: [true, "La cédula es necesaria"] },
    nombres: { type: String, required: [true, "Los nombres son necesarios"] },
    apellidos: { type: String, required: [true, "Los apellidos son necesarios"] },
    programa: { type: String, required: [true, 'El programa académico es necesario'] },
    compania: { type: String, required: [true, "La compañia es necesaria"] },
    seccion: { type: String, required: [true, "La sección es necesaria"] }
});

estudianteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Estudiante', estudianteSchema);