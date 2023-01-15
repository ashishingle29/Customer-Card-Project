const cardModel = require('../models/cardModel')
const customerModel = require('../models/customerModel')


const createCard = async function(req,res){
    try{
    data = req.body
    const { customerID, vision, customerName, cardType} = data

    if(!cardType) { return res.status(400).send({status:false, message:"Please Provide cardType"})}
    if(cardType!="REGULAR" && cardType!="SPECIAL")  return res.status(400).send({status:false,message:"carType is only be 'REGULAR/SPECIAL'"})

    if(!vision) { return res.status(400).send({status:false, message:"Please Provide vision"})}
   
    if(!customerID) { return res.status(400).send({status:false, message:"Please Provide customerID"})}

    const findCustomer = await customerModel.findOne({customerID: customerID, status: "ACTIVE"})
    if(!findCustomer){ return res.status(400).send({status:false, message:"Please Provide Valid Deatil/Account is not Active"})}

    let fullname = findCustomer.firstName +" "+ findCustomer.lastName
        data.customerName = fullname

        let cardcheck= await cardModel.findOne({customerID})
        if(cardcheck) return res.status(400).send({status:false,message:"Card is already created with this customerID"})


        let totalcard= await cardModel.find()
        data.cardNumber=`C00${++totalcard.length}`

    const result = await cardModel.create(data)
        const finalresult = await cardModel.findOne({cardNumber: result.cardNumber}).select({ _id:0, __v:0, updatedAt:0, createdAt:0})
        return res.status(201).send({status: true, msg: "Data created Successfully", data: finalresult})

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}


const getCardlist = async function(req,res){
    try{
        const getdata = await cardModel.find().select({ _id:0, __v:0, updatedAt:0, createdAt:0})
        return res.status(200).send({status: true, msg: "Customer Data List",DataCount: getdata.length, data: getdata})
    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}


module.exports = {getCardlist, createCard}
