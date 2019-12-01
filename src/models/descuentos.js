const mongoose = require("../config/conexion.js")

const schema = {
    concepto: { type: mongoose.SchemaTypes.String, required: true },
    porcentaje: { type: mongoose.SchemaTypes.String, required: true }
};

const collectionName = 'descuentos';

const discountSchema = mongoose.Schema(schema);

const Discounts = mongoose.model(collectionName, discountSchema);

module.exports = Discounts;