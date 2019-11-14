const { appDb } = require('../db')
const {
  descuentoJubilacion,
  descuentoObraSocial,
  descuentoPAMI,
  descuentoSindicato,
  descuentoIIGG,
  calculoSAC,
  calculoVacaciones
} = require('./helpers/commonFunctions.js')

//business logic 
const calcularSueldoNeto = async (sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico) => {
  try {
    let discounts = ((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)
      + descuentoJubilacion(sueldo)
      + descuentoObraSocial(sueldo)
      + descuentoPAMI(sueldo)
      + descuentoIIGG(sueldo);
    let result = sueldo - discounts;
    return { sueldoNeto: result, status: 200 }
  } catch (err) {
    throw new Error(err.message)
  }
}

const calcularSueldoBruto = async (sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico) => {
  try {
    let discounts = ((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)
      + descuentoJubilacion(sueldo)
      + descuentoObraSocial(sueldo)
      + descuentoPAMI(sueldo);
    let result = sueldo + discounts;
    return { sueldoBruto: result, status: 200 }
  } catch (err) {
    throw new Error(err.message)
  }
}


const calcularSAC = async (sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico) => {
  try {
    let sac = calculoSAC(sueldo);
    return { Aguinaldo: sac, status: 200 }
  } catch (err) {
    throw new Error(err.message)
  }
}

const calcularVacaciones = async (sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico) => {
  try {
    let sac = calculoVacaciones(sueldo);
    return { Vaciones: sac, status: 200 }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  calcularSueldoNeto,
  calcularSueldoBruto,
  calcularSAC,
  calcularVacaciones,
}