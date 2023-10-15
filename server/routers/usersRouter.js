const express = require('express');
const jwt = require('jsonwebtoken');
const usersBLL = require('../BLL/usersBLL');

const router = express.Router();

/****************************************************************************************************************************************/
/*********************//* Work with - usersBLL.js *///     =================>     //* CRUD - Create, Read *//****************************/
/****************************************************************************************************************************************/
/******************************/// <======= Entry Point: http://localhost:3000/users =======> //*****************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/

// Get All Users
router.get('/', async (req, res) => {
    const token = req.headers['x-access-token'];
    // If 'username' and 'password' are exist in DB:
    if (!token) {
        res.status(401).send('No token provided') // Unauthorized
    }
 
    const { ACCESS_SECRET_TOKEN } = process.env;
 
    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
        if (err) {
            res.status(500).send('Fail to authenticate token')
        }

    // The User has been Authorized ********** Get All Registered Users ***********
    try {
        const filters = req.query;
        console.log(filters);
        const users = await usersBLL.getUsersFromMongoDB(filters);

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    // *****************************************************************************
    });
});

// POST - Create a User
router.post('/', async (req, res) => {
    const token = req.headers['x-access-token'];
    // If 'username' and 'password' are exist in DB:
    if (!token) {
        res.status(401).send('No token provided') // Unauthorized
    }

    const { ACCESS_SECRET_TOKEN } = process.env;

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
        if (err) {
            res.status(500).send('Fail to authenticate token')
        }

        // The User has been Authorized ******************** POST - Create a User *
        try {
            const { firstName, lastName, startWorkYear } = req.body; // Not in use
            const obj = req.body; // In use
            console.log(obj)
            const result = await usersBLL.addUserToMongoDB(obj);
            res.status(201).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

module.exports = router;