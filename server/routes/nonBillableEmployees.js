const express = require('express');
const router = express.Router();
const nonBillableEmployeesController = require('../controllers/nonBillableEmployees')

router.get('/getNonBillableEmployeesDetails', nonBillableEmployeesController.getNonBillableEmployeesDetails);

router.get('/getTechnologyNonBillableEmployeesDetails', nonBillableEmployeesController.getTechnologyNonBillableEmployeesDetails);

router.get('/getNonBillableEmployeesExpDetails', nonBillableEmployeesController.getNonBillableEmployeesExpDetails);






module.exports = router