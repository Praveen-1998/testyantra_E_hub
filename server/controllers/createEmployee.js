const employeeModel = require('../models/createEmployee');


exports.postEmployeesDetails = (req, res, next) => {
    new employeeModel({
        empName: req.body.empName,
        empId: req.body.empId,
        technology: req.body.technology,
        unit: req.body.unit,
        yearOfExperience: req.body.yearOfExperience,
        location: req.body.location,
        status: req.body.status
    }).save().then(employeesDetails => {
        res.json(employeesDetails)
    }).catch(err => {
        console.log(err);
    })
}



exports.getEmployeesDetails = (req, res, next) => {
    employeeModel.find().then(employeeDetails => {
        res.json(employeeDetails)
    }).catch(err => {
        console.log(err);
    })
}

exports.getEmployeesDetailsWrtName = (req, res, next) => {
    let EmpName = req.params.empName;
    console.log('Employee Name', EmpName);
    employeeModel.find({ empName: EmpName }).then(employeeDetails => {
        res.json(employeeDetails)
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteEmployeesDetailsWrtName = (req, res, next) => {
    let EmpName = req.params.empName;
    employeeModel.deleteOne({ empName: EmpName }).then(empDetails => {
        res.json({
            msg: "employee deleted successfully"
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.getEmployeeDetailsBasedOnStack = (req, res, next) => {
    let stackName = req.params.stackName;
    employeeModel.find({ technology: stackName }).then(employeeDetails => {
        res.json(employeeDetails)
    }).catch(err => {
        console.log(err)
    })
}

exports.getEmployeeDetailsBasedOnExp = (req, res, next) => {
    let experience = req.params.experience;
    employeeModel.find({ yearOfExperience: experience }).then(employeeDetails => {
        res.json(employeeDetails)
    }).catch(err => {
        console.log(err)
    })
}

exports.getPaidEmployeeWrtStack = (req, res, next) => {
    let status = req.params.status;
    let stack = req.params.stack;
    // employeeModel.find()
    employeeModel.aggregate([{
        $match: {
            $and: [
                { status: status },
                { technology: stack }
            ]
        }
    }]).then(paidEmployeeWrtStack => {
        res.json(paidEmployeeWrtStack)
    }).catch(err => {
        console.log(err);
    })
}