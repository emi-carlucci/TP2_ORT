const joi = require('@hapi/joi')

// Calcular Sueldo Neto Class

module.exports = function(req) {
    var result = calculateSalary(req); 
    return result;
}

function calculateSalary(req){

    const body = req.body

    try {
        var schema_validation = invalidRequest(body);
        if (schema_validation != null) {
            throw { status: 400, descripcion: 'Request Invalido', reason: schema_validation.message }   
        }
        return { status: 200, descripcion: 'Request Procesado' }
    } catch (err) {
        throw err
    }
}

function invalidRequest(body) {
    const schema = {
        id: joi.number().integer().min(0),
        solicitud: joi.string().alphanum().min(1).required(),
    }
    const { error } = joi.validate(body, schema);
    return error
}