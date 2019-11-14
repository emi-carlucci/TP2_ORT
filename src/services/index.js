const { appDb } = require('../db')
<<<<<<< HEAD
const {
=======
const config_values = require('../config/config.json')
const {
>>>>>>> 17a52384f7407384b5319e9e836567360fdce477
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
<<<<<<< HEAD
    let discounts = ((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)
      + descuentoJubilacion(sueldo)
      + descuentoObraSocial(sueldo)
      + descuentoPAMI(sueldo)
      + descuentoIIGG(sueldo);
    let result = sueldo - discounts;
    return { sueldoNeto: result, status: 200 }
  } catch (err) {
=======
    let sindicato = Math.round((((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)) * 100) / 100;
    let jubilacion = Math.round(descuentoJubilacion(sueldo) * 100) / 100;
    let pami = Math.round((descuentoPAMI(sueldo)) * 100) / 100;
    let obraSocial = Math.round((descuentoObraSocial(sueldo)) * 100) / 100;
    let ganancias = Math.round((descuentoIIGG(sueldo)) * 100) / 100;
    let discounts = sindicato + jubilacion + pami + obraSocial + ganancias;
    let result = Math.round((sueldo - discounts) * 100) / 100;
    console.log(`sueldoNetoCalculado: $ ${result}`);
    return { sueldoBruto: Math.round(sueldo * 100) / 100,
             descuentoJubilacion: jubilacion*-1,
             descuentoObraSocial: obraSocial*-1,
             descuentoPami: pami*-1,
             descuentoSindicato: sindicato*-1,
             descuentoGanancias: ganancias*-1,
             sueldoNeto: result,
             status: config_values.response_codes.status_ok }
  } catch(err) {
    console.log(err.message)
>>>>>>> 17a52384f7407384b5319e9e836567360fdce477
    throw new Error(err.message)
  }
}

const calcularSueldoBruto = async (sueldo, aporteSindicato, casado, hijos, alquilerMensual, jubilado, patagonico) => {
  try {
<<<<<<< HEAD
    let discounts = ((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)
      + descuentoJubilacion(sueldo)
      + descuentoObraSocial(sueldo)
      + descuentoPAMI(sueldo);
    let result = sueldo + discounts;
    return { sueldoBruto: result, status: 200 }
  } catch (err) {
=======
    let sindicato = Math.round((((aporteSindicato > 0) ? descuentoSindicato(sueldo, aporteSindicato) : 0)) * 100) / 100;
    let jubilacion = Math.round(descuentoJubilacion(sueldo) * 100) / 100;
    let pami = Math.round((descuentoPAMI(sueldo)) * 100) / 100;
    let obraSocial = Math.round((descuentoObraSocial(sueldo)) * 100) / 100;
    let ganancias = Math.round((descuentoIIGG(sueldo)) * 100) / 100;
    let discounts = sindicato + jubilacion + pami + obraSocial + ganancias;
    let result = Math.round((sueldo + discounts) * 100) / 100;
    console.log(`sueldoBrutoCalculado: $ ${result}`);
    return { sueldoNeto: Math.round(sueldo * 100) / 100,
             descuentoJubilacion: jubilacion,
             descuentoObraSocial: obraSocial,
             descuentoPami: pami,
             descuentoSindicato: sindicato,
             descuentoGanancias: ganancias,
             sueldoBruto: result,
             status: config_values.response_codes.status_ok }
  } catch(err) {
    console.log(err.message)
>>>>>>> 17a52384f7407384b5319e9e836567360fdce477
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