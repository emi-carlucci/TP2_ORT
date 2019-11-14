// common functions

const descuentoJubilacion = (value) => {
    return value * 0.11
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
