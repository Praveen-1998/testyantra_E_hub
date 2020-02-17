const billableEmployeesPackaeDetails = require('../models/billableEmployeesPackageDetails')
const billableEmployeesDetails = require('../models/billableEmployees');



/* Posting the Billable Employees Package Details */
exports.postBillableEmployeesPackageDetails = (req, res, next) => {
    let EmpName = req.body.EmpName
    billableEmployeesDetails.find({ EmpName: EmpName }).then(billableEmpDetails => {
        // console.log('billableEmpDetails', billableEmpDetails[0].dateOfDeployment);
        let clientid = billableEmpDetails[0].clientId
        let DateOfDeployment = billableEmpDetails[0].dateOfDeployment
            // console.log('clientid,DateOfDeployment  ', clientid, DateOfDeployment);
        if (billableEmpDetails.length > 0) {
            new billableEmployeesPackaeDetails({
                clientId: clientid,
                dateOfDeployment: DateOfDeployment,
                clientName: req.body.clientName,
                EmpName: req.body.EmpName,
                dateOfPaymemtByClient: req.body.dateOfPaymemtByClient,
                dateOfPaymemtByTyss: req.body.dateOfPaymemtByTyss,
                rateCardByClient: req.body.rateCardByClient,
                rateCardByTyss: req.body.rateCardByTyss
            }).save().then(billableEmployees => {
                res.json(billableEmployees);
            }).catch(err => {
                console.log(err);
            });
        } else {
            res.json({ msg: "Employee Does not Exists" });
            // res.json(status(404))
        }
    }).catch(err => {
        console.log(err);
    })
}

/* Getting the Billable Employees Package Details */
exports.getBillableEmployeesPackageDetails = (req, res, next) => {
    billableEmployeesPackaeDetails.find().then(BillableEmployeesPackageDetails => {
        res.json(BillableEmployeesPackageDetails);
    }).catch(err => {
        console.log(err);
    })
}

/* Getting the Billable Employees Revenue Details */
exports.getBillableEmployeesRevenueDetails = (req, res, next) => {
    billableEmployeesPackaeDetails.aggregate([
        { $project: { dateOfDeployment: 1, total: { $subtract: ["$rateCardByClient", "$rateCardByTyss"] } } },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                Profit: { $sum: "$total" },
            }
        }, {
            $sort: { _id: 1 }
        }
    ]).then(BillableEmployeesRevenueDetails => {
        res.json(BillableEmployeesRevenueDetails);
    }).catch(err => {
        console.log(err);
    })
}





/* Getting the Target revenue of the current year */
exports.getTargetRevenueOfTheCurrentyear = (req, res, next) => {
    billableEmployeesPackaeDetails.aggregate([{
            $project: {
                rateCardByClient: 1,
                year: {
                    $year: "$dateOfDeployment"
                }
            }
        },
        {
            $match: {
                year: new Date().getFullYear()
            }
        },
        {
            $group: {
                _id: { year: "$year" },
                totalAmount: { $sum: "$rateCardByClient" }
            }
        }
    ]).then(TargetRevenueOfTheCurrentyear => {
        res.json(TargetRevenueOfTheCurrentyear);
    }).catch(err => {
        console.log(err);
    })
}


/* Getting the Billable Employees Count And Profit With Respect To Year  */
exports.getBillableEmpCountAndProfitWrtYear = (req, res, next) => {
    let ClientName = req.params.clientName;
    // console.log('BillableEmpCountWithProfitAndYear       ', ClientName);
    billableEmployeesPackaeDetails.aggregate([
        { $match: { clientName: ClientName } },
        { $project: { dateOfDeployment: 1, total: { $subtract: ["$rateCardByClient", "$rateCardByTyss"] } } },
        {
            $group: {
                _id: { $year: "$dateOfDeployment" },
                count: { $sum: 1 },
                Profit: { $sum: "$total" },

            }
        },

        {
            $sort: { _id: 1 }
        }
    ]).then(BillableEmpCountAndProfitWrtYear => {
        // console.log(BillableEmpCountAndProfitWrtYear);
        res.json(BillableEmpCountAndProfitWrtYear)
    }).catch(err => {
        console.log(err);
    })
}