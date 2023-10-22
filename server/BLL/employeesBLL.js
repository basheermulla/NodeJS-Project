const Employee = require('../models/employeeModel.js');
const Shift = require('../models/shiftModel.js');
const Department = require('../models/departmentModel.js');

/****************************************************************************************************************************************/
/************//* Work with - Employees Collection MongoDB *///     =======>     //* CRUD - Create, Read, Update, Delete *//**************/
/****************************************************************************************************************************************/

// aggregate - [|*| Employee-->{departmentID}--> Department |*|]-------------[|*| Employee-->{ [shiftsArr] = array Json with All shifts }--> Shift |*|] 
const aggregateAllEmployees = async () => {
    return Employee
        .aggregate(
            [
                {
                    $lookup: { from: 'departments', localField: 'departmentID', foreignField: "_id", as: "departments" }
                },
                {
                    $lookup: { from: 'shifts', localField: 'shiftsArr', foreignField: "_id", as: "shifts" }
                }
            ]
        ).exec();
};

// GET - Get All Employees - Read
const getAllEmployees = async () => {
    return Employee.find()
        .populate({ path: 'shiftsArr', model: Shift })
        .populate({ path: 'departmentID', model: Department }).exec()
};

// GET - Get Employee By Id - Read
const getEmployeeById = (id) => {
    return Employee.findById({ _id: id })
        .populate({ path: 'shiftsArr', model: Shift })
        .populate({ path: 'departmentID', model: Department }).exec()
};

// POST - Create an Employee
const addEmployee = async (obj) => {
    const employee = new Employee(obj);
    await employee.save();
    return 'Created';
};

// PUT - Update an Employee
const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj);
    return 'Updated';
};

// DELETE - Delete an Employee
const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id);
    return 'Deleted';
};

// Delete multiple documents an Employee
const multipleDeleteEmployee = async (id) => {
    console.log(id)
    const query = { "departmentID": { $eq: id } };
    const res = await Employee.deleteMany(query);
    console.log(res)
    return 'Deleted Many';
};

module.exports = {
    aggregateAllEmployees,
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    multipleDeleteEmployee
};


