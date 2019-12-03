const Discounts = require("../../models/descuentos.js")
const Users = require("../../models/usuarios.js")
const Tokens = require("../../models/tokens.js")
const config_values = require('../../config/config.json')

const validacionLogin = async (usuario, contrasena) => {

    let result;

    result = await Users.findOne({ email: usuario, password: contrasena, active: true}).exec()
    .then(async user => { 
        if (user === null){ 
            throw new Error('Usuario o Contrasena Invalidos') 
        }
        autoGenToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await Tokens.create({ access_token: autoGenToken, date: Date.now() });
        console.log(`Sesion '${autoGenToken}' generada para usuario '${usuario}'`)
        return { usuario: user.email, accessToken: autoGenToken };
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

const obtenerBruto = async (value) => {

    let result;

    result = await Discounts.findOne( {concepto: config_values.discounts_concepts.raw_salary} ).exec()
    .then(concept => { 
        if (concept === null){ 
            throw new Error(`Concepto '${config_values.discounts_concepts.raw_salary}' Inexistente`) 
        }
        if (concept.porcentaje === null || isNaN(concept.porcentaje)){ 
            throw new Error(`El Concepto '${config_values.discounts_concepts.raw_salary}' contiene un Porcentaje Invalido`) 
        }
        console.log(`Concepto: '${config_values.discounts_concepts.raw_salary}' Encontrado`);
        return value * concept.porcentaje;
    })
    .catch(error => {
        throw new Error(error.message)
    });
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
    validacionLogin,
    obtenerBruto
}