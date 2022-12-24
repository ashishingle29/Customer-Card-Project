const customerModel = require('../models/customerModel')
const { v4: uuidv4 } = require("uuid");


const createCustomer = async function(req,res){
    try{
        data= req.body

        let myuuid = uuidv4();
        data.customerID = myuuid
        
        const result = await customerModel.create(data)
        console.log(result, "result");
        const finalresult = await customerModel.findOne({customerID: result.customerID}).select({ _id:0, __v:0, updatedAt:0, createdAt:0})
        console.log(finalresult, "final");
        return res.status(201).send({status: true, msg: "Data created Successfully", data: finalresult})

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}
const getCustomerlist = async function(req,res){
    try{
        const getdata = await customerModel.find({status: "ACTIVE", isDeleted:false})
        return res.status(200).send({status: true, msg: "Customer Data List",DataCount: getdata.length, data: getdata})
    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}
const deleteCustomer = async function(req,res){
    try{
        // customerID = req.body.customerID
        customerID = req.params.customerID
        
        const Deletedata = await customerModel.findOneAndUpdate({customerID:customerID},{$set:{isDeleted: true}})
        return res.status(200).send({status: true, msg: "Customer Deleted Successfully"})
    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}


module.exports = {deleteCustomer, getCustomerlist, createCustomer}
