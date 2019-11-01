const joi = require('@hapi/joi')

// Calcular Sueldo Bruto Class

exports = function(req) {
    var result = calculateSalary(req); 
    return result;
}

function calculateSalary(req){

    const body = req.body

    try {
        if (invalidRequest(body)) {
            throw { status: 400, descripcion: 'Request Invalido' }
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




   







