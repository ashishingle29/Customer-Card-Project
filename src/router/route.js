const express = require('express');
const router = express.Router();
const customerController  = require('../controllers/customerController');
const cardController  = require('../controllers/cardControllers');
const {authorization, authentication, login}  = require('../middlewares/auth');

//................Customer API.........................
router.post('/createCustomer', customerController.createCustomer); 
router.post("/login", login)
router.get('/getCustomer', customerController.getCustomerlist);
router.delete('/deleteCustomer/:customerID', authentication, authorization, customerController.deleteCustomer)

//................Card API.........................
router.post('/createCard', cardController.createCard);
router.get('/getCard', cardController.getCardlist);


router.all('/*', function (error,res){
    if(error){
        res.status(400).send({status: true, message: "Http Error"})
    }
})

module.exports = router;