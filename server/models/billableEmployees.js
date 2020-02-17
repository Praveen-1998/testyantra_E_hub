const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

let billableEmployeesSchema = new Schema({
    clientName: {
        type: String
    },
    EmpName: {
        type: String
    },
    dateOfDeployment: {
        type: Date
    },
    contractEndDate: {
        type: Date
    },
    rateCard: {
        type: Number
    },
    stack: {
        type: String
    },
    yearOfExperience: {
        type: Number
    },
    clientId: {
        type: String
    }
});

autoIncrement.initialize(mongoose.connection);

billableEmployeesSchema.plugin(autoIncrement.plugin, 'billableEmployeesSchema');

module.exports = mongoose.model('BillableEmployee', billableEmployeesSchema);