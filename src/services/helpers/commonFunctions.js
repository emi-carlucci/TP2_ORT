// require

//  const conexion = require("/Users/Neotel/TP/GITH/TP2_ORT/src/config/conexion")
const conexion = require("../../config/conexion.js")
const Descuentos = require("../../models/descuentos.js")



const {Porcentaje} =  Descuentos.find({ 
    Concepto:'Jubilacion'
  },{Porcentaje:1,_id:0}, function callback(error, a) {
    if(error) {
        console.log('Concepto no encontrado')
    }
    console.log(a)
      })
  

  

const descuentoJubilacion = (value) => {

           return value * Porcentaje;
}

const descuentoObraSocial = (value) => {
    return value * 0.03
}

const descuentoPAMI = (value) => {
    return value * 0.03
}

const descuentoSindicato = (value, percentage) => {
    return value * (percentage / 100)
}

const descuentoIIGG = (value) => {
    return ((value >= 77624) ? value * 0.035 : 0)
}

const calculoSAC = (value) => {
    return (value / 2)
}

const calculoVacaciones = (value) => {
    return ((value / 30) * 14)
}
module.exports = {
    descuentoJubilacion,
    descuentoObraSocial,
    descuentoPAMI,
    descuentoSindicato,
    descuentoIIGG,
    calculoSAC,
    calculoVacaciones
}
