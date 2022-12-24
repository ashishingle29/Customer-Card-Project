const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName:{type: String},
    lastName:{type: String},
    mobileNumber:{
        type: String,   // 10 digits only
        max: 10,
        min:10
    },
    DOB:{type: Number},
    emailID:{type: String},   // abc@xyz.com format 
    address:{type: String},
    customerID:{type: String},  //uuid
    status: {
    type:String,
    default: "ACTIVE"}  // ACTIVE / INACTIVE

    
}, {timestamps: true})

module.exports= mongoose.model('CustomerData', customerSchema);