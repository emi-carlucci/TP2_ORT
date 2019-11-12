// requires
const express = require('express')
const config_values = require('./../config/config.json')

//requires methods
const calcularSueldoBrutoClass = require('./../methods/calcular_sueldo_bruto')
const calcularSueldoNetoClass = require('./../methods/calcular_sueldo_neto')

// initializate express component
const app = express()

// set express settings
app.use(express.json())
app.set('json spaces', 4)

const sueldoNetoUrl = config_values.paths.main_path + config_values.paths.calcularSueldoNeto;
const sueldoBrutoUrl = config_values.paths.main_path + config_values.paths.calcularSueldoBruto;

// methods
app.post(sueldoNetoUrl, (req, res) => {
    console.log(sueldoNetoUrl)
    console.log('Calculando Sueldo Neto: ' + req.url)
    try {
        let result = calcularSueldoNetoClass(req)
        res.status(result.status).json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

app.post(sueldoBrutoUrl, (req, res) => {
    console.log('Calculando Sueldo Bruto: ' + req.url)
    try {
        let result = calcularSueldoBrutoClass(req)
        res.status(result.status).json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

// starts the service

const puerto = 8080
app.listen(puerto, () => {
    console.log(`Servidor inicializado en puerto ${puerto}`)
})
