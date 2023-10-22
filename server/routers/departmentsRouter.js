const express = require('express');
const jwt = require('jsonwebtoken');
const departmentsBLL = require('../BLL/departmentsBLL');
const employeesBLL = require('../BLL/employeesBLL');

const router = express.Router();

/****************************************************************************************************************************************/
/***************//* Work with - departmentsBLL.js *///     ============>     //* CRUD - Create, Read, Update, Delete *//*****************/
/****************************************************************************************************************************************/
/***************************/// <======= Entry Point: http://localhost:3000/departments =======> //**************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/

// aggregate - {***** Department-->[ Manager:"6512efcec84aa6d8989171bb" ] *****} -------------> {***** Employee *****}
router.get('/aggregate', (req, res) => {
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
            const departments = await departmentsBLL.aggregateAllDepartments();
            
            res.send(departments);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

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
            const { Name, Manager } = req.body; // In use
            const obj_Dep = req.body; // In use
            const manager_Id = Manager;
            console.log(obj_Dep)
            console.log(manager_Id)
            const result = await departmentsBLL.addDepartment(manager_Id, obj_Dep);
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
            const result = await departmentsBLL.updateDepartment(id, obj);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// DELETE - Delete a Department
router.delete('/:id', async (req, res, next) => {
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

        // The User has been Authorized ****************** DELETE - Delete a Department *******************
        // *********************************************** & employees that belong to this department *****
        try {
            const { id } = req.params;
            const result = await departmentsBLL.deleteDepartment(id);
            const result2 = await employeesBLL.multipleDeleteEmployee(id);
            res.send(result, ' | ', result2);
        } catch (error) {
            next(error);
            //console.error(error);
            //res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

module.exports = router;