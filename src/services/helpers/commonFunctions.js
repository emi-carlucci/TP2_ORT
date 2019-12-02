const Discounts = require("../../models/descuentos.js")
const Users = require("../../models/usuarios.js")
const config_values = require('../../config/config.json')

const validacionLogin = async (usuario, contrasena) => {

    let result;

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

const obtenerDescuentos = async (value, contributions, desc) => {

    let result;

    if (desc == config_values.discounts_concepts.labor_union){
        result = ((contributions > 0) ? (value * (contributions / 100)) : 0);
    } 
    else {
        result = await Discounts.findOne( {concepto: desc} ).exec()
        .then(concept => { 
            if (concept === null){ 
                throw new Error(`Concepto '${desc}' Inexistente`) 
            }
            if (concept.porcentaje === null || isNaN(concept.porcentaje)){ 
                throw new Error(`El Concepto '${desc}' contiene un Porcentaje Invalido`) 
            }
            console.log(`Concepto: '${desc}' Encontrado`);
            if (desc == config_values.discounts_concepts.iigg){
                return ((value >= concept.minimo) ? value * concept.porcentaje : 0);
            } 
            else {
                return value * concept.porcentaje;
            }  
        })
        .catch(error => {
            throw new Error(error.message)
        });
    }
    return result;

}

const calculoSAC = (value) => {
    return (value / 2)
}

const calculoVacaciones = (value) => {
    return ((value / 30) * 14)
}

module.exports = {
    obtenerDescuentos,
    calculoSAC,
    calculoVacaciones,
    validacionLogin
}
