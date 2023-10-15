const Employee = require('../models/employeeModel.js');

/****************************************************************************************************************************************/
/************//* Work with - Employees Collection MongoDB *///     =======>     //* CRUD - Create, Read, Update, Delete *//**************/
/****************************************************************************************************************************************/

// GET - Get All Employees - Read
const getAllEmployees =  () => {
    return Employee.find();
};

// GET - Get Employee By Id - Read
const getEmployeeById = (id) => {
    return Employee.findById({ _id: id });
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

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};


