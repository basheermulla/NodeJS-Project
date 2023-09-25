const userWS = require('../DAL/usersWS');
const User = require('../models/userModel.js');

// GET - Get All Users from the: https://jsonplaceholder.typicode.com/users
const getAllAUsers = async () => {
    let { data: users } = await userWS.getAllUsers();

    /*users = users.map(user => {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    });*/

    return users;
}
/* User collection in MongoDB */
/* CRUD - Create, Read */

// GET - Get All Persons - Read
const getUsersFromMongoDB =  () => {
    return User.find();
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