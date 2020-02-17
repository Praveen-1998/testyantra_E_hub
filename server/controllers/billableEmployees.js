const clientDetails = require('../models/clientDetails')
const billableEmployeesDetails = require('../models/billableEmployees');
const billableEmployeesPackageDetails = require('../models/billableEmployeesPackageDetails')


/* Posting the Billable Employees Details */
exports.postBillableEmployeesDetails = (req, res, next) => {
    let clientName = req.body.clientName
    clientDetails.find({ clientName: clientName }).then(billableEmpDetails => {
        let clientid = billableEmpDetails[0].clientId
        if (billableEmpDetails.length > 0) {
            new billableEmployeesDetails({
                clientId: clientid,
                clientName: req.body.clientName,
                EmpName: req.body.EmpName,
                dateOfDeployment: req.body.dateOfDeployment,
                contractEndDate: req.body.contractEndDate,
                rateCard: req.body.rateCard,
                stack: req.body.stack,
                yearOfExperience: req.body.yearOfExperience,
                // address:[{
                //     place:req.body.place,
                //     city:req.body.city
                // }]
            }).save().then(billableEmployees => {
                res.json(billableEmployees);
            }).catch(err => {
                console.log(err);
            });
        } else {
            res.json({ msg: "Client Does not Exists" });
        }
    }).catch(err => {
        console.log(err);
    })

}


/* Getting the Billable Employees Details */
exports.getBillableEmployeesDetails = (req, res, next) => {
    billableEmployeesDetails.find().then(BillableEmployeesDetails => {
        res.json(BillableEmployeesDetails);
    }).catch(err => {
        console.log(err);
    })
}


/* Updating the Billable Employees Details */
exports.updateBillableEmployeesDetails = (req, res, next) => {
    let employeeId = req.params._id;
    billableEmployeesDetails.findById(employeeId).then(billableEmployeesDetails => {
        billableEmployeesDetails.dateOfDeployment = req.body.dateOfDeployment;
        billableEmployeesDetails.contractEndDate = req.body.contractEndDate;
        billableEmployeesDetails.rateCard = req.body.rateCard;
        billableEmployeesDetails.stack = req.body.stack;
        billableEmployeesDetails.yearOfExperience = req.body.yearOfExperience;
        billableEmployeesDetails.save();
        res.json(billableEmployeesDetails);
    }).catch(err => {
        console.log(err);
    })
}

/* Deleting the Billable Employees Details */
exports.deleteBillableEmployeesDetails = (req, res, next) => {
    let id = req.params.id;
    billableEmployeesDetails.findByIdAndRemove(id).then(billableEmployeesDetails => {
        res.json(billableEmployeesDetails);
    }).catch(err => {
        console.log(err);
    })
}


/* Getting the Billable Employees Details count based on their stack */
exports.getBillableEmployeesDetailsCount = (req, res, next) => {
    billableEmployeesDetails.aggregate([{
            $group: {
                _id: { stack: "$stack" },
                count: { $sum: 1 }
            }
        },
        { $match: { count: { "$gte": 1 } } }
    ]).then(BillableEmployeesDetailsCount => {
        res.json(BillableEmployeesDetailsCount);
    }).catch(err => {
        console.log(err);
    });
}

/* Getting the Billable Employees count based on their Experience */
exports.getBillableEmployeesExpDetails = (req, res, next) => {
    billableEmployeesDetails.aggregate([{
            $group: {
                _id: { yearOfExperience: "$yearOfExperience" },
                count: { $sum: 1 }
            }
        },
        { $match: { count: { "$gte": 0 } } },
        {
            $sort: { _id: 1 }
        }
    ]).then(BillableEmployeesExpCount => {
        res.json(BillableEmployeesExpCount);
    }).catch(err => {
        console.log(err);
    });
}



/* Getting the Billable Employees count with respect to their client */
exports.getBillableEmpCountwrtClient = (req, res, next) => {

    billableEmployeesDetails.aggregate([{
        $group: {
            _id: {
                clientId: "$clientId",
            },
            count: { "$sum": 1 }
        }
    }, ]).then(BillableEmployeesWrtClientCount => {
        res.json(BillableEmployeesWrtClientCount);
    }).catch(err => {
        console.log(err);
    });
}


/* Getting the Billable Employees count with respect to their clientName  */
exports.getBillableEmpwrtClientName = (req, res, next) => {
    let clientName = req.params.clientName;
    // console.log(clientName);
    billableEmployeesDetails.aggregate([
        { $match: { clientName: clientName } },
        {
            $group: {
                _id: { stack: "$stack" },
                count: { "$sum": 1 }
            }
        }
    ]).then(billableCount => {
        // console.log(billableCount);
        res.json(billableCount)
    }).catch(err => {
        console.log(err);
    })
}

/* Getting the Billable Employees count with respect to their clientId  */
exports.getBillableEmpwrtClientId = (req, res, next) => {
    let clientId = req.params.clientId;
    // console.log(clientId);
    billableEmployeesDetails.find({ clientId: clientId }).then(billableEmpList => {
        res.json(billableEmpList)
    }).catch(err => {
        console.log(err);
    })
}

/* Getting the Billable Employees count with respect to their stack  */
exports.getBillableEmpwrtTechnology = (req, res, next) => {
    let Stack = req.params.stack;
    // console.log(Stack, 'stack name');
    billableEmployeesDetails.find({ stack: Stack }).then(billableEmpList => {
        res.json(billableEmpList)
    }).catch(err => {
        console.log(err);
    })
}

/* Getting the Billable Employees count with respect to their Experience  */

exports.getBillableEmpwrtExp = (req, res, next) => {
    let experience = req.params.exp;
    // console.log(Stack, 'stack name');
    billableEmployeesDetails.find({ yearOfExperience: experience }).then(billableEmpExpList => {
        res.json(billableEmpExpList)
    }).catch(err => {
        console.log(err);
    })
}




/* Getting the Billable Employees Fresher and Experience list */
exports.getBillableEmpFresherAndExpList = (req, res, next) => {
    let clientId = req.params.clientId;
    // console.log('BillableEmpFresherAndExpList', clientId);
    billableEmployeesDetails.aggregate([
        { $match: { clientId: clientId } },
        {
            $project: {
                dateOfDeployment: 1,
                lessThan0: {
                    $cond: [{ $eq: ["$yearOfExperience", 0] }, 1, 0]
                },
                moreThan0: {
                    $cond: [{ $gt: ["$yearOfExperience", 0] }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                countFresher: { $sum: "$lessThan0" },
                countExp: { $sum: "$moreThan0" }
            }
        }
    ]).then(BillableEmpFresherAndExpList => {
        // console.log(BillableEmpFresherAndExpList);
        res.json(BillableEmpFresherAndExpList)
    }).catch(err => {
        console.log(err);
    })
}


/* Getting the Overall Billable Employees Fresher and Experience list */
exports.getOverallBillableEmpFresherAndExpList = (req, res, next) => {
    billableEmployeesDetails.aggregate([{
            $project: {
                dateOfDeployment: 1,
                lessThan0: {
                    $cond: [{ $eq: ["$yearOfExperience", 0] }, 1, 0]
                },
                moreThan0: {
                    $cond: [{ $gt: ["$yearOfExperience", 0] }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                countFresher: { $sum: "$lessThan0" },
                countExp: { $sum: "$moreThan0" }
            }
        }
    ]).then(OverallBillableEmpFresherAndExpList => {
        // console.log(OverallBillableEmpFresherAndExpList);
        res.json(OverallBillableEmpFresherAndExpList)
    }).catch(err => {
        console.log(err);
    })
}