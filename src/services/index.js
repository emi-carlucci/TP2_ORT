const config_values = require('../config/config.json')
const { calculoSAC, calculoVacaciones, validacionLogin, validacionSignUp, obtenerDescuentos, obtenerBruto , obtenerRubro, obtenerTodosRubros} = require('./helpers/commonFunctions.js')

const obtenerStatus = async () => {
  try {
    return {
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const obtenerRubros = async () => {
  try {
    let result = await obtenerTodosRubros();
    console.log('Rubros Obtenidos Exitosamente');
    return {
      rubros: result,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const login = async (usuario, contrasena) => {
  try {
    let result = await validacionLogin(usuario, contrasena);
    console.log(`Usuario: ${result.usuario} Logueado Exitosamente`);
    return {
      loginStatus: "OK",
      usuario: result.usuario,
      accessToken: result.accessToken,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const signUp = async (nombre, apellido, usuario, contrasena) => {
  try {
    let result = await validacionSignUp(nombre, apellido, usuario, contrasena);
    console.log(`Usuario: ${result.usuario} Creado Exitosamente`);
    return {
      signUpStatus: "OK",
      usuario: result.usuario,
      status: config_values.response_codes.status_ok
    }
  } catch (error) {
      throw { descripcion: config_values.description_codes.status_error, reason: error.message, status: config_values.response_codes.status_error }
  }
}

const calcularSueldoNeto = async (sueldo, aporteSindicato) => {
  try {
    let sindicato = Math.round(await obtenerDescuentos(sueldo, aporteSindicato, config_values.discounts_concepts.labor_union) * 100) / 100;
    let jubilacion = Math.round(await obtenerDescuentos(sueldo, aporteSindicato, config_values.discounts_concepts.jubilation) * 100) / 100;
    let pami = Math.round(await obtenerDescuentos(sueldo, aporteSindicato, config_values.discounts_concepts.pami) * 100) / 100;
    let obraSocial = Math.round(await obtenerDescuentos(sueldo, aporteSindicato, config_values.discounts_concepts.insurance) * 100) / 100;
    let ganancias = Math.round(await obtenerDescuentos(sueldo, aporteSindicato, config_values.discounts_concepts.iigg) * 100) / 100;
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
    let bruto = await obtenerBruto(sueldo);
    let sindicato = Math.round(await obtenerDescuentos(bruto, aporteSindicato, config_values.discounts_concepts.labor_union) * 100) / 100;
    let jubilacion = Math.round(await obtenerDescuentos(bruto, aporteSindicato, config_values.discounts_concepts.jubilation) * 100) / 100;
    let pami = Math.round(await obtenerDescuentos(bruto, aporteSindicato, config_values.discounts_concepts.pami) * 100) / 100;
    let obraSocial = Math.round(await obtenerDescuentos(bruto, aporteSindicato, config_values.discounts_concepts.insurance) * 100) / 100;
    let discounts = sindicato;  
    let result = ((discounts > 0) ? (Math.round(((bruto + discounts) * 1.0046) * 100) / 100) : (Math.round((bruto + discounts) * 100) / 100));
    console.log(`sueldoBrutoCalculado: $ ${result}`);
    return {
      sueldoNeto: Math.round(sueldo * 100) / 100,
      descuentoJubilacion: jubilacion,
      descuentoObraSocial: obraSocial,
      descuentoPami: pami,
      descuentoSindicato: sindicato,
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

const calculoSueldoPromedio = async (idRubro, sueldoBruto) => {
  try {
    let sueldoPromedio = await obtenerRubro(idRubro);
    let result = ((sueldoBruto > 0) ? (Math.round((sueldoBruto - sueldoPromedio) * 100) / 100) : 0);
    console.log(`sueldoPromedioCalculado: $ ${result}`);
    return {
      sueldoNeto: Math.round(sueldoBruto * 100) / 100,
      diferencia: result, 
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
  calculoSueldoPromedio,
  obtenerStatus,
  login,
  signUp,
  obtenerRubros
}