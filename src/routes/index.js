const express = require('express')

const config_values = require('../config/config.json')
const { postCalculoSueldoNeto, postCalculoSueldoBruto, postCalculoAguinaldo, postCalculoVacaciones, postCalculoSueldoPromedio, getStatus, postLogin, postSignUp, getObtenerRubros } = require('../controllers')

const router = express.Router()

router.get(config_values.paths.status, getStatus)
router.get(config_values.paths.obtenerRubros, getObtenerRubros)
router.post(config_values.paths.calcularSueldoNeto, postCalculoSueldoNeto)
router.post(config_values.paths.calcularSueldoBruto, postCalculoSueldoBruto)
router.post(config_values.paths.calcularSAC, postCalculoAguinaldo)
router.post(config_values.paths.calcularVacaciones, postCalculoVacaciones)
router.post(config_values.paths.calcularSueldoPromedio, postCalculoSueldoPromedio)
router.post(config_values.paths.login, postLogin)
router.post(config_values.paths.signup, postSignUp)

module.exports = router