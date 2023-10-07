const Shift = require('../models/shiftModel.js');

/* CRUD - Create, Read, Update, Delete */

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

// DELETE - Delete a Shift
const deleteShift = async (id) => {
    await Shift.findByIdAndDelete(id);
    return 'Deleted';
};

module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    deleteShift
};


