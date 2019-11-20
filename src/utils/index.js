const joi = require('@hapi/joi')
const config_values = require('../config/config.json')

// request validation functions

// metodo de validacion para calcular sueldo
const calculoSueldoRequestValidation = async (body) => {
    const schema = {
        sueldo: joi.number().precision(2).min(0).max(1000000000).required(),
        aporteSindicato: joi.number().precision(2).min(0).max(100).required(),
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
    calculoSacVacRequestValidation
}