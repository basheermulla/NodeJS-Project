const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentsSchema = new Schema({
    Name: { type: String, required: true },
    Manager: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
},
    { versionKey: false }
);

const Department = mongoose.model('department', departmentsSchema, 'departments');

module.exports = Department;