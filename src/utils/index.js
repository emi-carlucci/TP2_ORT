const joi = require('@hapi/joi')

//request validation functions

const calculoSueldoRequestValidation = async (body) => {
    const schema = {
        sueldo: joi.number().precision(2).min(0).max(1000000000).required(),
        aporteSindicato: joi.number().precision(2).min(0).max(100).required(),
        casado: joi.boolean().required(),
        hijos: joi.number().integer().min(0).max(100).required(),
        alquilerMensual: joi.number().precision(2).min(0).max(1000000).required(),
        jubilado: joi.boolean().required(),
        patagonico: joi.boolean().required(),
    }
    const { error } = joi.validate(body, schema);
    if (error != null) {
        throw { descripcion: 'Request Invalido', reason: error.message, status: 400 }   
    }
}

module.exports = {
    calculoSueldoRequestValidation
}