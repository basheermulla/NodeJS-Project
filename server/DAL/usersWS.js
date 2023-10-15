const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

/*** WS CRUD ***/
/*** For Users ***/
/***provided from a "jsonplaceholder REST API" ***/
/*** Create, Read, Update, Delete ***/

// GET - Get All Users - Read
const getAllUsers = () => {
    return axios.get(`${url}`)
};

// GET - Get Address By Id - Read
const getUserById = (id) => {
    return axios.get(`${url}/${id}`)
};

module.exports = { 
    getAllUsers,
    getUserById
};
