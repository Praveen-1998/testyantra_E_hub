const express = require('express');
const router = express.Router();
const billableEmployeesController = require('../controllers/billableEmployees');



/* Posting billableEmployees details */
router.post('/postBillableEmployeesDetails', billableEmployeesController.postBillableEmployeesDetails);

/* Getting billableEmployees details */
router.get('/getBillableEmployeesDetails', billableEmployeesController.getBillableEmployeesDetails);

/* Getting billableEmployees details count */
router.get('/getBillableEmployeesDetailsCount', billableEmployeesController.getBillableEmployeesDetailsCount);


/* Updating billableEmployees details */
router.post('/updateBillableEmployeesDetails/:_id', billableEmployeesController.updateBillableEmployeesDetails);

/* Deleting billableEmployees details */
router.delete('/deleteBillableEmployeesDetails/:id', billableEmployeesController.deleteBillableEmployeesDetails);

/* Getting billableEmployees year of experience count */
router.get('/getBillableEmployeesExpDetails', billableEmployeesController.getBillableEmployeesExpDetails);

/* Getting billable Employees count with respect to their client */
router.get('/getBillableEmpCountwrtClient', billableEmployeesController.getBillableEmpCountwrtClient);


/* Getting billable Employees count with respect to their clientname */
router.get('/getBillableEmpwrtClientName/:clientName', billableEmployeesController.getBillableEmpwrtClientName);

/* Getting billable Employees count with respect to their clientId */
router.get('/getBillableEmpwrtClientId/:clientId', billableEmployeesController.getBillableEmpwrtClientId);


/* Getting billable Employees fresher and experience count */
router.get('/getBillableEmpFresherAndExpList/:clientId', billableEmployeesController.getBillableEmpFresherAndExpList);


/* Getting billable Employees Overall fresher and experience count */
router.get('/getOverallBillableEmpFresherAndExpList', billableEmployeesController.getOverallBillableEmpFresherAndExpList);

/* Getting billable Employees with respect to technology */
router.get('/getBillableEmpwrtTechnology/:stack', billableEmployeesController.getBillableEmpwrtTechnology);

/* Getting billable Employees with respect to Experience */
router.get('/getBillableEmpwrtExperience/:exp', billableEmployeesController.getBillableEmpwrtExp);



module.exports = router;