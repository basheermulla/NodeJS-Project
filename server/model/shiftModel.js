const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shiftsSchema = new Schema({
    Date: { type: Date, required: true },
    StartingHour: { type: String, required: true },
    EndingHour :{ type: String, required: true },
},
    { versionKey: false }
);

const Shift = mongoose.model('shift', shiftsSchema, 'shifts');

module.exports = Shift;