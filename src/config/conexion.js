const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sa:unpbx@cluster0-ebg2y.mongodb.net/Deducciones?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;  


server.get('/agregar/:Concepto/:Porcentaje/',function(req,res){
	//Obtencion de parametros de url
	var nombre = req.params.nombre;
	var imagen = req.params.imagen;
	// Creacion de una instancia mediante valores en url
	var speciality = new Speciality({ Concepto: Concepto, Porcentaje: Porcentaje })
	//Guardar instancia del modelo
	speciality.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			// Redireccion a home
			res.redirect('/');
		}
	});
});



module.exports = mongoose;