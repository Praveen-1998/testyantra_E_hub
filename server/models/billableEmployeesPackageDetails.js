const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let billableEmployeesPackageDetailsSchema = new Schema({
    clientId: {
        type: String
    },
    dateOfDeployment: {
        type: Date
    },
    clientName: {
        type: String
    },
    EmpName: {
        type: String
    },
    dateOfPaymemtByClient: {
        type: Date
    },
    dateOfPaymemtByTyss: {
        type: Date
    },
    rateCardByClient: {
        type: Number
    },
    rateCardByTyss: {
        type: Number
    }
});



module.exports = mongoose.model('BillableEmployeesPackageDetail', billableEmployeesPackageDetailsSchema);