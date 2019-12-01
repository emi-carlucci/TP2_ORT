const mongoose = require('mongoose');
const config_values = require('./config.json')

mongoose.connect(config_values.data_base_config.connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => {
    console.log(config_values.data_base_config.error_connection_msg);
});
db.once('open', () => {
    console.log(config_values.data_base_config.successfull_connection_msg);
});

module.exports = mongoose;
