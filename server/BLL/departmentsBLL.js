const Department = require('../models/departmentModel.js');
const Employee = require('../models/employeeModel.js');

/****************************************************************************************************************************************/
/************//* Work with - Departments Collection MongoDB *///     =======>     //* CRUD - Create, Read, Update, Delete *//************/
/****************************************************************************************************************************************/

// aggregate - {***** Department -->[ [employees] = array Json with All employees ] *****} -------------> {***** Employee *****}
const aggregateAllDepartments = () => {
    return Department.aggregate(
        [
            {
                $lookup: { from: 'employees', localField: '_id', foreignField: "departmentID", as: "employees" }
            }
        ]
    ).exec();;
};

// GET - Get All Departments - Read
const getAllDepartments = () => {
    return Department.find().populate({ path: 'Manager', model: Employee }).exec();
};

// GET - Get Department By Id - Read
const getDepartmentById = (id) => {
    return Department.findById({ _id: id }).populate({ path: 'Manager', model: Employee }).exec();
};

// POST - Create a Department
const addDepartment = async (manager_Id, obj_Dep) => {
    const department = new Department(obj_Dep);
    await department.save();
    await Employee.findByIdAndUpdate(manager_Id, { departmentID: department._id });
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
    aggregateAllDepartments,
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment
};


