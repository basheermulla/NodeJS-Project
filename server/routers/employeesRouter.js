const express = require('express');
const jwt = require('jsonwebtoken');
const employeesBLL = require('../BLL/employeesBLL');

const router = express.Router();

/****************************************************************************************************************************************/
/***************//* Work with - employeesBLL.js *///     ============>     //* CRUD - Create, Read, Update, Delete *//*******************/
/****************************************************************************************************************************************/
/****************************/// <======= Entry Point: http://localhost:3000/employees =======> //***************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/

// Get All Employees
router.get('/', async (req, res) => {
    //console.log(req.headers);

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

    // The User has been Authorized ********************** Get All Employees *******
    try {
        const employees = await employeesBLL.getAllEmployees();

        res.send(employees);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    // *****************************************************************************
    });
});

// GET - Get Employee By Id
router.get('/:id', async (req, res) => {
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

    // The User has been Authorized ******************** GET - Get Employee By Id **
    try {
        const { id } = req.params;
        const Employee = await employeesBLL.getEmployeeById(id);
        res.send(Employee);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    // *****************************************************************************
    });
});

// POST - Create an Employee
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

        // The User has been Authorized ******************** POST - Create an Employee *
        try {
            const { firstName, lastName, startWorkYear } = req.body; // Not in use
            const obj = req.body; // In use
            console.log(obj)
            const result = await employeesBLL.addEmployee(obj);
            res.status(201).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// PUT - Update an Employee
router.put('/:id', async (req, res) => {
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

        // The User has been Authorized ******************** PUT - Update an Employee **
        try {
            const { id } = req.params;
            const obj = req.body;
            const result = await employeesBLL.updateEmployee(id, obj, { new: true });
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// DELETE - Delete an Employee
router.delete('/:id', async (req, res) => {
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

        // The User has been Authorized ****************** DELETE - Delete an Employee *
        try {
            const { id } = req.params;
            const result = await employeesBLL.deleteEmployee(id);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

module.exports = router;