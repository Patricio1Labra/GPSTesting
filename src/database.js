const mongoose = require('mongoose');
const URI = "mongodb://127.0.0.1:27017/prueba";

mongoose.connect(URI)
    .then( db => console.log("mondongo"))
    .catch(err => console.error(err));

module.exports = mongoose;