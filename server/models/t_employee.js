const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchemma =new mongoose.Schema({
    f_Name:{
        type:String,
        required:true
    },
    f_Email:{
        type:String,
        required:true
    },
    f_Image:{
        type:String,
        required:true,
    },
    f_Mobile:{
        type:String,
        trim:true,
        required:true
    },
    f_Designation:{
        type:String,
        trim:true,
        required:true,
    },
    f_gender:{
        type:String,
        required:true,
    },
    f_Course:[{
        type:String,
        required:true
    }],
    f_createdate:{
        type:Date,
        default:Date.now(),
    }
});

employeeSchemma.plugin(AutoIncrement,{inc_field:'f_Id'});

const T_Employee = mongoose.model("T_Employee",employeeSchemma);
module.exports = T_Employee;