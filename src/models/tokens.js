const mongoose = require("../config/conexion.js")

const schema = {
    access_token: { type: mongoose.SchemaTypes.String, required: true },
    date: { type: mongoose.SchemaTypes.Date, required: true },
};

const collectionName = 'tokens';

const tokenSchema = mongoose.Schema(schema);

const Tokens = mongoose.model(collectionName, tokenSchema);

module.exports = Tokens;