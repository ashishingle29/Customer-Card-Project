const customerModel = require('../models/customerModel')
const { v4: uuidv4 } = require("uuid");


const createCustomer = async function(req,res){
    try{
        data= req.body
        const {firstName,lastName,mobileNumber,DOB,emailID, address, status} = data
        if(!firstName) return res.status(400).send({status:false, message:"Please Provide firstName"})
        if(!lastName) return res.status(400).send({status:false, message:"Please Provide lastName"})
        if(!mobileNumber) return res.status(400).send({status:false, message:"Please Provide mobileNumber"})
        if(mobileNumber.length !=10)  return res.status(400).send({status:false, message:"mobileNumber must be 10 digits"})
        if(!DOB) return res.status(400).send({status:false, message:"Please Provide DOB"})
        if(!emailID) return res.status(400).send({status:false, message:"Please Provide emailID"})
        if(!address) return res.status(400).send({status:false, message:"Please Provide address"})
        if(!status) return res.status(400).send({status:false, message:"Please Provide status"})

        //............generate UUID..........
        let myuuid = uuidv4();
        data.customerID = myuuid

        const checkcustomer = await customerModel.findOne({mobileNumber})
        if(checkcustomer){ return res.status(400).send({status:false, message:"user is Already Exist"})}
        
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
        if(!getdata) return res.status(404).send({status:false,message:"No data found"})
        
        return res.status(200).send({status: true, msg: "Customer Data List",DataCount: getdata.length, data: getdata})
    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}




const deleteCustomer = async function(req,res){
    try{
        customerID = req.params.customerID
        if(!isIdValid(customerID)) return res.status(400).send({status:false,message:"Invalid CustomerId in path params"})

        const Deletedata = await customerModel.findOneAndUpdate({customerID:customerID},{$set:{isDeleted: true}});
        if(Deletedata.isDeleted == true){return res.status(200).send({status: true, msg: "Customer is Already Deleted"});}
        return res.status(200).send({status: true, msg: "Customer Deleted Successfully"});
    }catch(error){
       return res.status(500).send({status: false, message: error.message});
    }
}


module.exports = {deleteCustomer, getCustomerlist, createCustomer}
