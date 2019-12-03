const mongoose = require("../config/conexion.js")

const schema = {
    concepto: { type: mongoose.SchemaTypes.String, required: true },
    porcentaje: { type: mongoose.SchemaTypes.Decimal128, required: true },
    minimo: { type: mongoose.SchemaTypes.Decimal128, required: false }
};

const collectionName = 'descuentos';

const discountSchema = mongoose.Schema(schema);

const Discounts = mongoose.model(collectionName, discountSchema);

module.exports = Discounts;