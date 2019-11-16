const mongoose = require('mongoose');
let Schema= mongoose.Schema;

var descuentoSchema = new Schema({
    Concepto: String,
    Porcentaje: String,
    Creacion: {
            type: Date,
            default: Date.now
    }

},{versionKey:false});

var Descuento = mongoose.model('Descuentos',descuentoSchema);

module.exports.Descuento = Descuento;