const mongoose = require("../config/conexion.js")

const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true },
    surname: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: { type: mongoose.SchemaTypes.String, required: true },
    active: { type: mongoose.SchemaTypes.Boolean, required: true }
};

const collectionName = 'users';

const userSchema = mongoose.Schema(schema);

const Users = mongoose.model(collectionName, userSchema);

module.exports = Users;