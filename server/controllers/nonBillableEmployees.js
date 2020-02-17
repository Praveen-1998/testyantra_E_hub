const nonBillableEmployees = require('../models/createEmployee');


exports.getNonBillableEmployeesDetails = (req, res, next) => {
    nonBillableEmployees.aggregate([
        { $group: { _id: { status: "$status", technology: "$technology" }, count: { $sum: 1 } } }

    ]).then(nonBillableEmpDetails => {
        res.json(nonBillableEmpDetails)
    }).catch(err => {
        console.log(err)
    })
}

exports.getTechnologyNonBillableEmployeesDetails = (req, res, next) => {
    nonBillableEmployees.aggregate([{
            $group: {
                _id: { technology: "$technology" },
                count: { $sum: 1 }
            }
        }

    ]).then(TechnologyWiseNoBillableEmpDetails => {
        res.json(TechnologyWiseNoBillableEmpDetails)
    }).catch(err => {
        console.log(err)
    })
}

exports.getNonBillableEmployeesExpDetails = (req, res, next) => {
    nonBillableEmployees.aggregate([{
            $group: {
                _id: { yearOfExperience: "$yearOfExperience" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]).then(NonBillableEmployeesExpCount => {
        res.json(NonBillableEmployeesExpCount);
    }).catch(err => {
        console.log(err);
    });
}