const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sa:unpbx@cluster0-ebg2y.mongodb.net/Deducciones?retryWrites=true&w=majority', function(err){
	if(err) throw err;
	console.log('Conexión a bd correcta.')

});
mongoose.Promise = global.Promise; 



module.exports = mongoose;