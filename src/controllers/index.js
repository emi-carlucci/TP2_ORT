const appServices = require('../services')
const reqValidations = require('../utils')

const { calcularSueldoNeto, calcularSueldoBruto } = appServices
const { calculoSueldoRequestValidation } = reqValidations
 
// methods
const postCalculoSueldoNeto = async (req, res, next) => {
    console.log('Calculando Sueldo Neto: ' + req.url)
    try {
        //request validation
        await calculoSueldoRequestValidation(req.body)
        //destructuring request
        const {sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico} = req.body
        let result = await calcularSueldoNeto(sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}
 
const postCalculoSueldoBruto = async (req, res, next) => {
    console.log('Calculando Sueldo Bruto: ' + req.url)
    try {
        //request validation
        await calculoSueldoRequestValidation(req.body)
        //destructuring request
        const {sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico} = req.body
        let result = await calcularSueldoBruto(sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

module.exports = {
  postCalculoSueldoNeto,
  postCalculoSueldoBruto
}