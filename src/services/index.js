const config_values = require('../config/config.json')
const { descuentoSindicato, descuentoIIGG, calculoSAC, calculoVacaciones, validacionLogin, obtenerDescuentos } = require('./helpers/commonFunctions.js')

const obtenerStatus = async () => {
  try {
    return {
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const login = async (usuario, contrasena) => {
  try {
    let result = await validacionLogin(usuario, contrasena);
    console.log(`Usuario: ${result} Logueado Exitosamente`);
    return {
      loginStatus: "OK",
      usuario: result,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const calcularSueldoNeto = async (sueldo, aporteSindicato) => {
  try {
    let sindicato = Math.round((((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)) * 100) / 100;
    let jubilacion = Math.round(await obtenerDescuentos(sueldo, config_values.discounts_concepts.jubilation) * 100) / 100;
    let pami = Math.round((await obtenerDescuentos(sueldo, config_values.discounts_concepts.pami)) * 100) / 100;
    let obraSocial = Math.round((await obtenerDescuentos(sueldo, config_values.discounts_concepts.insurance)) * 100) / 100;
    let ganancias = Math.round((descuentoIIGG(sueldo)) * 100) / 100;
    let discounts = sindicato + jubilacion + pami + obraSocial + ganancias;
    let result = Math.round((sueldo - discounts) * 100) / 100;
    console.log(`sueldoNetoCalculado: $ ${result}`);
    return {
      sueldoBruto: Math.round(sueldo * 100) / 100,
      descuentoJubilacion: jubilacion * -1,
      descuentoObraSocial: obraSocial * -1,
      descuentoPami: pami * -1,
      descuentoSindicato: sindicato * -1,
      descuentoGanancias: ganancias * -1,
      sueldoNeto: result,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const calcularSueldoBruto = async (sueldo, aporteSindicato) => {
  try {
    let sindicato = Math.round((((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)) * 100) / 100;
    let jubilacion = Math.round(await obtenerDescuentos(sueldo, config_values.discounts_concepts.jubilation) * 100) / 100;
    let pami = Math.round((await obtenerDescuentos(sueldo, config_values.discounts_concepts.pami)) * 100) / 100;
    let obraSocial = Math.round((await obtenerDescuentos(sueldo, config_values.discounts_concepts.insurance)) * 100) / 100;
    let ganancias = Math.round((descuentoIIGG(sueldo)) * 100) / 100;
    let discounts = sindicato + jubilacion + pami + obraSocial + ganancias;
    let result = Math.round((sueldo + discounts) * 100) / 100;
    console.log(`sueldoBrutoCalculado: $ ${result}`);
    return {
      sueldoNeto: Math.round(sueldo * 100) / 100,
      descuentoJubilacion: jubilacion,
      descuentoObraSocial: obraSocial,
      descuentoPami: pami,
      descuentoSindicato: sindicato,
      descuentoGanancias: ganancias,
      sueldoBruto: result,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const calcularSAC = async (sueldo) => {
  try {
    let result = Math.round(calculoSAC(sueldo) * 100) / 100;
    console.log(`sacCalculado: $ ${result}`);
    return {
      aguinaldo: result,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const calcularVacaciones = async (sueldo) => {
  try {
    let result = Math.round(calculoVacaciones(sueldo) * 100) / 100;
    console.log(`vacacionesCalculadas: $ ${result}`);
    return {
      vacaciones: result,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

module.exports = {
  calcularSueldoNeto,
  calcularSueldoBruto,
  calcularSAC,
  calcularVacaciones,
  obtenerStatus,
  login
}