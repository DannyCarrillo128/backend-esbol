var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var subtemaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
});

subtemaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Subtema', subtemaSchema);