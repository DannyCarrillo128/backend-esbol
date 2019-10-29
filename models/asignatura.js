var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var asignaturaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    programa: { type: String, required: [true, 'El programa académico es necesario'] },
    intensidad: { type: String, required: [true, 'La intensidad es necesaria'] },
    creditos: { type: String, required: [true, 'Los créditos son necesarios'] },
    unidades: [{ type: mongoose.Schema.ObjectId, ref: 'Unidad' }]
});

asignaturaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Asignatura', asignaturaSchema);