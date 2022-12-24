const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber:{ type: String}, // auto increment C001
    cardType:{ 
        type: String,
    enum: ["REGULAR","SPECIAL"]
    },
    customerName:{ type: String},
    status:{ 
        type: String,
        default: "ACTIVE"
    },
    vision:{ type: String},  //explore
    customerID:{ 
        type: String,
    ref: "CustomerData"
    }  
    
}, {timestamps: true})

module.exports= mongoose.model('cardData', cardSchema);