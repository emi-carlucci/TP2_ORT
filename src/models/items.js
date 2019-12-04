const mongoose = require("../config/conexion.js")

const schema = {
    item_id: { type: mongoose.SchemaTypes.Number, required: true },
    item_name: { type: mongoose.SchemaTypes.String, required: true },
    avg_salary: { type: mongoose.SchemaTypes.Decimal128, required: true }
};

const collectionName = 'items';

const itemSchema = mongoose.Schema(schema);

const Items = mongoose.model(collectionName, itemSchema);

module.exports = Items;