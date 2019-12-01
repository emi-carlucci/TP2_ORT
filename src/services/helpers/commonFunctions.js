// require
const Descuentos = require("../../models/descuentos.js")
const Usuarios = require("../../models/usuarios.js")


const validacionLogin = (usuario, contrasena) => {

    result = Usuarios.find({ email: usuario, password: contrasena, active: true}, function (err, docs) {
        if(err){
            throw new Error(err.message)
        }
        else{
            return docs
        }
    });

    return result

}

const descuentoJubilacion = (value) => {

    result = Descuentos.find({Concepto: "Jubilacion"},async (err,conc)=>{
        if(err) {
            
            return console.log(`Concepto no encontrado, error: ${err}`)}
        else{

        return value * conc.Porcentaje
            }

    })
    
    

}

const descuentoObraSocial = (value) => {
   Descuentos.findOne({Concepto: "Obra Social"},(err,conc)=>{
        if(err) return console.log(`Concepto no encontrado, error: ${err}`)

        console.log(conc.Porcentaje)

    })
    
}


const descuentoPAMI = (value,desc) => {
    
    return 100;


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
    calculoVacaciones,
    validacionLogin
}
