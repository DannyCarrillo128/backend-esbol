var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var tiposValidos = {
    values: ['Hora Cátedra', 'Docente Policial', 'Suplente'],
    message: '{VALUE} no es un tipo permitido'
}

var docenteSchema = new Schema({
    cedula: { type: String, unique: true, required: [true, "La cédula es necesaria"] },
    nombres: { type: String, required: [true, "Los nombres son necesarios"] },
    apellidos: { type: String, required: [true, "Los apellidos son necesarios"] },
    compania: { type: String, required: [true, "La compañia son necesarios"] },
    curso: { type: String, required: [true, "El curso son necesarios"] },
    seccion: { type: String, required: [true, "La sección son necesarios"] },
    ciudad: { type: String, required: [true, "La ciudad son necesarios"] },
    telefono: { type: String, unique: true, required: [true, "El teléfono son necesarios"] },
    email: { type: String, unique: true, required: [true, "El email son necesarios"] },
    tipo: { type: String, required: true, default: 'Hora Cátedra', enum: tiposValidos }
});

docenteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Docente', docenteSchema);