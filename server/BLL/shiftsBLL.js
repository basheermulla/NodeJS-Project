const Shift = require('../models/shiftModel.js');

/****************************************************************************************************************************************/
/*******************//* Work with - Shifts Collection MongoDB *///     =======>     //* CRUD - Create, Read, Update *//******************/
/****************************************************************************************************************************************/

// GET - Get All Shifts - Read
const getAllShifts =  () => {
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
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
};


