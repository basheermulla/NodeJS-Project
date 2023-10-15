const userWS = require('../DAL/usersWS');
const User = require('../models/userModel.js');


/****************************************************************************************************************************************/
/***************************************//* Work with https://jsonplaceholder.typicode.com/users *//*************************************/
/****************************************************************************************************************************************/

// GET - Get All Users
const getAllAUsers = async () => {
    let { data: users } = await userWS.getAllUsers();
    return users;
}

/****************************************************************************************************************************************/
/*****************//* Work with - Users collection in MongoDB *///     ===========>     //* CRUD - Create, Read *//**********************/
/****************************************************************************************************************************************/

// GET - Get All Persons - Read
const getUsersFromMongoDB =  (filters) => {
    return User.find(filters);
};

// POST - Create a Person
const addUserToMongoDB = async (obj) => {
    const user = new User(obj);
    await user.save();
    return 'Created';
};

module.exports = { 
    getAllAUsers,
    getUsersFromMongoDB,
    addUserToMongoDB
 }