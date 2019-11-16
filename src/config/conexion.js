const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sa:unpbx@cluster0-ebg2y.mongodb.net/Deducciones?retryWrites=true&w=majority');
                
module.exports = mongoose;