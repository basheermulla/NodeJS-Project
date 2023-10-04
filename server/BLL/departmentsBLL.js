const Department = require('../models/departmentModel.js');

/* CRUD - Create, Read, Update, Delete */

// GET - Get All Departments - Read
const getAllDepartments =  () => {
    return Department.find();
};

// GET - Get Department By Id - Read
const getDepartmentById = (id) => {
    return Department.findById({ _id: id });
};

// POST - Create a Department
const addDepartment = async (obj) => {
    const department = new Department(obj);
    await department.save();
    return 'Created';
};

// PUT - Update a Department
const updateDepartment = async (id, obj) => {
    await Department.findByIdAndUpdate(id, obj);
    return 'Updated';
};

// DELETE - Delete a Department
const deleteDepartment = async (id) => {
    await Department.findByIdAndDelete(id);
    return 'Deleted';
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment
};


