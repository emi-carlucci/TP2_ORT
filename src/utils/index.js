const joi = require('@hapi/joi')
const config_values = require('../config/config.json')

// metodo de validacion para login de usuario
const loginRequestValidation = async (body) => {
    const schema = {
        usuario: joi.string().min(6).max(30).required(),
        contrasena: joi.string().alphanum().min(6).max(26).required(),
    }
    const { error } = joi.validate(body, schema);
    if (error != null) {
        throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
    }
}

// metodo de validacion para calcular sueldo
const calculoSueldoRequestValidation = async (body) => {
    const schema = {
        sueldo: joi.number().precision(2).min(0).max(1000000000).required(),
        aporteSindicato: joi.number().precision(2).min(0).max(9).required(),
    }
    const { error } = joi.validate(body, schema);
    if (error != null) {
        throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
    }
}

// metodo de validacion para calcular aguinaldo (SAC) y vacaciones
const calculoSacVacRequestValidation = async (body) => {
    const schema = {
        sueldo: joi.number().precision(2).min(0).max(1000000000).required(),
    }
    const { error } = joi.validate(body, schema);
    if (error != null) {
        throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
    }
}

module.exports = {
    calculoSueldoRequestValidation,
    calculoSacVacRequestValidation,
    loginRequestValidation
}