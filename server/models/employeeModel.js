const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear :{ type: Number, required: true },
    departmentID: { type: Schema.Types.ObjectId, ref: 'Department' },
    shiftsArr: [{ type: Schema.Types.ObjectId, ref: 'Shift' }]
},
    { versionKey: false }
);

const Employee = mongoose.model('employee', employeesSchema, 'employees');

module.exports = Employee;