const {Schema, model} = require('mongoose');



const measSchema = new Schema({

    name:String,

    value : String

});




module.exports = model('pruebas', measSchema);