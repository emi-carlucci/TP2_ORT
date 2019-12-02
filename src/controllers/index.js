const appServices = require('../services')
const reqValidations = require('../utils')

const { calcularSueldoNeto, calcularSueldoBruto, calcularSAC, calcularVacaciones, obtenerStatus, login} = appServices
const { calculoSueldoRequestValidation, calculoSacVacRequestValidation, loginRequestValidation } = reqValidations

// methods
const getStatus = async (req, res) => {
    console.log('Respondiendo App Status: ' + req.url)
    try {
        let result = await obtenerStatus()
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

const postLogin = async (req, res) => {
    console.log('Proecesando Login: ' + req.url)
    try {
        //request validation
        await loginRequestValidation(req.body)
        //destructuring request
        const { usuario, contrasena } = req.body
        let result = await login(usuario, contrasena)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

const postCalculoSueldoNeto = async (req, res) => {
    console.log('Calculando Sueldo Neto: ' + req.url)
    try {
        //request validation
        await calculoSueldoRequestValidation(req.body)
        //destructuring request
        const { sueldo, aporteSindicato } = req.body
        let result = await calcularSueldoNeto(sueldo, aporteSindicato)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

const postCalculoSueldoBruto = async (req, res) => {
    console.log('Calculando Sueldo Bruto: ' + req.url)
    try {
        //request validation
        await calculoSueldoRequestValidation(req.body)
        //destructuring request
        const { sueldo, aporteSindicato } = req.body
        let result = await calcularSueldoBruto(sueldo, aporteSindicato)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

const postCalculoAguinaldo = async (req, res) => {
    console.log('Calculando Aguinaldo: ' + req.url)
    try {
        //request validation
        await calculoSacVacRequestValidation(req.body)
        //destructuring request
        const { sueldo } = req.body
        let result = await calcularSAC(sueldo)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

const postCalculoVacaciones = async (req, res) => {
    console.log('Calculando Vacaciones: ' + req.url)
    try {
        //request validation
        await calculoSacVacRequestValidation(req.body)
        //destructuring request
        const { sueldo } = req.body
        let result = await calcularVacaciones(sueldo)
        res.status(result.status).json(result)
    } catch (err) {
        console.log(err)
        res.status(err.status).json(err)
    }
}

module.exports = {
    postCalculoSueldoNeto,
    postCalculoSueldoBruto,
    postCalculoAguinaldo,
    postCalculoVacaciones,
    getStatus,
    postLogin
}