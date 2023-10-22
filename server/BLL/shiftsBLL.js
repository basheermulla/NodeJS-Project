const Shift = require('../models/shiftModel.js');
const Employee = require('../models/employeeModel.js');

/****************************************************************************************************************************************/
/*******************//* Work with - Shifts Collection MongoDB *///     =======>     //* CRUD - Create, Read, Update *//******************/
/****************************************************************************************************************************************/

// aggregate - {***** Shift -->[ [employees] = array Json with All employees ] *****} -------------> {***** Employee *****}
const aggregateAllShifts = () => {
    return Shift.aggregate(
        [
            {
                $lookup:
                {
                    from: 'employees',
                    let: { "id": '$_id' },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                    { $in: ["$$id", "$shiftsArr"] }
                            }
                        }, { $project: { firstName: 1, lastName: 1, startWorkYear: 1, departmentID: 1, _id: 1, shiftsArr: 1 } }
                    ], as: "allocateEmployees"
                }
            }
        ]
    ).exec();;
};

// GET - Get All Shifts - Read
const getAllShifts = () => {
    return Shift.find();
};

// GET - Get Shift By Id - Read
const getShiftById = (id) => {
    return Shift.findById({ _id: id });
};

// POST - Create a Shift
const addShift = async (obj) => {
    const shift = new Shift(obj);
    await shift.save();
    return 'Created';
};

// PUT - Update a Shift
const updateShift = async (id, obj) => {
    await Shift.findByIdAndUpdate(id, obj);
    return 'Updated';
};

module.exports = {
    aggregateAllShifts,
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
};


