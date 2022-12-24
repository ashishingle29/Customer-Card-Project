const cardModel = require('../models/cardModel')


const createCard = async function(req,res){
    try{
    data = req.body

    const result = await cardModel.create(data)
        console.log(result, "result");
        const finalresult = await cardModel.findOne({cardNumber: result.cardNumber}).select({ _id:0, __v:0, updatedAt:0, createdAt:0})
        console.log(finalresult, "final");
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
