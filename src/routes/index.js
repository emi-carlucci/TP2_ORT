const express = require('express')
 
const config_values = require('../config/config.json')
const { postCalculoSueldoNeto, postCalculoSueldoBruto } = require('../controllers')
 
const router = express.Router()
 
router.post(config_values.paths.calcularSueldoNeto, postCalculoSueldoNeto)
router.post(config_values.paths.calcularSueldoBruto, postCalculoSueldoBruto)
 
module.exports = router