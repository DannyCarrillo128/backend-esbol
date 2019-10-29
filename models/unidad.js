var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var unidadSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    temas: [{ type: mongoose.Schema.ObjectId, ref: 'Tema' }]
}, { collection: 'unidades' });

unidadSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Unidad', unidadSchema);