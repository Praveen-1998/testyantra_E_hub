const express = require('express');
const router = express.Router();
const createEmployeeController = require('../controllers/createEmployee')

router.post('/postEmployeesDetails', createEmployeeController.postEmployeesDetails);

router.get('/getEmployeesDetails', createEmployeeController.getEmployeesDetails);

router.get('/getEmployeesDetailsWrtName/:empName', createEmployeeController.getEmployeesDetailsWrtName);

router.delete('/deleteEmployeesDetailsWrtName/:empName', createEmployeeController.deleteEmployeesDetailsWrtName)


router.get('/getEmployeeDetailsBasedOnStack/:stackName', createEmployeeController.getEmployeeDetailsBasedOnStack);

router.get('/getEmployeeDetailsBasedOnExp/:experience', createEmployeeController.getEmployeeDetailsBasedOnExp);

router.get('/getPaidEmployeeWrtStack/:status/:stack', createEmployeeController.getPaidEmployeeWrtStack);




module.exports = router