var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var companiaSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    secciones: [{ type: mongoose.Schema.ObjectId, ref: 'Seccion' }]
});

companiaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Compania', companiaSchema);