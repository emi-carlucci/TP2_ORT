const express = require('express')

const config_values = require('../config/config.json')
const { postCalculoSueldoNeto, postCalculoSueldoBruto, postCalculoAguinaldo, postCalculoVacaciones } = require('../controllers')

const router = express.Router()

router.post(config_values.paths.calcularSueldoNeto, postCalculoSueldoNeto)
router.post(config_values.paths.calcularSueldoBruto, postCalculoSueldoBruto)
router.post(config_values.paths.calcularSAC, postCalculoAguinaldo)
router.post(config_values.paths.calcularVacaciones, postCalculoVacaciones)

module.exports = router