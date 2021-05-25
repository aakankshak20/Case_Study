const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema= mongoose.Schema;

const passenger= new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        
    },
    age:{
        type:Number,
        required:[true,'Age is required']
    },
    address:{
        type:String,
        
    },
    gender:{
        type:String,
        required:[true,'Gender is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
});



const Passenger = mongoose.model('passenger',passenger);

module.exports = Passenger;