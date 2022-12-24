


const createCustomer = function(req,res){
    try{

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}
const getCustomerlist = function(req,res){
    try{

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}
const deleteCustomer = function(req,res){
    try{

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}


module.exports = {deleteCustomer, getCustomerlist, createCustomer}
