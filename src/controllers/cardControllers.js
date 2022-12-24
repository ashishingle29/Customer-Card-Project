


const createCard = function(req,res){
    try{

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}


const getCardlist = function(req,res){
    try{

    }catch(error){
        res.status(500).send({status: true, message: error.message})
    }
}


module.exports = {getCardlist, createCard}
