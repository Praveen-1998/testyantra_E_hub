const express = require('express');
const router = express.Router();
const billableEmployeesPackageDetialsController = require('../controllers/billableEmployeesPackageDetails');



/* Posting billable Employees Package details */
router.post('/postBillableEmployeesPackageDetails', billableEmployeesPackageDetialsController.postBillableEmployeesPackageDetails);

/* Getting billableEmployeesPackage details */
router.get('/getBillableEmployeesPackageDetails', billableEmployeesPackageDetialsController.getBillableEmployeesPackageDetails);


/* Getting billableEmployeesRevenue details */
router.get('/getBillableEmployeesRevenueDetails', billableEmployeesPackageDetialsController.getBillableEmployeesRevenueDetails);

/* Getting Target Information of the year */
router.get('/getTargetInfoOfTheYear', billableEmployeesPackageDetialsController.getTargetRevenueOfTheCurrentyear);

/* Getting billable Employees count and profit with respect to year */
router.get('/getBillableEmpCountAndProfitWrtYear/:clientName', billableEmployeesPackageDetialsController.getBillableEmpCountAndProfitWrtYear);

module.exports = router;