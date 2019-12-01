const Discounts = require("../../models/descuentos.js")
const Users = require("../../models/usuarios.js")

const validacionLogin = async (usuario, contrasena) => {

    result = await Users.findOne({ email: usuario, password: contrasena, active: true}).exec()
    .then(user => { 
        if (user === null){ 
            throw new Error('Usuario Inexistente') 
        }
        return user.email;
    })
    .catch(error => {
        throw new Error(error.message)
    });
    return result;

}

const obtenerDescuentos = async (value, desc) => {

    result = await Discounts.findOne( {concepto: desc} ).exec()
    .then(concept => { 
        if (concept === null){ 
            throw new Error(`Concepto '${desc}' Inexistente`) 
        }
        if (concept.porcentaje === null || isNaN(concept.porcentaje)){ 
            throw new Error(`El Concepto '${desc}' contiene un Porcentaje Invalido`) 
        }
        console.log(`Concepto: '${desc}' Encontrado`);
        return value * concept.porcentaje;
    })
    .catch(error => {
        throw new Error(error.message)
    });
    return result;

}

const descuentoSindicato = (value, percentage) => {
    return value * (percentage / 100)
}

const descuentoIIGG = (value) => {
    return ((value >= 77624) ? value * 0.035 : 0)
}

const calculoSAC = (value) => {
    return (value / 2)
}

const calculoVacaciones = (value) => {
    return ((value / 30) * 14)
}

module.exports = {
    obtenerDescuentos,
    descuentoSindicato,
    descuentoIIGG,
    calculoSAC,
    calculoVacaciones,
    validacionLogin
}
