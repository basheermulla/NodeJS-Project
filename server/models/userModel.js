const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  FullName: { type: String, default: null },
  NumOfActions: { type: Number, required: true },
  ExternalID: { type: Number, required: true }
},
  { versionKey: false }
);

const User = mongoose.model('user', usersSchema, 'users');

module.exports = User;