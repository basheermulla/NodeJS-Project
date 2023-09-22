const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    StartWorkYear :{ type: Number, required: true },
    DepartmentID: [{ type: Schema.Types.ObjectId, ref: 'Department' }]
},
    { versionKey: false }
);

const Employee = mongoose.model('employee', employeesSchema, 'employees');

module.exports = Employee;