const express = require('express');
const jwt = require('jsonwebtoken');
const departmentsBLL = require('../BLL/departmentsBLL');

const router = express.Router();

/****************************************************************************************************************************************/
/***************//* Work with - departmentsBLL.js *///     ============>     //* CRUD - Create, Read, Update, Delete *//*****************/
/****************************************************************************************************************************************/
/***************************/// <======= Entry Point: http://localhost:3000/departments =======> //**************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/

// Get All Departments
router.get('/', (req, res) => {
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

        // The User has been Authorized ********************** Get All Departments *******
        try {
            const departments = await departmentsBLL.getAllDepartments();
            //const departments = [ {FirstName: 'Basheer'}, {LastName: 'Mulla'} ];
            res.send(departments);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// GET - Get Department By Id
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

        // The User has been Authorized ******************** GET - Get Department By Id **
        try {
            const { id } = req.params;
            const department = await departmentsBLL.getDepartmentById(id);
            res.send(department);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// POST - Create a Department
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

        // The User has been Authorized ******************** POST - Create a Department *
        try {
            //const { firstName, lastName, startWorkYear } = req.body; // Not in use
            const obj = req.body; // In use
            console.log(obj)
            const result = await departmentsBLL.addDepartment(obj);
            res.status(201).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// PUT - Update a Department
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

        // The User has been Authorized ******************** PUT - Update a Department **
        try {
            const { id } = req.params;
            const obj = req.body;
            const result = await departmentsBLL.updateDepartment(id, obj, { new: true });
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// DELETE - Delete a Department
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

        // The User has been Authorized ****************** DELETE - Delete a Department *
        try {
            const { id } = req.params;
            const result = await departmentsBLL.deleteDepartment(id);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

module.exports = router;