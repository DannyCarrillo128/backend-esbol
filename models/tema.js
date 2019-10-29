var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var temaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    subtemas: [{ type: mongoose.Schema.ObjectId, ref: 'Subtema' }]
});

temaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Tema', temaSchema);