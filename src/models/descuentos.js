const mongoose = require('mongoose');
let Schema= mongoose.Schema;

var descuentoSchema = new Schema({
    Concepto: String,
    Porcentaje: String

},{versionKey:false});

var Descuento = mongoose.model('Descuentos',descuentoSchema);

module.exports.Descuento = Descuento;