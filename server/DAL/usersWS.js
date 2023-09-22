const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

/*** WS CRUD ***/
/*** For Users ***/
/***provided from a "jsonplaceholder REST API" ***/
/*** Create, Read, Update, Delete ***/

// GET - Get All Users - Read
const getAllUsers = (amount = '') => {
    return axios.get(`${url}?_limit=${amount}`)
};

// GET - Get Address By Id - Read
const getUserById = (id) => {
    return axios.get(`${url}/${id}`)
};

// POST - Create an Address

// PUT - Update an Address

// DELETE - Delete an Address

module.exports = { 
    getAllUsers,
    getUserById
};
