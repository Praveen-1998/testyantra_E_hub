const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema

const clientsDetailsSchema = new Schema({
    clientId: {
        type: String
    },
    clientName: {
        type: String
    },
    clientShortName: {
        type: String
    },
    department: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    companyWebsite: {
        type: String
    },
    image: {
        type: String
    },
    city: {
        type: String
    },
    streetAddress: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    country: {
        type: String
    }
})


autoIncrement.initialize(mongoose.connection);

clientsDetailsSchema.plugin(autoIncrement.plugin, 'clientsDetailsSchema');
module.exports = mongoose.model('ClientsDetail', clientsDetailsSchema);