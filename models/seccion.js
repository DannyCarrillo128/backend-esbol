var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var seccionSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es necesario"] }
});

seccionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Seccion', seccionSchema);