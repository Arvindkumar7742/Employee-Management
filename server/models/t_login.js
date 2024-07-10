const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const loginSchemma =new mongoose.Schema({
    f_userName:{
        type:String,
        required:true
    },
    f_Pwd:{
        type:String,
        required:true
    },
});

loginSchemma.plugin(AutoIncrement,{inc_field:'f_sno'});

const T_Login = mongoose.model("T_Login",loginSchemma);
module.exports = T_Login;