const express = require('express');
const router = express.Router();
const clientDetailsController = require('../controllers/clientDetails');

/* Posting client details */
router.post('/postClientDetails', clientDetailsController.postClientDetails);

/* getting the clients details */
router.get('/getClientDetails', clientDetailsController.getClientDetails);

/* Updating the clientDetails */
router.post('/updateClientDetails', clientDetailsController.updateClientDetails);

/* Deleting the clientDetails */
router.delete('/deleteClientDetails/:_id', clientDetailsController.deleteClientDetails);

module.exports = router;