const express = require('express');
const router = express.Router();
const customerController  = require('../controllers/customerController');
const cardController  = require('../controllers/cardControllers');
// const middleware  = require('../middlewares/auth');

//................Customer API.........................
router.post('/createCustomer', customerController.createCustomer);
router.get('/getCustomer', customerController.getCustomerlist);
router.delete('/deleteCustomer', customerController.deleteCustomer)
router.delete('/deleteCustomer/:customerID', customerController.deleteCustomer)

//................Card API.........................
router.post('/createCard', cardController.createCard);
router.get('/getCard', cardController.getCardlist);

module.exports = router;