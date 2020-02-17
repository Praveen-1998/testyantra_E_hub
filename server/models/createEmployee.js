const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    empName: {
        type: String
    },
    empID: {
        type: String
    },
    technology: {
        type: String
    },
    unit: {
        type: String
    },
    yearOfExperience: {
        type: Number
    },
    location: {
        type: String
    },
    status: {
        type: String
    }
})


autoIncrement.initialize(mongoose.connection);
employeeSchema.plugin(autoIncrement.plugin, 'employeeSchema');
module.exports = mongoose.model('employee', employeeSchema);